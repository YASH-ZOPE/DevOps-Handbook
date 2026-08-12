# watch Command (Execute Command Periodically) | Linux Command for Beginners

Learn how to use the Linux watch command to run any program repeatedly and monitor live outputs in real time with simple examples and DevOps use cases.

---

## What is this command?

The Linux `watch` command runs any specified command repeatedly at regular time intervals, allowing you to track changing outputs in real time.

---

## Why do we use this command?

We use `watch` to monitor live system changes like disk usage growth, network connections, process counts, or container status updates continuously.

---

## Syntax

```bash
watch [options] command
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-n` | Sets the update interval in seconds (default is 2 seconds). |
| `-d` | Highlights differences between successive updates. |
| `-t` | Hides the top header banner showing time and interval. |
| `-e` | Freezes output if the monitored command returns an error. |
| `-g` | Exits automatically when the monitored output changes. |

---

## Examples

### Example 1: Monitor free memory live every 2 seconds

Run `watch free -m` to track system RAM changes in real time.

```bash
ubuntu@ip-172-31-14-151:~$ watch free -m
```

### Output

```bash
Every 2.0s: free -m                                    ip-172-31-14-151: Wed Aug 12 07:55:00 2026

               total        used        free      shared  buff/cache   available
Mem:            1980         820         450          12         709        1010
Swap:              0           0           0
```

- **What you typed**: You typed `watch free -m` to run `free -m` repeatedly.
- **Why you typed it**: You wanted to observe real-time memory usage changes while running applications.
- **What happened**: Linux cleared the terminal screen and refreshed memory statistics every 2 seconds.

---

### Example 2: Change update interval to 5 seconds

Run `watch -n 5 df -h` to check available disk space every 5 seconds.

```bash
ubuntu@ip-172-31-14-151:~$ watch -n 5 df -h
```

### Output

```bash
Every 5.0s: df -h                                      ip-172-31-14-151: Wed Aug 12 07:55:05 2026

Filesystem      Size  Used Avail Use% Mounted on
/dev/root        20G  5.2G   14G  28% /
tmpfs           990M     0  990M   0% /dev/shm
```

- **What you typed**: You added `-n 5` to set the refresh interval to 5 seconds.
- **Why you typed it**: You wanted to monitor disk space usage less frequently to reduce CPU work.
- **What happened**: Linux updated the disk usage table every 5 seconds.

---

### Example 3: Highlight differences between updates

Run `watch -d ps aux` to highlight changing values between refreshes.

```bash
ubuntu@ip-172-31-14-151:~$ watch -d ps aux
```

### Output

```bash
Every 2.0s: ps aux                                     ip-172-31-14-151: Wed Aug 12 07:55:10 2026

USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
ubuntu      1530  0.0  0.3  11520  8240 pts/0    S    07:31   0:00 -bash
ubuntu      4820  0.1  0.2  24500  4100 pts/0    R    07:55   0:00 ps aux
```

- **What you typed**: You added the `-d` (difference) flag.
- **Why you typed it**: You wanted to visually highlight values that change between refreshes.
- **What happened**: Linux highlighted modified CPU values and process times in reverse video text.

---

### Example 4: Monitor piped commands

Run `watch -n 1 "ps aux | grep node | wc -l"` to count running Node processes every second.

```bash
ubuntu@ip-172-31-14-151:~$ watch -n 1 "ps aux | grep node | wc -l"
```

### Output

```bash
Every 1.0s: ps aux | grep node | wc -l                 ip-172-31-14-151: Wed Aug 12 07:55:15 2026

4
```

- **What you typed**: You wrapped the piped command chain inside double quotes.
- **Why you typed it**: You wanted `watch` to execute the full pipeline instead of running only `ps aux`.
- **What happened**: Linux counted active Node processes every second and displayed the total count.

---

## DevOps Use Cases

- **Kubernetes Pod Deployment Monitoring**: Track pod status transitions during deployments using `watch kubectl get pods`.
- **Monitoring Storage Fill Rate**: Watch disk space during database migrations or large file downloads (`watch -n 2 df -h`).
- **Tracking Active Network Connections**: Monitor incoming connections on web ports (`watch -n 1 "ss -tunp | grep :80"`).
- **Log File Growth Tracking**: Observe file size increases during build operations (`watch -n 2 "ls -lh app.log"`).

---

## Quick Tip

When watching commands that use pipes (`|`) or redirections (`>`), always wrap the full command inside quotes (for example: `watch "ps aux | grep nginx"`). Press `Ctrl + C` to exit `watch`.

---

## Common Mistakes

- **Forgetting quotes around pipes**: Running `watch ps aux | grep nginx` runs `watch ps aux` and pipes that whole output to `grep` once, instead of continuously filtering inside `watch`.
- **Setting extremely low intervals**: Setting `-n 0.1` refreshes ten times per second, which can consume high CPU power on live production servers.

---

## Practice Challenge

1. Open your terminal.
2. Monitor memory usage every 2 seconds: `watch free -m`.
3. Press `Ctrl + C` to exit.
4. Monitor files in `/tmp` every 1 second with difference highlighting: `watch -d -n 1 ls -l /tmp`.
5. Press `Ctrl + C` to exit.

---

## Related Commands

- [top Command](./top.md) - Monitor live process CPU and memory usage continuously.
- [ps Command](./ps.md) - Capture process status snapshots.
- [free Command](../09-disk-memory-management/free.md) - Check free and used RAM memory.
- [df Command](../09-disk-memory-management/df.md) - Check disk space usage on file systems.

---

## Interview Notes

**Interview Question**: How do you monitor container rollout status continuously during a Kubernetes deployment?  
**Answer**: Use `watch -n 2 kubectl get pods`. Adding the difference flag (`watch -d -n 2 kubectl get pods`) highlights exact status changes like `ContainerCreating` transitioning to `Running` in real time.
