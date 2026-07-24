# rmdir Command (Remove Empty Directory) | Linux Command for Beginners

Learn how to use the Linux rmdir command to safely delete empty folders with simple examples and safety tips.

---

## What is this command?

The Linux `rmdir` command stands for **Remove Directory**. It is used to delete empty folders from your system safely.

---

## Why do we use this command?

We use `rmdir` to clean up empty folders safely without accidentally deleting files stored inside.

---

## Syntax

```bash
rmdir [options] folder_name
```

---

## Useful Options

| Option | What it does |
|---|---|
| `rmdir folder_name` | Removes an empty folder. |
| `rmdir -p path/to/folder` | Removes empty parent folders along with the target folder. |
| `rmdir -v folder_name` | Prints a confirmation message for each deleted empty folder. |

---

## Examples

### Example 1: Remove an empty folder

Use `rmdir` followed by an empty folder name to delete it.

```bash
ubuntu@ip-172-31-14-151:~/devops$ rmdir EmptyFolder
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops$
```

- **What you typed**: You typed `rmdir EmptyFolder` and pressed Enter.
- **Why you typed it**: You wanted to delete an empty folder named `EmptyFolder`.
- **What happened**: Linux deleted `EmptyFolder` safely.

---

### Example 2: Try removing a folder containing files

Attempting to delete a non-empty folder using `rmdir`.

```bash
ubuntu@ip-172-31-14-151:~/devops$ rmdir Folder
```

### Output

```bash
rmdir: failed to remove 'Folder': Directory not empty
```

- **What you typed**: You typed `rmdir Folder` and pressed Enter.
- **Why you typed it**: You attempted to remove `Folder`.
- **What happened**: Linux refused to delete `Folder` and displayed a safety warning because files exist inside it.

---

## DevOps Use Cases

- **Safe Scripted Cleanup**: Remove unused temporary build folders safely in CI/CD scripts without risking data loss.
- **Directory Structure Pruning**: Remove empty parent directories using `rmdir -p` after moving files to new locations.

---

## Quick Tip

`rmdir` is safer than `rm -rf` because it will refuse to delete any folder that contains files.

---

## Common Mistakes

- **Expecting rmdir to delete non-empty folders**: Forgetting that `rmdir` only works on empty folders. Use `rm -r` if you intend to delete files inside too.

---

## Practice Challenge

1. Create an empty folder using `mkdir TestFolder`.
2. Delete the empty folder using `rmdir TestFolder`.
3. Check `ls` to verify it was removed.

---

## Related Commands

- [mkdir Command](./mkdir.md) - Create folders.
- [rm Command](./rm.md) - Remove files and non-empty folders.
- [ls Command](../02-navigation-commands/ls.md) - Check if a folder is empty before removing.

---

## Interview Notes

**Interview Question**: Why is `rmdir` safer to use in automation scripts than `rm -r`?  
**Answer**: `rmdir` aborts and fails if a folder contains any files, protecting against accidental deletion of critical data.
