# mv Command (Move & Rename Files) | Linux Command for Beginners

Learn how to use the Linux mv command to rename files and move directories with simple examples and DevOps workflows.

---

## What is this command?

The Linux `mv` command stands for **Move**. It is used to rename files and folders, or move them from one location to another.

---

## Why do we use this command?

We use `mv` to organize files into correct folders and update file names in our Linux system.

---

## Syntax

```bash
mv [options] source destination
```

---

## Useful Options

| Option | What it does |
|---|---|
| `mv source target` | Moves or renames `source` to `target`. |
| `mv -i source target` | Asks for confirmation before overwriting an existing destination file. |
| `mv -n source target` | Prevents overwriting an existing destination file. |
| `mv -v source target` | Prints a message showing each file as it is moved or renamed. |

---

## Examples

### Example 1: Rename a file

Use `mv` with the old file name and a new file name in the same folder to rename it.

```bash
ubuntu@ip-172-31-14-151:~/devops/Folder$ mv req.txt File.txt
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops/Folder$
```

- **What you typed**: You typed `mv req.txt File.txt` and pressed Enter.
- **Why you typed it**: You wanted to rename `req.txt` to `File.txt`.
- **What happened**: Linux renamed `req.txt` to `File.txt` instantly.

---

### Example 2: Move a file into another folder

Use `mv` followed by the file name and the target folder path.

```bash
ubuntu@ip-172-31-14-151:~/devops/Folder$ mv File.txt ../
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops/Folder$
```

- **What you typed**: You typed `mv File.txt ../` and pressed Enter.
- **Why you typed it**: You wanted to move `File.txt` up one folder level into `~/devops`.
- **What happened**: Linux moved `File.txt` out of `Folder` into the parent `devops` directory.

---

## DevOps Use Cases

- **Deployment Backups**: Rename active application binaries or config files (e.g. `mv app.conf app.conf.bak`) before deploying updates.
- **Log Archiving**: Move old server logs from `/var/log/nginx/` into an archive storage folder.
- **CI/CD Build Artifacts**: Move compiled application build files into production release folders during automated deployment pipelines.
- **Credential Storage**: Move downloaded cloud SSH key files into hidden security folders like `~/.ssh/`.

---

## Quick Tip

Always use the `-i` option (`mv -i source target`) when moving files into folders that might already contain files with the same name. This prevents accidental overwriting.

---

## Common Mistakes

- **Accidental overwriting**: Moving a file to a destination that already exists without `-i` will silently overwrite the target file.
- **Typing wrong destination folder**: Accidentally renaming a file instead of moving it because the target folder path was typed incorrectly.

---

## Practice Challenge

1. Create a test file using `touch req.txt`.
2. Rename `req.txt` to `File.txt` using `mv req.txt File.txt`.
3. Verify the file name change using `ls`.

---

## Related Commands

- [cp Command](./cp.md) - Copy files instead of moving them.
- [rm Command](./rm.md) - Remove files.
- [touch Command](./touch.md) - Create empty files.

---

## Interview Notes

**Interview Question**: How does Linux differentiate between renaming a file and moving a file when using `mv`?  
**Answer**: If the destination path is in the same folder and specifies a file name, `mv` renames it. If the destination is a folder path, `mv` moves the file inside that folder.
