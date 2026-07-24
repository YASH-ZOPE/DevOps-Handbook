# clear Command (Clear Terminal Screen) | Linux Command for Beginners

Learn how to use the Linux clear command and keyboard shortcuts to clean your terminal screen for better readability.

---

## What is this command?

The Linux `clear` command cleans your terminal screen window by wiping old command output from your main view.

---

## Why do we use this command?

We use `clear` to clean up a messy terminal screen so we can focus on new work without distraction.

---

## Syntax

```bash
clear
```

---

## Useful Options

| Command / Shortcut | What it does |
|---|---|
| `clear` | Clears the current terminal display view. |
| `Ctrl + L` | Keyboard shortcut to clear the screen instantly without typing `clear`. |
| `clear -x` | Clears the visible screen while keeping scrollback history accessible. |

---

## Examples

### Example 1: Clean the terminal screen

Type `clear` in your terminal to wipe away old text.

```bash
ubuntu@ip-172-31-14-151:~$ clear
```

### Output

The screen wipes clean and resets your command prompt back to the top left corner.

- **What you typed**: You typed `clear` and pressed Enter.
- **Why you typed it**: You wanted to clean your screen view.
- **What happened**: Linux cleared the visible screen and placed the command prompt back at the top.

---

## DevOps Use Cases

- **Log Monitoring**: Clean the terminal screen before running `tail -f /var/log/nginx/access.log` to watch fresh server logs.
- **Docker Container Checks**: Clean away screen clutter before checking active containers with `docker ps`.
- **Live Demos**: Keep your terminal clean while doing live technical demos or technical interview screen shares.
- **Shell Script Debugging**: Keep terminal output clean while fixing deployment scripts on an AWS EC2 server.

---

## Quick Tip

Press **`Ctrl + L`** on your keyboard. It works in almost all Linux terminals and clears your screen faster than typing `clear`.

---

## Common Mistakes

- **Thinking clear deletes history**: Fearing `clear` deletes past commands. It only wipes the visible screen view.
- **Thinking clear stops background jobs**: Fearing `clear` stops running commands. Running jobs continue unaffected.

---

## Practice Challenge

1. Type three commands in terminal (like `pwd`, `ls`, and `whoami`).
2. Press `Ctrl + L` on your keyboard to clear the screen instantly.
3. Type `history 5` to check that your past commands are still saved.

---

## Related Commands

- [history Command](./history.md) - View list of executed terminal commands.
- [pwd Command](./pwd.md) - Show current folder path.
- [ls Command](./ls.md) - List files inside a folder.

---

## Interview Notes

**Interview Question**: Does running `clear` remove past command history from memory?  
**Answer**: No. `clear` only wipes the visible workspace on screen. Your command history stays safe and can be viewed using `history`.
