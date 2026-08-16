# acl Commands (getfacl & setfacl) | Linux Access Control Lists

Learn how to use Linux Access Control Lists (ACLs) with getfacl and setfacl to assign fine-grained permissions to specific users and groups beyond standard UGO (User, Group, Other) ownership with practical examples and DevOps use cases.

---

## What are Access Control Lists (ACLs)?

Standard Linux file permissions allow defining permissions for only one **User (owner)**, one **Group**, and **Others**. Linux **Access Control Lists (ACLs)** extend this basic permission model by allowing administrators to grant explicit read, write, or execute permissions to multiple specific users or groups on a single file or directory.

- **`getfacl`**: Displays the Access Control List entries assigned to a file or directory.
- **`setfacl`**: Modifies, removes, or restores Access Control List entries on a file or directory.

---

## Why do we use ACLs?

We use ACLs when standard Linux permission bits (`chmod`) are too restrictive. For example, if file `report.txt` is owned by `alice:finance`, and you need to grant user `bob` (from audit) read access and user `charlie` (from IT) write access without adding them to the `finance` group or making the file world-readable, ACLs provide the exact solution.

---

## Syntax

### Viewing ACLs (`getfacl`)

```bash
getfacl [options] file_or_directory
```

### Setting ACLs (`setfacl`)

```bash
setfacl [options] [-m|-x] specification file_or_directory
```

---

## Useful Options for setfacl

| Option | Short Flag | Description |
|---|---|---|
| Modify ACL | `-m`, `--modify` | Adds or updates ACL entries on target files (`setfacl -m u:username:rwx file`). |
| Remove ACL Entry | `-x`, `--remove` | Removes specific ACL entries (`setfacl -x u:username file`). |
| Base ACL Restore | `-b`, `--remove-all` | Strips all extended ACL entries, restoring standard UGO file permissions. |
| Recursive | `-R`, `--recursive` | Applies ACL rules recursively to subdirectories and files. |
| Default ACL | `-d`, `--default` | Configures default ACLs on directories so future new files inherit ACL entries automatically. |

---

## Examples

### Example 1: Grant a specific user permissions using setfacl

Run `setfacl -m u:bob:rw- deploy.conf` to grant user `bob` access without altering standard ownership.

```bash
ubuntu@ip-172-31-14-151:~$ setfacl -m u:bob:rw- deploy.conf
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -l deploy.conf
-rw-rw-r--+ 1 ubuntu ubuntu 512 Aug 16 22:00 deploy.conf
```

- **What you typed**: You passed `-m u:bob:rw-` on target file `deploy.conf`.
- **Why you typed it**: `bob` needed read and write access to the deployment config file without changing the file owner or group.
- **What happened**: Linux added an extended ACL entry for user `bob`. Notice the plus sign (`+`) at the end of permission string `-rw-rw-r--+`, indicating an active ACL!

---

### Example 2: Inspect file ACL entries with getfacl

Run `getfacl deploy.conf` to view detailed ACL entries.

```bash
ubuntu@ip-172-31-14-151:~$ getfacl deploy.conf
```

### Output

```bash
# file: deploy.conf
# owner: ubuntu
# group: ubuntu
user::rw-
user:bob:rw-
group::r--
mask::rw-
other::r--
```

- **What you typed**: You ran `getfacl deploy.conf`.
- **Why you typed it**: Standard `ls -l` shows only a `+` symbol; `getfacl` reveals the exact user and group ACL entries assigned to the file.
- **What happened**: Linux listed base owner rights alongside the extended entry for `user:bob:rw-`.

---

### Example 3: Set Default ACLs on a directory for automatic inheritance

Run `setfacl -d -m g:devops:rwx /var/builds` to ensure new files inherit group access automatically.

```bash
ubuntu@ip-172-31-14-151:~$ sudo setfacl -d -m g:devops:rwx /var/builds
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ getfacl /var/builds
# file: var/builds
# owner: root
# group: root
user::rwx
group::r-x
other::r-x
default:user::rwx
default:group::r-x
default:group:devops:rwx
default:mask::rwx
default:other::r-x
```

- **What you typed**: You passed `-d` (default) with `-m g:devops:rwx` on directory `/var/builds`.
- **Why you typed it**: You wanted all future files created inside `/var/builds` to automatically inherit full read/write/execute access for group `devops`.
- **What happened**: Linux set default ACL rules on the directory container.

---

### Example 4: Remove ACL entries and restore standard permissions

Run `setfacl -b deploy.conf` to clear extended ACL entries.

```bash
ubuntu@ip-172-31-14-151:~$ setfacl -b deploy.conf
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -l deploy.conf
-rw-r--r-- 1 ubuntu ubuntu 512 Aug 16 22:00 deploy.conf
```

- **What you typed**: You passed `-b` (remove all) with file `deploy.conf`.
- **Why you typed it**: You completed access review and wanted to revert the file to standard Linux permission bits.
- **What happened**: Linux removed all extended user/group entries and stripped the `+` indicator from the permission string.

---

## DevOps Use Cases

- **Fine-Grained CI/CD Pipeline Storage**: Grant automated backup agents or security scanning service accounts (e.g. `sonar-scanner`, `trivy`) read-only ACL permissions across deployment artifacts without granting global read permissions.
- **Multi-Department Server Sharing**: Allow finance auditors, developers, and SRE teams customized access levels to central log storage paths (`/var/log/audit`) using group ACLs.
- **Persistent Storage in Kubernetes & NFS**: Use default ACLs (`setfacl -d`) on shared volume mounts so container pods running as different non-root UID users retain read/write access to shared directory streams.

---

## Quick Tip

The `ls -l` command signals that a file has active ACL permissions by placing a **`+`** sign right after the permission bits (e.g., `-rwxr-xr-x+`). Whenever you see a `+`, use `getfacl` to see the effective extended permissions!

---

## Common Mistakes

- **Forgetting the mask entry when editing ACLs**: The ACL `mask` defines the maximum effective permissions for all named users and groups. If the mask is set to `r--`, a user granted `rwx` in their ACL will effectively only receive `r--`!
- **Not using default ACLs on directories**: Setting `setfacl -m u:alice:rwx directory` grants `alice` access to existing files, but new files created later will **not** inherit `alice`'s rights unless you also include `-d` (`setfacl -d -m u:alice:rwx directory`).
- **Losing ACLs during file copying**: Standard `cp` commands do not preserve ACLs! You must use `cp -p` or `cp --preserve=mode,ownership,xattr` or `rsync -A` to preserve ACL metadata during transfers.

---

## Practice Challenge

1. Open terminal and create a test file: `touch /tmp/acl_test.txt`.
2. Check initial ACLs: `getfacl /tmp/acl_test.txt`.
3. Create a test user: `sudo useradd acluser`.
4. Grant `acluser` read/write access: `sudo setfacl -m u:acluser:rw /tmp/acl_test.txt`.
5. Verify `ls -l /tmp/acl_test.txt` shows `+`.
6. Inspect detailed rules: `getfacl /tmp/acl_test.txt`.
7. Remove ACL rules: `sudo setfacl -b /tmp/acl_test.txt`.
8. Clean up: `rm /tmp/acl_test.txt && sudo userdel acluser`.

---

## Related Commands

- [chmod Command](./chmod.md) - Set standard UGO file permissions.
- [chown Command](./chown.md) - Modify file user and group owners.
- [chgrp Command](./chgrp.md) - Modify group ownership.
- [special-permissions Command](./special-permissions.md) - Configure SUID, SGID, and Sticky Bit.

---

## Interview Notes

**Interview Question**: How do you preserve ACL permissions when copying files or transferring directories across Linux servers?  
**Answer**: Standard `cp` drops ACLs. To preserve ACLs locally, use `cp -p` or `cp -a`. To preserve ACLs across remote servers using `rsync`, include the `-A` (`--acls`) flag: `rsync -avzA /source/path user@remote:/target/path`.
