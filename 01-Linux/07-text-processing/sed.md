# sed Command (Stream Editor) | Linux Command for Beginners

Learn how to use the Linux sed command to find, replace, insert, and delete text in files with simple examples and DevOps use cases.

---

## What is this command?

The Linux `sed` command stands for **Stream Editor**. It is a tool used to automatically search, replace, insert, and delete text in files or streams without opening an interactive editor.

---

## Why do we use this command?

We use `sed` to update configuration files during automated deployments, replace variables in scripts, and clean up server logs.

---

## Syntax

```bash
sed [options] 'command' [filename]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-i` | Modifies the file in-place (saves changes directly to the original file). |
| `-n` | Suppresses automatic printing of lines (useful with print `p` commands). |
| `-e` | Allows running multiple edit commands in a single run. |
| `-E` | Enables extended regular expressions (modern regex syntax). |

---

## Examples

### Example 1: Replace a word globally across lines

Run `sed 's/INFO/LOG/g' app.log` to replace every instance of "INFO" with "LOG".

```bash
ubuntu@ip-172-31-14-151:~$ sed 's/INFO/LOG/g' app.log
```

### Output

```bash
2026-08-08 LOG Server started on port 8080
2026-08-08 LOG User login successful
```

- **What you typed**: You typed `sed 's/INFO/LOG/g' app.log` where `s` stands for substitute and `g` means global (replace all matches in the line).
- **Why you typed it**: You wanted to find every occurrence of the word "INFO" and change it to "LOG".
- **What happened**: Linux replaced every matching word on each line and printed the result.

---

### Example 2: Print only lines that match a specific pattern

Run `sed -n '/INFO/p' app.log` to show only lines containing the word "INFO".

```bash
ubuntu@ip-172-31-14-151:~$ sed -n '/INFO/p' app.log
```

### Output

```bash
2026-08-08 INFO Server started on port 8080
2026-08-08 INFO User login successful
```

- **What you typed**: You typed `sed -n '/INFO/p' app.log` using `-n` (quiet mode) and `p` (print).
- **Why you typed it**: You wanted to suppress default line printing and only print lines that match `/INFO/`.
- **What happened**: Linux checked each line and printed only the lines containing "INFO".

---

### Example 3: Replace text directly inside a file

Run `sed -i 's/8080/443/g' server.conf` to update port numbers in the file.

```bash
ubuntu@ip-172-31-14-151:~$ sed -i 's/8080/443/g' server.conf
ubuntu@ip-172-31-14-151:~$ cat server.conf
```

### Output

```bash
PORT=443
BACKUP_PORT=443
```

- **What you typed**: You ran `sed -i 's/8080/443/g' server.conf` with the `-i` flag.
- **Why you typed it**: You wanted every instance of "8080" replaced with "443" and saved directly into `server.conf`.
- **What happened**: Linux updated the file directly on the disk without printing output to the terminal.

---

### Example 4: Delete lines matching a pattern

Run `sed '/DEBUG/d' app.log` to delete every line containing the word "DEBUG".

```bash
ubuntu@ip-172-31-14-151:~$ cat app.log | sed '/DEBUG/d'
```

### Output

```bash
2026-08-08 INFO Server started on port 8080
2026-08-08 ERROR Database connection timeout
```

- **What you typed**: You piped `app.log` to `sed '/DEBUG/d'`.
- **Why you typed it**: You used the delete command `/pattern/d` to filter out verbose debug messages.
- **What happened**: Linux removed all lines containing "DEBUG" and printed the remaining lines.

---

## DevOps Use Cases

- **Automating CI/CD Configurations**: Replace placeholder tokens (like `__DB_PASSWORD__` or `__APP_ENV__`) with secrets during GitHub Actions or Jenkins builds.
- **Switching Domain Names**: Update domain endpoints and URLs across Nginx or Apache configuration files.
- **Updating Dockerfiles**: Automate base image version bumps in Dockerfiles before building new containers.
- **Cleaning Log Files**: Strip timestamps, color codes, or unnecessary debug prefixes from server logs.

---

## Quick Tip

In `sed 's/old/new/g'`, `s` means substitute (replace) and `g` means global. Always run `sed` without the `-i` option first so you can inspect the output in your terminal before saving changes to the file.

---

## Common Mistakes

- **Forgetting the global /g flag**: Without `/g` at the end (`s/old/new/g`), `sed` only replaces the first match on each line and skips any others.
- **Using forward slashes inside file paths or URLs**: When replacing paths or URLs (which contain `/`), use a different delimiter like `#` (e.g., `sed 's#http://#https://#g'`) to avoid escape syntax errors.

---

## Practice Challenge

1. Open your terminal.
2. Create a test file: `echo -e "environment=dev\ndebug=true\nlog_level=dev" > settings.env`.
3. Replace the first "dev" with "prod": `sed 's/dev/prod/' settings.env`.
4. Replace all occurrences of "dev" with "prod": `sed 's/dev/prod/g' settings.env`.
5. Delete the line containing "debug": `sed '/debug/d' settings.env`.

---

## Related Commands

- [awk Command](./awk.md) - Pattern scanning and column processing language.
- [grep Command](./grep.md) - Search for specific strings and patterns.
- [cut Command](./cut.md) - Extract specific columns from lines.
- [vim Command](../04-file-viewing-editing/vim.md) - Interactive text editor for Linux.

---

## Interview Notes

**Interview Question**: How do you replace text containing forward slashes (like a URL or file path) using `sed`?  
**Answer**: In `sed`, you can change the default `/` delimiter to any other character such as `#`, `@`, or `|`. For example: `sed 's#/var/www#/opt/app#g' config.txt`.
