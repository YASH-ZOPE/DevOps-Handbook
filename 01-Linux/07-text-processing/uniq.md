# uniq Command (Unique Lines) | Linux Command for Beginners

Learn how to use the Linux uniq command to detect, count, and remove duplicate lines with simple examples and DevOps use cases.

---

## What is this command?

The Linux `uniq` command is a tool used to filter out or count repeated lines in a file. It only checks adjacent (neighboring) lines that appear right next to each other.

---

## Why do we use this command?

We use `uniq` to count repeated log events, remove duplicate entries, and extract unique values from sorted data.

---

## Syntax

```bash
uniq [options] [input [output]]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-c` | Prefixes lines by the number of times they occur. |
| `-d` | Shows only repeated (duplicate) lines. |
| `-u` | Shows only unique lines that appear exactly once. |
| `-i` | Ignores uppercase and lowercase differences. |

---

## Examples

### Example 1: Remove adjacent duplicate lines

Run `uniq servers.txt` on sorted lines to remove repeated entries.

```bash
ubuntu@ip-172-31-14-151:~$ echo -e "nginx\nnginx\nredis\nnginx" | uniq
```

### Output

```bash
nginx
redis
nginx
```

- **What you typed**: You piped text with duplicates into `uniq`.
- **Why you typed it**: You wanted to filter duplicate lines.
- **What happened**: Linux merged the first two adjacent "nginx" lines into one, but left the last "nginx" because it was separated by "redis".

---

### Example 2: Count occurrences of sorted lines

Run `sort | uniq -c` to count how many times each item appears.

```bash
ubuntu@ip-172-31-14-151:~$ echo -e "192.168.1.1\n10.0.0.1\n192.168.1.1" | sort | uniq -c
```

### Output

```bash
      1 10.0.0.1
      2 192.168.1.1
```

- **What you typed**: You piped IP addresses through `sort` and then `uniq -c`.
- **Why you typed it**: You sorted the lines first so duplicate IPs were adjacent, then counted their frequency with `-c`.
- **What happened**: Linux counted 1 request for `10.0.0.1` and 2 requests for `192.168.1.1`.

---

### Example 3: Show only duplicate entries

Run `sort | uniq -d` to locate lines that appear more than once.

```bash
ubuntu@ip-172-31-14-151:~$ echo -e "apple\nbanana\napple\norange" | sort | uniq -d
```

### Output

```bash
apple
```

- **What you typed**: You sorted the list and piped it into `uniq -d`.
- **Why you typed it**: You wanted to identify which entries were duplicates.
- **What happened**: Linux filtered out all single entries and displayed only "apple".

---

## DevOps Use Cases

- **Counting Top Web Visitors**: Extract IPs from access logs, sort them, and count traffic using `awk '{print $1}' access.log | sort | uniq -c | sort -nr`.
- **Finding Duplicate Config Keys**: Check for duplicate environment variables or configuration entries across `.env` files.
- **Aggregating Server Errors**: Group identical error messages in logs to identify the most frequent application failures.
- **Cleaning Deployment Lists**: Deduplicate server hostnames or target container names before executing deployment scripts.

---

## Quick Tip

Because `uniq` only checks adjacent lines, always pipe through `sort` first (`sort filename | uniq`) to ensure every duplicate line in the file is caught.

---

## Common Mistakes

- **Running uniq on unsorted files**: If identical lines are separated by other lines, `uniq` will not remove them. Always sort first.
- **Expecting uniq to sort lines**: `uniq` only filters consecutive duplicates; it does not organize lines alphabetically or numerically.

---

## Practice Challenge

1. Open your terminal.
2. Create a test file: `echo -e "prod\ndev\nprod\nstaging\nprod" > envs.txt`.
3. Sort the file and remove duplicates: `sort envs.txt | uniq`.
4. Count the frequency of each environment: `sort envs.txt | uniq -c`.
5. Show only the environment that is repeated: `sort envs.txt | uniq -d`.

---

## Related Commands

- [sort Command](./sort.md) - Sort lines of text alphabetically or numerically.
- [wc Command](../05-file-information/wc.md) - Count lines, words, and characters.
- [awk Command](./awk.md) - Extract and process columns from text.
- [grep Command](./grep.md) - Search for specific lines and patterns.

---

## Interview Notes

**Interview Question**: How do you find the top 5 most frequent client IP addresses from an Nginx access log file?  
**Answer**: `awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 5`. This extracts the IP column, groups identical IPs, counts them, sorts them by count from highest to lowest, and shows the top 5.
