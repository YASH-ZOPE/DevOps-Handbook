# vim Command (Text Editor) | Linux Command for Beginners

Learn how to use the Vim text editor inside the Linux terminal to create and edit files with simple examples, basic modes, and interview tips.

---

## What is this command?

Vim is a powerful command line text editor built into Linux. It does not use a mouse, so you control everything using your keyboard keys.

Vim works in three main modes:
- **Normal Mode**: The default mode used to move around and run commands (like deleting text). Press **Esc** to enter this mode.
- **Insert Mode**: The mode used to type text. Press **i** in Normal Mode to enter Insert Mode.
- **Command Mode**: The mode used to save and quit. Press **:** in Normal Mode to enter this mode.

---

## Why do we use this command?

We use Vim to edit settings files, write scripts, or change code directly on remote Linux servers.

---

## Syntax

```bash
vim [filename]
```

---

## Useful Key Commands

| Key Command | What it does |
|---|---|
| `i` | Switches to **Insert Mode** (lets you type text). |
| `Esc` | Switches back to **Normal Mode** (stops typing). |
| `:w` | Saves (writes) the changes to the file. |
| `:q!` | Quits the editor without saving any changes. |
| `:wq` | Saves the changes and quits the editor. |

---

## Examples

### Example 1: Open or create a file in Vim

Run `vim` with a filename to open the editor.

```bash
ubuntu@ip-172-31-14-151:~$ vim config.txt
```

### Output

```bash
~                                                                               
~                                                                               
~                                                                               
"config.txt" [New File]
```

- **What you typed**: You typed `vim config.txt` and pressed Enter.
- **Why you typed it**: You wanted to create a new file named `config.txt` and open it in the editor.
- **What happened**: Linux opened an empty Vim editor screen in Normal Mode.

---

### Example 2: Edit a file and save changes

Open a file, type text, save, and exit.

```bash
ubuntu@ip-172-31-14-151:~$ vim config.txt
```

### Output

*(After pressing `i`, typing "PORT=80", pressing `Esc`, typing `:wq` and pressing Enter, you return to the terminal prompt)*

```bash
ubuntu@ip-172-31-14-151:~$ 
```

- **What you typed**: You opened the file, pressed `i` to type, pressed `Esc` to stop typing, and typed `:wq` to save and quit.
- **Why you typed it**: You wanted to add settings to the file and save them.
- **What happened**: Vim saved the text `PORT=80` into `config.txt` and returned you to the command line.

---

## DevOps Use Cases

- **Editing Server Settings**: Edit settings files like `/etc/ssh/sshd_config` directly on remote AWS EC2 servers.
- **Writing Bash Scripts**: Create and edit shell scripts (like `backup.sh`) directly inside the terminal.
- **Editing Git Commit Messages**: Write git commit descriptions when running `git commit` without the `-m` option.
- **Fixing settings errors**: Open local environment variable files like `.env` to fix connection details.

---

## Quick Tip

If you get stuck or confused inside Vim, press **Esc** multiple times to return to Normal Mode, type **:q!**, and press **Enter** to exit without saving.

---

## Common Mistakes

- **Typing text immediately**: Trying to type text right after opening a file without pressing `i` first. This will run keyboard commands instead of writing text.
- **Getting stuck in the editor**: Beginners often do not know how to exit Vim and close the terminal instead. Always use **Esc** followed by **:q!** to quit without saving.

---

## Practice Challenge

1. Open your terminal.
2. Create a file by typing `vim test.txt`.
3. Press **i** to enter Insert Mode.
4. Type `DevOps is fun!`.
5. Press **Esc** to return to Normal Mode.
6. Type **:wq** and press **Enter** to save and quit.
7. Check the file by running `cat test.txt`.

---

## Related Commands

- [less Command](./less.md) - View files page by page.
- [echo Command](./echo.md) - Save text to a file without opening an editor.
- [cat Command](./cat.md) - View the entire contents of a file.

---

## Interview Notes

**Interview Question**: How do you quit Vim without saving your changes?  
**Answer**: Press the **Esc** key to enter Normal Mode, type **:q!**, and press **Enter**.
