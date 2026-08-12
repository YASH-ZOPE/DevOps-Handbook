# top Command (Table of Processes) | Linux Command for Beginners

Learn how to use the Linux top command to monitor system performance, CPU usage, memory consumption, and running processes live in real time.

---

## What is this command?

The Linux `top` command stands for **Table of Processes**. It shows a live, interactive view of running processes and system resource usage.

---

## Why do we use this command?

We use `top` to monitor system health in real time, track CPU and memory usage, and spot slow or heavy programs instantly.

---

## Syntax

```bash
top [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-b` | Runs top in batch mode to record output into files or scripts. |
| `-n` | Sets the number of updates before top stops automatically. |
| `-u` | Monitors processes owned by a specific user only. |
| `-p` | Monitors a specific process ID (PID). |
| `-d` | Changes the refresh delay time in seconds between updates. |

---

## Examples

### Example 1: Open real-time process monitor

Run `top` without arguments to launch the interactive system monitor.

```bash
ubuntu@ip-172-31-14-151:~$ top
```

### Output

```bash
top - 07:45:12 up 1:15,  1 user,  load average: 0.08, 0.04, 0.01
Tasks: 104 total,   1 running, 103 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.2 us,  0.8 sy,  0.0 ni, 97.8 id,  0.2 wa,  0.0 hi,  0.0 si
MiB Mem :   1980.4 total,    450.2 free,    820.6 used,    709.6 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1010.5 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   2104 www-data  20   0   55400  18200   6400 S   1.3   0.8   0:01.45 nginx
   3100 node      20   0  945200  88200  32100 S   0.7   4.2   0:05.12 node
   1530 ubuntu    20   0   11520   8240   3400 S   0.0   0.3   0:00.18 bash
```

- **What you typed**: You typed `top` and pressed Enter.
- **Why you typed it**: You wanted to see live CPU, RAM, and process activity.
- **What happened**: Linux opened an interactive dashboard that refreshes process usage automatically every 3 seconds.

---

### Example 2: Monitor processes owned by a specific user

Run `top -u ubuntu` to view only the processes owned by the user "ubuntu".

```bash
ubuntu@ip-172-31-14-151:~$ top -u ubuntu
```

### Output

```bash
top - 07:46:00 up 1:16,  1 user,  load average: 0.05, 0.03, 0.00
Tasks: 104 total,   1 running, 103 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.5 us,  0.3 sy,  0.0 ni, 99.2 id,  0.0 wa,  0.0 hi,  0.0 si

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1530 ubuntu    20   0   11520   8240   3400 S   0.0   0.3   0:00.18 bash
   4210 ubuntu    20   0   24500   4100   3100 R   0.0   0.2   0:00.02 top
```

- **What you typed**: You typed `top -u ubuntu` using the `-u` flag.
- **Why you typed it**: You wanted to focus on programs started by a single user account.
- **What happened**: Linux filtered out all root and daemon processes, displaying only processes belonging to "ubuntu".

---

### Example 3: Save a single system snapshot to a log file

Run `top -b -n 1 > system_snapshot.txt` to capture system status non-interactively.

```bash
ubuntu@ip-172-31-14-151:~$ top -b -n 1 | head -n 8
```

### Output

```bash
top - 07:47:10 up 1:17,  1 user,  load average: 0.02, 0.02, 0.00
Tasks: 104 total,   1 running, 103 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.3 us,  0.3 sy,  0.0 ni, 99.4 id,  0.0 wa,  0.0 hi,  0.0 si
MiB Mem :   1980.4 total,    450.2 free,    820.6 used,    709.6 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1010.5 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
```

- **What you typed**: You ran `top -b -n 1` in batch mode for 1 update cycle.
- **Why you typed it**: You wanted to capture a quick text snapshot of system usage inside a automated script or log file.
- **What happened**: Linux printed 1 static update of top directly to standard output without starting the interactive interface.

---

### Example 4: Monitor a single process by its process ID

Run `top -p 2104` to track resource consumption for Nginx worker process 2104.

```bash
ubuntu@ip-172-31-14-151:~$ top -p 2104
```

### Output

```bash
top - 07:48:30 up 1:18,  1 user,  load average: 0.01, 0.01, 0.00
Tasks:   1 total,   0 running,   1 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni, 100.0 id,  0.0 wa,  0.0 hi,  0.0 si

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   2104 www-data  20   0   55400  18200   6400 S   0.0   0.8   0:01.45 nginx
```

- **What you typed**: You specified `-p 2104` with the target process ID.
- **Why you typed it**: You wanted to isolate and monitor one specific server process.
- **What happened**: Linux displayed only PID 2104 in the live process table.

---

## DevOps Use Cases

- **Real-Time Server Health Monitoring**: Open `top` when logging into an EC2 server to immediately check overall CPU load and memory usage.
- **Identifying Memory Leaks**: Watch memory consumption (`%MEM`) over time to see if an application process is consuming RAM continuously.
- **Troubleshooting High CPU Usage**: Press `P` inside `top` to sort processes by CPU usage and identify resource hogs during traffic spikes.
- **Automated Performance Logging**: Use `top -b -n 1 >> server_metrics.log` in cron jobs to log system health periodically.

---

## Quick Tip

While `top` is running, press `M` on your keyboard to sort processes by memory usage, `P` to sort by CPU usage, and `q` to quit.

---

## Common Mistakes

- **Not knowing how to exit**: Beginners often get stuck in `top`. Simply press `q` to return to your normal terminal command line.
- **Misinterpreting idle CPU**: In the `%Cpu(s)` line, `id` stands for idle CPU percentage. A high idle number means your system has plenty of free CPU power available.

---

## Practice Challenge

1. Open your terminal.
2. Launch the real-time system monitor: `top`.
3. Press `M` inside `top` to sort processes by RAM usage.
4. Press `P` to switch back to CPU sorting.
5. Press `q` to exit.
6. Run top for 1 update cycle in batch mode: `top -b -n 1`.

---

## Related Commands

- [ps Command](./ps.md) - View a single snapshot of running system processes.
- [kill Command](./kill.md) - Stop or terminate a process using its process ID.
- [free Command](../09-disk-memory-management/free.md) - View total, used, and available system memory.
- [uptime Command](../10-system-information/uptime.md) - Check system uptime and average CPU load.

---

## Interview Notes

**Interview Question**: What do the three numbers in the load average line mean in `top` output?  
**Answer**: The three numbers show the average system load over the last 1 minute, 5 minutes, and 15 minutes. Load average counts active processes using or waiting for CPU and disk I/O. If the number is higher than your total CPU core count, the server is overloaded.
