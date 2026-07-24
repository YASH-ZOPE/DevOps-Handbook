# cp Command (Copy Files & Folders) | Linux Command for Beginners

Learn how to use the Linux cp command to duplicate files and copy directory trees with simple examples and DevOps use cases.

---

## What is this command?

The Linux `cp` command stands for **Copy**. It makes exact duplicate copies of files and folders in Linux.

---

## Why do we use this command?

We use `cp` to create backup copies of critical settings, duplicate template scripts, and copy project files safely.

---

## Syntax

```bash
cp [options] source_file destination_file
```

---

## Useful Options

| Option | What it does |
|---|---|
| `cp source target` | Copies a single file to a target file or folder. |
| `cp -r source_dir target_dir` | Copies a folder and all its contents recursively. |
| `cp -i source target` | Asks for confirmation before overwriting an existing file. |
| `cp -v source target` | Shows detailed output of files being copied. |
| `cp -p source target` | Preserves file permissions, owner, and timestamps. |

---

## Examples

### Example 1: Copy a file in the same folder

Use `cp` with the original file name and a new copy name.

```bash
ubuntu@ip-172-31-14-151:~/devops/Folder$ cp File.txt Req.txt
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops/Folder$
```

- **What you typed**: You typed `cp File.txt Req.txt` and pressed Enter.
- **Why you typed it**: You wanted to make a duplicate copy of `File.txt` named `Req.txt`.
- **What happened**: Linux created `Req.txt` with identical content while leaving `File.txt` untouched.

---

### Example 2: Copy an entire folder recursively

Use `cp -r` to copy a folder along with all its subfolders and files.

```bash
ubuntu@ip-172-31-14-151:~/devops$ cp -r Folder Folder_Backup
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops$
```

- **What you typed**: You typed `cp -r Folder Folder_Backup` and pressed Enter.
- **Why you typed it**: You wanted to duplicate the entire `Folder` directory structure.
- **What happened**: Linux created `Folder_Backup` containing copies of all files inside `Folder`.

---

## DevOps Use Cases

- **Config Safety Backups**: Copy critical configuration files before making edits (e.g. `cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak`).
- **Template Repositories**: Copy template deployment manifests (like `deployment.template.yaml`) to create new microservice configs.
- **Preserving Metadata**: Use `cp -p` to copy SSL certificates or SSH keys while preserving exact security permissions and file owners.
- **Docker Build Contexts**: Copy application source code into staging directories before running `docker build`.

---

## Quick Tip

Always create a `.bak` backup copy of system configuration files using `cp config.conf config.conf.bak` before editing them.

---

## Common Mistakes

- **Forgetting `-r` when copying folders**: Running `cp folder1 folder2` without `-r` causes an `omitting directory` error.
- **Silent overwrites**: Copying a file to an existing file name without `-i` will replace the destination file contents without warning.

---

## Practice Challenge

1. Open your terminal in a test folder.
2. Create a test file using `touch File.txt`.
3. Copy `File.txt` to `Req.txt` using `cp File.txt Req.txt`.
4. Verify both files exist using `ls`.

---

## Related Commands

- [mv Command](./mv.md) - Move or rename files instead of copying.
- [rm Command](./rm.md) - Remove copied test files.
- [touch Command](./touch.md) - Create empty files.

---

## Interview Notes

**Interview Question**: What flag must you use with `cp` to copy a directory containing files and subfolders?  
**Answer**: Use `cp -r` (or `cp -R`), which stands for recursive copy. Without `-r`, Linux will skip folders with an error.
