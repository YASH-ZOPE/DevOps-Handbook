# mkdir Command (Make Directory) | Linux Command for Beginners

Learn how to use the Linux mkdir command to create new folders and directory structures with simple examples and DevOps use cases.

---

## What is this command?

The Linux `mkdir` command stands for **Make Directory**. It creates one or more new folders on your Linux system.

---

## Why do we use this command?

We use `mkdir` to organize project files, scripts, and logs into clean folder structures.

---

## Syntax

```bash
mkdir [options] folder_name
```

---

## Useful Options

| Option | What it does |
|---|---|
| `mkdir folder_name` | Creates a single new folder. |
| `mkdir -p path/to/folder` | Creates parent folders automatically if they do not exist yet. |
| `mkdir -v folder_name` | Prints a confirmation message for every created folder. |
| `mkdir -m 755 folder_name` | Sets specific folder permissions during creation. |

---

## Examples

### Example 1: Create a single folder

Use `mkdir` followed by a folder name to create a new folder.

```bash
ubuntu@ip-172-31-14-151:~/devops$ mkdir Folder
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops$
```

- **What you typed**: You typed `mkdir Folder` and pressed Enter.
- **Why you typed it**: You wanted to create a new folder named `Folder` inside the `devops` directory.
- **What happened**: Linux created the folder `Folder` silently without showing errors.

---

### Example 2: Create nested parent folders at once

Use `mkdir -p` to create a deep nested folder structure in one command.

```bash
ubuntu@ip-172-31-14-151:~/devops$ mkdir -p app/src/components
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops$
```

- **What you typed**: You typed `mkdir -p app/src/components` and pressed Enter.
- **Why you typed it**: You wanted to create `app`, `src`, and `components` all together.
- **What happened**: Linux created all missing parent folders (`app` and `app/src`) along with `components`.

---

## DevOps Use Cases

- **Project Initialization**: Create standard directory structures like `mkdir -p project/{src,bin,config}` when setting up new repositories.
- **Docker Build Workspaces**: Create build directories for Docker assets before running image creation scripts.
- **Log Archiving**: Create timestamped log backup folders in `/var/log` using `mkdir -p /var/log/nginx/backups`.
- **Terraform State Storage**: Create dedicated workspace folders before running `terraform init`.

---

## Quick Tip

Use braces `{}` to create multiple folders at once! For example, `mkdir {logs,docs,tests}` creates three folders in one second.

---

## Common Mistakes

- **Forgetting `-p` for nested paths**: Typing `mkdir path/to/folder` when `path` does not exist causes a `No such file or directory` error.
- **Forgetting quotes around folder names with spaces**: Running `mkdir My Folder` creates two separate folders named `My` and `Folder`.

---

## Practice Challenge

1. Open your terminal.
2. Create a folder named `devops` using `mkdir devops`.
3. Create nested folders `project/src` inside `devops` using `mkdir -p devops/project/src`.
4. Verify your new folders using `ls devops/project`.

---

## Related Commands

- [touch Command](./touch.md) - Create empty files inside folders.
- [rmdir Command](./rmdir.md) - Remove empty folders.
- [rm Command](./rm.md) - Remove files and non-empty folders.
- [cd Command](../02-navigation-commands/cd.md) - Move into newly created folders.

---

## Interview Notes

**Interview Question**: How do you create nested directories in Linux without getting an error if parent folders do not exist?  
**Answer**: Use `mkdir -p path/to/nested/folder`. The `-p` flag creates all missing parent folders automatically.
