# fuser Command (File and Process User) | Linux Command for Beginners

Learn how to use the Linux fuser command to find processes using files, sockets, or network ports, and free up locked resources.

---

## What is this command?

The Linux `fuser` command stands for **File and Process User**. It identifies process IDs that are using specific files, folders, or network ports.

---

## Why do we use this command?

We use `fuser` to find which program is locking a network port (like port 80 or 8080) or preventing a storage volume from unmounting, and stop those processes.

---

## Syntax

```bash
fuser [options] <file_or_port>
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-k` | Kills processes using the specified file or network port. |
| `-v` | Displays verbose output showing process owner, PID, and command name. |
| `-n` | Specifies the protocol namespace (such as `tcp` or `udp`). |
| `-i` | Prompts for confirmation before killing processes. |
| `-m` | Lists processes accessing a mounted file system or folder. |

---

## Examples

### Example 1: Find process using a specific TCP port

Run `fuser 8080/tcp` to check which process is bound to TCP port 8080.

```bash
ubuntu@ip-172-31-14-151:~$ fuser 8080/tcp
```

### Output

```bash
8080/tcp:             3100
```

- **What you typed**: You typed `fuser 8080/tcp` targeting TCP port 8080.
- **Why you typed it**: You got a "port already in use" error and wanted to find the responsible Process ID.
- **What happened**: Linux checked active network sockets and returned PID 3100.

---

### Example 2: Show detailed information about port users

Run `fuser -v 80/tcp` to view process owners and command names for port 80.

```bash
ubuntu@ip-172-31-14-151:~$ fuser -v 80/tcp
```

### Output

```bash
                     USER        PID ACCESS COMMAND
80/tcp:              root       2104 F.... nginx
                     www-data   2105 F.... nginx
```

- **What you typed**: You added `-v` (verbose) to display user names and program names.
- **Why you typed it**: You wanted full details about which service was using web port 80.
- **What happened**: Linux printed a formatted table displaying process owners, PIDs, access types, and command names.

---

### Example 3: Find processes accessing a mounted storage folder

Run `fuser -v /mnt/data` to find programs preventing a storage folder from unmounting.

```bash
ubuntu@ip-172-31-14-151:~$ fuser -v /mnt/data
```

### Output

```bash
                     USER        PID ACCESS COMMAND
/mnt/data:           ubuntu     4120 ..c.. bash
```

- **What you typed**: You ran `fuser -v` on the folder path `/mnt/data`.
- **Why you typed it**: You tried to unmount a disk volume and received a "device is busy" error.
- **What happened**: Linux identified process 4120 (`bash`) using `/mnt/data` as its current working folder.

---

### Example 4: Kill the process holding a network port

Run `fuser -k 8080/tcp` to free up port 8080 immediately.

```bash
ubuntu@ip-172-31-14-151:~$ fuser -k 8080/tcp
```

### Output

```bash
8080/tcp:             3100
```

- **What you typed**: You added the `-k` (kill) option to terminate the target process holding port 8080.
- **Why you typed it**: You wanted to clear port 8080 so your web server could bind to it.
- **What happened**: Linux sent a SIGKILL signal to process 3100, releasing port 8080.

---

## DevOps Use Cases

- **Resolving Port Conflicts**: Quickly identify and stop orphan processes blocking ports 80, 443, 8080, or 5432 before starting Nginx or PostgreSQL.
- **Unmounting Storage Volumes**: Locate and stop processes locking storage mount points (EBS volumes or NFS shares) before running `umount`.
- **Container Cleanup**: Find host processes locking container network ports on Docker nodes.
- **Troubleshooting File Locks**: Discover which log parser or script is holding an exclusive lock on application log files.

---

## Quick Tip

Always run `fuser -v <port>/tcp` first to verify which process is running before using `fuser -k` to kill it.

---

## Common Mistakes

- **Forgetting the protocol suffix**: Typing `fuser 8080` instead of `fuser 8080/tcp` may search for a file named `8080` instead of network port 8080.
- **Killing processes blindly**: Using `-k` without checking verbose output (`-v`) can accidentally terminate critical system daemons.

---

## Practice Challenge

1. Open your terminal.
2. Start a netcat listener on port 9090 in background: `nc -l 9090 &`.
3. Check which PID is using port 9090: `fuser 9090/tcp`.
4. View detailed process information: `fuser -v 9090/tcp`.
5. Kill the process using the port: `fuser -k 9090/tcp`.

---

## Related Commands

- [kill Command](./kill.md) - Terminate specific processes by process ID.
- [ps Command](./ps.md) - View process details and owner accounts.
- [killall Command](./killall.md) - Terminate processes by program name.
- [which Command](../10-system-information/which.md) - Locate executable binaries in your PATH.

---

## Interview Notes

**Interview Question**: How do you identify and resolve a "Target port already in use" error when deploying a web application?  
**Answer**: Run `fuser -v <port>/tcp` to inspect the process name and PID currently using the port. Once verified, release the port by running `fuser -k <port>/tcp` or stopping the service with `kill <PID>`.
