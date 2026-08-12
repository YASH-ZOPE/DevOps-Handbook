# killall Command (Kill Processes by Name) | Linux Command for Beginners

Learn how to use the Linux killall command to stop all instances of a running process by its name with simple examples and DevOps use cases.

---

## What is this command?

The Linux `killall` command terminates running processes by using their program name instead of individual process IDs.

---

## Why do we use this command?

We use `killall` to stop all instances of a multi-process service at once without looking up every Process ID manually.

---

## Syntax

```bash
killall [options] <process_name>
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-9` | Forces immediate termination of all processes matching the name. |
| `-i` | Asks for confirmation before killing each process interactively. |
| `-u` | Kills only processes owned by a specific user. |
| `-v` | Displays verbose output showing which processes received signals. |
| `-w` | Waits for all targeted processes to finish exiting before returning. |

---

## Examples

### Example 1: Stop all instances of a web server by name

Run `killall nginx` to terminate all running Nginx worker processes at once.

```bash
ubuntu@ip-172-31-14-151:~$ killall nginx
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$
```

- **What you typed**: You typed `killall nginx` targeting the name "nginx".
- **Why you typed it**: Nginx runs multiple worker processes, and you wanted to stop all of them with one command.
- **What happened**: Linux found all processes named "nginx" and sent them termination signals.

---

### Example 2: Ask for confirmation before stopping processes

Run `killall -i python3` to interactively confirm each process termination.

```bash
ubuntu@ip-172-31-14-151:~$ killall -i python3
```

### Output

```bash
Kill python3(3412) ? (y/N) y
Kill python3(3415) ? (y/N) n
```

- **What you typed**: You typed `killall -i python3` using the `-i` interactive flag.
- **Why you typed it**: You wanted to selectively stop specific Python scripts without killing all of them.
- **What happened**: Linux prompted you for confirmation before sending a signal to each matching process.

---

### Example 3: Forcefully stop all background node processes

Run `killall -9 node` to force kill all Node.js instances that are stuck.

```bash
ubuntu@ip-172-31-14-151:~$ killall -9 node
```

### Output

```bash
[1]   Killed                  node /app/worker1.js
[2]+  Killed                  node /app/worker2.js
```

- **What you typed**: You typed `killall -9 node` combining signal 9 with process name "node".
- **Why you typed it**: Background worker processes were frozen and ignored standard stop commands.
- **What happened**: Linux sent SIGKILL to every running instance of "node", stopping them immediately.

---

### Example 4: Stop processes belonging to a single user

Run `killall -u ubuntu bash` to stop all bash shells belonging to user "ubuntu".

```bash
ubuntu@ip-172-31-14-151:~$ killall -u ubuntu bash
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$
```

- **What you typed**: You added `-u ubuntu` to target only processes owned by user "ubuntu".
- **Why you typed it**: You wanted to stop shell sessions for one user without affecting other system users.
- **What happened**: Linux matched both the process name "bash" and the owner "ubuntu" before terminating them.

---

## DevOps Use Cases

- **Cleaning Up CI/CD Build Agents**: Run `killall -9 docker-build` in build cleanup scripts to remove leftover test worker processes.
- **Restarting Multi-Process Web Applications**: Stop all worker processes for Python Gunicorn or Node.js clusters before starting updated code.
- **Emergency Service Shutdown**: Stop all instances of a compromised binary immediately during security incidents.
- **Development Environment Cleanup**: Clear all running background mock services or database stubs during test teardowns.

---

## Quick Tip

Always use the `-v` (verbose) flag when running `killall` on server environments so you can see exactly which processes received the stop signal.

---

## Common Mistakes

- **Misspelling process names**: `killall` requires the exact executable name. If you type `killall python` when the process name is `python3`, Linux will return `python: no process found`.
- **Accidentally stopping system processes**: Running `killall` with common names like `sh` or `bash` can close active system tasks unexpectedly.

---

## Practice Challenge

1. Open your terminal.
2. Start three background sleep processes: `sleep 300 & sleep 300 & sleep 300 &`.
3. Check running sleep processes: `ps aux | grep sleep`.
4. Stop all sleep processes at once: `killall sleep`.
5. Verify all sleep processes have stopped: `ps aux | grep sleep`.

---

## Related Commands

- [kill Command](./kill.md) - Stop a single process using its process ID.
- [ps Command](./ps.md) - View process names and process IDs.
- [fuser Command](./fuser.md) - Stop processes that are locking a port or file.
- [top Command](./top.md) - Monitor running processes live in real time.

---

## Interview Notes

**Interview Question**: What is the key difference between `kill` and `killall` in Linux?  
**Answer**: `kill` requires the exact numerical Process ID (PID) of a single target process (e.g., `kill 1530`), whereas `killall` accepts an executable process name and sends a signal to all processes matching that name (e.g., `killall nginx`).
