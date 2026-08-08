# tee Command (T-Splitter) | Linux Command for Beginners

Learn how to use the Linux tee command to split output to both the screen and a file with simple examples and DevOps use cases.

---

## What is this command?

The Linux `tee` command reads standard input and writes it to two places at once: your terminal screen and one or more files. It gets its name from the "T" pipe fitting used in plumbing that splits one water stream into two.

---

## Why do we use this command?

We use `tee` to watch command output live in the terminal while automatically saving the exact same output to a log file.

---

## Syntax

```bash
command | tee [options] [filename]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-a` | Appends output to the end of the file instead of overwriting it. |
| `-i` | Ignores interrupt signals (like `Ctrl+C`) during write operations. |

---

## Examples

### Example 1: View output on screen and save to a file

Run `echo "Deployment v1.2 started" | tee deploy.log` to print the message and save it into `deploy.log`.

```bash
ubuntu@ip-172-31-14-151:~$ echo "Deployment v1.2 started" | tee deploy.log
```

### Output

```bash
Deployment v1.2 started
```

- **What you typed**: You piped text from `echo` to `tee deploy.log`.
- **Why you typed it**: You wanted to see the message printed on screen and save it to `deploy.log` at the same time.
- **What happened**: Linux displayed the text on your screen and created `deploy.log` with the exact same content.

---

### Example 2: Append output without overwriting

Run `echo "Deployment finished" | tee -a deploy.log` using `-a` to append text to the file.

```bash
ubuntu@ip-172-31-14-151:~$ echo "Deployment finished" | tee -a deploy.log
ubuntu@ip-172-31-14-151:~$ cat deploy.log
```

### Output

```bash
Deployment finished
Deployment v1.2 started
Deployment finished
```

- **What you typed**: You piped text to `tee -a deploy.log` and then viewed the file with `cat`.
- **Why you typed it**: You used `-a` so the new line would be added to the bottom of `deploy.log` without deleting the old contents.
- **What happened**: Linux printed the new line to the screen and appended it to the file.

---

### Example 3: Write to protected system files with sudo

Run `echo "127.0.0.1 custom-domain.local" | sudo tee -a /etc/hosts` to write to root-owned files.

```bash
ubuntu@ip-172-31-14-151:~$ echo "127.0.0.1 custom-domain.local" | sudo tee -a /etc/hosts
```

### Output

```bash
127.0.0.1 custom-domain.local
```

- **What you typed**: You sent text through a pipe to `sudo tee -a /etc/hosts`.
- **Why you typed it**: Standard redirection (`sudo echo ... > /etc/hosts`) fails because the shell does the redirection as a normal user.
- **What happened**: `sudo tee` ran with root permissions and safely wrote the line into `/etc/hosts`.

---

## DevOps Use Cases

- **Writing Protected System Files**: Add repository URLs or DNS mappings to root-owned files in automation scripts without permission errors.
- **Recording Build Pipelines**: Stream Jenkins or GitHub Actions build outputs to the console runner while saving the full log to an artifact file.
- **Auditing Automation Scripts**: Capture setup outputs during Ansible or bash installations for post-deployment review.
- **Duplicating Log Streams**: Send server monitoring metrics to multiple destination files simultaneously.

---

## Quick Tip

Standard shell redirection (`sudo echo "text" > /etc/protected.conf`) gives a "Permission denied" error because the redirection happens before `sudo` runs. Using `echo "text" | sudo tee /etc/protected.conf` solves this problem.

---

## Common Mistakes

- **Forgetting the -a flag**: Without `-a`, `tee` will overwrite all previous content in the destination file.
- **Running tee without input**: If you run `tee file.txt` without a pipe or file input, it will wait for you to type in the terminal until you press `Ctrl+D`.

---

## Practice Challenge

1. Open your terminal.
2. Create and write to a log file: `echo "Step 1 complete" | tee setup.log`.
3. Check the file content: `cat setup.log`.
4. Append a second step: `echo "Step 2 complete" | tee -a setup.log`.
5. View both lines in the file: `cat setup.log`.

---

## Related Commands

- [cat Command](../04-file-viewing-editing/cat.md) - View the entire content of a file.
- [echo Command](../04-file-viewing-editing/echo.md) - Print lines of text to the terminal.
- [tail Command](../04-file-viewing-editing/tail.md) - Watch real-time log additions.
- [grep Command](./grep.md) - Search for specific text inside files.

---

## Interview Notes

**Interview Question**: Why does `sudo echo "nameserver 8.8.8.8" > /etc/resolv.conf` fail with Permission Denied, and how does `tee` fix it?  
**Answer**: Redirection (`>`) is executed by the current unprivileged shell before `sudo` runs. `echo "nameserver 8.8.8.8" | sudo tee -a /etc/resolv.conf` fixes it because the command `tee` runs with elevated root permissions and handles writing to the file directly.
