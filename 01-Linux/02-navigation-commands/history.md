# history Command (Display Command History) | Linux Command for Beginners

Learn how to use the Linux history command to search, recall, and re-run previous terminal commands with simple examples.

---

## What is this command?

The Linux `history` command shows a list of commands you previously typed in your terminal session with reference numbers.

---

## Why do we use this command?

We use `history` to recall, search, and re-run previous long commands without typing them again from scratch.

---

## Syntax

```bash
history [options]
```

---

## Useful Options

| Option / Shortcut | What it does |
|---|---|
| `history` | Shows your full command history list with line numbers. |
| `history 10` | Shows only the last 10 commands you typed. |
| `!n` | Re-runs command number `n` directly from history (example: `!5`). |
| `!!` | Re-runs the very last command you typed. |
| `history -c` | Clears all history for the current session. |
| `Ctrl + R` | Opens interactive search mode to search past commands by typing. |

---

## Examples

### Example 1: View recent command history

Type `history` to view past commands with their numbers.

```bash
ubuntu@ip-172-31-14-151:~$ history
```

### Output

```bash
    1  docker ps
    2  kind create cluster --config kind-config.yml
    3  kind get clusters
    4  kind delete cluster --name tws-cluster
    5  kind create cluster --config kind-config.yml
```

- **What you typed**: You typed `history` and pressed Enter.
- **Why you typed it**: You wanted to see what commands you ran previously.
- **What happened**: Linux listed your last 5 commands alongside their reference line numbers.

---

### Example 2: Re-run a specific command by number

Type `!` followed by the command number to re-run it.

```bash
ubuntu@ip-172-31-14-151:~$ !2
```

### Output

```bash
kind create cluster --config kind-config.yml
```

- **What you typed**: You typed `!2` and pressed Enter.
- **Why you typed it**: You wanted to re-run command #2 without typing the full command string again.
- **What happened**: Linux found command #2 from history (`kind create cluster --config kind-config.yml`) and ran it automatically.

---

## DevOps Use Cases

- **Kubernetes Cluster Management**: Find and re-run complex `kind` or `kubectl` cluster commands without retyping long arguments.
- **Docker Container Runs**: Re-run previous `docker run` commands containing long environment flags using `!n`.
- **Server Auditing**: Review recent commands run on an EC2 server to see what changed during an issue.
- **Script Creation**: Copy past working commands from history directly into new Bash automation scripts.
- **Searching Commands**: Find specific commands quickly by combining history with grep: `history | grep docker`.

---

## Quick Tip

Press **`Ctrl + R`** on your keyboard and type a keyword (like `kind` or `docker`). Linux will search your history and find your last matching command.

---

## Common Mistakes

- **Re-running wrong command numbers**: Using `!n` without checking `history` first, which might run a different command than intended.
- **Forgetting history size limits**: Expecting command history to stay forever when `HISTSIZE` limits total saved commands.

---

## Practice Challenge

1. Type three commands in terminal: `pwd`, `ls`, `whoami`.
2. Type `history 3` to view your last 3 commands.
3. Type `!1` (or the line number of `pwd`) to re-run it automatically.

---

## Related Commands

- [clear Command](./clear.md) - Clean up your terminal screen.
- [pwd Command](./pwd.md) - Show current folder path.
- [cd Command](./cd.md) - Move between folders.

---

## Interview Notes

**Interview Question**: Where is your Linux bash command history stored on disk?  
**Answer**: Bash command history is stored in a hidden file inside your home folder named `~/.bash_history`.
