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

  // Dynamically Load Manifest & Build 2-Tier Dynamic Navigation Tree
  async function loadManifestAndBuildNav() {
    try {
      if (window.HANDBOOK_MANIFEST && Array.isArray(window.HANDBOOK_MANIFEST)) {
        allFilesList = window.HANDBOOK_MANIFEST;
      } else {
        const response = await fetch('assets/data/manifest.json');
        if (!response.ok) {
          throw new Error('Could not load assets/data/manifest.json');
        }
        allFilesList = await response.json();
      }

      // Group paths dynamically by Top-Level Module -> Subcategory Folder -> Files
      const modulesMap = {};

      allFilesList.forEach(path => {
        if (path === 'README.md') {
          const modName = '📖 Handbook Overview';
          if (!modulesMap[modName]) modulesMap[modName] = {};
          if (!modulesMap[modName]['Overview Docs']) modulesMap[modName]['Overview Docs'] = [];
          modulesMap[modName]['Overview Docs'].push({ title: 'DevOps Handbook Overview', path });
          return;
        }

        const parts = path.split('/');
        let moduleFolder = parts[0];
        let categoryFolder = parts.length > 2 ? parts[1] : 'General';
        let fileName = parts[parts.length - 1];
        let itemTitle = fileName.replace(/\.md$/, '');

        // Friendly Module Header Titles
        let moduleTitle = formatTitle(moduleFolder);
        if (moduleFolder.startsWith('01-Linux')) moduleTitle = '🐧 Module 01: Linux Administration';
        else if (moduleFolder.startsWith('02-Git')) moduleTitle = '🐙 Module 02: Git & GitHub';
        else if (moduleFolder.startsWith('03-Docker')) moduleTitle = '🐳 Module 03: Docker & Compose';
        else if (moduleFolder.startsWith('07-Terraform')) moduleTitle = '🏗️ Module 07: Terraform IaC';

        const categoryTitle = formatTitle(categoryFolder);

        if (!modulesMap[moduleTitle]) modulesMap[moduleTitle] = {};
        if (!modulesMap[moduleTitle][categoryTitle]) modulesMap[moduleTitle][categoryTitle] = [];

        modulesMap[moduleTitle][categoryTitle].push({ title: itemTitle, path });
      });

      // Convert nested map to navTree array
      navTree = Object.keys(modulesMap).map(modTitle => ({
        moduleTitle: modTitle,
        subgroups: Object.keys(modulesMap[modTitle]).map(catTitle => ({
          section: catTitle,
          items: modulesMap[modTitle][catTitle]
        }))
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

  // Render Dynamic 2-Tier Cascading Sidebar Navigation
  function renderSidebar() {
    navList.innerHTML = "";

    navTree.forEach((mod, modIdx) => {
      const moduleGroup = document.createElement("div");
      moduleGroup.className = "sidebar-module-group";

      // Tier 1: Master Module Header (e.g. 🐧 Module 01: Linux Administration)
      const moduleHeader = document.createElement("div");
      moduleHeader.className = "sidebar-module-title collapsible";
      moduleHeader.innerHTML = `
        <span>📁 ${mod.moduleTitle}</span>
        <span class="chevron">▶</span>
      `;

      // Tier 1 Body
      const moduleBody = document.createElement("div");
      moduleBody.className = "sidebar-module-body collapsed";

      // Auto-expand Overview & Linux by default
      if (modIdx === 0 || mod.moduleTitle.includes("Linux") || mod.moduleTitle.includes("Overview")) {
        moduleBody.classList.remove("collapsed");
        moduleHeader.classList.add("expanded");
      }

      moduleHeader.addEventListener("click", () => {
        const isCollapsed = moduleBody.classList.toggle("collapsed");
        moduleHeader.classList.toggle("expanded", !isCollapsed);
      });

      // Tier 2: Sub-category folders inside Module
      mod.subgroups.forEach((group, groupIdx) => {
        const categoryGroup = document.createElement("div");
        categoryGroup.className = "sidebar-category-group";

        const categoryHeader = document.createElement("div");
        categoryHeader.className = "sidebar-category-title collapsible";
        categoryHeader.innerHTML = `
          <span>📂 ${group.section}</span>
          <span class="chevron">▶</span>
        `;

        const categoryBody = document.createElement("div");
        categoryBody.className = "sidebar-category-body collapsed";

        // Expand first sub-category by default
        if (groupIdx === 0) {
          categoryBody.classList.remove("collapsed");
          categoryHeader.classList.add("expanded");
        }

        categoryHeader.addEventListener("click", (e) => {
          e.stopPropagation();
          const isCollapsed = categoryBody.classList.toggle("collapsed");
          categoryHeader.classList.toggle("expanded", !isCollapsed);
        });

        // Tier 3: Document File items
        group.items.forEach(item => {
          const a = document.createElement("a");
          a.className = "nav-item";
          a.dataset.path = item.path;
          a.innerHTML = `<span>📄 ${item.title}</span>`;
          a.addEventListener("click", (e) => {
            e.stopPropagation();
            loadMarkdownFile(item.path);
          });
          categoryBody.appendChild(a);
        });

        categoryGroup.appendChild(categoryHeader);
        categoryGroup.appendChild(categoryBody);
        moduleBody.appendChild(categoryGroup);
      });

      moduleGroup.appendChild(moduleHeader);
      moduleGroup.appendChild(moduleBody);
      navList.appendChild(moduleGroup);
    });
  }

  // Fetch & Load Markdown Content into Canvas
  async function loadMarkdownFile(filePath) {
    try {
      // Highlight active item & auto-expand both module & subfolder
      document.querySelectorAll(".nav-item").forEach(el => {
        const isActive = el.dataset.path === filePath;
        el.classList.toggle("active", isActive);
        if (isActive) {
          let curr = el;
          while (curr && curr !== navList) {
            if (curr.classList.contains("sidebar-category-body") || curr.classList.contains("sidebar-module-body")) {
              curr.classList.remove("collapsed");
              if (curr.previousElementSibling) curr.previousElementSibling.classList.add("expanded");
            }
            curr = curr.parentElement;
          }
        }
      });

      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`File '${filePath}' could not be fetched.`);
      }
      const rawText = await response.text();

      // Render Markdown HTML
      const renderedHtml = window.marked ? marked.parse(rawText) : `<pre>${rawText}</pre>`;
      markdownBody.innerHTML = renderedHtml;

      // Intercept Inline Markdown Links & Enhance Code Blocks
      interceptInlineLinks(filePath);
      enhanceCodeBlocks();
      
      // Scroll to top
      document.querySelector(".content-canvas").scrollTop = 0;
    } catch (err) {
      const isFileProtocol = window.location.protocol === 'file:';
      
      markdownBody.innerHTML = `
        <div style="padding: 40px; text-align: center; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #ff6b35; margin-bottom: 12px;">📌 Local File Protocol (${window.location.protocol}) Notice</h2>
          <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
            ${isFileProtocol ? 
              `Browsers (Chrome/Edge/Firefox) block direct <code>fetch()</code> requests when double-clicking HTML files via <code>file:///</code> for security reasons.` : 
              `Unable to fetch document: <code>${filePath}</code>`}
          </p>
          ${isFileProtocol ? `
            <div style="background: #111113; border: 1px solid #333; padding: 20px; border-radius: 8px; text-align: left; margin-top: 20px;">
              <h4 style="color: #38bdf8; margin-bottom: 10px;">💡 Quick 1-Second Fix for Local Testing:</h4>
              <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 8px;">Run a quick local web server from your project folder:</p>
              <pre style="background: #000; padding: 10px 14px; border-radius: 6px; color: #4af626; font-family: monospace; font-size: 13px;">npx serve .</pre>
              <p style="color: #94a3b8; font-size: 13px; margin-top: 10px;">Or open VSCode and click <strong>"Go Live" (Live Server extension)</strong>!</p>
            </div>
          ` : ''}
        </div>
      `;
    }
  }

  // Resolve Relative Markdown Links (e.g. '../02-navigation-commands/cd.md' -> '01-Linux/02-navigation-commands/cd.md')
  function resolveRelativePath(currentPath, targetHref) {
    if (targetHref.startsWith("http://") || targetHref.startsWith("https://") || targetHref.startsWith("mailto:") || targetHref.startsWith("#")) {
      return targetHref;
    }

    let cleanTarget = targetHref.replace(/^\.\//, '');
    const currentParts = currentPath.split('/');
    currentParts.pop(); // Remove filename to leave directory path

    const targetParts = cleanTarget.split('/');

    for (let part of targetParts) {
      if (part === '..') {
        if (currentParts.length > 0) currentParts.pop();
      } else if (part !== '.' && part !== '') {
        currentParts.push(part);
      }
    }

    let resolved = currentParts.join('/');

    // If resolved path does not end in .md, try matching tracked files
    if (!resolved.endsWith('.md') && allFilesList && allFilesList.length > 0) {
      const folderMatch = allFilesList.find(f => f.startsWith(resolved + '/'));
      if (folderMatch) {
        return folderMatch;
      }
    }

    return resolved;
  }

  // Intercept Clicks on Inline Links inside Markdown Body
  function interceptInlineLinks(currentFilePath) {
    const links = markdownBody.querySelectorAll("a[href]");
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;

      if (href.startsWith("http://") || href.startsWith("https://")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      } else if (!href.startsWith("#")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const resolvedPath = resolveRelativePath(currentFilePath, href);
          loadMarkdownFile(resolvedPath);
        });
      }
    });
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

  const contentCanvas = document.querySelector(".content-canvas");

  // Dynamically Adjust Reading Content Canvas Padding so text is never covered by Split Terminal
  function updateCanvasPadding() {
    if (!contentCanvas) return;
    
    if (terminalDrawer.classList.contains("hidden") || terminalDrawer.classList.contains("minimized")) {
      contentCanvas.style.paddingRight = "";
      contentCanvas.style.paddingBottom = "";
      return;
    }

    if (terminalDrawer.classList.contains("mode-split")) {
      const termWidth = terminalDrawer.offsetWidth;
      contentCanvas.style.paddingRight = `${termWidth + 24}px`;
      contentCanvas.style.paddingBottom = "";
    } else if (terminalDrawer.classList.contains("mode-bottom")) {
      const termHeight = terminalDrawer.offsetHeight;
      contentCanvas.style.paddingBottom = `${termHeight + 24}px`;
      contentCanvas.style.paddingRight = "";
    } else {
      contentCanvas.style.paddingRight = "";
      contentCanvas.style.paddingBottom = "";
    }
  }

  // Terminal Layout Mode Switcher (Side-by-side Split, Bottom Dock, Floating)
  function setTerminalMode(mode) {
    // Completely clear inline style properties to allow CSS layout modes to take effect
    terminalDrawer.style.removeProperty("left");
    terminalDrawer.style.removeProperty("top");
    terminalDrawer.style.removeProperty("right");
    terminalDrawer.style.removeProperty("bottom");
    terminalDrawer.style.removeProperty("width");
    terminalDrawer.style.removeProperty("height");
    terminalDrawer.style.removeProperty("transition");

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

    setTimeout(updateCanvasPadding, 30);
  }

  // Draggable Floating Terminal Window Handler (Mouse + Touch Support)
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  const terminalHeader = document.querySelector(".terminal-header");

  function startDrag(clientX, clientY, target) {
    if (terminalDrawer.classList.contains("mode-split") || terminalDrawer.classList.contains("mode-bottom")) {
      return;
    }
    if (target.closest(".traffic-light") || target.closest(".mode-btn")) return;

    isDragging = true;
    terminalDrawer.style.transition = "none"; // Disable smooth transition during active dragging

    const rect = terminalDrawer.getBoundingClientRect();
    dragOffsetX = clientX - rect.left;
    dragOffsetY = clientY - rect.top;

    terminalHeader.style.cursor = "grabbing";
  }

  function moveDrag(clientX, clientY) {
    if (!isDragging) return;

    let left = clientX - dragOffsetX;
    let top = clientY - dragOffsetY;

    // Keep within viewport bounds
    const maxLeft = window.innerWidth - terminalDrawer.offsetWidth;
    const maxTop = window.innerHeight - terminalDrawer.offsetHeight;

    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(64, Math.min(top, maxTop));

    terminalDrawer.style.left = `${left}px`;
    terminalDrawer.style.top = `${top}px`;
    terminalDrawer.style.bottom = "auto";
    terminalDrawer.style.right = "auto";
  }

  // Resizable Split Pane Handle Logic
  const resizer = document.getElementById("terminal-resizer");
  let isResizing = false;

  if (resizer) {
    resizer.addEventListener("mousedown", (e) => {
      isResizing = true;
      resizer.classList.add("resizing");
      terminalDrawer.style.transition = "none";
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isResizing) return;

      if (terminalDrawer.classList.contains("mode-split")) {
        // Horizontal resize (Left/Right)
        const newWidth = window.innerWidth - e.clientX;
        const minWidth = 300;
        const maxWidth = window.innerWidth - 340; // leave sidebar & canvas readable

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          terminalDrawer.style.setProperty("width", `${newWidth}px`, "important");
          updateCanvasPadding();
        }
      } else if (terminalDrawer.classList.contains("mode-bottom")) {
        // Vertical resize (Up/Down)
        const newHeight = window.innerHeight - e.clientY;
        const minHeight = 140;
        const maxHeight = window.innerHeight - 100;

        if (newHeight >= minHeight && newHeight <= maxHeight) {
          terminalDrawer.style.setProperty("height", `${newHeight}px`, "important");
          updateCanvasPadding();
        }
      }
    });

    document.addEventListener("mouseup", () => {
      if (isResizing) {
        isResizing = false;
        resizer.classList.remove("resizing");
        terminalDrawer.style.transition = "";
        document.body.style.userSelect = "";
        updateCanvasPadding();
      }
    });
  }

  function stopDrag() {
    if (isDragging) {
      isDragging = false;
      terminalDrawer.style.transition = ""; // Restore CSS transition
      terminalHeader.style.cursor = "grab";
    }
  }

  // Mouse Listeners
  terminalHeader.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY, e.target));
  document.addEventListener("mousemove", (e) => moveDrag(e.clientX, e.clientY));
  document.addEventListener("mouseup", stopDrag);

  // Touch Listeners for Mobile/Tablet Deployment
  terminalHeader.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY, e.target);
    }
  }, { passive: true });

  document.addEventListener("touchmove", (e) => {
    if (isDragging && e.touches && e.touches.length === 1) {
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  document.addEventListener("touchend", stopDrag);

  // Event Listeners for Header & Layout Buttons
  document.getElementById("btn-toggle-terminal").addEventListener("click", toggleTerminal);
  document.getElementById("btn-split-screen").addEventListener("click", () => setTerminalMode("side"));
  document.getElementById("btn-mode-side").addEventListener("click", () => setTerminalMode("side"));
  document.getElementById("btn-mode-bottom").addEventListener("click", () => setTerminalMode("bottom"));
  document.getElementById("btn-mode-float").addEventListener("click", () => setTerminalMode("float"));

  document.getElementById("close-terminal").addEventListener("click", () => {
    terminalDrawer.classList.add("hidden");
    updateCanvasPadding();
  });
  document.getElementById("minimize-terminal").addEventListener("click", () => {
    terminalDrawer.classList.toggle("minimized");
    updateCanvasPadding();
  });

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
