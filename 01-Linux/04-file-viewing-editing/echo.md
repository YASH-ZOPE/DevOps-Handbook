# echo Command (Print Text) | Linux Command for Beginners

Learn how to use the Linux echo command to show text on the screen, print variable values, and write text to files with simple examples.

---

## What is this command?

The Linux `echo` command is a tool used to print text or values of variables to the terminal screen.

---

## Why do we use this command?

We use `echo` to show status messages in scripts, print environment details, or write text lines into settings files.

---

## Syntax

```bash
echo [options] [string]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-e` | Enables the use of backslash escape characters (like `\n` for a new line). |
| `-n` | Prints the text without adding a new line at the end. |

---

## Examples

### Example 1: Print a simple message to the screen

Run `echo` with a text string to show it on the terminal.

```bash
ubuntu@ip-172-31-14-151:~$ echo "Hello DevOps World"
```

### Output

```bash
Hello DevOps World
```

- **What you typed**: You typed `echo "Hello DevOps World"` and pressed Enter.
- **Why you typed it**: You wanted to show a text message on the terminal screen.
- **What happened**: The terminal printed the text exactly as you typed it.

---

### Example 2: Print a message with a new line character

Use the `-e` option and `\n` to print text on multiple lines.

```bash
ubuntu@ip-172-31-14-151:~$ echo -e "Line one\nLine two"
```

### Output

```bash
Line one
Line two
```

- **What you typed**: You typed `echo -e "Line one\nLine two"` and pressed Enter.
- **Why you typed it**: You wanted to print two lines of text using a single command.
- **What happened**: The `-e` option made the terminal treat `\n` as a command to start a new line.

---

### Example 3: Save a message into a file

Use the `>` character to save the output of the command into a file.

```bash
ubuntu@ip-172-31-14-151:~$ echo "nameserver 8.8.8.8" > dns.txt
```

### Output

*(This command has no standard output, but creates the file.)*

- **What you typed**: You typed `echo "nameserver 8.8.8.8" > dns.txt` and pressed Enter.
- **Why you typed it**: You wanted to create or replace a file with new text contents.
- **What happened**: Linux created a file named `dns.txt` and saved the text inside it.

---

## DevOps Use Cases

- **Writing Settings Files**: Quickly add a setting to a file, like `echo "PORT=8080" >> .env`, to configure your application.
- **Checking Shell Variables**: Show the values of environment variables like `echo $USER` or `echo $PATH`.
- **Script Logging**: Print progress messages inside Bash CI/CD scripts to show the build status.
- **Checking Command Status**: Print the exit status of the last command using `echo $?` to see if it ran successfully.

---

## Quick Tip

Always double-check if you need to use `>` or `>>` with `echo`. Using `>` will delete everything in the file before writing, while `>>` will add your text to the end of the file.

---

## Common Mistakes

- **Forgetting the -e option**: Typing `echo "Line1\nLine2"` without `-e` prints the literal characters `\n` instead of creating a new line.
- **Accidentally overwriting files**: Using `>` instead of `>>` and deleting important settings data by mistake.

---

## Practice Challenge

1. Open your terminal.
2. Type `echo "My name is Ubuntu"`.
3. Run `echo -e "First Line\nSecond Line"`.
4. Write your username to a file: `echo $USER > user.txt`.
5. Check the file using `cat user.txt`.

---

## Related Commands

- [cat Command](./cat.md) - Show the whole file at once.
- [less Command](./less.md) - View files page by page.
- [head Command](./head.md) - Show the first lines of a file.

---

## Interview Notes

**Interview Question**: What is the difference between `echo "hello" > file` and `echo "hello" >> file`?  
**Answer**: `echo "hello" > file` deletes the existing contents of the file and writes "hello". `echo "hello" >> file` adds "hello" to the end of the file without deleting the existing contents.
