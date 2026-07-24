# rm Command (Remove Files & Folders) | Linux Command for Beginners

Learn how to use the Linux rm command to safely delete files and directories with simple examples and DevOps warnings.

---

## What is this command?

The Linux `rm` command stands for **Remove**. It is used to delete files and folders permanently from your Linux system.

---

## Why do we use this command?

We use `rm` to clean up old build artifacts, remove temporary files, and delete unwanted directories.

---

## Syntax

```bash
rm [options] file_or_folder
```

---

## Useful Options

| Option | What it does |
|---|---|
| `rm file_name` | Deletes a single file permanently. |
| `rm -i file_name` | Prompts for confirmation before deleting each file. |
| `rm -r folder_name` | Deletes a folder and all its contents recursively. |
| `rm -rf folder_name` | Forcefully deletes a folder and contents without asking for confirmation. |
| `rm -v file_name` | Shows messages listing each file deleted. |

---

## Examples

### Example 1: Remove a single file

Use `rm` followed by the file name to delete it.

```bash
ubuntu@ip-172-31-14-151:~/devops/Folder$ rm File.txt
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops/Folder$
```

- **What you typed**: You typed `rm File.txt` and pressed Enter.
- **Why you typed it**: You wanted to delete `File.txt` from your folder.
- **What happened**: Linux deleted `File.txt` permanently without showing confirmation messages.

---

### Example 2: Remove a folder and its contents forcefully

Use `rm -rf` to delete a folder along with all files inside it.

```bash
ubuntu@ip-172-31-14-151:~/devops$ rm -rf Folder_Backup
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops$
```

- **What you typed**: You typed `rm -rf Folder_Backup` and pressed Enter.
- **Why you typed it**: You wanted to remove the backup folder and all subfiles inside.
- **What happened**: Linux deleted `Folder_Backup` and all its contents immediately.

---

## DevOps Use Cases

- **CI/CD Cleanup**: Delete temporary build output directories at the end of automated build jobs using `rm -rf ./dist`.
- **Docker Cleanup**: Delete temporary container layer files and cached build dependencies.
- **Log Management**: Remove rotated log files older than a specific retention period.
- **Git Workspace Cleaning**: Delete untracked build files before pulling fresh production code.

---

## Quick Tip

Always check your location with `pwd` before running `rm -rf`. There is no Trash Bin in Linux CLI—deleted files cannot be easily recovered!

---

## Common Mistakes

- **Running dangerous wildcard deletes**: Accidentally typing `rm -rf /` or `rm -rf *` in the wrong folder deletes critical system files.
- **Forgetting `-r` for folders**: Running `rm folder_name` without `-r` gives an `Is a directory` error.

---

## Practice Challenge

1. Create a test file using `touch test.txt`.
2. Remove the test file safely using `rm -i test.txt`.
3. Verify that the file is gone using `ls`.

---

## Related Commands

- [rmdir Command](./rmdir.md) - Safely remove empty folders only.
- [touch Command](./touch.md) - Create files.
- [pwd Command](../02-navigation-commands/pwd.md) - Confirm your location before deleting.

---

## Interview Notes

**Interview Question**: What is the difference between `rmdir` and `rm -r`?  
**Answer**: `rmdir` can only remove empty directories and fails if files are inside. `rm -r` recursively deletes a directory along with all its contained files and subfolders.
