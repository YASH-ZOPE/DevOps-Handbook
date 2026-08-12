# df Command (Disk Free) | Linux Command for Beginners

Learn how to use the Linux df command to check available disk space, inspect file systems, and monitor storage usage with simple examples and DevOps use cases.

---

## What is this command?

The Linux `df` command stands for **Disk Free**. It displays the total, used, and available storage space on all mounted file systems.

---

## Why do we use this command?

We use `df` to monitor server disk space and make sure hard drives or cloud volumes do not run out of room.

---

## Syntax

```bash
df [options] [file_or_directory]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-h` | Displays disk sizes in human-readable format (MB, GB, TB). |
| `-T` | Shows the file system type (such as ext4, xfs, or tmpfs). |
| `-i` | Shows inode usage instead of disk space bytes. |
| `-a` | Includes pseudo, duplicate, and hidden file systems. |
| `-k` | Displays sizes in kilobytes. |

---

## Examples

### Example 1: View disk space in human-readable format

Run `df -h` to see available space on all drives in megabytes and gigabytes.

```bash
ubuntu@ip-172-31-14-151:~$ df -h
```

### Output

```bash
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        20G  5.2G   14G  28% /
tmpfs           990M     0  990M   0% /dev/shm
/dev/sda15      105M  6.1M   99M   6% /boot/efi
```

- **What you typed**: You typed `df -h` using the `-h` human-readable flag.
- **Why you typed it**: You wanted to check how much free disk space remains on your Linux server.
- **What happened**: Linux listed all mounted file systems showing total size, used space, available space, and usage percentage.

---

### Example 2: Show file system types

Run `df -hT` to display the file system format alongside storage numbers.

```bash
ubuntu@ip-172-31-14-151:~$ df -hT
```

### Output

```bash
Filesystem     Type      Size  Used Avail Use% Mounted on
/dev/root      ext4       20G  5.2G   14G  28% /
tmpfs          tmpfs     990M     0  990M   0% /dev/shm
/dev/sda15     vfat      105M  6.1M   99M   6% /boot/efi
```

- **What you typed**: You added `-T` to show file system types.
- **Why you typed it**: You wanted to check if partitions use `ext4`, `xfs`, `vfat`, or `tmpfs`.
- **What happened**: Linux displayed a "Type" column showing the exact file system format for each drive.

---

### Example 3: Check disk space for a specific folder path

Run `df -h /var/log` to identify which disk partition holds a specific folder.

```bash
ubuntu@ip-172-31-14-151:~$ df -h /var/log
```

### Output

```bash
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        20G  5.2G   14G  28% /
```

- **What you typed**: You passed `/var/log` as a directory path argument to `df -h`.
- **Why you typed it**: You wanted to verify which storage disk hosts log files.
- **What happened**: Linux printed disk space details for the partition holding `/var/log`.

---

### Example 4: Check inode usage on all drives

Run `df -hi` to see used and free file index nodes (inodes).

```bash
ubuntu@ip-172-31-14-151:~$ df -hi
```

### Output

```bash
Filesystem     Inodes IUsed IFree IUse% Mounted on
/dev/root        1.3M  120K  1.2M    9% /
tmpfs            247K     1  247K    1% /dev/shm
```

- **What you typed**: You used `-i` combined with `-h` to view inode counts.
- **Why you typed it**: If a system has millions of tiny files, it can run out of inodes even when free space remains.
- **What happened**: Linux displayed total, used, and free inode counts for every mounted volume.

---

## DevOps Use Cases

- **Monitoring Cloud EC2 Storage**: Run `df -h` in automated health scripts to alert DevOps engineers when disk usage exceeds 85%.
- **Preventing Production Outages**: Check disk space on database servers to avoid unexpected crashes caused by full disks.
- **Auditing Container Host Volumes**: Monitor root drive usage on Kubernetes nodes to ensure container images do not exhaust host storage.
- **Checking Log Partition Growth**: Verify that `/var/log` has enough space during high-traffic application deployments.

---

## Quick Tip

Always use `df -h` instead of plain `df`. The `-h` flag converts hard-to-read raw blocks into easy megabytes (MB) and gigabytes (GB).

---

## Common Mistakes

- **Confusing df with du**: `df` checks total disk space on whole file systems, whereas `du` measures space used by specific folders or files.
- **Ignoring inode limits**: Running out of inodes (`100% IUse%` in `df -i`) prevents Linux from creating new files, even if `df -h` shows gigabytes of free disk space.

---

## Practice Challenge

1. Open your terminal.
2. Check overall disk space in human-readable format: `df -h`.
3. Display file system types: `df -hT`.
4. Check inode usage on your system: `df -hi`.
5. Check storage space for the temporary folder: `df -h /tmp`.

---

## Related Commands

- [du Command](./du.md) - Check space used by specific files and folders.
- [free Command](./free.md) - Check system RAM and swap memory usage.
- [vmstat Command](./vmstat.md) - Monitor virtual memory, disk, and CPU statistics.
- [lsblk Command](../10-system-information/lsblk.md) - List block storage devices and drive partitions.

---

## Interview Notes

**Interview Question**: What causes a "No space left on device" error when `df -h` shows plenty of free space?  
**Answer**: The system has run out of file index nodes (inodes). Each file requires an inode to store metadata. Run `df -i` to check inode usage. If inode utilization is at 100%, delete unwanted tiny files or log files to free up inodes.
