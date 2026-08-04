# cat Command (Concatenate) | Linux Command for Beginners

Learn how to use the Linux cat command to view, combine, and create text files with simple examples and DevOps use cases.

---

## What is this command?

The Linux `cat` command stands for **Concatenate**. It is a simple tool used to show the content of a file, join multiple files together, and create new files.

---

## Why do we use this command?

We use `cat` to quickly read the contents of short files or merge different files into one.

---

## Syntax

```bash
cat [options] [filename]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-n` | Shows line numbers next to all lines of text. |
| `-b` | Shows line numbers only for lines that are not empty. |
| `-E` | Shows a dollar sign `$` at the end of each line to show where the line ends. |

---

## Examples

### Example 1: Show the content of a file

Run `cat /etc/hostname` to see the name of your computer.

```bash
ubuntu@ip-172-31-14-151:~$ cat /etc/hostname
```

### Output

```bash
ip-172-31-14-151
```

- **What you typed**: You typed `cat /etc/hostname` and pressed Enter.
- **Why you typed it**: You wanted to see the host name of your server.
- **What happened**: The terminal showed the text inside the hostname file directly on the screen.

---

### Example 2: Show line numbers for all lines

Run `cat -n /etc/resolv.conf` to check your DNS server settings with line numbers.

```bash
ubuntu@ip-172-31-14-151:~$ cat -n /etc/resolv.conf
```

### Output

```bash
      1 # This file is managed by man:systemd-resolved(8).
      2 nameserver 127.0.0.53
      3 options edns0 trust-ad
```

- **What you typed**: You typed `cat -n /etc/resolv.conf` and pressed Enter.
- **Why you typed it**: You wanted to see the DNS settings with line numbers to check the setup.
- **What happened**: The terminal printed the contents of the DNS settings file with line numbers on the left.

---

### Example 3: Combine two files into a new file

Combine `file1.txt` and `file2.txt` into a new file named `combined.txt`.

```bash
ubuntu@ip-172-31-14-151:~$ cat file1.txt file2.txt > combined.txt
```

### Output

*(This command has no standard output, but creates the file.)*

- **What you typed**: You typed `cat file1.txt file2.txt > combined.txt` and pressed Enter.
- **Why you typed it**: You wanted to merge two separate files into a single file.
- **What happened**: Linux combined the content of both files and saved it inside `combined.txt`.

---

## DevOps Use Cases

- **Checking Settings Files**: Quickly show the settings of a service, like `cat /etc/nginx/nginx.conf`, to check if it is correct.
- **Creating Small Files**: Create a simple settings or test file directly from the command line using `cat > test.txt`.
- **Viewing SSH Keys**: Show your public SSH key using `cat ~/.ssh/id_rsa.pub` so you can copy and add it to GitHub or AWS.
- **Adding Text to Files**: Append new lines of text to a settings file using `cat >> config.txt`.

---

## Quick Tip

Do not use `cat` to read very large files. It will dump all the text at once, filling up your terminal screen and slowing down your system. Use `less` instead.

---

## Common Mistakes

- **Using cat when less is better**: Running `cat` on huge log files which floods the terminal screen.
- **Overwriting files by mistake**: Using a single `>` (which overwrites the file) instead of a double `>>` (which adds text to the end of the file) when appending text.
- **Accidentally deleting file contents**: Running `cat > filename` without entering any text, which makes the file empty.

---

## Practice Challenge

1. Open your terminal.
2. Create a new file by typing `cat > hello.txt` and press Enter.
3. Type `Hello, DevOps World!` and press Enter.
4. Press **Control+D** to save the file.
5. View the file using `cat hello.txt`.

---

## Related Commands

- [less Command](./less.md) - View files page by page.
- [echo Command](./echo.md) - Print text to the screen or a file.
- [tail Command](./tail.md) - Show the last lines of a file.

---

## Interview Notes

**Interview Question**: What is the difference between `cat > file` and `cat >> file`?  
**Answer**: `cat > file` creates a new file or overwrites an existing file with new text. `cat >> file` adds the new text to the end of the existing file without deleting its current contents.
