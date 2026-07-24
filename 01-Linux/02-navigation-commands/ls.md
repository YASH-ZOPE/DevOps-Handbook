# ls Command (List Files) | Linux Command for Beginners

Learn how to use the Linux ls command to see files, hidden folders, permissions, and file sizes with simple examples.

---

## What is this command?

The Linux `ls` command stands for **List**. It shows all the files and folders inside your current location.

---

## Why do we use this command?

We use `ls` to see what files exist inside a folder, check file sizes, inspect access permissions, and spot hidden files.

---

## Syntax

```bash
ls [options] [folder_path]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `ls` | Shows a simple list of visible files and folders. |
| `ls -l` | Shows a detailed list with permissions, owner, size, and date. |
| `ls -a` | Shows all files, including hidden dot files (like `.env`). |
| `ls -lh` | Shows detailed file list with human-readable sizes (KB, MB, GB). |
| `ls -t` | Sorts files by newest modified time first. |

---

## Examples

### Example 1: List files in your folder

Type `ls` to view the items inside your active folder.

```bash
ubuntu@ip-172-31-14-151:~$ ls
```

### Output

```bash
devops  install.sh  kind-config.yml
```

- **What you typed**: You typed `ls` and pressed Enter.
- **Why you typed it**: You wanted to see what files exist inside your current folder.
- **What happened**: Linux listed three items found inside the folder: `devops`, `install.sh`, and `kind-config.yml`.

---

### Example 2: List files with readable sizes and details

Type `ls -lh` to view file permissions and easy-to-read file sizes.

```bash
ubuntu@ip-172-31-14-151:~$ ls -lh
```

### Output

```bash
-rw-r--r-- 1 ubuntu ubuntu  450 Jul 24 01:15 install.sh
-rw-r--r-- 1 ubuntu ubuntu 1.2K Jul 24 01:15 kind-config.yml
drwxr-xr-x 2 ubuntu ubuntu 4.0K Jul 24 01:15 devops
```

- **What you typed**: You typed `ls -lh` and pressed Enter.
- **Why you typed it**: You wanted to check file details and readable file sizes.
- **What happened**: Linux listed file permissions, user owner, group owner, size in KB, and modification date.

---

## DevOps Use Cases

- **Kubernetes Settings Files**: Check if cluster setup files like `kind-config.yml` or deployment YAML files exist.
- **Hidden Environment Settings**: Spot hidden configuration files like `.env`, `.gitignore`, or `.ssh/` using `ls -a`.
- **Script Run Permissions**: Check permissions using `ls -l` to verify if a shell script like `install.sh` has run permissions (`+x`).
- **CI/CD Build Files**: Check build output folders in Jenkins or GitHub Actions to verify created application files.
- **Server Storage Checks**: Find large server log files taking up disk space inside `/var/log` using `ls -lh`.

---

## Quick Tip

You can combine options together! Using `ls -la` shows hidden files in long detailed format, and `ls -lat` sorts all files including hidden ones by newest first.

---

## Common Mistakes

- **Missing hidden files**: Running plain `ls` and assuming a file is missing when it is actually hidden (starts with `.`).
- **Reading raw byte counts**: Reading file sizes in plain `ls -l` bytes instead of using `ls -lh` for easy KB/MB numbers.

---

## Practice Challenge

1. Open your terminal.
2. Type `ls` to view visible files.
3. Type `ls -a` to spot hidden files like `.bashrc`.
4. Type `ls -lh /var/log` to check server log file sizes in human-readable format.

---

## Related Commands

- [cd Command](./cd.md) - Move between folders.
- [pwd Command](./pwd.md) - Show current folder path.
- [clear Command](./clear.md) - Clean up your terminal screen.

---

## Interview Notes

**Interview Question**: How do you show hidden files sorted by newest modified date in Linux?  
**Answer**: Use `ls -lat`. The `-a` option shows hidden files, `-l` shows detailed format, and `-t` sorts by newest modified date.
