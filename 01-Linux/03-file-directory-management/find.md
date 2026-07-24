# find Command (Search Files & Folders) | Linux Command for Beginners

Learn how to use the Linux find command to search for files, directories, and paths with simple examples and DevOps workflows.

---

## What is this command?

The Linux `find` command searches for files and folders across your file system based on names, types, sizes, or dates.

---

## Why do we use this command?

We use `find` to locate misplaced files, clean up old log files, and search project directories quickly.

---

## Syntax

```bash
find [search_path] [options] [expression]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `find . -name "filename"` | Searches for a file matching the exact name in the current folder. |
| `find . -iname "filename"` | Case-insensitive search for files matching the name. |
| `find . -type f` | Searches only for regular files. |
| `find . -type d` | Searches only for directories/folders. |
| `find . -mtime -7` | Finds files modified within the last 7 days. |

---

## Examples

### Example 1: Search for a folder by name

Use `find` followed by the target name to search inside your active directory.

```bash
ubuntu@ip-172-31-14-151:~/devops$ find dev
```

### Output

```bash
dev
```

- **What you typed**: You typed `find dev` while inside `~/devops` and pressed Enter.
- **Why you typed it**: You wanted to check if a folder or file named `dev` exists inside `devops`.
- **What happened**: Linux found and printed `dev`, showing that the `dev` folder exists.

---

### Example 2: Search when a file does not exist

Use `find` to search for a name that does not exist in the current location.

```bash
ubuntu@ip-172-31-14-151:~$ find dev
```

### Output

```bash
find: ‘dev’: No such file or directory
```

- **What you typed**: You typed `find dev` while inside your home folder (`~`) and pressed Enter.
- **Why you typed it**: You were looking for `dev` inside your home directory.
- **What happened**: Linux returned `find: ‘dev’: No such file or directory` because `dev` only exists inside `~/devops`.

---

## DevOps Use Cases

- **Log Cleanup Automation**: Find and delete old log files older than 30 days using `find /var/log/nginx -name "*.log" -mtime +30 -exec rm {} \;`.
- **Finding Dockerfiles**: Search nested repository directories for Docker setup files using `find . -name "Dockerfile"`.
- **Locating Executable Scripts**: Search for shell scripts with run permissions using `find . -type f -name "*.sh"`.
- **Finding Large Files**: Search for large files taking up disk space using `find /var/log -type f -size +100M`.

---

## Quick Tip

If you do not know the exact file name, use wildcards! For example, `find . -name "*.txt"` finds all text files in your current folder.

---

## Common Mistakes

- **Searching root without sudo**: Running `find / -name "file"` as a normal user will flood your screen with `Permission denied` errors.
- **Forgetting quotes around wildcards**: Running `find . -name *.txt` without quotes can cause shell expansion errors if multiple text files exist.

---

## Practice Challenge

1. Move to your home folder using `cd ~`.
2. Try searching for `dev` using `find dev`.
3. Move into `devops` using `cd devops`.
4. Run `find dev` again to see the difference.

---

## Related Commands

- [locate Command](./locate.md) - Fast file search using a pre-indexed database.
- [ls Command](../02-navigation-commands/ls.md) - List contents of current folder.
- `grep` - Search for text content inside files.

---

## Interview Notes

**Interview Question**: What is the difference between `find` and `locate` in Linux?  
**Answer**: `find` searches live disk directories in real-time, while `locate` searches a pre-built indexed database (`updatedb`) which is much faster but may not show brand new files.
