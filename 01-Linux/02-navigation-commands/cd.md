# cd Command (Change Directory) | Linux Command for Beginners

Learn how to use the Linux cd command to move between folders with simple examples and DevOps use cases.

---

## What is this command?

The Linux `cd` command stands for **Change Directory**. It helps you move from your current folder to another folder on a Linux system.

---

## Why do we use this command?

We use `cd` to move around the Linux file system to access project files, server settings, and log files.

---

## Syntax

```bash
cd [folder_path]
```

---

## Useful Options

| Command / Option | What it does |
|---|---|
| `cd folder_name` | Moves inside the specified folder. |
| `cd ..` | Moves up one level to the parent folder. |
| `cd` or `cd ~` | Moves straight to your home folder. |
| `cd -` | Moves back to the last folder you were working in. |
| `cd /` | Moves to the main root folder (`/`) of Linux. |

---

## Examples

### Example 1: Move into a folder

Type `cd` followed by a folder name to open it.

```bash
ubuntu@ip-172-31-14-151:~$ cd devops
```

### Output

```bash
ubuntu@ip-172-31-14-151:~/devops$
```

- **What you typed**: You typed `cd devops` and pressed Enter.
- **Why you typed it**: You wanted to move inside the `devops` folder.
- **What happened**: The terminal prompt updated to `~/devops$`, showing you are now inside that folder.

---

### Example 2: Move up one folder level

Type `cd ..` to step out of your current folder into the parent folder.

```bash
ubuntu@ip-172-31-14-151:~/devops$ cd ..
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$
```

- **What you typed**: You typed `cd ..` and pressed Enter.
- **Why you typed it**: You wanted to go back up to the parent folder.
- **What happened**: Linux moved you back up one step to your home folder (`~`).

---

### Example 3: Jump straight to home folder

Type `cd` from any deep folder to return home instantly.

```bash
ubuntu@ip-172-31-14-151:~/devops/dev$ cd
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$
```

- **What you typed**: You typed `cd` without any arguments and pressed Enter.
- **Why you typed it**: You wanted to return to your main home folder quickly.
- **What happened**: Linux brought you straight back to `/home/ubuntu`.

---

## DevOps Use Cases

- **Nginx Web Server Settings**: Move to the Nginx folder using `cd /etc/nginx/` to edit web server settings files.
- **Git Project Folders**: Move into your Git project folder before running commands like `git status` or `git pull`.
- **Application Logs**: Move to `/var/log` using `cd /var/log` to check server log files when fixing issues.
- **Docker Projects**: Open your project folder containing a `Dockerfile` before building a new container image.
- **Terraform Cloud Code**: Change folder into your Terraform project before running `terraform apply` on AWS.

---

## Quick Tip

Press the **Tab** key on your keyboard while typing folder names. Linux will auto-complete the folder name for you so you do not make spelling mistakes.

---

## Common Mistakes

- **Forgetting quotes around spaces**: Typing `cd My Folder` instead of `cd "My Folder"` causes an error because Linux sees two separate arguments.
- **Forgetting the leading slash**: Typing `cd etc` instead of `cd /etc` when trying to open system settings folders from another location.

---

## Practice Challenge

1. Open your terminal and check your folder using `pwd`.
2. Move to the root folder using `cd /`.
3. List the files inside root using `ls`.
4. Jump back to your home folder instantly using `cd ~`.

---

## Related Commands

- [ls Command](./ls.md) - List files and folders inside a directory.
- [pwd Command](./pwd.md) - Show your current folder path.
- [clear Command](./clear.md) - Clean up your terminal screen.

---

## Interview Notes

**Interview Question**: How do you switch back to the last folder you were in?  
**Answer**: Use `cd -`. It switches your terminal back to the previous folder you visited.
