# groupmod Command (Modify User Group) | Linux Command for Beginners

Learn how to use the Linux groupmod command to rename user groups, update Group IDs (GIDs), and align system group settings with simple examples and DevOps use cases.

---

## What is this command?

The Linux `groupmod` command modifies an existing group definition in `/etc/group` and `/etc/gshadow`. It allows system administrators to rename a group or change its numerical GID.

---

## Why do we use this command?

We use `groupmod` to rename groups during department restructuring, update GIDs across servers for consistency, and resolve GID collisions.

---

## Syntax

```bash
groupmod [options] groupname
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-n`, `--new-name` | Changes the name of the group to NEW_GROUP. |
| `-g`, `--gid` | Changes the group ID (GID) of the group to GID. |
| `-o`, `--non-unique` | Allows setting a non-unique GID (duplicate GID). |

---

## Examples

### Example 1: Rename an existing group

Run `sudo groupmod -n engineering developers` to rename group `developers` to `engineering`.

```bash
ubuntu@ip-172-31-14-151:~$ sudo groupmod -n engineering developers
```

### Output

```bash
*(Group developers renamed to engineering)*
```

- **What you typed**: You passed `-n engineering` followed by the old name `developers`.
- **Why you typed it**: Your organization updated department naming standards.
- **What happened**: Linux updated the group name string in `/etc/group` while keeping the numerical GID and member list intact.

---

### Example 2: Change the numerical Group ID (GID)

Run `sudo groupmod -g 3000 engineering` to change the GID of group `engineering`.

```bash
ubuntu@ip-172-31-14-151:~$ sudo groupmod -g 3000 engineering
```

### Output

```bash
*(GID updated to 3000 in /etc/group)*
```

- **What you typed**: You passed `-g 3000` with group name `engineering`.
- **Why you typed it**: You needed to align GIDs across centralized LDAP or NFS servers.
- **What happened**: Linux updated the GID field inside `/etc/group`.

---

## DevOps Use Cases

- **Resolving GID Collisions**: Change conflicting GIDs when migrating system workloads between cloud regions or Linux distributions.
- **Standardizing Shared Storage Access**: Align host GIDs with container image GIDs using `groupmod -g` to resolve permission errors on mounted volumes.
- **Organization Renaming Automation**: Update team group names during corporate reorganizations without breaking user memberships.

---

## Quick Tip

Changing a group's GID with `groupmod -g` does NOT automatically update file GIDs on the filesystem. You must run `find / -group OLD_GID -exec chgrp NEW_GID {} +` to update file permissions.

---

## Common Mistakes

- **Changing GID without updating file ownership**: Changing a group's GID leaves existing files owned by the old GID, causing users in the group to lose access to those files until `chgrp` is run.
- **Renaming groups used in automated scripts**: Renaming a group without updating hardcoded group names in `/etc/sudoers`, Ansible playbooks, or deployment scripts will break automation workflows.

---

## Practice Challenge

1. Open your terminal.
2. Create a test group: `sudo groupadd test_mod`.
3. Rename the group: `sudo groupmod -n test_renamed test_mod`.
4. Inspect the updated group: `grep test_renamed /etc/group`.
5. Clean up: `sudo groupdel test_renamed`.

---

## Related Commands

- [groupadd Command](./groupadd.md) - Create new user groups.
- [groupdel Command](./groupdel.md) - Remove user groups.
- [gpasswd Command](./gpasswd.md) - Manage members of a group.
- [usermod Command](./usermod.md) - Modify user account settings and primary group.

---

## Interview Notes

**Interview Question**: If you change a group's GID using `groupmod -g 4000 mygroup`, what happens to files owned by `mygroup` before the command was executed?  
**Answer**: The files retain their original numerical GID on disk. Because `mygroup` now uses GID `4000`, the files will show as belonging to the old GID, and members of `mygroup` will lose group access to those files until you update file group ownership using `find / -gid OLD_GID -exec chgrp 4000 {} +`.
