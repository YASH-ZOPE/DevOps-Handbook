# pwd Command (Print Working Directory) | Linux Command for Beginners

Learn how to use the Linux pwd command to find your current working folder path with simple examples and DevOps use cases.

---

## What is this command?

The Linux `pwd` command stands for **Print Working Directory**. It shows the full path of the folder you are currently working inside.

---

## Why do we use this command?

We use `pwd` to check our exact location in the Linux file system so we do not run commands in the wrong folder.

---

## Syntax

```bash
pwd [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `pwd` | Shows the full path of your current working folder. |
| `pwd -L` | Shows the shortcut path (logical path), including symlinks. |
| `pwd -P` | Shows the real physical path on disk, resolving all shortcut folders. |

---

## Examples

### Example 1: Check your current folder path

Use `pwd` to find out where you are working right now inside the terminal.

```bash
ubuntu@ip-172-31-14-151:~$ pwd
```

### Output

```bash
/home/ubuntu
```

- **What you typed**: You typed `pwd` and pressed Enter.
- **Why you typed it**: You wanted to check your active folder path.
- **What happened**: The terminal printed `/home/ubuntu`, showing you are inside the home folder of the `ubuntu` user.

---

### Example 2: Check the real physical path of a shortcut folder

Move to a shortcut folder and use `pwd -P` to find its true disk folder.

```bash
ubuntu@ip-172-31-14-151:~$ pwd -P
```

### Output

```bash
/var/www/html
```

- **What you typed**: You typed `pwd -P` and pressed Enter.
- **Why you typed it**: You wanted to see the real physical folder path instead of the shortcut name.
- **What happened**: Linux printed `/var/www/html`, showing the exact folder on the storage disk.

---

## DevOps Use Cases

- **Bash Shell Scripts**: Save the active folder path inside a script variable using `CURRENT_DIR=$(pwd)` so your script knows where to run.
- **Docker Mounts**: Mount your project folder into a container using `docker run -v $(pwd):/app ubuntu` to share local code.
- **Jenkins CI/CD**: Check the active workspace folder path during automated build jobs on a Jenkins server.
- **Server Logs**: Check your folder path before editing log files inside `/var/log` on an Nginx server.
- **AWS EC2 Cloud Servers**: Check your location right after logging into an AWS EC2 Ubuntu instance using SSH.

---

## Quick Tip

Run `pwd` before running any delete command like `rm -rf *`. This helps you make sure you are in the right folder before deleting files.

---

## Common Mistakes

- **Not checking location**: Running commands in `/tmp` or `/etc` by accident because you forgot to run `pwd` first.
- **Confusing shortcut paths with real paths**: Expecting to see the real disk path in a shortcut folder without using `pwd -P`.

---

## Practice Challenge

1. Open your Ubuntu terminal.
2. Type `pwd` to see your current home folder path.
3. Move to the `/var/log` directory using `cd /var/log`.
4. Type `pwd` again to verify your location.

---

## Related Commands

- [cd Command](./cd.md) - Move between Linux folders.
- [ls Command](./ls.md) - List files inside a folder.
- [clear Command](./clear.md) - Clean up your terminal screen.

---

## Interview Notes

**Interview Question**: What is the difference between `pwd -L` and `pwd -P`?  
**Answer**: `pwd -L` shows the shortcut path (symlink), while `pwd -P` shows the real physical path on the storage disk.
