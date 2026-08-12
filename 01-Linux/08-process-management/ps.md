# ps Command (Process Status) | Linux Command for Beginners

Learn how to use the Linux ps command to view running processes, check process IDs, and monitor system activity with simple examples and DevOps use cases.

---

## What is this command?

The Linux `ps` command stands for **Process Status**. It shows a snapshot of the processes currently running on your system.

---

## Why do we use this command?

We use `ps` to find process IDs (PIDs), check system activity, and see which programs are using CPU and memory.

---

## Syntax

```bash
ps [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-e` | Shows all running processes on the system. |
| `-f` | Shows full format listing with user names and parent process IDs. |
| `aux` | Shows detailed process list for all users (BSD style). |
| `-u` | Shows processes owned by a specific user. |
| `-p` | Shows details for a specific process ID (PID). |
| `--sort` | Sorts the process list by CPU or memory usage. |

---

## Examples

### Example 1: View processes running in the current terminal

Run `ps` without options to see processes attached to your current session.

```bash
ubuntu@ip-172-31-14-151:~$ ps
```

### Output

```bash
    PID TTY          TIME CMD
   1530 pts/0    00:00:00 bash
   2410 pts/0    00:00:00 ps
```

- **What you typed**: You typed `ps` and pressed Enter.
- **Why you typed it**: You wanted to check which programs are running in your current terminal session.
- **What happened**: Linux listed the process ID, terminal type, CPU time, and command name for active programs in this session.

---

### Example 2: View all running processes on the system

Run `ps -ef` to list every process running on the Linux machine in full detail.

```bash
ubuntu@ip-172-31-14-151:~$ ps -ef | head -n 5
```

### Output

```bash
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 07:30 ?        00:00:02 /sbin/init
root           2       0  0 07:30 ?        00:00:00 [kthreadd]
root           3       2  0 07:30 ?        00:00:00 [rcu_gp]
root         450       1  0 07:30 ?        00:00:00 /usr/lib/systemd/systemd-journald
```

- **What you typed**: You typed `ps -ef` and piped the first 5 lines to `head`.
- **Why you typed it**: You wanted to see all system processes along with their user ID and parent process ID.
- **What happened**: Linux displayed system-wide processes including background system daemons.

---

### Example 3: View processes for all users with CPU and memory usage

Run `ps aux` to get a detailed view including CPU percentage and memory percentage.

```bash
ubuntu@ip-172-31-14-151:~$ ps aux | head -n 4
```

### Output

```bash
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.4 168240 12450 ?        Ss   07:30   0:02 /sbin/init
ubuntu      1530  0.0  0.3  11520  8240 pts/0    S    07:31   0:00 -bash
www-data    2104  0.1  0.8  55400 18200 ?        S    07:35   0:01 nginx: worker process
```

- **What you typed**: You typed `ps aux` to list all running programs across all users.
- **Why you typed it**: You wanted to check resource usage percentages for running services.
- **What happened**: Linux showed process owner, PID, CPU percentage, memory percentage, and start time.

---

### Example 4: Sort processes by memory usage

Run `ps aux --sort=-%mem` to find programs using the most memory.

```bash
ubuntu@ip-172-31-14-151:~$ ps aux --sort=-%mem | head -n 4
```

### Output

```bash
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
node        3100  0.5  4.2 945200 88200 ?        Sl   07:40   0:05 node /app/server.js
www-data    2104  0.1  0.8  55400 18200 ?        S    07:35   0:01 nginx: worker process
ubuntu      1530  0.0  0.3  11520  8240 pts/0    S    07:31   0:00 -bash
```

- **What you typed**: You added `--sort=-%mem` to sort processes from highest memory to lowest memory usage.
- **Why you typed it**: You wanted to locate memory-heavy programs running on your server.
- **What happened**: Linux sorted the process list so the top memory user appeared right after the table header.

---

## DevOps Use Cases

- **Checking Application Status**: Use `ps aux | grep node` or `ps aux | grep java` to verify if your application server is active.
- **Finding Process ID before Stopping**: Locate the PID of a frozen background process so you can stop it using the `kill` command.
- **Auditing System Activity**: Check which system user owns running services on an EC2 instance or server.
- **Checking Background Workers**: Verify that worker processes like Celery or Redis background tasks are running in production.

---

## Quick Tip

Combine `ps aux` with `grep` to quickly find any specific application. For example: `ps aux | grep nginx`.

---

## Common Mistakes

- **Confusing ps aux with -aux**: Standard BSD syntax uses `ps aux` without a leading dash. Adding a dash (`ps -aux`) can produce different output or warnings on some Linux distributions.
- **Expecting live updates**: The `ps` command takes a static snapshot. If you want live real-time updates, use `top` instead.

---

## Practice Challenge

1. Open your terminal.
2. View processes in your current terminal: `ps`.
3. View all processes running on the system: `ps -ef`.
4. Filter running processes for your username: `ps -u $USER`.
5. Find the process ID of your shell: `ps aux | grep bash`.

---

## Related Commands

- [top Command](./top.md) - Monitor processes and system resources live in real time.
- [kill Command](./kill.md) - Stop or terminate a running process using its process ID.
- [killall Command](./killall.md) - Stop all running processes by program name.
- [grep Command](../07-text-processing/grep.md) - Search and filter specific processes from output.

---

## Interview Notes

**Interview Question**: What is the difference between `ps aux` and `ps -ef`?  
**Answer**: Both commands show all running processes on the machine. `ps aux` uses BSD syntax and shows CPU percentage and memory percentage. `ps -ef` uses UNIX syntax and shows parent process IDs (PPID) and complete command paths.
