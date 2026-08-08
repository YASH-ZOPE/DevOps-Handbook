# cut Command (Cut Out Text) | Linux Command for Beginners

Learn how to use the Linux cut command to extract sections, columns, and characters from text files with simple examples and DevOps use cases.

---

## What is this command?

The Linux `cut` command is a text tool used to pull out specific parts from each line of a file. You can cut text based on character positions, byte positions, or fields separated by a delimiter like a comma or colon.

---

## Why do we use this command?

We use `cut` to quickly extract columns from structured data like CSV files, `/etc/passwd`, or server command outputs.

---

## Syntax

```bash
cut [options] [filename]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-d` | Sets the field delimiter (separator character, like `:` or `,`). |
| `-f` | Selects which field numbers (columns) to extract. |
| `-c` | Selects specific character positions or ranges (like `1-5`). |
| `-b` | Selects specific byte positions. |

---

## Examples

### Example 1: Extract the first column from a colon-separated file

Run `cut -d: -f1 /etc/passwd` to extract only the username column.

```bash
ubuntu@ip-172-31-14-151:~$ cut -d: -f1 /etc/passwd | head -n 3
```

### Output

```bash
root
daemon
bin
```

- **What you typed**: You typed `cut -d: -f1 /etc/passwd` and used `head -n 3` to show the first 3 lines.
- **Why you typed it**: You set `:` as the separator with `-d:` and chose the first column with `-f1`.
- **What happened**: Linux cut out and printed only the first column (usernames) from the file.

---

### Example 2: Extract multiple specific columns

Run `cut -d: -f1,7 /etc/passwd` to get both the username and the default shell.

```bash
ubuntu@ip-172-31-14-151:~$ cut -d: -f1,7 /etc/passwd | head -n 3
```

### Output

```bash
root:/bin/bash
daemon:/usr/sbin/nologin
bin:/usr/sbin/nologin
```

- **What you typed**: You typed `cut -d: -f1,7 /etc/passwd` and viewed the top 3 lines.
- **Why you typed it**: You wanted to see both column 1 (user) and column 7 (shell) separated by colons.
- **What happened**: Linux printed both requested columns for each row.

---

### Example 3: Extract text by character position

Run `echo "DevOpsEngineer" | cut -c 1-6` to cut the first 6 characters of a string.

```bash
ubuntu@ip-172-31-14-151:~$ echo "DevOpsEngineer" | cut -c 1-6
```

### Output

```bash
DevOps
```

- **What you typed**: You piped the string "DevOpsEngineer" to `cut -c 1-6`.
- **Why you typed it**: You wanted to keep only characters from position 1 through position 6.
- **What happened**: Linux sliced the text and returned "DevOps".

---

## DevOps Use Cases

- **Extracting Usernames**: Get a clean list of system users from `/etc/passwd` for access audits.
- **Parsing CSV Deployments**: Extract specific columns like server IPs or app versions from deployment CSV sheets.
- **Parsing Git Branch Names**: Pipe git branch commands into `cut` to isolate branch names in automated CI/CD scripts.
- **Extracting Subnets**: Cut IP addresses by periods (`-d. -f1-3`) to group network subnets.

---

## Quick Tip

The default delimiter for `cut` is a TAB character. When working with space-separated text that has variable spaces, use `awk` instead because `cut` treats every single space as a separate column.

---

## Common Mistakes

- **Forgetting the -d delimiter option**: If you use `-f` without `-d`, `cut` will look for tab characters and may print the whole line unchanged.
- **Trying multi-character delimiters**: `cut` only supports a single delimiter character. Passing more than one character to `-d` causes an error.

---

## Practice Challenge

1. Open your terminal.
2. Create a test file: `echo -e "john,dev,london\nsarah,qa,paris\nmike,ops,berlin" > team.csv`.
3. Extract only employee names: `cut -d, -f1 team.csv`.
4. Extract employee names and cities: `cut -d, -f1,3 team.csv`.
5. Extract the first 4 characters of each line: `cut -c 1-4 team.csv`.

---

## Related Commands

- [awk Command](./awk.md) - Advanced column filtering and pattern processing.
- [sed Command](./sed.md) - Stream editor for finding and replacing text.
- [grep Command](./grep.md) - Search for specific strings in files.
- [sort Command](./sort.md) - Sort lines of text alphabetically or numerically.

---

## Interview Notes

**Interview Question**: How do you extract the IP address column from a comma-delimited log file?  
**Answer**: Use `cut -d, -f1 server.log` (assuming the IP is in column 1). Set the comma with `-d,` and choose field 1 with `-f1`.
