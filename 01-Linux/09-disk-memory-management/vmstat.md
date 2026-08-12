# vmstat Command (Virtual Memory Statistics) | Linux Command for Beginners

Learn how to use the Linux vmstat command to monitor system performance, virtual memory, paging, block I/O, and CPU activity with simple examples and DevOps use cases.

---

## What is this command?

The Linux `vmstat` command stands for **Virtual Memory Statistics**. It reports summary information about system processes, memory usage, swap paging, block I/O, and CPU activity.

---

## Why do we use this command?

We use `vmstat` to identify system performance bottlenecks, spot high disk I/O wait times, and monitor swap activity in real time.

---

## Syntax

```bash
vmstat [options] [delay] [count]
```

---

## Useful Options

| Option / Usage | What it does |
|---|---|
| `vmstat 2 5` | Updates output every 2 seconds for a total of 5 reports. |
| `-s` | Displays an event summary table of memory statistics. |
| `-d` | Displays detailed disk statistics for storage devices. |
| `-S m` | Displays memory values in megabytes instead of kilobytes. |
| `-a` | Displays active and inactive memory breakdown. |

---

## Examples

### Example 1: View a single system performance snapshot

Run `vmstat` without options to see an overview of memory, disk, and CPU activity.

```bash
ubuntu@ip-172-31-14-151:~$ vmstat
```

### Output

```bash
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 460800  45200 726000    0    0    12    24  110  210  1  1 98  0  0
```

- **What you typed**: You typed `vmstat` and pressed Enter.
- **Why you typed it**: You wanted a quick summary of CPU, memory, and disk I/O performance since system boot.
- **What happened**: Linux displayed one line summarizing process counts, memory stats, swap activity, block I/O, system interrupts, and CPU usage percentages.

---

### Example 2: Monitor system performance every 2 seconds

Run `vmstat 2 4` to receive 4 continuous updates spaced 2 seconds apart.

```bash
ubuntu@ip-172-31-14-151:~$ vmstat 2 4
```

### Output

```bash
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 460800  45200 726000    0    0    12    24  110  210  1  1 98  0  0
 0  0      0 460650  45200 726100    0    0     0     8   95  180  0  0 100  0  0
 0  0      0 460650  45200 726100    0    0     0     0   88  175  0  0 100  0  0
 0  0      0 460600  45200 726150    0    0     0    16   92  185  0  0 100  0  0
```

- **What you typed**: You passed delay `2` and count `4` to `vmstat`.
- **Why you typed it**: You wanted to observe live performance metrics over an 8-second window.
- **What happened**: Linux printed 1 initial summary line followed by 3 live interval updates.

---

### Example 3: View active versus inactive memory

Run `vmstat -a` to view memory broken down by active and inactive pages.

```bash
ubuntu@ip-172-31-14-151:~$ vmstat -a
```

### Output

```bash
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free  inact active   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 460800 310200 461000    0    0    12    24  110  210  1  1 98  0  0
```

- **What you typed**: You added the `-a` option.
- **Why you typed it**: Active memory is currently used by processes; inactive memory was used recently but can be reclaimed by Linux if needed.
- **What happened**: Linux replaced `buff` and `cache` columns with `inact` and `active` columns.

---

### Example 4: Display memory event statistics summary

Run `vmstat -s` to view a detailed vertical summary of memory counters.

```bash
ubuntu@ip-172-31-14-151:~$ vmstat -s | head -n 6
```

### Output

```bash
      2027928 K total memory
       840120 K used memory
       461000 K active memory
       310200 K inactive memory
       460800 K free memory
        45200 K buffer memory
```

- **What you typed**: You typed `vmstat -s` to view event totals.
- **Why you typed it**: You wanted a vertical event list of memory figures instead of a wide table.
- **What happened**: Linux displayed total memory event statistics formatted line by line.

---

## DevOps Use Cases

- **Detecting Disk I/O Bottlenecks**: Watch the `wa` (I/O Wait) column under CPU stats to identify slow hard drives causing application slowdowns.
- **Identifying Swap Thrashing**: Check `si` (swap-in) and `so` (swap-out) columns to detect when a server is running out of physical RAM and swapping heavily.
- **Auditing CPU Overhead**: Compare `us` (user code CPU usage) and `sy` (system kernel CPU usage) to determine if app code or OS kernel operations are consuming CPU power.
- **Baseline Health Auditing**: Run `vmstat 1 10` during performance stress tests to monitor system behavior under heavy load.

---

## Quick Tip

Pay special attention to the `wa` column under CPU. If `wa` is consistently above 20%, your disk drive is slowing down system performance.

---

## Common Mistakes

- **Misunderstanding line 1**: The very first line of output shows average values since the machine booted. Always look at subsequent lines for current live interval performance.
- **Reversing delay and count**: The syntax is `vmstat [delay] [count]`. Typing `vmstat 5 2` updates every 5 seconds 2 times, whereas `vmstat 2 5` updates every 2 seconds 5 times.

---

## Practice Challenge

1. Open your terminal.
2. View system statistics snapshot: `vmstat`.
3. Display stats in megabytes: `vmstat -S m`.
4. Monitor system activity every 1 second for 5 counts: `vmstat 1 5`.
5. Display memory event counts: `vmstat -s`.

---

## Related Commands

- [free Command](./free.md) - Check free and used RAM memory.
- [top Command](../08-process-management/top.md) - Monitor real-time process activity.
- [df Command](./df.md) - Check free disk space on partitions.
- [uptime Command](../10-system-information/uptime.md) - Check system uptime and load average.

---

## Interview Notes

**Interview Question**: What does a high `wa` (I/O Wait) percentage in `vmstat` mean, and how do you address it?  
**Answer**: High `wa` means CPU cores are idling while waiting for disk read or write operations to finish. Troubleshoot it by finding disk-heavy processes with tools like `iotop` or `du`, optimizing database queries, or upgrading to faster NVMe SSD storage.
