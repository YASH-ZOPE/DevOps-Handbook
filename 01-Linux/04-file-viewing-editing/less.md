# less Command (File Viewer) | Linux Command for Beginners

Learn how to use the Linux less command to view large files page by page with simple examples, DevOps use cases, and interview tips.

---

## What is this command?

The Linux `less` command is a tool that lets you view the content of a file one page at a time. It is faster than other tools because it does not read the entire file before starting.

You can move through the file using these simple keys:
- Press **Spacebar** to go to the next page.
- Press **b** to go back one page.
- Press **g** to go to the very start of the file.
- Press **G** to go to the very end of the file.
- Press **q** to quit and close the file.

---

## Why do we use this command?

We use `less` to read large log files or settings files safely without loading the whole file into the system memory.

---

## Syntax

```bash
less [options] filename
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-N` | Shows line numbers next to each line of text. |
| `-S` | Cuts off long lines (chops long lines) instead of wrapping them. |
| `-i` | Ignores case (makes search not care about capital or small letters). |
| `+F` | Starts in forward mode to show new lines as they are added to the file. |

---

## Examples

### Example 1: Open a file to read it page by page

Run `less /etc/passwd` to view the user account file.

```bash
ubuntu@ip-172-31-14-151:~$ less /etc/passwd
```

### Output

```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
/etc/passwd (press SPACE for next page, q to quit)
```

- **What you typed**: You typed `less /etc/passwd` and pressed Enter.
- **Why you typed it**: You wanted to read the contents of the password file page by page.
- **What happened**: Linux opened the file in a viewer where you can scroll down using the Space key and quit using the `q` key.

---

### Example 2: View a file with line numbers

Run `less -N /var/log/syslog` to check the system messages with line numbers.

```bash
ubuntu@ip-172-31-14-151:~$ less -N /var/log/syslog
```

### Output

```bash
      1 Aug  4 10:00:01 ubuntu systemd[1]: Starting System Logging Service...
      2 Aug  4 10:00:02 ubuntu rsyslogd: [origin software="rsyslogd"] start
      3 Aug  4 10:00:03 ubuntu systemd[1]: Started System Logging Service.
~
~
(END)
```

- **What you typed**: You typed `less -N /var/log/syslog` and pressed Enter.
- **Why you typed it**: You wanted to see line numbers next to each log entry to find error lines easily.
- **What happened**: The viewer opened the syslog file with line numbers on the left.

---

### Example 3: View a file and watch for new changes

Run `less +F /var/log/nginx/access.log` to watch incoming web traffic live.

```bash
ubuntu@ip-172-31-14-151:~$ less +F /var/log/nginx/access.log
```

### Output

```bash
127.0.0.1 - - [04/Aug/2026:10:05:00 +0000] "GET / HTTP/1.1" 200 612
127.0.0.1 - - [04/Aug/2026:10:05:15 +0000] "GET /index.html HTTP/1.1" 200 612
Waiting for data... (interrupt with Control-C to search)
```

- **What you typed**: You typed `less +F /var/log/nginx/access.log` and pressed Enter.
- **Why you typed it**: You wanted to monitor new web requests in real time, similar to tailing a log.
- **What happened**: The terminal showed the last lines of the Nginx log and started waiting for new entries.

---

## DevOps Use Cases

- **Reading Server Logs**: Open and search through massive Nginx or Apache access logs in `/var/log/nginx/access.log` without using too much server memory.
- **Fixing Server Failures**: Run `less /var/log/syslog` on an AWS EC2 instance to find why a service failed to start.
- **Checking Settings**: Open settings files like `/etc/nginx/nginx.conf` safely in read-only mode so you do not make accidental changes.
- **Checking Container Logs**: Pipe container logs to less, like `docker logs my-app | less`, to scroll and search through long startup messages.

---

## Quick Tip

Inside `less`, you can search for a word by typing `/` followed by the word, and then pressing Enter. Press `n` to find the next match, or `N` to find the previous match.

---

## Common Mistakes

- **Trying to change text**: Beginners try to type text inside `less` thinking it is an editor like nano or vim. Remember that `less` is only for viewing files.
- **Getting stuck in the viewer**: Not knowing how to close the viewer. Always press `q` to quit and return to the terminal prompt.
- **Trying to scroll while monitoring**: Forgetting to press `Control+C` to pause the live monitoring mode (`+F`) before trying to scroll or search.

---

## Practice Challenge

1. Open your terminal.
2. Open the user details file using `less /etc/passwd`.
3. Press **Spacebar** to scroll down one page.
4. Type `/root` and press **Enter** to search for the word "root".
5. Press **q** to quit and return to the command line.

---

## Related Commands

- [cat Command](./cat.md) - Show the whole file at once.
- [more Command](./more.md) - Old file viewer that only moves forward.
- [tail Command](./tail.md) - Show the last lines of a file.
- [head Command](./head.md) - Show the first lines of a file.

---

## Interview Notes

**Interview Question**: Why is the `less` command preferred over `cat` or `more` for reading large files?  
**Answer**: `less` does not load the entire file into memory before opening. This makes it faster and prevents the server from running out of memory. It also lets you scroll both forward and backward, which `more` cannot do easily.
