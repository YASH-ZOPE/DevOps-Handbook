# nohup Command (No Hangup) | Linux Command for Beginners

Learn how to use the Linux nohup command to keep programs running in the background even after closing your terminal or SSH session.

---

## What is this command?

The Linux `nohup` command stands for **No Hangup**. It allows commands and scripts to keep running in the background even after you close your terminal or log out of SSH.

---

## Why do we use this command?

We use `nohup` to run long tasks like database backups, deployments, and server scripts without worrying about network disconnects or closed terminal sessions.

---

## Syntax

```bash
nohup command [arguments] &
```

---

## Useful Options

| Usage Pattern | What it does |
|---|---|
| `nohup <command> &` | Runs a command in the background while ignoring hangup signals. |
| `> file.log` | Redirects standard output from nohup to a specified log file. |
| `2>&1` | Redirects error messages into the same log file as standard output. |
| `--help` | Shows standard usage instructions. |

---

## Examples

### Example 1: Run a background script that survives logout

Run `nohup ./backup.sh &` to start a backup script in the background.

```bash
ubuntu@ip-172-31-14-151:~$ nohup ./backup.sh &
```

### Output

```bash
[1] 3540
nohup: ignoring input and appending output to 'nohup.out'
```

- **What you typed**: You typed `nohup ./backup.sh &` using `nohup` and the trailing ampersand `&`.
- **Why you typed it**: You wanted `backup.sh` to run in the background without stopping if your SSH session breaks.
- **What happened**: Linux launched job 1 with process ID 3540 and redirected all output into a file named `nohup.out`.

---

### Example 2: View output produced by a nohup job

Run `cat nohup.out` to inspect the output saved by your background process.

```bash
ubuntu@ip-172-31-14-151:~$ cat nohup.out
```

### Output

```bash
Starting database backup at 07:50...
Database backup finished successfully.
```

- **What you typed**: You typed `cat nohup.out` to read the log file.
- **Why you typed it**: By default, `nohup` writes all printed output to `nohup.out` in the current folder.
- **What happened**: Linux displayed all lines printed by the background script while it was running.

---

### Example 3: Redirect nohup output to a custom log file

Run `nohup python3 server.py > server.log 2>&1 &` to store output in a specific log file.

```bash
ubuntu@ip-172-31-14-151:~$ nohup python3 server.py > server.log 2>&1 &
```

### Output

```bash
[2] 3610
```

- **What you typed**: You redirected output (`> server.log`) and error messages (`2>&1`) to `server.log`.
- **Why you typed it**: You wanted custom logging instead of filling up the default `nohup.out` file.
- **What happened**: Linux started Python process 3610 in the background and routed all printed output to `server.log`.

---

### Example 4: Verify your background nohup process is running

Run `ps aux | grep server.py` to confirm the process is still active.

```bash
ubuntu@ip-172-31-14-151:~$ ps aux | grep server.py
```

### Output

```bash
ubuntu      3610  0.2  1.1 125400 22400 ?        S    07:52   0:01 python3 server.py
```

- **What you typed**: You piped `ps aux` into `grep server.py`.
- **Why you typed it**: You wanted to check if your background script was still running properly.
- **What happened**: Linux returned PID 3610 with active status (`S`).

---

## DevOps Use Cases

- **Long Database Migrations**: Run large SQL schema updates on EC2 instances without risking broken SSH connections mid-migration.
- **Background Log Parsers**: Start lightweight python log parsing scripts on remote servers during debugging.
- **Deployment Scripts**: Run automated build scripts on remote servers that take 15 to 30 minutes to complete.
- **Temporary Mock APIs**: Run quick node or python API stubs in dev environments during integration testing.

---

## Quick Tip

Always add the ampersand `&` at the end of your `nohup` command (`nohup command &`). Without `&`, your shell terminal will stay blocked waiting for the command to finish.

---

## Common Mistakes

- **Forgetting the trailing &**: If you omit `&`, the command runs in the foreground, blocking your terminal prompt.
- **Uncontrolled log file growth**: If a program prints logs continuously, default `nohup.out` can grow very large and fill up your disk. Always redirect output to managed log files.

---

## Practice Challenge

1. Open your terminal.
2. Create a test script: `echo 'sleep 60; echo "Done"' > test.sh && chmod +x test.sh`.
3. Run the script with nohup: `nohup ./test.sh &`.
4. Check running processes: `ps aux | grep test.sh`.
5. Read the output file: `cat nohup.out`.

---

## Related Commands

- [ps Command](./ps.md) - Find background processes started with nohup.
- [kill Command](./kill.md) - Terminate background nohup processes.
- [top Command](./top.md) - Monitor running background processes live.
- [watch Command](./watch.md) - Periodically check the progress of background jobs.

---

## Interview Notes

**Interview Question**: What happens when an SSH connection drops, and how does `nohup` prevent processes from terminating?  
**Answer**: When an SSH session closes, the Linux terminal sends a `SIGHUP` (Hangup) signal to all child processes, terminating them. `nohup` catches and ignores `SIGHUP`, allowing background jobs to continue running independently under `init`/`systemd`.
