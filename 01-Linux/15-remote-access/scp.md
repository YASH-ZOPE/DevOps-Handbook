# scp Command (Secure Copy Protocol) | Linux Command for Beginners

Learn how to use the Linux scp command with simple examples, DevOps use cases, and interview tips.

---

## What is this command?

The `scp` (Secure Copy Protocol) command copies files and folders securely between two machines over a network. It uses SSH for data transfer and authentication, keeping your files encrypted while moving them.

---

## Why do we use this command?

We use `scp` to quickly upload local configuration files and application code to remote servers, or download remote log files and database backups to a local machine.

---

## Syntax

```bash
# Copy local file to remote server
scp [options] local_file user@remote_host:/remote/directory/

# Copy remote file to local machine
scp [options] user@remote_host:/remote/file local_directory/
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-r` | Copies entire folders recursively. |
| `-i identity_file` | Uses a specific private key file for SSH authentication. |
| `-P port` | Specifies a non-default remote SSH port (note uppercase `P`). |
| `-v` | Enables verbose mode to print SSH connection details. |
| `-C` | Enables compression to speed up file copy on slow networks. |

---

## Examples

### Example 1: Upload a local file to a remote server

Run `scp app.conf ubuntu@192.168.1.50:/home/ubuntu/` to copy a config file to a remote server.

```bash
ubuntu@ip-172-31-14-151:~$ scp app.conf ubuntu@192.168.1.50:/home/ubuntu/
```

### Output

```bash
ubuntu@192.168.1.50's password: 
app.conf                                      100% 2048    45.2KB/s   00:00
```

- **What you typed**: You specified the source file `app.conf` and the destination remote path `/home/ubuntu/`.
- **Why you typed it**: You updated local configuration settings and needed to push the file to a remote web server.
- **What happened**: `scp` authenticated over SSH and uploaded `app.conf` to the specified remote folder.

---

### Example 2: Download a file from a remote server to local machine

Run `scp ubuntu@192.168.1.50:/var/log/nginx/error.log ./` to fetch a remote log file.

```bash
ubuntu@ip-172-31-14-151:~$ scp ubuntu@192.168.1.50:/var/log/nginx/error.log ./
```

### Output

```bash
ubuntu@192.168.1.50's password: 
error.log                                     100%   12KB   124.5KB/s   00:00
```

- **What you typed**: You placed the remote file path first, followed by `./` for the local current folder.
- **Why you typed it**: You needed to analyze Nginx error logs locally on your machine.
- **What happened**: `scp` downloaded `error.log` from the remote machine into your current working directory.

---

### Example 3: Copy an entire folder recursively using an SSH key

Run `scp -r -i ~/.ssh/my-key.pem ./website/ ubuntu@54.210.12.34:/var/www/html/` to copy a site folder to AWS EC2.

```bash
ubuntu@ip-172-31-14-151:~$ scp -r -i ~/.ssh/my-key.pem ./website/ ubuntu@54.210.12.34:/var/www/html/
```

### Output

```bash
index.html                                    100% 4096   210.1KB/s   00:00
style.css                                     100% 1200   150.3KB/s   00:00
app.js                                        100% 8192   420.8KB/s   00:00
```

- **What you typed**: You used `-r` to copy recursively and `-i` to provide your private key file.
- **Why you typed it**: You wanted to deploy static website files to an AWS EC2 instance.
- **What happened**: `scp` authenticated using the key and copied all files inside `./website/` to the remote web folder.

---

### Example 4: Copy a file between two remote servers

Run `scp user1@server1:/tmp/data.tar.gz user2@server2:/tmp/` to transfer a file directly between remote hosts.

```bash
ubuntu@ip-172-31-14-151:~$ scp user1@server1:/tmp/data.tar.gz user2@server2:/tmp/
```

### Output

```bash
data.tar.gz                                   100%   50MB   12.4MB/s   00:04
```

- **What you typed**: You passed remote source and remote destination syntax.
- **Why you typed it**: You needed to move a backup archive directly from a staging server to a backup server.
- **What happened**: Your local machine instructed `server1` to send `data.tar.gz` straight to `server2`.

---

## DevOps Use Cases

- **Uploading Build Artifacts**: Copy compiled binaries or `.jar` files to deployment target servers in CI/CD pipeline steps.
- **Downloading Server Logs**: Retrieve log files from cloud servers for offline troubleshooting and debugging.
- **Deploying SSL Certificates**: Upload newly generated SSL certificate files (`fullchain.pem`, `privkey.pem`) to remote Nginx servers.
- **Distributing Config Files**: Copy updated `.env` or application configuration files across a fleet of Linux servers.

---

## Quick Tip

Remember port flag case differences! SSH uses lowercase `-p 22`, while `scp` uses uppercase `-P 22` to specify custom SSH ports.

---

## Common Mistakes

- **Forgetting -r for Folders**: Running `scp ./folder user@remote:/path/` without `-r` fails with `not a regular file`.
- **Confusing Port Flags**: Using `-p` instead of `-P` when specifying a custom port in `scp`.
- **Overwriting Files Unintentionally**: `scp` overwrites existing files at the destination without asking for confirmation.

---

## Practice Challenge

1. Create a dummy file locally: `echo "Hello DevOps" > test.txt`.
2. Create a temporary target directory: `mkdir -p /tmp/scp-test`.
3. Copy the file to your local machine using `scp`: `scp test.txt localhost:/tmp/scp-test/`.
4. Verify the file exists: `cat /tmp/scp-test/test.txt`.
5. Clean up temporary files: `rm -rf test.txt /tmp/scp-test`.

---

## Related Commands

- [ssh Command](./ssh.md) - Open a secure shell session on a remote Linux host.
- [rsync Command](./rsync.md) - Faster alternative to scp for syncing files and directories.
- [cp Command](../03-file-directory-management/cp.md) - Copy files locally on the same filesystem.

---

## Interview Notes

**Interview Question**: What is the difference between `scp` and `rsync`?  
**Answer**: `scp` blindly reads and writes all files from source to destination every time. In contrast, `rsync` uses a delta-transfer algorithm to copy only changed parts of files, preserves permissions and timestamps, supports resuming interrupted transfers, and is much faster for recurring file syncs.
