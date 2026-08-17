# rsync Command (Remote Sync) | Linux Command for Beginners

Learn how to use the Linux rsync command with simple examples, DevOps use cases, and interview tips.

---

## What is this command?

The `rsync` (Remote Sync) command synchronizes files and folders between local locations or across remote servers. It uses a delta-transfer algorithm to copy only the parts of files that changed, making transfers very fast.

---

## Why do we use this command?

We use `rsync` to back up data, sync web root folders across servers, mirror directory trees, and move large datasets efficiently over networks.

---

## Syntax

```bash
# Sync local folder to another local folder
rsync [options] source_dir/ destination_dir/

# Sync local folder to remote server over SSH
rsync [options] source_dir/ user@remote_host:/remote/directory/
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-a`, `--archive` | Archive mode; preserves permissions, owners, timestamps, symlinks, and copies recursively. |
| `-v`, `--verbose` | Shows detailed file transfer progress in the terminal. |
| `-z`, `--compress` | Compresses file data during transfer to save network bandwidth. |
| `-h`, `--human-readable` | Displays file sizes in human-readable units (KB, MB, GB). |
| `-n`, `--dry-run` | Performs a trial run without making any actual file changes. |
| `--delete` | Deletes files in destination directory that no longer exist in source directory. |
| `-e SSH_CMD` | Specifies the remote shell command to use (e.g. `-e "ssh -i key.pem"`). |

---

## Examples

### Example 1: Sync a local folder to another local backup directory

Run `rsync -av /var/www/html/ /backup/html/` to back up web files locally.

```bash
ubuntu@ip-172-31-14-151:~$ rsync -av /var/www/html/ /backup/html/
```

### Output

```bash
sending incremental file list
./
index.html
logo.png
css/
css/style.css

sent 152,410 bytes  received 76 bytes  304,972.00 bytes/sec
total size is 152,190  speedup is 1.00
```

- **What you typed**: You passed archive mode `-a` and verbose mode `-v` with source and target paths.
- **Why you typed it**: You needed to make an exact local backup copy of your web server root.
- **What happened**: `rsync` checked all files, copied missing files, preserved permissions, and printed a summary.

---

### Example 2: Sync files to a remote server using SSH

Run `rsync -avz ./src/ ubuntu@192.168.1.50:/home/ubuntu/app/` to upload code to a remote host.

```bash
ubuntu@ip-172-31-14-151:~$ rsync -avz ./src/ ubuntu@192.168.1.50:/home/ubuntu/app/
```

### Output

```bash
ubuntu@192.168.1.50's password: 
sending incremental file list
server.js
config.json

sent 4,120 bytes  received 52 bytes  8,344.00 bytes/sec
total size is 12,400  speedup is 2.97
```

- **What you typed**: You combined `-a` (archive), `-v` (verbose), and `-z` (compression).
- **Why you typed it**: You wanted to update your application code on a remote server quickly.
- **What happened**: `rsync` compared local and remote files, compressed the modified files during transfer, and updated the remote target directory.

---

### Example 3: Perform a dry run before running a real sync operation

Run `rsync -avn --delete ./website/ ubuntu@192.168.1.50:/var/www/html/` to preview changes safely.

```bash
ubuntu@ip-172-31-14-151:~$ rsync -avn --delete ./website/ ubuntu@192.168.1.50:/var/www/html/
```

### Output

```bash
sending incremental file list
deleting old-banner.png
index.html

sent 340 bytes  received 35 bytes  750.00 bytes/sec
total size is 45,000  speedup is 120.00
(DRY RUN)
```

- **What you typed**: You included `-n` (`--dry-run`) along with `--delete`.
- **Why you typed it**: You wanted to check which remote files would be overwritten or deleted before executing real changes.
- **What happened**: `rsync` printed what actions it would perform without touching any actual files.

---

### Example 4: Sync files using a custom SSH key file

Run `rsync -avz -e "ssh -i ~/.ssh/my-key.pem" ./build/ ubuntu@54.210.12.34:/var/www/site/` to sync using key authentication.

```bash
ubuntu@ip-172-31-14-151:~$ rsync -avz -e "ssh -i ~/.ssh/my-key.pem" ./build/ ubuntu@54.210.12.34:/var/www/site/
```

### Output

```bash
sending incremental file list
main.js
main.css

sent 14,250 bytes  received 68 bytes  28,636.00 bytes/sec
total size is 48,100  speedup is 3.36
```

- **What you typed**: You used `-e "ssh -i ~/.ssh/my-key.pem"` to specify SSH key options.
- **Why you typed it**: Cloud servers require custom SSH keys instead of password logins.
- **What happened**: `rsync` launched SSH with your private key and transferred updated files to the remote server.

---

## DevOps Use Cases

- **Automated Directory Backup**: Schedule daily cron jobs running `rsync -avz --delete` to copy data from app servers to dedicated backup servers.
- **Zero-Downtime Deployment**: Transfer new build artifacts to release directories before swapping web server symlinks.
- **Disaster Recovery Replication**: Sync critical data files continuously between primary and secondary cloud data centers.
- **Migrating Server Data**: Transfer gigabytes of database dumps or user upload folders smoothly when migrating to new Linux servers.

---

## Quick Tip

Pay attention to trailing slashes on source folders! `rsync -a src/ dst/` copies contents of `src` into `dst`, while `rsync -a src dst/` creates a subfolder `dst/src/`.

---

## Common Mistakes

- **Forgetting the Trailing Slash**: Leaving off the trailing slash on the source directory creates an unwanted extra subfolder inside the target folder.
- **Using --delete Without Dry Run**: Running `rsync --delete` blindly can accidentally erase destination files that you needed to keep.
- **Not Using Archive Mode (-a)**: Forgetting `-a` causes file ownership, permissions, and timestamps to be lost during transfer.

---

## Practice Challenge

1. Create a source folder with files: `mkdir -p /tmp/src && touch /tmp/src/{file1,file2}.txt`.
2. Create a destination folder: `mkdir -p /tmp/dst`.
3. Perform a dry run sync: `rsync -avn /tmp/src/ /tmp/dst/`.
4. Run the actual sync: `rsync -av /tmp/src/ /tmp/dst/`.
5. Check contents of destination: `ls -la /tmp/dst`.
6. Clean up: `rm -rf /tmp/src /tmp/dst`.

---

## Related Commands

- [scp Command](./scp.md) - Simple remote file copy utility over SSH.
- [ssh Command](./ssh.md) - Connect securely to remote Linux systems.
- [tar Command](../16-compression-archiving/tar.md) - Create compressed file archives for backups.

---

## Interview Notes

**Interview Question**: What does the trailing slash in the source directory of an `rsync` command do?  
**Answer**: A trailing slash on the source directory (`rsync -a src/ dst/`) copies only the *contents* of `src` into `dst`. Without the trailing slash (`rsync -a src dst/`), `rsync` copies the `src` folder *itself* into `dst`, resulting in `dst/src/`.
