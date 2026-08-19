/* ==========================================================================
   DevOps Handbook - Main Application Logic & Terminal Interoperability
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

  // Navigation Items Map (All Modules & Roadmaps)
  const navTree = [
    {
      section: "🌟 Overviews & Plans",
      items: [
        { title: "Master Senior Roadmap", path: "ROADMAP.md", badge: "Master", level: "5yoe" },
        { title: "Next Direction & Features", path: "NEXT_DIRECTION.md", badge: "Plan", level: "2yoe" }
      ]
    },
    {
      section: " Module 01: Linux Administration",
      items: [
        { title: "01. Linux Basics", path: "01-Linux/01-linux-basics/ls.md" },
        { title: "02. Navigation", path: "01-Linux/02-navigation-commands/cd.md" },
        { title: "03. File & Directory Ops", path: "01-Linux/03-file-directory-management/mkdir.md" },
        { title: "04. File Viewing & Editing", path: "01-Linux/04-file-viewing-editing/cat.md" },
        { title: "07. Text Processing (Grep)", path: "01-Linux/07-text-processing/grep.md" },
        { title: "08. Process Management", path: "01-Linux/08-process-management/ps.md" },
        { title: "13. File Permissions", path: "01-Linux/13-file-permissions/chmod.md" },
        { title: "15. Remote Access (SSH)", path: "01-Linux/15-remote-access/ssh.md" },
        { title: "16. Compression (Tar)", path: "01-Linux/16-compression-archiving/tar.md" }
      ]
    },
    {
      section: "🐙 Module 02: Git & GitHub",
      items: [
        { title: "Git & GitHub (2 YOE Core)", path: "02-Git-GitHub/2-yoe-git-and-github-scope.md", badge: "2 YOE", level: "2yoe" },
        { title: "Git & GitHub (5+ YOE Senior)", path: "02-Git-GitHub/git-and-github-roadmap.md", badge: "5+ YOE", level: "5yoe" }
      ]
    },
    {
      section: "🐳 Module 03: Docker & Compose",
      items: [
        { title: "Docker Scope (2 YOE Core)", path: "03-Docker/2-yoe-docker-scope.md", badge: "2 YOE", level: "2yoe" },
        { title: "Docker Scope (5+ YOE Senior)", path: "03-Docker/docker-and-docker-compose.md", badge: "5+ YOE", level: "5yoe" }
      ]
    },
    {
      section: "🏗️ Module 07: Terraform IaC",
      items: [
        { title: "Terraform Scope (2 YOE Core)", path: "07-Terraform/2-yoe-terraform-scope.md", badge: "2 YOE", level: "2yoe" },
        { title: "Terraform Scope (5+ YOE Senior)", path: "07-Terraform/terraform.md", badge: "5+ YOE", level: "5yoe" }
      ]
    }
  ];

  // Configure Marked Options for Code Blocks
  if (window.marked) {
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }

  // Build Sidebar Nav UI
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
        
        let badgeHtml = "";
        if (item.badge) {
          const badgeClass = item.level === "2yoe" ? "badge-2yoe" : "badge-5yoe";
          badgeHtml = `<span class="nav-badge ${badgeClass}">${item.badge}</span>`;
        }
        
        a.innerHTML = `<span>${item.title}</span> ${badgeHtml}`;
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
        throw new Error(`Failed to load ${filePath}`);
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
          <h2>⚠️ Unable to load document</h2>
          <p style="margin-top: 8px;">File path: <code>${filePath}</code></p>
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

  // Event Listeners for Header Buttons
  document.getElementById("btn-toggle-terminal").addEventListener("click", toggleTerminal);
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

  // Initial Setup
  renderSidebar();
  loadMarkdownFile("ROADMAP.md");
});
