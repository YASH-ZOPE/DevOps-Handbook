# userdel Command (Delete User Account) | Linux Command for Beginners

Learn how to use the Linux userdel command to remove user accounts, delete home directories, clean up mail spools, and handle user offboarding safely with simple examples and DevOps use cases.

---

## What is this command?

The Linux `userdel` command removes a user account from the system databases (`/etc/passwd`, `/etc/shadow`, `/etc/group`). With optional flags, it can also delete the user's home directory and mail spool files.

---

## Why do we use this command?

We use `userdel` during employee offboarding, server cleanup, or decommissioning obsolete service accounts to maintain security hygiene and free up disk resources.

---

## Syntax

```bash
userdel [options] username
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-r`, `--remove` | Removes the user's home directory and mail spool along with the account. |
| `-f`, `--force` | Forces deletion even if the user is currently logged in or owns running processes. |
| `-Z`, `--selinux-user` | Removes any SELinux user mapping for the account. |

---

## Examples

### Example 1: Remove a user account while preserving home files

Run `sudo userdel devuser` to remove account credentials only.

```bash
ubuntu@ip-172-31-14-151:~$ sudo userdel devuser
```

### Output

```bash
*(Command succeeds silently; account entries removed from /etc/passwd and /etc/shadow)*
```

- **What you typed**: You typed `sudo userdel devuser` and pressed Enter.
- **Why you typed it**: You wanted to remove user login permissions while keeping the user's files intact for auditing.
- **What happened**: Linux deleted user entries from system account databases, but left `/home/devuser` on the storage drive.

---

### Example 2: Remove a user account AND delete their home directory

Run `sudo userdel -r olduser` to perform a full cleanup.

```bash
ubuntu@ip-172-31-14-151:~$ sudo userdel -r olduser
```

### Output

```bash
userdel: devuser mail spool (/var/mail/olduser) not found
*(User account and /home/olduser directory deleted)*
```

- **What you typed**: You passed `-r` (remove home directory and mail spool).
- **Why you typed it**: You wanted to purge the account and reclaim storage space completely.
- **What happened**: Linux deleted the `/etc/passwd` record, purged `/home/olduser`, and deleted the user mail spool.

---

### Example 3: Force deletion of a user account with running processes

Run `sudo userdel -r -f stuckuser` to force deletion.

```bash
ubuntu@ip-172-31-14-151:~$ sudo userdel -r -f stuckuser
```

### Output

```bash
userdel: warning: can't remove /var/mail/stuckuser: No such file or directory
*(User account deleted forcefully)*
```

- **What you typed**: You added `-f` (force).
- **Why you typed it**: Standard deletion failed because processes owned by the user were still active.
- **What happened**: Linux forcefully terminated login bindings, deleted system user entries, and removed home directory files.

---

## DevOps Use Cases

- **User Offboarding Automation**: Integrate `userdel -r` into automated HR offboarding scripts to revoke access when engineers leave the company.
- **Temporary Build Agent Cleanup**: Purge dynamic CI/CD runner user accounts after build pipeline execution.
- **Security Decommissioning**: Remove unused or default vendor user accounts from server images before deploying to production cloud environments.
- **Storage Reclamation**: Purge inactive user accounts and home directories on shared developer jump servers.

---

## Quick Tip

Before deleting a user account without `-r`, run `find / -user username` to identify and reassign unowned files, preventing orphaned file UIDs on disk.

---

## Common Mistakes

- **Deleting a user without backing up critical files**: Running `userdel -r` irreversibly deletes everything inside `/home/username`. Always backup data first.
- **Deleting a logged-in user without terminating processes**: Attempting `userdel` on a user with active SSH connections can cause errors. Stop running processes (`killall -u username`) before deletion.
- **Leaving orphaned files**: Running `userdel` without `-r` leaves files owned by a numerical UID on disk, creating security risks if a new user is assigned the same UID later.

---

## Practice Challenge

1. Open your terminal.
2. Create a temporary user: `sudo useradd -m tempuser`.
3. Verify creation: `id tempuser`.
4. Delete the user and home directory: `sudo userdel -r tempuser`.
5. Confirm deletion: `id tempuser`.

---

## Related Commands

- [useradd Command](./useradd.md) - Create new user accounts.
- [usermod Command](./usermod.md) - Lock or modify user accounts instead of deleting.
- [groupdel Command](./groupdel.md) - Remove unused user groups.
- [rm Command](../03-file-directory-management/rm.md) - Delete files and directories.

---

## Interview Notes

**Interview Question**: What happens to files owned by a user when you run `userdel` without the `-r` option?  
**Answer**: The files remain on disk, but their ownership shows the user's former numerical UID (e.g., `1002`) instead of a username. If a new user is created later and assigned UID `1002`, they will automatically gain ownership of those orphaned files.
