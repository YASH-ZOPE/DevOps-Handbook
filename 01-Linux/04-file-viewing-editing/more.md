# more Command (Page Viewer) | Linux Command for Beginners

Learn how to use the Linux more command to view text files screen by screen with simple examples and DevOps use cases.

---

## What is this command?

The Linux `more` command is a simple tool to read text files page by page. It lets you scroll down through a file but has limited backward movement compared to the modern `less` command.

You can move through the file using these simple keys:
- Press **Spacebar** to scroll down one full screen.
- Press **Enter** to scroll down line by line.
- Press **q** to quit and close the viewer.

---

## Why do we use this command?

We use `more` as a basic file viewer when the advanced `less` command is not available on a minimal Linux system.

---

## Syntax

```bash
more [options] filename
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-d` | Shows helper messages at the bottom of the screen (tells the user how to move or quit). |
| `+<number>` | Starts showing the file content from the specified line number. |

---

## Examples

### Example 1: View a file page by page

Run `more` with a file path to open it in page-by-page viewing mode.

```bash
ubuntu@ip-172-31-14-151:~$ more /etc/services
```

### Output

```bash
# Network services, Internet style
#
# Note that it is indeed a good idea to ...
tcpmux          1/tcp                           # TCP port service multiplexer
echo            7/tcp
echo            7/udp
discard         9/tcp           sink null
discard         9/udp           sink null
--More--(0%)
```

- **What you typed**: You typed `more /etc/services` and pressed Enter.
- **Why you typed it**: You wanted to read a long file page by page without scrolling off the screen.
- **What happened**: Linux opened the file, filled one terminal screen, and paused at the bottom showing `--More--(0%)`.

---

### Example 2: Start viewing a file from a specific line number

Use the `+` option to skip the beginning of a file and start reading from line 20.

```bash
ubuntu@ip-172-31-14-151:~$ more +20 /etc/passwd
```

### Output

```bash
syslog:x:102:106::/home/syslog:/usr/sbin/nologin
uuidd:x:103:107::/run/uuidd:/usr/sbin/nologin
tcpdump:x:104:108::/nonexistent:/usr/sbin/nologin
ubuntu:x:1000:1000:Ubuntu:/home/ubuntu:/bin/bash
```

- **What you typed**: You typed `more +20 /etc/passwd` and pressed Enter.
- **Why you typed it**: You wanted to skip the first 19 lines of the password file and start reading from line 20.
- **What happened**: The viewer opened the file directly starting at line 20.

---

## DevOps Use Cases

- **Minimal Server Environments**: Read settings files on legacy servers or inside minimal Docker containers where the modern `less` command is not installed.
- **Piping Command Output**: Send long command outputs to `more` (like `ls -la /etc | more`) to prevent the text from scrolling off the screen.
- **Checking Service Ports**: View the network services file `/etc/services` to check default port assignments.

---

## Quick Tip

If you pipe command output to `more` (e.g. `history | more`), the viewer will automatically exit and return to the terminal prompt once you reach the very end of the output.

---

## Common Mistakes

- **Trying to scroll up**: Beginners try to press the up arrow or the `b` key to scroll backward. In older versions of `more`, you can only move forward.
- **Getting stuck in the viewer**: Not knowing how to exit. Always press `q` to quit.

---

## Practice Challenge

1. Open your terminal.
2. Run `more /etc/services`.
3. Press **Spacebar** twice to scroll down two pages.
4. Press **Enter** five times to scroll down line by line.
5. Press **q** to exit the viewer.

---

## Related Commands

- [less Command](./less.md) - View files page by page with backward scrolling.
- [cat Command](./cat.md) - Show the whole file at once.
- [head Command](./head.md) - Show the first lines of a file.

---

## Interview Notes

**Interview Question**: What is the main difference between `more` and `less`?  
**Answer**: `less` is faster because it does not load the entire file into memory before showing it. `less` also allows scrolling backward using the `b` key, whereas `more` only allows forward scrolling.
