# head Command (Show File Start) | Linux Command for Beginners

Learn how to use the Linux head command to view the first few lines of a text file with simple examples and DevOps use cases.

---

## What is this command?

The Linux `head` command is a tool that shows the first few lines of a text file. By default, it shows the first 10 lines of the file.

---

## Why do we use this command?

We use `head` to check the top of log files or settings files without opening the entire file.

---

## Syntax

```bash
head [options] [filename]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-n <number>` | Shows the specified number of lines (instead of the default 10). |
| `-c <number>` | Shows the first specified number of bytes (characters) of the file. |

---

## Examples

### Example 1: Show the first 10 lines of a file

Run `head` with a file path to see the top 10 lines.

```bash
ubuntu@ip-172-31-14-151:~$ head /etc/passwd
```

### Output

```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
```

- **What you typed**: You typed `head /etc/passwd` and pressed Enter.
- **Why you typed it**: You wanted to see the first few lines of the system user accounts file.
- **What happened**: The terminal printed the first 10 lines of the file directly on the screen.

---

### Example 2: Show the first 3 lines of a log file

Use the `-n` option followed by `3` to see only the first three lines of the syslog file.

```bash
ubuntu@ip-172-31-14-151:~$ head -n 3 /var/log/syslog
```

### Output

```bash
Aug  4 10:00:01 ubuntu systemd[1]: Starting System Logging Service...
Aug  4 10:00:02 ubuntu rsyslogd: [origin software="rsyslogd"] start
Aug  4 10:00:03 ubuntu systemd[1]: Started System Logging Service.
```

- **What you typed**: You typed `head -n 3 /var/log/syslog` and pressed Enter.
- **Why you typed it**: You wanted to read only the very top messages from the system logs.
- **What happened**: The terminal printed exactly the first 3 lines of the syslog file.

---

## DevOps Use Cases

- **Checking Log Formats**: Read the first few lines of a log file to check the format or timestamps without loading a huge file.
- **Checking CSV Data Headers**: Check the column headers of a large data file before processing it with a script.
- **Checking SSL Certificates**: View the top of an SSL certificate file using `head -n 5 certificate.crt` to check that it starts with the correct header line.
- **Piping Command Output**: Send long command outputs to `head` (like `ls -la /etc | head -n 5`) to see only the top few results.

---

## Quick Tip

You can pass multiple files to the `head` command at the same time. Linux will show the top lines of each file and add a header showing the filename.

---

## Common Mistakes

- **Confusing head with tail**: Using `head` when you want to see the latest entries at the end of a log file (use `tail` instead).
- **Using a negative number wrong**: In newer Linux systems, using `-n -5` means "show everything except the last 5 lines", which can confuse beginners.

---

## Practice Challenge

1. Open your terminal.
2. View the first 5 lines of the password file: `head -n 5 /etc/passwd`.
3. Try running `head -c 20 /etc/passwd` to see the first 20 characters.
4. Run a command like `ls -l /etc | head -n 3` to print the first 3 lines of the folder list.

---

## Related Commands

- [tail Command](./tail.md) - Show the last lines of a file.
- [less Command](./less.md) - View files page by page.
- [cat Command](./cat.md) - Show the whole file at once.

---

## Interview Notes

**Interview Question**: How can you print the 11th to 15th line of a file using head and tail?  
**Answer**: You can combine both commands using a pipe: `head -n 15 file.txt | tail -n 5`. This first gets the top 15 lines and then takes the last 5 lines of that output.
