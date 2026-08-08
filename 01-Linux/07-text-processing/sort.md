# sort Command (Sort Lines of Text) | Linux Command for Beginners

Learn how to use the Linux sort command to sort lines alphabetically, numerically, or in reverse with simple examples and DevOps use cases.

---

## What is this command?

The Linux `sort` command is a tool used to order the lines of a text file. By default, it arranges lines in alphabetical order, but it can also sort numbers, columns, and file sizes.

---

## Why do we use this command?

We use `sort` to organize server logs, rank resource usage, and prepare text lines before finding duplicate entries with `uniq`.

---

## Syntax

```bash
sort [options] [filename]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-n` | Sorts lines numerically instead of alphabetically. |
| `-r` | Reverses the sort order (highest first or Z to A). |
| `-u` | Outputs only unique lines by removing duplicates. |
| `-k` | Sorts by a specific column number (e.g., `-k 2`). |
| `-h` | Sorts human-readable numbers (like 2K, 5M, 10G). |

---

## Examples

### Example 1: Sort lines alphabetically

Run `sort servers.txt` to arrange server names in alphabetical order.

```bash
ubuntu@ip-172-31-14-151:~$ sort servers.txt
```

### Output

```bash
db-primary
k8s-worker-01
nginx-web-01
redis-cache
```

- **What you typed**: You typed `sort servers.txt` and pressed Enter.
- **Why you typed it**: You wanted to organize the list of server hostnames from A to Z.
- **What happened**: Linux read the file and printed each line in alphabetical order.

---

### Example 2: Sort numbers in correct numerical order

Run `sort -n ports.txt` to sort port numbers from lowest to highest.

```bash
ubuntu@ip-172-31-14-151:~$ sort -n ports.txt
```

### Output

```bash
22
80
443
3000
8080
```

- **What you typed**: You typed `sort -n ports.txt` with the `-n` option.
- **Why you typed it**: Without `-n`, the number `3000` would be listed before `80` because "3" comes before "8" alphabetically.
- **What happened**: Linux evaluated the numbers by numerical value and printed them in ascending order.

---

### Example 3: Sort by a specific column in reverse order

Run `sort -k 2 -nr scores.txt` to sort lines by column 2 from highest to lowest.

```bash
ubuntu@ip-172-31-14-151:~$ echo -e "cpu 15\nmem 85\ndisk 45" | sort -k 2 -nr
```

### Output

```bash
mem 85
disk 45
cpu 15
```

- **What you typed**: You piped usage statistics to `sort -k 2 -nr`.
- **Why you typed it**: You targeted column 2 (`-k 2`), treated it as a number (`-n`), and reversed the order (`-r`) to show the highest usage first.
- **What happened**: Linux sorted the lines based on the second column from largest number to smallest.

---

## DevOps Use Cases

- **Finding Top Requesting IPs**: Sort web access logs by IP address and count visits using `sort access.log | uniq -c | sort -nr`.
- **Ranking Disk Usage**: Sort output from `du -sh *` using `sort -h` to find the largest directories taking up disk space.
- **Sorting Environment Variables**: Sort `.env` configuration files alphabetically to easily check for missing keys.
- **Deduplicating CI/CD Dependencies**: Sort and clean list of package dependencies before running container build stages.

---

## Quick Tip

Always use `sort` before running `uniq`. The `uniq` command only detects duplicate lines if they are right next to each other.

---

## Common Mistakes

- **Sorting numbers without the -n flag**: Without `-n`, numbers are sorted as text strings, so `100` will be placed before `20` because `1` comes before `2`.
- **Forgetting that lowercase and uppercase sort differently**: By default, uppercase letters may be sorted separately from lowercase letters depending on your system language settings.

---

## Practice Challenge

1. Open your terminal.
2. Create a test file: `echo -e "80\n22\n8080\n443\n80" > ports.txt`.
3. Sort the ports alphabetically: `sort ports.txt`.
4. Sort the ports numerically: `sort -n ports.txt`.
5. Sort numerically in reverse and remove duplicates: `sort -nru ports.txt`.

---

## Related Commands

- [uniq Command](./uniq.md) - Report or omit repeated lines.
- [cut Command](./cut.md) - Extract specific columns from lines.
- [awk Command](./awk.md) - Filter and process text columns.
- [wc Command](../05-file-information/wc.md) - Count lines and words in output.

---

## Interview Notes

**Interview Question**: Why does `sort` place `100` before `2` if you don't use `-n`?  
**Answer**: Without `-n`, `sort` performs an ASCII alphabetical comparison character by character. Since the character `'1'` has a lower ASCII value than `'2'`, `100` appears before `2`. The `-n` flag tells `sort` to treat the whole value as a mathematical number.
