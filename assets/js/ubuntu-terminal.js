/* ==========================================================================
   Ubuntu Terminal Simulator - In-Memory Virtual Linux Environment
   ========================================================================== */

class UbuntuTerminalSimulator {
  constructor() {
    this.currentPath = "/home/ubuntu";
    this.history = [];
    this.historyIndex = -1;
    
    // Virtual File System Structure
    this.fileSystem = {
      "/": { type: "dir", children: ["home", "var", "etc", "usr", "tmp"] },
      "/home": { type: "dir", children: ["ubuntu"] },
      "/home/ubuntu": {
        type: "dir",
        children: ["app.py", "notes.txt", "script.sh", "logs"]
      },
      "/home/ubuntu/app.py": {
        type: "file",
        mode: "-rw-r--r--",
        owner: "ubuntu",
        size: "142B",
        content: `#!/usr/bin/env python3
import time

print("Starting DevOps Microservice...")
time.sleep(1)
print("Listening on 0.0.0.0:8080")
`
      },
      "/home/ubuntu/notes.txt": {
        type: "file",
        mode: "-rw-r--r--",
        owner: "ubuntu",
        size: "188B",
        content: `DevOps Handbook - Linux Command Reference:
1. Use 'grep' to search error patterns in /var/log/syslog
2. Use 'chmod +x' to make shell scripts executable
3. Check system memory with 'free -h' and process list with 'ps aux'
`
      },
      "/home/ubuntu/script.sh": {
        type: "file",
        mode: "-rwxr-xr-x",
        owner: "ubuntu",
        size: "115B",
        content: `#!/bin/bash
echo "[INFO] Running deployment automation..."
echo "[SUCCESS] Container deployed to production cluster."
`
      },
      "/home/ubuntu/logs": {
        type: "dir",
        children: ["app.log"]
      },
      "/home/ubuntu/logs/app.log": {
        type: "file",
        mode: "-rw-r--r--",
        owner: "ubuntu",
        size: "95B",
        content: `2026-08-20 01:00:00 [INFO] Worker process started
2026-08-20 01:05:00 [INFO] Healthcheck OK
`
      },
      "/var": { type: "dir", children: ["log"] },
      "/var/log": {
        type: "dir",
        children: ["syslog", "auth.log", "nginx"]
      },
      "/var/log/syslog": {
        type: "file",
        mode: "-rw-r-----",
        owner: "root",
        size: "420B",
        content: `Aug 20 01:00:01 ubuntu systemd[1]: Starting System Logging Service...
Aug 20 01:00:05 ubuntu nginx[402]: Server started on port 80 (http)
Aug 20 01:02:14 ubuntu app[1042]: ERROR Failed to connect to database at 127.0.0.1:5432
Aug 20 01:03:00 ubuntu app[1042]: INFO Retrying connection in 5s...
Aug 20 01:03:05 ubuntu app[1042]: SUCCESS Database connection established successfully!
Aug 20 01:08:12 ubuntu systemd[1]: Started Periodic Background Cleanup Job.
`
      },
      "/var/log/auth.log": {
        type: "file",
        mode: "-rw-r-----",
        owner: "root",
        size: "210B",
        content: `Aug 20 00:50:11 ubuntu sshd[2041]: Accepted publickey for ubuntu from 192.168.1.50 port 52344 ssh2
Aug 20 00:55:00 ubuntu sudo: ubuntu : TTY=pts/0 ; PWD=/home/ubuntu ; USER=root ; COMMAND=/bin/systemctl restart nginx
`
      },
      "/etc": {
        type: "dir",
        children: ["os-release", "passwd", "hosts", "resolv.conf"]
      },
      "/etc/os-release": {
        type: "file",
        mode: "-rw-r--r--",
        owner: "root",
        size: "380B",
        content: `NAME="Ubuntu"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 22.04.3 LTS"
VERSION_ID="22.04"
HOME_URL="https://www.ubuntu.com/"
`
      },
      "/etc/passwd": {
        type: "file",
        mode: "-rw-r--r--",
        owner: "root",
        size: "180B",
        content: `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
ubuntu:x:1000:1000:Ubuntu User:/home/ubuntu:/bin/bash
`
      },
      "/etc/hosts": {
        type: "file",
        mode: "-rw-r--r--",
        owner: "root",
        size: "120B",
        content: `127.0.0.1   localhost ubuntu-devops
::1         localhost ip6-localhost ip6-loopback
`
      },
      "/tmp": { type: "dir", children: [] }
    };
  }

  // Resolve absolute path from relative or absolute input
  resolvePath(inputPath) {
    if (!inputPath || inputPath === ".") return this.currentPath;
    if (inputPath === "~" || inputPath.startsWith("~/")) {
      inputPath = inputPath.replace("~", "/home/ubuntu");
    }
    
    let target = inputPath.startsWith("/")
      ? inputPath
      : (this.currentPath === "/" ? "/" + inputPath : `${this.currentPath}/${inputPath}`);

    // Normalize path (handle .. and .)
    const parts = target.split("/").filter(Boolean);
    const resolvedParts = [];
    for (const part of parts) {
      if (part === "..") {
        resolvedParts.pop();
      } else if (part !== ".") {
        resolvedParts.push(part);
      }
    }
    return "/" + resolvedParts.join("/");
  }

  // Execute terminal command and return formatted text output
  executeCommand(commandStr) {
    const rawCmd = commandStr.trim();
    if (!rawCmd) return "";

    this.history.push(rawCmd);
    this.historyIndex = this.history.length;

    const parts = rawCmd.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "pwd":
        return this.currentPath;

      case "whoami":
        return "ubuntu";

      case "id":
        return "uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu),4(adm),27(sudo),999(docker)";

      case "uname":
        if (args.includes("-a")) {
          return "Linux ubuntu-devops 6.5.0-28-generic #29~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC x86_64 x86_64 GNU/Linux";
        }
        return "Linux";

      case "clear":
        return "__CLEAR__";

      case "history":
        return this.history.map((c, i) => `  ${i + 1}  ${c}`).join("\n");

      case "cd": {
        const targetPath = this.resolvePath(args[0] || "/home/ubuntu");
        const entry = this.fileSystem[targetPath];
        if (!entry) {
          return `bash: cd: ${args[0]}: No such file or directory`;
        }
        if (entry.type !== "dir") {
          return `bash: cd: ${args[0]}: Not a directory`;
        }
        this.currentPath = targetPath;
        return "";
      }

      case "ls": {
        let pathArg = args.find(a => !a.startsWith("-")) || ".";
        const isLong = args.some(a => a.includes("l"));
        const showAll = args.some(a => a.includes("a"));

        const targetPath = this.resolvePath(pathArg);
        const entry = this.fileSystem[targetPath];

        if (!entry) {
          return `ls: cannot access '${pathArg}': No such file or directory`;
        }

        if (entry.type === "file") {
          return isLong ? `${entry.mode} 1 ubuntu ubuntu ${entry.size} Aug 20 01:00 ${targetPath.split("/").pop()}` : targetPath.split("/").pop();
        }

        let items = [...entry.children];
        if (showAll) {
          items = [".", "..", ...items];
        }

        if (!isLong) {
          return items.join("   ");
        }

        return items.map(name => {
          if (name === "." || name === "..") {
            return `drwxr-xr-x 2 ubuntu ubuntu 4096 Aug 20 01:00 ${name}`;
          }
          const itemPath = targetPath === "/" ? `/${name}` : `${targetPath}/${name}`;
          const itemNode = this.fileSystem[itemPath] || { mode: "drwxr-xr-x", size: "4096B", owner: "ubuntu", type: "dir" };
          const mode = itemNode.mode || (itemNode.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--");
          return `${mode} 1 ${itemNode.owner || 'ubuntu'} ubuntu ${itemNode.size || '4096'} Aug 20 01:00 ${name}`;
        }).join("\n");
      }

      case "cat": {
        if (!args[0]) return "cat: missing file operand";
        const filePath = this.resolvePath(args[0]);
        const entry = this.fileSystem[filePath];
        if (!entry) return `cat: ${args[0]}: No such file or directory`;
        if (entry.type === "dir") return `cat: ${args[0]}: Is a directory`;
        return entry.content;
      }

      case "head": {
        if (!args[0]) return "head: missing file operand";
        let linesCount = 10;
        let filePathArg = args[0];
        if (args[0] === "-n" && args[1]) {
          linesCount = parseInt(args[1], 10) || 10;
          filePathArg = args[2];
        }
        const filePath = this.resolvePath(filePathArg);
        const entry = this.fileSystem[filePath];
        if (!entry) return `head: cannot open '${filePathArg}': No such file or directory`;
        return entry.content.split("\n").slice(0, linesCount).join("\n");
      }

      case "tail": {
        if (!args[0]) return "tail: missing file operand";
        let linesCount = 10;
        let filePathArg = args[0];
        if (args[0] === "-n" && args[1]) {
          linesCount = parseInt(args[1], 10) || 10;
          filePathArg = args[2];
        }
        const filePath = this.resolvePath(filePathArg);
        const entry = this.fileSystem[filePath];
        if (!entry) return `tail: cannot open '${filePathArg}': No such file or directory`;
        const allLines = entry.content.split("\n");
        return allLines.slice(Math.max(allLines.length - linesCount, 0)).join("\n");
      }

      case "grep": {
        if (args.length < 2) return "Usage: grep [PATTERN] [FILE]";
        const pattern = args[0].replace(/['"]/g, '');
        const filePath = this.resolvePath(args[1]);
        const entry = this.fileSystem[filePath];
        if (!entry) return `grep: ${args[1]}: No such file or directory`;
        if (entry.type === "dir") return `grep: ${args[1]}: Is a directory`;

        const matched = entry.content.split("\n").filter(line => line.includes(pattern));
        return matched.join("\n") || "";
      }

      case "mkdir": {
        if (!args[0]) return "mkdir: missing operand";
        const dirPath = this.resolvePath(args[0]);
        if (this.fileSystem[dirPath]) return `mkdir: cannot create directory '${args[0]}': File exists`;
        
        // Add to filesystem
        this.fileSystem[dirPath] = { type: "dir", children: [] };
        
        // Add to parent
        const parentPath = dirPath.substring(0, dirPath.lastIndexOf("/")) || "/";
        if (this.fileSystem[parentPath]) {
          const name = dirPath.split("/").pop();
          this.fileSystem[parentPath].children.push(name);
        }
        return "";
      }

      case "touch": {
        if (!args[0]) return "touch: missing file operand";
        const filePath = this.resolvePath(args[0]);
        if (!this.fileSystem[filePath]) {
          this.fileSystem[filePath] = {
            type: "file",
            mode: "-rw-r--r--",
            owner: "ubuntu",
            size: "0B",
            content: ""
          };
          const parentPath = filePath.substring(0, filePath.lastIndexOf("/")) || "/";
          if (this.fileSystem[parentPath]) {
            const name = filePath.split("/").pop();
            this.fileSystem[parentPath].children.push(name);
          }
        }
        return "";
      }

      case "rm": {
        if (!args[0]) return "rm: missing operand";
        let targetArg = args.find(a => !a.startsWith("-")) || args[0];
        const targetPath = this.resolvePath(targetArg);
        if (!this.fileSystem[targetPath]) return `rm: cannot remove '${targetArg}': No such file or directory`;
        
        delete this.fileSystem[targetPath];
        const parentPath = targetPath.substring(0, targetPath.lastIndexOf("/")) || "/";
        if (this.fileSystem[parentPath]) {
          const name = targetPath.split("/").pop();
          this.fileSystem[parentPath].children = this.fileSystem[parentPath].children.filter(c => c !== name);
        }
        return "";
      }

      case "echo": {
        const fullText = args.join(" ");
        if (fullText.includes(">")) {
          const parts = fullText.split(">");
          const content = parts[0].trim().replace(/^["']|["']$/g, '');
          const filename = parts[1].trim();
          const filePath = this.resolvePath(filename);
          
          this.fileSystem[filePath] = {
            type: "file",
            mode: "-rw-r--r--",
            owner: "ubuntu",
            size: `${content.length}B`,
            content: content + "\n"
          };
          const parentPath = filePath.substring(0, filePath.lastIndexOf("/")) || "/";
          if (this.fileSystem[parentPath]) {
            const name = filePath.split("/").pop();
            if (!this.fileSystem[parentPath].children.includes(name)) {
              this.fileSystem[parentPath].children.push(name);
            }
          }
          return "";
        }
        return fullText.replace(/^["']|["']$/g, '');
      }

      case "chmod": {
        if (args.length < 2) return "Usage: chmod [MODE] [FILE]";
        const mode = args[0];
        const filePath = this.resolvePath(args[1]);
        const entry = this.fileSystem[filePath];
        if (!entry) return `chmod: cannot access '${args[1]}': No such file or directory`;
        entry.mode = mode.startsWith("+") ? `-rwxr-xr-x` : `-rw-r--r--`;
        return "";
      }

      case "ps":
        return `  PID TTY          TIME CMD
 1042 pts/0    00:00:02 python3 app.py
 1820 pts/0    00:00:00 bash
 2041 pts/0    00:00:00 ps`;

      case "top":
        return `top - 01:10:00 up 2 days,  4:12,  1 user,  load average: 0.14, 0.08, 0.05
Tasks: 112 total,   1 running, 111 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.0 sy,  0.0 ni, 96.5 id,  0.2 wa,  0.0 hi,  0.0 si
MiB Mem :   7950.4 total,   3412.1 free,   2180.5 used,   2357.8 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1042 ubuntu    20   0   84210  24120   8900 S   1.3   0.3   0:02.14 python3
  402 root      20   0   14500   4100   3200 S   0.3   0.1   0:05.10 nginx
`;

      case "help":
        return `📌 Ubuntu Terminal Simulator — Supported Linux Commands:

  Navigation:      pwd, ls, cd, mkdir, touch, rm
  File Inspection: cat, head, tail, grep, echo
  Permissions:     chmod, whoami, id, uname
  Process & System: ps, top, clear, history, help

💡 Tip: Click "▶ Run in Terminal" on any command block in the handbook to execute it here automatically!`;

      default:
        return `bash: ${cmd}: command not found. Type 'help' for supported commands.`;
    }
  }
}

// Export global instance
window.ubuntuTerminal = new UbuntuTerminalSimulator();
