# chgrp Command (Change Group Ownership) | Linux Command for Beginners

Learn how to use the Linux chgrp command to change file group ownership, delegate team permissions, manage shared repository directories, and configure group security boundaries with simple examples and DevOps use cases.

---

## What is this command?

The Linux `chgrp` (change group) command changes the group ownership of specified files and directories. It allows system administrators and file owners to reassign file access rights to specific user groups without modifying individual user ownership.

---

## Why do we use this command?

We use `chgrp` to grant department teams (e.g., `developers`, `devops`, `auditors`) shared access to application code, log files, configuration directories, and deployment artifacts. It provides a focused way to change group membership access without touching file owner settings.

---

## Syntax

```bash
chgrp [options] GROUP file...
```

The `GROUP` argument can be specified either as a group name string (e.g., `developers`) or a numerical Group ID (GID) (e.g., `1002`).

---

## Difference Between chgrp and chown

| Feature | `chgrp` Command | `chown` Command |
|---|---|---|
| Primary Focus | Changes group ownership only. | Changes user ownership, group ownership, or both. |
| User Permissions Required | Non-root file owners can change group ownership to any group they belong to. | Requires `root` privileges (or `sudo`) to change user ownership. |
| Syntax Simplicity | `chgrp developers file.txt` | `chown user:group file.txt` |

---

## Useful Options

| Option | What it does |
|---|---|
| `-R`, `--recursive` | Recursively changes group ownership across subdirectories and contained files. |
| `-v`, `--verbose` | Output a detailed confirmation log message for every processed file. |
| `-c`, `--changes` | Output log messages only when an actual group ownership change takes place. |
| `-h`, `--no-dereference` | Changes group ownership of symbolic links directly instead of the target file. |
| `--reference=RFILE` | Applies group ownership settings of `RFILE` to target files. |

---

## Examples

### Example 1: Change group ownership of a single file

Run `sudo chgrp developers release_notes.md` to reassign file group ownership.

```bash
ubuntu@ip-172-31-14-151:~$ sudo chgrp developers release_notes.md
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -l release_notes.md
-rw-r--r-- 1 ubuntu developers 840 Aug 16 22:00 release_notes.md
```

- **What you typed**: You passed target group `developers` and file `release_notes.md`.
- **Why you typed it**: Members of the `developers` group needed read/write permissions on the document.
- **What happened**: Linux updated the GID metadata in the file inode to match group `developers`.

---

### Example 2: Recursively change group ownership of a directory tree

Run `sudo chgrp -R sysadmins /opt/monitoring` to update group permissions across monitoring tools.

```bash
ubuntu@ip-172-31-14-151:~$ sudo chgrp -R sysadmins /opt/monitoring
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -ld /opt/monitoring
drwxr-xr-x 4 root sysadmins 4096 Aug 16 22:00 /opt/monitoring
```

- **What you typed**: You passed `-R` (recursive) with group `sysadmins` on path `/opt/monitoring`.
- **Why you typed it**: You configured a monitoring directory and needed system administrators to manage telemetry configs.
- **What happened**: Linux updated group ownership for `/opt/monitoring` and all nested scripts, configs, and subdirectories.

---

### Example 3: Change group ownership using numerical Group ID (GID)

Run `sudo chgrp 2004 security_audit.log` to assign group rights using GID.

```bash
ubuntu@ip-172-31-14-151:~$ sudo chgrp 2004 security_audit.log
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -l security_audit.log
-rw-r----- 1 root secops 3100 Aug 16 22:00 security_audit.log
```

- **What you typed**: You passed GID `2004` (corresponding to group `secops`) with target file `security_audit.log`.
- **Why you typed it**: Automated shell scripts often reference explicit numerical GIDs to avoid reliance on user lookup databases.
- **What happened**: Linux matched GID `2004` in `/etc/group` and assigned group ownership to `secops`.

---

### Example 4: Copy group ownership from a reference file

Run `sudo chgrp --reference=app.env service.env` to duplicate group settings.

```bash
ubuntu@ip-172-31-14-151:~$ sudo chgrp --reference=app.env service.env
```

### Output

```bash
*(Group ownership of service.env updated to match app.env)*
```

- **What you typed**: You passed `--reference=app.env` followed by target file `service.env`.
- **Why you typed it**: You generated a new microservice config file and wanted to match the existing group permissions of `app.env`.
- **What happened**: Linux copied the GID attribute from `app.env` and applied it to `service.env`.

---

## DevOps Use Cases

- **Shared Team Workspace Directories**: Combine `chgrp developers /var/shared` with `chmod 2775` (SGID bit) so all new files created inside `/var/shared` automatically inherit group `developers` ownership.
- **Centralized Log Collector Access**: Reassign log directory group ownership to logging daemons (`chgrp -R vector /var/log/nginx`) so log aggregators can ship logs without requiring root privileges.
- **CI/CD Shared Cache Directories**: Assign group ownership on persistent build cache volumes (`/var/cache/docker`) so multiple runner worker accounts can write build cache files.
- **Non-Root Delegation**: Non-root developers who own files can use `chgrp` to share their project files with secondary groups they belong to without asking sysadmins for `sudo chown`.

---

## Quick Tip

Non-root users can run `chgrp` without `sudo` as long as they own the target file **AND** are an active member of the destination group!

---

## Common Mistakes

- **Specifying a group the file owner does not belong to**: If non-root user `john` tries `chgrp secops file.txt` without being a member of `secops`, Linux returns an `Operation not permitted` error.
- **Using chgrp when both owner and group need changing**: Running `chown user:group file` is cleaner and faster than running `chown user file` followed by `chgrp group file`.
- **Forgetting -R on nested directories**: Omitting `-R` leaves subdirectories and nested files owned by the old group, resulting in broken permissions for team members.

---

## Practice Challenge

1. Open terminal and create a test folder: `mkdir /tmp/chgrp_demo && cd /tmp/chgrp_demo`.
2. Create a test file: `touch shared_notes.txt`.
3. Check current group ownership: `ls -l shared_notes.txt`.
4. Create a test group: `sudo groupadd devteam`.
5. Add your user account to the group: `sudo usermod -aG devteam $USER`.
6. Change group ownership: `sudo chgrp devteam shared_notes.txt`.
7. Verify updated group: `ls -l shared_notes.txt`.
8. Clean up: `cd /tmp && rm -rf /tmp/chgrp_demo && sudo groupdel devteam`.

---

## Related Commands

- [chmod Command](./chmod.md) - Modify file read, write, and execute permissions.
- [chown Command](./chown.md) - Modify file user and group ownership.
- [umask Command](./umask.md) - Set default file creation permissions.
- [groupadd Command](../12-user-group-management/groupadd.md) - Create system user groups.

---

## Interview Notes

**Interview Question**: Can a regular non-root user change the group ownership of a file they own to *any* group on the system?  
**Answer**: No. A regular non-root user can only change file group ownership to a group of which they are currently a member. To assign file group ownership to a group the user does not belong to, elevated `root` privileges (`sudo`) are required.
