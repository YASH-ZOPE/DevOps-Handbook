# grep Command (Global Regular Expression Print) | Linux Command for Beginners

Learn how to use the Linux grep command to search and filter text, log files, and patterns with simple examples and DevOps use cases.

---

## What is this command?

The Linux `grep` command stands for **Global Regular Expression Print**. It searches through files or command outputs for specific text patterns and shows all lines that match.

---

## Why do we use this command?

We use `grep` to scan server logs for errors, locate configuration settings across files, and filter outputs from running system processes.

---

## Syntax

```bash
grep [options] "pattern" [filename]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-i` | Ignores uppercase and lowercase differences. |
| `-c` | Counts the total number of matching lines instead of printing them. |
| `-n` | Shows the line number for each match. |
| `-v` | Inverts search (shows lines that do NOT match). |
| `-r` | Searches recursively through all files in a folder. |
| `-l` | Shows only the names of matching files. |
| `-E` | Enables extended regular expressions (regex). |

---

## Examples

### Example 1: Search for a specific word in a log file

Run `grep INFO app.log` to find all informational log entries.

```bash
ubuntu@ip-172-31-14-151:~$ grep INFO app.log
```

### Output

```bash
2026-08-08 07:51:55 INFO Server started on port 8080
2026-08-08 07:52:00 INFO User login successful
```

- **What you typed**: You typed `grep INFO app.log` and pressed Enter.
- **Why you typed it**: You wanted to search `app.log` for the keyword "INFO".
- **What happened**: Linux scanned the file and printed every line containing "INFO".

---

### Example 2: Search text while ignoring letter case

Run `grep -i info app.log` to match "INFO", "Info", or "info".

```bash
ubuntu@ip-172-31-14-151:~$ grep -i info app.log
```

### Output

```bash
2026-08-08 07:51:55 INFO Server started on port 8080
2026-08-08 07:52:00 Info Service health check passed
2026-08-08 07:52:05 info Worker thread finished
```

- **What you typed**: You typed `grep -i info app.log` using the `-i` option.
- **Why you typed it**: You wanted to find all occurrences of "info" regardless of whether letters were uppercase or lowercase.
- **What happened**: Linux searched the file in case-insensitive mode and returned all variations.

---

### Example 3: Count total matching lines

Run `grep -c INFO app.log` to count how many lines contain "INFO".

```bash
ubuntu@ip-172-31-14-151:~$ grep -c INFO app.log
```

### Output

```bash
3
```

- **What you typed**: You typed `grep -c INFO app.log` using the `-c` option.
- **Why you typed it**: You wanted to know the total count of matching lines instead of reading through all the lines.
- **What happened**: Linux counted 3 matching lines and printed only the number.

---

### Example 4: Filter running system processes

Run `ps aux | grep ubuntu` to display only processes owned by or containing "ubuntu".

```bash
ubuntu@ip-172-31-14-151:~$ ps aux | grep ubuntu
```

### Output

```bash
ubuntu    1420  0.0  0.4  24520  9820 ?        Ss   07:50   0:00 /lib/systemd/systemd --user
ubuntu    1530  0.1  0.8 115200 18240 pts/0    S+   07:51   0:01 bash
```

- **What you typed**: You piped the process list from `ps aux` to `grep ubuntu`.
- **Why you typed it**: You wanted to filter all running system processes to find only those related to the user "ubuntu".
- **What happened**: Linux filtered out all other processes and displayed only the lines matching "ubuntu".

---

### Example 5: Filter out commented lines from a configuration file

Run `grep -v "^#" /etc/nginx/nginx.conf` to view settings without seeing comments.

```bash
ubuntu@ip-172-31-14-151:~$ grep -v "^#" /etc/nginx/nginx.conf | head -n 4
```

### Output

```bash
user www-data;
worker_processes auto;
pid /run/nginx.pid;
events {
```

- **What you typed**: You typed `grep -v "^#" /etc/nginx/nginx.conf` to invert matching on lines starting with `#`.
- **Why you typed it**: You wanted to read active configuration values without scrolling through documentation comments.
- **What happened**: Linux skipped every line starting with `#` and displayed only active configuration lines.

---

## DevOps Use Cases

- **Checking Running Services**: Combine `ps aux | grep nginx` or `ps aux | grep node` to check if an application process is alive.
- **Scanning Web Logs for Errors**: Search for `500` or `404` errors in `/var/log/nginx/access.log`.
- **Searching Secrets in Code**: Run `grep -r "AWS_SECRET" ./` before committing code to ensure credentials are not exposed.
- **Counting Failed Logins**: Count brute-force attempts in SSH logs with `grep -c "Failed password" /var/log/auth.log`.

---

## Quick Tip

To quickly filter out both comment lines (starting with `#`) and empty blank lines from any configuration file, run: `grep -Ev "^#|^$" config.conf`.

---

## Common Mistakes

- **Forgetting quotes around search strings**: If your pattern has spaces (like `"server error"`), you must wrap it in quotes or Linux treats the second word as a file name.
- **Searching a folder without -r**: If you run `grep "text" /var/log`, you will get a `Is a directory` error. Always use `grep -r "text" /var/log`.

---

## Practice Challenge

1. Open your terminal.
2. Create a test log: `echo -e "INFO Starting app\nDEBUG Check port\nINFO Running ok" > app.log`.
3. Search for the word "INFO": `grep INFO app.log`.
4. Search case-insensitively: `grep -i info app.log`.
5. Count total INFO lines: `grep -c INFO app.log`.
6. Search for your current user in active processes: `ps aux | grep $USER`.

---

## Related Commands

- [awk Command](./awk.md) - Process and format columns in text.
- [sed Command](./sed.md) - Stream editor to find and replace text.
- [cut Command](./cut.md) - Cut out specific fields from lines.
- [wc Command](../05-file-information/wc.md) - Count matching lines and words.

---

## Interview Notes

**Interview Question**: What is the difference between `grep`, `egrep` (`grep -E`), and `fgrep` (`grep -F`)?  
**Answer**: `grep` uses basic regular expressions (BRE). `egrep` (or `grep -E`) supports extended regular expressions (ERE) with operators like `|`, `+`, and `?`. `fgrep` (or `grep -F`) searches for fixed strings literally without interpreting any regex symbols, making it faster.
