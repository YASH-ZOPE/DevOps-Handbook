# tail Command (Show File End) | Linux Command for Beginners

Learn how to use the Linux tail command to view the last lines of a file and monitor logs in real time with simple examples.

---

## What is this command?

The Linux `tail` command is a tool that shows the last few lines of a text file. By default, it shows the last 10 lines of the file. It can also watch a file and show new lines as they are added.

---

## Why do we use this command?

We use `tail` to check recent log messages or monitor active server logs in real time.

---

## Syntax

```bash
tail [options] [filename]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-n <number>` | Shows the specified number of lines from the end of the file (instead of the default 10). |
| `-f` | Follows the file, showing new lines in real time as they are written. |
| `-F` | Follows the file in real time, even if the file is deleted and recreated (log rotation). |

---

## Examples

### Example 1: View the last 10 lines of a log file

Run `tail` with a log file path to see the most recent log entries.

```bash
ubuntu@ip-172-31-14-151:~$ tail /var/log/syslog
```

### Output

```bash
Aug  4 10:15:00 ubuntu systemd[1]: Starting Daily apt upgrade...
Aug  4 10:15:02 ubuntu systemd[1]: Started Daily apt upgrade.
Aug  4 10:20:01 ubuntu CRON[2839]: (root) CMD (pkg-backup.sh)
Aug  4 10:30:00 ubuntu CRON[2910]: (root) CMD (monitoring-agent.sh)
Aug  4 10:40:00 ubuntu systemd[1]: Reloading Nginx Service...
Aug  4 10:40:01 ubuntu systemd[1]: Reloaded Nginx Service.
Aug  4 10:45:00 ubuntu systemd[1]: Starting Disk Cleanup...
Aug  4 10:45:02 ubuntu systemd[1]: Started Disk Cleanup.
Aug  4 10:50:00 ubuntu CRON[3105]: (root) CMD (log-rotate.sh)
Aug  4 10:50:02 ubuntu systemd[1]: Log rotation finished.
```

- **What you typed**: You typed `tail /var/log/syslog` and pressed Enter.
- **Why you typed it**: You wanted to see the last 10 log messages of the system.
- **What happened**: The terminal printed the final 10 lines of the syslog file directly on the screen.

---

### Example 2: View the last 3 lines of a file

Use the `-n` option followed by `3` to limit the output.

```bash
ubuntu@ip-172-31-14-151:~$ tail -n 3 /var/log/auth.log
```

### Output

```bash
Aug  4 10:40:01 ubuntu sshd[2940]: Accepted publickey for ubuntu from 192.168.1.5
Aug  4 10:40:01 ubuntu sshd[2940]: pam_unix(sshd:session): session opened for user ubuntu
Aug  4 10:50:01 ubuntu sudo:   ubuntu : TTY=pts/0 ; USER=root ; COMMAND=/usr/bin/apt update
```

- **What you typed**: You typed `tail -n 3 /var/log/auth.log` and pressed Enter.
- **Why you typed it**: You wanted to see only the last 3 login or security actions.
- **What happened**: The terminal showed exactly the last 3 lines of the auth.log file.

---

### Example 3: Watch a log file in real time

Use the `-f` option to watch new log entries scroll on your screen as they occur.

```bash
ubuntu@ip-172-31-14-151:~$ tail -f /var/log/nginx/access.log
```

### Output

```bash
127.0.0.1 - - [04/Aug/2026:10:55:01 +0000] "GET /api/v1/status HTTP/1.1" 200 45
127.0.0.1 - - [04/Aug/2026:10:55:10 +0000] "POST /api/v1/login HTTP/1.1" 200 120
_
```

- **What you typed**: You typed `tail -f /var/log/nginx/access.log` and pressed Enter.
- **Why you typed it**: You wanted to watch web requests coming to the server in real time.
- **What happened**: The command stayed open and waited to show any new requests as they were made.

---

## DevOps Use Cases

- **Live Log Monitoring**: Run `tail -f /var/log/nginx/error.log` during a deployment to watch for new application errors.
- **Checking Build Logs**: Check the final lines of a Jenkins build log using `tail -n 50` to see if the job passed or failed.
- **Handling Rotated Logs**: Use `tail -F` when tracking log files that get rotated (deleted and recreated) by the system to avoid losing the connection.
- **Troubleshooting Services**: Watch syslog using `tail -f /var/log/syslog` while restarting a service to see if it starts correctly.

---

## Quick Tip

Press **Control+C** to stop the real-time monitoring mode (`-f` or `-F`) and return to the normal terminal command prompt.

---

## Common Mistakes

- **Using tail -f on huge logs without limiting**: Running `tail -f` and getting overwhelmed by too many old lines. Combine it with `-n 10 -f` to see only the last 10 lines and then follow new ones.
- **Getting stuck in follow mode**: Beginners often get stuck in `tail -f` and do not know how to exit. Always use **Control+C** to quit.

---

## Practice Challenge

1. Open your terminal.
2. View the last 5 lines of the syslog file: `tail -n 5 /var/log/syslog`.
3. Start live monitoring of syslog: `tail -f /var/log/syslog`.
4. Press **Control+C** to exit the monitoring mode.

---

## Related Commands

- [head Command](./head.md) - Show the first lines of a file.
- [less Command](./less.md) - View files page by page.
- [cat Command](./cat.md) - Show the whole file at once.

---

## Interview Notes

**Interview Question**: What is the difference between `tail -f` and `tail -F`?  
**Answer**: `tail -f` stops tracking a file if it is renamed or deleted. `tail -F` will keep trying to find the file and will resume tracking it when a new file with the same name is created (which is common during system log rotation).
