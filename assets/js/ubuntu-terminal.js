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

    let isSudo = false;
    let parts = rawCmd.split(/\s+/);
    if (parts[0].toLowerCase() === "sudo") {
      isSudo = true;
      parts = parts.slice(1);
    }

    if (parts.length === 0) {
      return "usage: sudo command (e.g. sudo apt update, sudo systemctl restart nginx)";
    }

    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // List of Privileged Linux Commands requiring sudo
    const privilegedCommands = ["apt", "apt-get", "systemctl", "service", "useradd", "userdel", "usermod", "groupadd", "groupdel", "groupmod", "chown", "reboot", "shutdown"];

    if (privilegedCommands.includes(cmd) && !isSudo) {
      if (cmd === "apt" || cmd === "apt-get") {
        return `E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)\nE: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?`;
      }
      if (cmd === "systemctl" || cmd === "service") {
        return `Failed to connect to bus: Access denied (are you root? Try running with 'sudo').`;
      }
      return `bash: ${cmd}: Permission denied (are you root? Try running with 'sudo ${rawCmd}').`;
    }

    switch (cmd) {
      case "pwd":
        return this.currentPath;

      case "whoami":
        return isSudo ? "root" : "ubuntu";

      case "id":
        return isSudo
          ? "uid=0(root) gid=0(root) groups=0(root)"
          : "uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu),4(adm),27(sudo),999(docker)";

      case "uname":
        if (args.includes("-a")) {
          return "Linux ubuntu-devops 6.5.0-28-generic #29~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC x86_64 x86_64 GNU/Linux";
        }
        return "Linux";

      case "clear":
        return "__CLEAR__";

      case "history":
        return this.history.map((c, i) => `  ${i + 1}  ${c}`).join("\n");

      case "vim":
      case "vi": {
        const fileArg = args[0] || "untitled.txt";
        const filePath = this.resolvePath(fileArg);
        return `__VIM__:${filePath}`;
      }

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
  402 pts/0    00:00:05 nginx
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

      case "kill":
      case "pkill": {
        if (!args[0]) return `${cmd}: missing PID or process name`;
        const target = args.find(a => !a.startsWith("-")) || args[0];
        return `[SIGTERM] Sent termination signal to process ${target}.`;
      }

      case "free":
        return `               total        used        free      shared  buff/cache   available
Mem:           7.8Gi       2.1Gi       3.3Gi       120Mi       2.4Gi       5.4Gi
Swap:          2.0Gi        0B         2.0Gi`;

      case "df":
        return `Filesystem     1K-blocks      Used Available Use% Mounted on
/dev/sda1       51474024  19421008  29410188  40% /
tmpfs             4070720      1240   4069480   1% /run
/dev/sda2         204800     14200    190600   7% /boot/efi`;

      case "du": {
        const targetArg = args.find(a => !a.startsWith("-")) || ".";
        const entry = this.fileSystem[this.resolvePath(targetArg)];
        if (!entry) return `du: cannot access '${targetArg}': No such file or directory`;
        return `4.0K\t${targetArg}`;
      }

      case "uptime":
        return ` 01:15:22 up 2 days,  4:17,  1 user,  load average: 0.12, 0.09, 0.05`;

      case "systemctl": {
        if (!args[0]) return "systemctl: missing command (e.g. status, start, stop, restart)";
        const subCmd = args[0];
        const service = args[1] || "nginx";
        if (subCmd === "status") {
          return `● ${service}.service - High performance web server
     Loaded: loaded (/lib/systemd/system/${service}.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2026-08-20 12:00:00 UTC; 2 days ago
   Main PID: 402 (nginx)
      Tasks: 2 (limit: 9482)
     Memory: 14.2M
        CPU: 5.10s`;
        }
        return `[OK] Executed 'systemctl ${subCmd} ${service}'.`;
      }

      case "curl": {
        const url = args.find(a => !a.startsWith("-")) || "http://localhost:8080";
        return `HTTP/1.1 200 OK
Content-Type: application/json
Date: Sat, 22 Aug 2026 22:45:00 GMT

{
  "status": "UP",
  "service": "DevOps Microservice",
  "port": 8080,
  "environment": "production"
}`;
      }

      case "ping": {
        const host = args.find(a => !a.startsWith("-")) || "google.com";
        return `PING ${host} (142.250.190.46) 56(84) bytes of data.
64 bytes from 142.250.190.46: icmp_seq=1 ttl=117 time=14.2 ms
64 bytes from 142.250.190.46: icmp_seq=2 ttl=117 time=13.8 ms
64 bytes from 142.250.190.46: icmp_seq=3 ttl=117 time=14.5 ms
--- ${host} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms`;
      }

      case "netstat":
      case "ss":
      case "lsof":
        return `Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      1042/python3
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      402/nginx
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      890/sshd`;

      case "ip":
      case "ifconfig":
        return `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0`;

      case "find": {
        const pattern = args.find(a => !a.startsWith("-") && a !== ".") || "";
        const allPaths = Object.keys(this.fileSystem);
        if (!pattern) return allPaths.join("\n");
        return allPaths.filter(p => p.includes(pattern)).join("\n");
      }

      case "wc": {
        if (!args[0]) return "wc: missing file operand";
        const filePath = this.resolvePath(args[0]);
        const entry = this.fileSystem[filePath];
        if (!entry) return `wc: ${args[0]}: No such file or directory`;
        const lines = entry.content.split("\n").length;
        const words = entry.content.trim().split(/\s+/).length;
        return `  ${lines}  ${words}  ${entry.size || '100B'} ${args[0]}`;
      }

      case "stat": {
        if (!args[0]) return "stat: missing operand";
        const filePath = this.resolvePath(args[0]);
        const entry = this.fileSystem[filePath];
        if (!entry) return `stat: cannot stat '${args[0]}': No such file or directory`;
        return `  File: ${args[0]}
  Size: ${entry.size || '4096B'}      Blocks: 8          IO Block: 4096   ${entry.type || 'file'}
Device: 801h/2049d  Inode: 104258      Links: 1
Access: (${entry.mode || '-rw-r--r--'})  Uid: (1000/ubuntu)   Gid: (1000/ubuntu)
Access: 2026-08-22 01:00:00.000000000 +0000
Modify: 2026-08-22 01:00:00.000000000 +0000`;
      }

      case "useradd": {
        if (!args[0]) return "useradd: missing username argument";
        const username = args.find(a => !a.startsWith("-")) || args[0];
        return `[ROOT OK] Created new system user '${username}' (home: /home/${username}, uid: 1001).`;
      }

      case "userdel": {
        if (!args[0]) return "userdel: missing username argument";
        const username = args.find(a => !a.startsWith("-")) || args[0];
        return `[ROOT OK] Removed user '${username}'.`;
      }

      case "usermod": {
        if (!args[0]) return "usermod: missing argument";
        return `[ROOT OK] Updated user attributes.`;
      }

      case "groupadd": {
        if (!args[0]) return "groupadd: missing group name";
        const groupname = args.find(a => !a.startsWith("-")) || args[0];
        return `[ROOT OK] Created new group '${groupname}' (gid: 1001).`;
      }

      case "groupdel": {
        if (!args[0]) return "groupdel: missing group name";
        const groupname = args.find(a => !a.startsWith("-")) || args[0];
        return `[ROOT OK] Removed group '${groupname}'.`;
      }

      case "chown": {
        if (args.length < 2) return "Usage: chown [OWNER][:GROUP] [FILE]";
        const owner = args[0];
        const filePath = this.resolvePath(args[1]);
        const entry = this.fileSystem[filePath];
        if (!entry) return `chown: cannot access '${args[1]}': No such file or directory`;
        entry.owner = owner;
        return `[ROOT OK] Changed ownership of '${args[1]}' to '${owner}'.`;
      }

      case "apt":
      case "apt-get": {
        const sub = args[0] || "update";
        if (sub === "update") {
          return `Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]
Get:3 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Reading package lists... Done
Building dependency tree... Done
All packages are up to date.`;
        }
        return `Reading package lists... Done
Building dependency tree... Done
0 upgraded, 1 newly installed, 0 to remove.`;
      }

      case "help":
        return `📌 Ubuntu Terminal Simulator — Supported Linux Commands:

  Navigation:       pwd, ls, cd, mkdir, touch, rm, find
  File Inspection:  cat, head, tail, grep, echo, wc, stat
  Permissions:      chmod, whoami, id, uname
  Networking:       curl, ping, netstat, ss, lsof, ip, ifconfig
  System & Memory:  df, du, free, uptime, systemctl, ps, top, kill, apt
  Terminal Utility: clear, history, help

💡 Tip: Click "▶ Run in Terminal" on any command block in the handbook to execute it here automatically!`;

      default:
        return `bash: ${cmd}: command not found. Type 'help' for supported commands.`;
    }
  }
}

// Export global instance
window.ubuntuTerminal = new UbuntuTerminalSimulator();
