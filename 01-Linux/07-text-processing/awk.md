# awk Command (Pattern Scanning and Processing) | Linux Command for Beginners

Learn how to use the Linux awk command to filter, format, and process text columns with simple examples and DevOps use cases.

---

## What is this command?

The Linux `awk` command is a powerful text-processing tool named after its creators (Alfred Aho, Peter Weinberger, and Brian Kernighan). It reads files line by line, automatically splits each line into columns, and lets you print, filter, or change specific fields.

---

## Why do we use this command?

We use `awk` to pull specific columns from log files, filter lines based on conditions or time ranges, count matching events, and build clean reports from server data.

---

## Syntax

```bash
awk 'pattern {action}' filename
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-F` | Sets a custom column separator (like a colon `:` or comma `,`). |
| `-v` | Sets a variable value to use inside the awk command. |
| `-f` | Reads awk commands from a script file instead of the terminal. |

---

## Examples

### Example 1: Print specific columns from a log file

Run `awk '{print $1, $2, $4}' app.log` to print the timestamp, log level, and message columns.

```bash
ubuntu@ip-172-31-14-151:~$ awk '{print $1, $2, $4}' app.log
```

### Output

```bash
2026-08-08 07:51:55 Server
2026-08-08 07:52:00 User
2026-08-08 07:52:05 Database
```

- **What you typed**: You typed `awk '{print $1, $2, $4}' app.log` and pressed Enter.
- **Why you typed it**: You wanted to show only the date (`$1`), time (`$2`), and component name (`$4`) from each log line.
- **What happened**: Linux read `app.log` and printed only columns 1, 2, and 4 for every row.

---

### Example 2: Search for specific words in a log file

Run `awk '/INFO|DEBUG/ {print}' app.log` to print all lines containing either INFO or DEBUG.

```bash
ubuntu@ip-172-31-14-151:~$ awk '/INFO|DEBUG/ {print}' app.log
```

### Output

```bash
2026-08-08 07:51:55 INFO Server started on port 8080
2026-08-08 07:51:58 DEBUG Checking database pool connections
```

- **What you typed**: You typed `awk '/INFO|DEBUG/ {print}' app.log` and pressed Enter.
- **Why you typed it**: You wanted to filter the log file and show only lines that match the pattern `INFO` or `DEBUG`.
- **What happened**: Linux checked every line and printed only the lines matching either word.

---

### Example 3: Count matching log entries

Run `awk '/ERROR/ {count++} END {print count}' app.log` to count the total number of ERROR occurrences.

```bash
ubuntu@ip-172-31-14-151:~$ awk '/ERROR/ {count++} END {print count}' app.log
```

### Output

```bash
4
```

- **What you typed**: You typed `awk '/ERROR/ {count++} END {print count}' app.log` and pressed Enter.
- **Why you typed it**: You wanted to increment a counter every time `ERROR` appeared and print the final number at the end of the file.
- **What happened**: Linux counted 4 matching lines and printed the total number.

---

### Example 4: Filter logs by value range and line range

Run `awk 'NR>=1 && NR<=2 {print}' app.log` to display only a specific line range from the file.

```bash
ubuntu@ip-172-31-14-151:~$ awk 'NR>=1 && NR<=2 {print}' app.log
```

### Output

```bash
2026-08-08 07:51:55 INFO Server started on port 8080
2026-08-08 07:51:58 DEBUG Checking database pool connections
```

- **What you typed**: You typed `awk 'NR>=1 && NR<=2 {print}' app.log` using the `NR` (Record Number) variable.
- **Why you typed it**: You wanted to extract only lines from line 1 through line 2.
- **What happened**: Linux checked the line numbers and printed only the requested range.

---

### Example 5: Save selected columns to a new file

Run `awk '{print $1, $3}' app.log > output.txt` to extract columns and redirect the result into a new text file.

```bash
ubuntu@ip-172-31-14-151:~$ awk '{print $1, $3}' app.log > output.txt
ubuntu@ip-172-31-14-151:~$ cat output.txt
```

### Output

```bash
2026-08-08 INFO
2026-08-08 DEBUG
2026-08-08 ERROR
```

- **What you typed**: You extracted columns 1 and 3 and redirected them to `output.txt` with `>`.
- **Why you typed it**: You wanted to create a clean new summary file containing only the date and log level.
- **What happened**: Linux processed the log file and wrote the selected columns directly into `output.txt`.

---

## DevOps Use Cases

- **Parsing Web Server Logs**: Pull client IP addresses, response times, and HTTP status codes from Nginx access logs.
- **Counting Service Errors**: Count how many `500` errors or `ERROR` messages occurred during an incident using `{count++} END {print count}`.
- **Filtering by Time Range**: Filter server logs between specific timestamps during debugging (e.g., `$2 >= "07:51:55" && $2 <= "07:52:01"`).
- **Checking Disk Space**: Extract the usage percentage column from `df -h` inside a shell script to trigger automated alerts.

---

## Quick Tip

In `awk`, `$0` represents the whole line, `$1` represents the first column, `$2` represents the second column, and so on. `NR` gives the current line number, and `NF` gives the total number of columns on the line.

---

## Common Mistakes

- **Forgetting single quotes**: Awk programs must be wrapped in single quotes (`'...'`), or the shell will mistake `$1` for a bash variable.
- **Using the wrong delimiter**: By default, `awk` splits words by spaces or tabs. If you read CSV or colon-separated files, always set `-F`.
- **Mixing up $0 and $1**: `$0` prints the complete line, while `$1` prints only the first column.

---

## Practice Challenge

1. Open your terminal.
2. Create a sample log file: `echo -e "2026-08-08 INFO Auth success\n2026-08-08 ERROR DB fail\n2026-08-08 INFO Cache hit" > app.log`.
3. Print only the second column (log level): `awk '{print $2}' app.log`.
4. Search and print only INFO lines: `awk '/INFO/ {print}' app.log`.
5. Count total ERROR lines: `awk '/ERROR/ {count++} END {print count}' app.log`.

---

## Related Commands

- [cut Command](./cut.md) - Cut out sections from each line of a file.
- [sed Command](./sed.md) - Find and replace text in a file.
- [grep Command](./grep.md) - Search for specific text patterns.
- [wc Command](../05-file-information/wc.md) - Count lines, words, and characters.

---

## Interview Notes

**Interview Question**: How do you count the occurrences of a specific status code (like 404) in an access log using `awk`?  
**Answer**: `awk '$9 == "404" {count++} END {print count}' access.log`. This checks if column 9 matches "404", increments the counter, and prints the total count at the end.
