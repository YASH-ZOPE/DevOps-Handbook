# diff Command (Difference) | Linux Command for Beginners

Learn how to use the Linux diff command to compare files and folders line by line with simple examples and DevOps use cases.

---

## What is this command?

The Linux `diff` command stands for **Difference**. It compares two files line by line and highlights the exact lines that were added, modified, or deleted.

---

## Why do we use this command?

We use `diff` to check what changed between two versions of a configuration file, script, or codebase before deploying updates.

---

## Syntax

```bash
diff [options] file1 file2
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-u` | Shows differences in unified format (with `+` and `-` signs, like Git). |
| `-y` | Compares files side by side in two columns. |
| `-w` | Ignores all spaces and tabs when comparing. |
| `-i` | Ignores uppercase and lowercase differences. |
| `-r` | Compares folders and subfolders recursively. |

---

## Examples

### Example 1: Compare two simple configuration files

Run `diff app_v1.conf app_v2.conf` to see standard line-by-line differences.

```bash
ubuntu@ip-172-31-14-151:~$ diff app_v1.conf app_v2.conf
```

### Output

```bash
2c2
< PORT=3000
---
> PORT=8080
3a4
> DEBUG=false
```

- **What you typed**: You typed `diff app_v1.conf app_v2.conf` and pressed Enter.
- **Why you typed it**: You wanted to see what settings changed between version 1 and version 2.
- **What happened**: Linux showed that line 2 changed (`2c2`) from port 3000 (`<`) to port 8080 (`>`), and a new line was added (`3a4`).

---

### Example 2: View differences in unified format

Run `diff -u app_v1.conf app_v2.conf` to see changes in Git-style unified format.

```bash
ubuntu@ip-172-31-14-151:~$ diff -u app_v1.conf app_v2.conf
```

### Output

```bash
--- app_v1.conf	2026-08-08 12:00:00.000000000 +0000
+++ app_v2.conf	2026-08-08 12:05:00.000000000 +0000
@@ -1,3 +1,4 @@
 APP_NAME=DevBook
-PORT=3000
+PORT=8080
 DB_HOST=localhost
+DEBUG=false
```

- **What you typed**: You typed `diff -u app_v1.conf app_v2.conf` and pressed Enter.
- **Why you typed it**: You wanted to view the changes with clear `+` (added) and `-` (removed) markers.
- **What happened**: Linux printed the header and highlighted removed lines with `-` and added lines with `+`.

---

### Example 3: Compare files side by side

Run `diff -y app_v1.conf app_v2.conf` to compare both files in two parallel columns.

```bash
ubuntu@ip-172-31-14-151:~$ diff -y app_v1.conf app_v2.conf
```

### Output

```bash
APP_NAME=DevBook            APP_NAME=DevBook
PORT=3000                 | PORT=8080
DB_HOST=localhost           DB_HOST=localhost
                          > DEBUG=false
```

- **What you typed**: You typed `diff -y app_v1.conf app_v2.conf` and pressed Enter.
- **Why you typed it**: You wanted a visual side-by-side comparison to quickly spot differences.
- **What happened**: Linux printed both files next to each other, using `|` for changed lines and `>` for added lines.

---

## DevOps Use Cases

- **Comparing Environments**: Compare configuration files between staging and production environments to find misconfigurations.
- **Validating Manifests**: Compare Kubernetes YAML files or Terraform templates before applying updates to production clusters.
- **Creating Patches**: Generate unified patch files (`diff -u old.py new.py > fix.patch`) to send updates across servers.
- **Checking Backup Integrity**: Compare backup database dumps or config archives against live files to detect drifts.

---

## Quick Tip

Always put the older file first and the newer file second (`diff old_file new_file`). This ensures that `-` represents removed lines and `+` represents newly added lines.

---

## Common Mistakes

- **Reversing file order**: Running `diff new old` instead of `diff old new` reverses the plus and minus signs, making added lines look deleted.
- **Getting distracted by spacing**: If files differ only in indentation or tab spaces, add `-w` to ignore all whitespace.

---

## Practice Challenge

1. Open your terminal.
2. Create first file: `echo -e "port=80\nenv=dev" > config1.txt`.
3. Create second file: `echo -e "port=443\nenv=prod\nssl=true" > config2.txt`.
4. Compare them: `diff config1.txt config2.txt`.
5. Compare them in unified mode: `diff -u config1.txt config2.txt`.

---

## Related Commands

- [vim Command](../04-file-viewing-editing/vim.md) - Text editor with built-in vimdiff tool.
- [cat Command](../04-file-viewing-editing/cat.md) - View the entire content of a file.
- [grep Command](./grep.md) - Search for specific words in a file.

---

## Interview Notes

**Interview Question**: How do you create a patch file using `diff` and apply it?  
**Answer**: Create the patch using `diff -u original.conf new.conf > changes.patch` and apply it to the original file using `patch original.conf < changes.patch`.
