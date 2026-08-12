# free Command (Free and Used Memory) | Linux Command for Beginners

Learn how to use the Linux free command to check RAM usage, swap memory, and available memory with simple examples and DevOps use cases.

---

## What is this command?

The Linux `free` command displays the total amount of free and used physical memory (RAM) and swap space on your machine.

---

## Why do we use this command?

We use `free` to check system RAM usage, monitor swap memory, and ensure a server has enough memory available for applications.

---

## Syntax

```bash
free [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-h` | Displays memory numbers automatically in human-readable format (MB, GB). |
| `-m` | Displays memory numbers in megabytes (MB). |
| `-g` | Displays memory numbers in gigabytes (GB). |
| `-s` | Continuously polls memory usage every N seconds. |
| `-t` | Displays a total line combining RAM and swap space. |

---

## Examples

### Example 1: View memory in human-readable format

Run `free -h` to inspect system RAM in clear megabytes and gigabytes.

```bash
ubuntu@ip-172-31-14-151:~$ free -h
```

### Output

```bash
               total        used        free      shared  buff/cache   available
Mem:           1.9Gi       820Mi       450Mi        12Mi       709Mi       1.0Gi
Swap:             0B          0B          0B
```

- **What you typed**: You typed `free -h` using the `-h` flag.
- **Why you typed it**: You wanted to check how much RAM is free and available on your server.
- **What happened**: Linux listed total RAM, used RAM, free RAM, buffer/cache RAM, and available memory.

---

### Example 2: View memory usage in megabytes

Run `free -m` to view exact memory figures rounded to megabytes.

```bash
ubuntu@ip-172-31-14-151:~$ free -m
```

### Output

```bash
               total        used        free      shared  buff/cache   available
Mem:            1980         820         450          12         709        1010
Swap:              0           0           0
```

- **What you typed**: You passed `-m` to output memory in megabytes.
- **Why you typed it**: You needed exact megabyte figures to calculate memory allocation for a script.
- **What happened**: Linux printed all memory metrics in MB values.

---

### Example 3: View memory usage with a total summary line

Run `free -h -t` to include a total row combining RAM and Swap space.

```bash
ubuntu@ip-172-31-14-151:~$ free -h -t
```

### Output

```bash
               total        used        free      shared  buff/cache   available
Mem:           1.9Gi       820Mi       450Mi        12Mi       709Mi       1.0Gi
Swap:             0B          0B          0B
Total:         1.9Gi       820Mi       450Mi
```

- **What you typed**: You added `-t` to display total memory sums.
- **Why you typed it**: You wanted a combined overview of RAM and swap capacity.
- **What happened**: Linux added a `Total:` row summing up physical RAM and swap rows.

---

### Example 4: Continuously refresh memory usage every 3 seconds

Run `free -h -s 3` to continuously observe live memory updates.

```bash
ubuntu@ip-172-31-14-151:~$ free -h -s 3
```

### Output

```bash
               total        used        free      shared  buff/cache   available
Mem:           1.9Gi       820Mi       450Mi        12Mi       709Mi       1.0Gi
Swap:             0B          0B          0B

               total        used        free      shared  buff/cache   available
Mem:           1.9Gi       822Mi       448Mi        12Mi       709Mi       1.0Gi
Swap:             0B          0B          0B
```

- **What you typed**: You used `-s 3` to update stats every 3 seconds.
- **Why you typed it**: You wanted to observe memory changes while launching an application.
- **What happened**: Linux printed refreshed memory rows every 3 seconds until you pressed `Ctrl + C`.

---

## DevOps Use Cases

- **Checking RAM Before App Deployments**: Run `free -h` to verify that an EC2 instance has enough available memory before starting Java or Node.js services.
- **Detecting Out-Of-Memory Risks**: Monitor available RAM to prevent the Linux kernel OOM Killer from terminating production processes.
- **Swap Space Monitoring**: Check if heavy swap activity is slowing down server performance.
- **Container Host Sizing**: Measure memory consumption on Docker hosts to optimize container resource limits.

---

## Quick Tip

Always look at the `available` column (not `free`) to see how much memory your server can safely give to new applications.

---

## Common Mistakes

- **Panicking when "free" RAM is low**: Linux automatically uses unused RAM for file caching (`buff/cache`). This is normal behavior. The `available` column shows true usable memory.
- **Ignoring Swap usage**: If swap usage is high, your server will slow down dramatically because hard drives are much slower than physical RAM.

---

## Practice Challenge

1. Open your terminal.
2. Check memory usage in human-readable units: `free -h`.
3. Check memory usage in megabytes: `free -m`.
4. Display total memory including swap space: `free -h -t`.
5. Refresh memory stats every 2 seconds: `free -h -s 2` (press `Ctrl + C` to stop).

---

## Related Commands

- [top Command](../08-process-management/top.md) - View live process CPU and RAM usage in real time.
- [vmstat Command](./vmstat.md) - Monitor virtual memory, swap activity, and CPU stats.
- [df Command](./df.md) - Check free disk space on mounted drives.
- [ps Command](../08-process-management/ps.md) - Sort processes by RAM consumption (`ps aux --sort=-%mem`).

---

## Interview Notes

**Interview Question**: What is the difference between the `free` and `available` columns in `free -h` output?  
**Answer**: The `free` column shows RAM that is completely untouched and empty. The `available` column estimates how much RAM is actually ready for starting new applications without swapping, combining free memory with reusable file cache memory.
