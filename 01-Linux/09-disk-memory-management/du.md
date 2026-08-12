# du Command (Disk Usage) | Linux Command for Beginners

Learn how to use the Linux du command to find large files, calculate folder sizes, and clean up server storage with simple examples and DevOps use cases.

---

## What is this command?

The Linux `du` command stands for **Disk Usage**. It calculates the space consumed by specific files and folders on your machine.

---

## Why do we use this command?

We use `du` to track down which specific folders or log files are using the most space on a server.

---

## Syntax

```bash
du [options] [path]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-h` | Displays sizes in human-readable format (K, M, G). |
| `-s` | Shows only a summary total for a folder. |
| `-a` | Includes individual files in the size list, not just folders. |
| `-c` | Displays a grand total sum line at the bottom. |
| `--max-depth=N` | Limits folder listing to N subfolder levels deep. |

---

## Examples

### Example 1: Check summary size of current folder

Run `du -sh` to get the total size of your current directory in megabytes or gigabytes.

```bash
ubuntu@ip-172-31-14-151:~$ du -sh
```

### Output

```bash
42M	.
```

- **What you typed**: You typed `du -sh` using the summary (`-s`) and human-readable (`-h`) options.
- **Why you typed it**: You wanted to check the total storage size of your current folder without seeing every subfolder listed.
- **What happened**: Linux calculated all files inside the folder and displayed the total size as 42 megabytes.

---

### Example 2: List top-level subfolder sizes

Run `du -h --max-depth=1 /var` to view the total size of each subfolder inside `/var`.

```bash
ubuntu@ip-172-31-14-151:~$ du -h --max-depth=1 /var
```

### Output

```bash
120M	/var/log
45M	/var/cache
350M	/var/lib
515M	/var
```

- **What you typed**: You set `--max-depth=1` on `/var`.
- **Why you typed it**: You wanted to inspect which subfolder inside `/var` was taking up the most space.
- **What happened**: Linux scanned subfolders up to 1 level deep and listed their sizes along with the total for `/var`.

---

### Example 3: Include individual files in the output

Run `du -ah /var/log` to list sizes for both individual files and folders.

```bash
ubuntu@ip-172-31-14-151:~$ du -ah /var/log | head -n 4
```

### Output

```bash
4.0K	/var/log/alternatives.log
12K	/var/log/auth.log
85M	/var/log/nginx/access.log
120M	/var/log
```

- **What you typed**: You used `-a` combined with `-h` on `/var/log`.
- **Why you typed it**: You wanted to locate large log files inside `/var/log`.
- **What happened**: Linux printed individual file sizes alongside directory totals.

---

### Example 4: Show subfolder sizes with a grand total

Run `du -shc /var/log/*` to view item sizes and print a final total sum line.

```bash
ubuntu@ip-172-31-14-151:~$ du -shc /var/log/* | tail -n 3
```

### Output

```bash
85M	/var/log/nginx
12K	/var/log/syslog
120M	total
```

- **What you typed**: You added `-c` (grand total) with wildcards `/var/log/*`.
- **Why you typed it**: You wanted to list item sizes inside `/var/log` and get an accurate total sum at the bottom.
- **What happened**: Linux calculated sizes for each item and added a `total` line at the end.

---

## DevOps Use Cases

- **Locating Large Web Logs**: Identify giant `access.log` or `error.log` files taking up disk space on web servers.
- **Cleaning Docker Storage**: Find accumulated Docker image layers and container volumes taking up gigabytes in `/var/lib/docker`.
- **CI/CD Cache Auditing**: Check build artifact folder sizes in Jenkins or GitHub Runner workspaces before running cleanup scripts.
- **Database Backup Verification**: Verify the size of generated MySQL or PostgreSQL database dump files before uploading to S3.

---

## Quick Tip

Run `du -sh * | sort -h` inside any directory to display all files and folders sorted from smallest to largest size.

---

## Common Mistakes

- **Running du without depth limits**: Running plain `du /` without `--max-depth=1` prints every single subfolder on your machine, filling your terminal with thousands of lines.
- **Misunderstanding deleted open files**: If a process keeps a deleted file open, `du` won't show it, but `df` will show the space as used.

---

## Practice Challenge

1. Open your terminal.
2. Check the total size of your home folder: `du -sh ~`.
3. List top-level folders in `/var` 1 level deep: `du -h --max-depth=1 /var`.
4. List contents of your current folder sorted by size: `du -sh * | sort -h`.
5. Display file sizes inside `/tmp` with a total line: `du -shc /tmp/*`.

---

## Related Commands

- [df Command](./df.md) - Check overall disk space on file systems.
- [free Command](./free.md) - Check free and used RAM memory.
- [ls Command](../02-navigation-commands/ls.md) - List files with permissions and sizes (`ls -lh`).
- [sort Command](../07-text-processing/sort.md) - Sort folder sizes numerically (`sort -h`).

---

## Interview Notes

**Interview Question**: Why would `du` and `df` show different numbers for disk space usage?  
**Answer**: `du` walks the file system tree and calculates the size of existing files. `df` queries the OS kernel for allocated file system blocks. If an application (like Nginx) keeps a deleted log file open, `du` cannot see the file, but `df` still counts its allocated disk blocks.
