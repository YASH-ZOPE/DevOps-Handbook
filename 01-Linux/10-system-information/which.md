# which Command (Locate Executable Path) | Linux Command for Beginners

Learn how to use the Linux which command to locate command executable paths in your system PATH with simple examples and DevOps use cases.

---

## What is this command?

The Linux `which` command displays the full file path of executable binaries located in your system `$PATH` environment variable.

---

## Why do we use this command?

We use `which` to check where a program is installed and verify if a command (like `python3`, `git`, or `docker`) is available in your shell environment.

---

## Syntax

```bash
which [options] command_name
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-a` | Displays all matching executable paths in PATH, not just the first one. |
| `--help` | Displays usage instructions. |
| `--version` | Displays version details. |

---

## Examples

### Example 1: Locate the path of Python 3 executable

Run `which python3` to find the exact binary location of Python.

```bash
ubuntu@ip-172-31-14-151:~$ which python3
```

### Output

```bash
/usr/bin/python3
```

- **What you typed**: You typed `which python3` and pressed Enter.
- **Why you typed it**: You wanted to check where the `python3` binary is installed on your server.
- **What happened**: Linux searched your `$PATH` and returned `/usr/bin/python3`.

---

### Example 2: Locate Git executable path

Run `which git` to verify where Git is installed.

```bash
ubuntu@ip-172-31-14-151:~$ which git
```

### Output

```bash
/usr/bin/git
```

- **What you typed**: You passed `git` as the command target.
- **Why you typed it**: You needed the full file path to configure a CI/CD build agent tool.
- **What happened**: Linux returned `/usr/bin/git`.

---

### Example 3: Find all matching paths for a command

Run `which -a node` to check if multiple Node.js binaries exist in PATH.

```bash
ubuntu@ip-172-31-14-151:~$ which -a node
```

### Output

```bash
/usr/local/bin/node
/usr/bin/node
```

- **What you typed**: You added `-a` (all) to list every matching path.
- **Why you typed it**: You wanted to check if multiple installed versions of Node exist in different folders.
- **What happened**: Linux returned both binary paths found in your `$PATH`.

---

### Example 4: Verify if Docker is installed

Run `which docker` inside a setup script to check tool availability.

```bash
ubuntu@ip-172-31-14-151:~$ which docker
```

### Output

```bash
/usr/bin/docker
```

- **What you typed**: You ran `which docker`.
- **Why you typed it**: You wanted to check if Docker is installed before running container commands.
- **What happened**: Linux printed the Docker binary path, confirming installation.

---

## DevOps Use Cases

- **Setting Systemd Executable Paths**: Find exact binary paths (`/usr/bin/nginx` or `/usr/local/bin/node`) when writing systemd service unit files.
- **CI/CD Dependency Checks**: Verify that required CLI tools (like `kubectl`, `helm`, or `terraform`) exist in PATH before executing build steps.
- **Troubleshooting Path Conflicts**: Identify which Python or Node executable runs when multiple versions are installed.
- **Crontab Script Configuration**: Use explicit binary paths returned by `which` inside crontab jobs, since cron environment `$PATH` is minimal.

---

## Quick Tip

Always use full binary paths (like `/usr/bin/python3` found via `which`) inside crontab files to prevent "command not found" errors in automated jobs.

---

## Common Mistakes

- **Using which for shell built-in commands**: Running `which cd` or `which echo` may return no output because `cd` is built directly into the shell (use `type cd` instead).
- **Assuming which searches the whole hard drive**: `which` searches only directories listed in your `$PATH` environment variable.

---

## Practice Challenge

1. Open your terminal.
2. Find where bash binary is located: `which bash`.
3. Find where python3 is installed: `which python3`.
4. Check if curl is available: `which curl`.
5. Display all matching binary paths for ls: `which -a ls`.

---

## Related Commands

- [whereis Command](../05-file-information/whereis.md) - Locate binary, manual, and source files.
- [find Command](../03-file-directory-management/find.md) - Search for files in directory trees.
- [hostname Command](./hostname.md) - View system hostname.
- [uname Command](./uname.md) - View system architecture and OS kernel info.

---

## Interview Notes

**Interview Question**: What is the difference between `which` and `whereis` in Linux?  
**Answer**: `which` searches only the directories defined in your active `$PATH` environment variable and returns the exact executable binary that runs when invoked. `whereis` searches standard system directories and returns binary paths, man pages (`man`), and source code locations.
