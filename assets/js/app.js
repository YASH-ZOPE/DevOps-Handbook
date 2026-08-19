/* ==========================================================================
   DevOps Handbook - Dynamic Manifest-Based Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // UI Elements
  const navList = document.getElementById('nav-list');
  const markdownBody = document.getElementById('markdown-body');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const terminalDrawer = document.getElementById('terminal-drawer');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const terminalPromptPath = document.getElementById('terminal-prompt-path');

  let allFilesList = [];
  let navTree = [];

  // Configure Marked Options
  if (window.marked) {
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }

  // Helper to format directory & file names into clean human titles
  function formatTitle(name) {
    return name
      .replace(/^\d+-/, '') // remove leading numbers like '01-'
      .replace(/\.md$/, '') // remove .md
      .replace(/[-_]/g, ' ') // replace dash/underscore with space
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Dynamically Load Manifest & Build Dynamic Navigation Tree
  async function loadManifestAndBuildNav() {
    try {
      const response = await fetch('assets/data/manifest.json');
      if (!response.ok) {
        throw new Error('Could not load assets/data/manifest.json');
      }
      allFilesList = await response.json();

      // Group paths dynamically by folder structure
      const groupsMap = {};

      allFilesList.forEach(path => {
        if (path === 'README.md') {
          if (!groupsMap['Overview']) groupsMap['Overview'] = [];
          groupsMap['Overview'].push({ title: 'DevOps Handbook Overview', path });
          return;
        }

        const parts = path.split('/');
        if (parts.length >= 2) {
          const categoryFolder = parts[1] || parts[0];
          const sectionTitle = formatTitle(categoryFolder);
          const fileName = parts[parts.length - 1];
          const itemTitle = fileName.replace(/\.md$/, '');

          if (!groupsMap[sectionTitle]) {
            groupsMap[sectionTitle] = [];
          }
          groupsMap[sectionTitle].push({ title: itemTitle, path });
        }
      });

      // Convert map to navTree structure
      navTree = Object.keys(groupsMap).map(section => ({
        section: section,
        items: groupsMap[section]
      }));

      renderSidebar();
      buildSearchIndex();
      
      // Initial file load
      loadMarkdownFile('README.md');
    } catch (err) {
      markdownBody.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #ef4444;">
          <h2>⚠️ Manifest Loading Error</h2>
          <p style="color: #94a3b8; font-size: 14px;">${err.message}</p>
        </div>
      `;
    }
  }

  // Render Dynamic Sidebar
  function renderSidebar() {
    navList.innerHTML = "";
    navTree.forEach(group => {
      const sectionHeader = document.createElement("div");
      sectionHeader.className = "sidebar-section-title";
      sectionHeader.innerText = group.section;
      navList.appendChild(sectionHeader);

      group.items.forEach(item => {
        const a = document.createElement("a");
        a.className = "nav-item";
        a.dataset.path = item.path;
        a.innerHTML = `<span>${item.title}</span>`;
        a.addEventListener("click", () => loadMarkdownFile(item.path));
        navList.appendChild(a);
      });
    });
  }

  // Fetch & Load Markdown Content into Canvas
  async function loadMarkdownFile(filePath) {
    try {
      // Highlight active item in sidebar
      document.querySelectorAll(".nav-item").forEach(el => {
        el.classList.toggle("active", el.dataset.path === filePath);
      });

      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`File '${filePath}' could not be fetched.`);
      }
      const rawText = await response.text();

      // Render Markdown HTML
      const renderedHtml = window.marked ? marked.parse(rawText) : `<pre>${rawText}</pre>`;
      markdownBody.innerHTML = renderedHtml;

      // Enhance Code Blocks with "Run in Terminal" & "Copy" buttons
      enhanceCodeBlocks();
      
      // Scroll to top
      document.querySelector(".content-canvas").scrollTop = 0;
    } catch (err) {
      markdownBody.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #ef4444;">
          <h2>⚠️ File Load Warning</h2>
          <p style="margin-top: 8px;">Path: <code>${filePath}</code></p>
          <p style="color: #94a3b8; font-size: 13px;">${err.message}</p>
        </div>
      `;
    }
  }

  // Inject Custom Action Bar on Code Blocks
  function enhanceCodeBlocks() {
    const preBlocks = markdownBody.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code) return;

      const codeText = code.innerText.trim();
      const firstLine = codeText.split("\n")[0];
      
      // Check language / detect commands
      const isBash = code.className.includes("language-bash") || 
                     code.className.includes("language-sh") || 
                     code.className.includes("language-terminal") ||
                     firstLine.startsWith("ls") || 
                     firstLine.startsWith("cd") || 
                     firstLine.startsWith("grep") ||
                     firstLine.startsWith("pwd") ||
                     firstLine.startsWith("cat") ||
                     firstLine.startsWith("chmod") ||
                     firstLine.startsWith("docker") ||
                     firstLine.startsWith("git");

      // Wrap pre in wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Header controls
      const header = document.createElement("div");
      header.className = "code-header";
      header.innerHTML = `
        <span class="code-lang">Terminal / Shell</span>
        <div class="code-actions">
          ${isBash ? `<button class="code-action-btn run-btn">▶ Run in Ubuntu Terminal</button>` : ''}
          <button class="code-action-btn copy-btn">📋 Copy</button>
        </div>
      `;

      wrapper.insertBefore(header, pre);

      // Copy Handler
      const copyBtn = header.querySelector(".copy-btn");
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(codeText);
        copyBtn.innerText = "✓ Copied!";
        setTimeout(() => (copyBtn.innerText = "📋 Copy"), 2000);
      });

      // Run in Terminal Handler
      if (isBash) {
        const runBtn = header.querySelector(".run-btn");
        runBtn.addEventListener("click", () => {
          openTerminal();
          executeInTerminal(firstLine);
        });
      }
    });
  }

  // Search Index Builder
  function buildSearchIndex() {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = "";

      if (!query) return;

      const matches = allFilesList.filter(path => path.toLowerCase().includes(query));
      
      if (matches.length === 0) {
        searchResults.innerHTML = `<div style="padding: 16px; color: #94a3b8; text-align: center;">No matching tracked files found.</div>`;
        return;
      }

      matches.slice(0, 10).forEach(path => {
        const item = document.createElement("div");
        item.className = "search-result-item";
        item.innerHTML = `
          <div class="search-result-title">${formatTitle(path.split('/').pop())}</div>
          <div class="search-result-snippet">${path}</div>
        `;
        item.addEventListener("click", () => {
          searchModal.classList.remove("active");
          loadMarkdownFile(path);
        });
        searchResults.appendChild(item);
      });
    });
  }

  // Terminal UI Controls
  function openTerminal() {
    terminalDrawer.classList.remove("hidden", "minimized");
  }

  function toggleTerminal() {
    if (terminalDrawer.classList.contains("hidden")) {
      terminalDrawer.classList.remove("hidden", "minimized");
    } else {
      terminalDrawer.classList.add("hidden");
    }
  }

  function executeInTerminal(commandStr) {
    if (!window.ubuntuTerminal) return;
    
    // Print Input Row in Output
    const currentPath = window.ubuntuTerminal.currentPath;
    const inputHtml = `<div><span class="terminal-prompt-user">ubuntu@ubuntu-devops</span>:<span class="terminal-prompt-path">${currentPath}</span>$ ${commandStr}</div>`;
    
    const outputText = window.ubuntuTerminal.executeCommand(commandStr);
    
    if (outputText === "__CLEAR__") {
      terminalOutput.innerHTML = "";
    } else {
      terminalOutput.innerHTML += inputHtml + (outputText ? `<div class="terminal-line">${escapeHtml(outputText)}</div>` : "");
    }
    
    // Update path prompt
    terminalPromptPath.innerText = window.ubuntuTerminal.currentPath;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Terminal Input Key Listener
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value;
      terminalInput.value = "";
      if (val.trim()) {
        executeInTerminal(val);
      }
    }
  });

  // Terminal Layout Mode Switcher (Side-by-side Split, Bottom Dock, Floating)
  function setTerminalMode(mode) {
    // Reset inline position styles to prevent drag overrides
    terminalDrawer.style.left = "";
    terminalDrawer.style.top = "";
    terminalDrawer.style.right = "";
    terminalDrawer.style.bottom = "";

    terminalDrawer.classList.remove("hidden", "minimized", "mode-split", "mode-bottom", "mode-float");
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));

    if (mode === "side") {
      terminalDrawer.classList.add("mode-split");
      document.getElementById("btn-mode-side").classList.add("active");
    } else if (mode === "bottom") {
      terminalDrawer.classList.add("mode-bottom");
      document.getElementById("btn-mode-bottom").classList.add("active");
    } else {
      terminalDrawer.classList.add("mode-float");
      document.getElementById("btn-mode-float").classList.add("active");
    }
  }

  // Draggable Floating Terminal Window Handler
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  const terminalHeader = document.querySelector(".terminal-header");

  terminalHeader.addEventListener("mousedown", (e) => {
    // Only drag when in floating mode
    if (terminalDrawer.classList.contains("mode-split") || terminalDrawer.classList.contains("mode-bottom")) {
      return;
    }
    if (e.target.closest(".traffic-light") || e.target.closest(".mode-btn")) return;

    isDragging = true;
    const rect = terminalDrawer.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    terminalHeader.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    let left = e.clientX - dragOffsetX;
    let top = e.clientY - dragOffsetY;

    // Keep within viewport bounds
    const maxLeft = window.innerWidth - terminalDrawer.offsetWidth;
    const maxTop = window.innerHeight - terminalDrawer.offsetHeight;

    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(64, Math.min(top, maxTop));

    terminalDrawer.style.left = `${left}px`;
    terminalDrawer.style.top = `${top}px`;
    terminalDrawer.style.bottom = "auto";
    terminalDrawer.style.right = "auto";
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      terminalHeader.style.cursor = "grab";
    }
  });

  // Event Listeners for Header & Layout Buttons
  document.getElementById("btn-toggle-terminal").addEventListener("click", toggleTerminal);
  document.getElementById("btn-split-screen").addEventListener("click", () => setTerminalMode("side"));
  document.getElementById("btn-mode-side").addEventListener("click", () => setTerminalMode("side"));
  document.getElementById("btn-mode-bottom").addEventListener("click", () => setTerminalMode("bottom"));
  document.getElementById("btn-mode-float").addEventListener("click", () => setTerminalMode("float"));

  document.getElementById("close-terminal").addEventListener("click", () => terminalDrawer.classList.add("hidden"));
  document.getElementById("minimize-terminal").addEventListener("click", () => terminalDrawer.classList.toggle("minimized"));

  // Search Modal (Ctrl + K)
  document.getElementById("btn-search").addEventListener("click", openSearchModal);
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === "Escape") {
      searchModal.classList.remove("active");
    }
  });

  function openSearchModal() {
    searchModal.classList.add("active");
    searchInput.focus();
  }

  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove("active");
    }
  });

  // Start Application with Dynamic Manifest
  loadManifestAndBuildNav();
});
