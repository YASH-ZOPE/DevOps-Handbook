# Special Permissions (SUID, SGID, Sticky Bit) | Linux Security & Permissions

Learn how Linux special file permissions (SUID, SGID, and Sticky Bit) work, how to configure numeric octal mode 4000, 2000, and 1000, secure multi-user collaboration folders, and audit privilege escalation risks with practical examples and DevOps use cases.

---

## What are Special Permissions?

In addition to standard Read (`r`), Write (`w`), and Execute (`x`) permissions, Linux provides three **Special Permissions**:
1. **SUID (Set User ID)**: Allows a user executing a binary to temporarily assume the file owner's privileges.
2. **SGID (Set Group ID)**: Forces files created within a directory to inherit the directory's group owner, or allows binaries to run with group privileges.
3. **Sticky Bit**: Prevents users from deleting or renaming files owned by others inside a shared directory, even if they have write access to the directory.

---

## Why do we use Special Permissions?

We use special permissions to enable controlled privilege escalation for essential system tools (e.g., allowing normal users to change their password via `/usr/bin/passwd` owned by `root`), manage multi-developer team collaboration directories, and protect shared temporary locations (like `/tmp`) from unauthorized file deletion.

---

## Types of Special Permissions

### Summary Table

| Permission | Numerical Value | Symbolic Character | Applied To | Effect |
|---|---|---|---|---|
| **SUID** | `4000` | `s` (or `S` if no `x`) | Executable Files | Executing user inherits file owner's privileges during execution. |
| **SGID** | `2000` | `s` (or `S` if no `x`) | Files & Directories | Executing binary runs with group rights; New files in directory inherit directory group. |
| **Sticky Bit** | `1000` | `t` (or `T` if no `x`) | Directories | Only file owner or `root` can delete/rename files inside directory. |

*Note: Lowercase `s`/`t` indicates that the underlying execute (`x`) permission is set. Uppercase `S`/`T` indicates that the execute permission is NOT set (configuration warning).*

---

## Syntax & Octal Representation

Special permissions are prepended as a 4th digit in front of standard 3-digit octal permission codes:
- **SUID**: `chmod 4755 file` (or `chmod u+s file`)
- **SGID**: `chmod 2775 directory` (or `chmod g+s directory`)
- **Sticky Bit**: `chmod 1777 directory` (or `chmod +t directory`)

---

## Examples

### Example 1: Inspect system binary SUID permission (`passwd`)

Inspect the SUID bit on the `/usr/bin/passwd` binary.

```bash
ubuntu@ip-172-31-14-151:~$ ls -l /usr/bin/passwd
```

### Output

```bash
-rwsr-xr-x 1 root root 68208 Aug 16 22:00 /usr/bin/passwd
```

- **What you typed**: You ran `ls -l /usr/bin/passwd` to view binary file permissions.
- **Why you typed it**: Standard users need to update `/etc/shadow` when changing passwords, but `/etc/shadow` is writeable only by `root`.
- **What happened**: Notice the `s` in `-rwsr-xr-x`. When a regular user executes `passwd`, the process temporarily gains `root` user privileges to write to `/etc/shadow`.

---

### Example 2: Set SGID on a shared team directory

Run `sudo chmod 2775 /var/shared_project` to enforce automatic group ownership inheritance.

```bash
ubuntu@ip-172-31-14-151:~$ sudo mkdir /var/shared_project
ubuntu@ip-172-31-14-151:~$ sudo chgrp developers /var/shared_project
ubuntu@ip-172-31-14-151:~$ sudo chmod 2775 /var/shared_project
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -ld /var/shared_project
drwxrwsr-x 2 root developers 4096 Aug 16 22:00 /var/shared_project
```

- **What you typed**: You passed octal code `2775` (SGID `2000` + `775`) on `/var/shared_project`.
- **Why you typed it**: Without SGID, when user `alice` creates a file in `/var/shared_project`, it is owned by group `alice`, preventing developer `bob` from editing it.
- **What happened**: With SGID set (`drwxrwsr-x`), every new file created inside `/var/shared_project` automatically inherits group `developers`.

---

### Example 3: Set Sticky Bit on a shared upload folder

Run `sudo chmod 1777 /var/uploads` to protect files from unauthorized deletion.

```bash
ubuntu@ip-172-31-14-151:~$ sudo chmod 1777 /var/uploads
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -ld /var/uploads
drwxrwxrwt 2 root root 4096 Aug 16 22:00 /var/uploads
```

- **What you typed**: You passed `1777` (Sticky bit `1000` + `777`) on `/var/uploads`.
- **Why you typed it**: You need a world-writable directory where multiple users can upload files, but users should not be able to delete each other's uploaded files.
- **What happened**: Notice the `t` at the end (`drwxrwxrwt`). Linux permits users to create files in `/var/uploads`, but restricts file deletion strictly to file owners and `root`. (This matches standard `/tmp` folder behavior).

---

### Example 4: Find all SUID and SGID binaries for security auditing

Run `find` to discover potential privilege escalation vectors across the system.

```bash
ubuntu@ip-172-31-14-151:~$ find /usr/bin -type f \( -perm -4000 -o -perm -2000 \) -exec ls -l {} +
```

### Output

```bash
-rwsr-xr-x 1 root root 68208 Aug 16 22:00 /usr/bin/passwd
-rwsr-xr-x 1 root root 88304 Aug 16 22:00 /usr/bin/gpasswd
-rwsr-xr-x 1 root root 67816 Aug 16 22:00 /usr/bin/su
-rwsr-xr-x 1 root root 55528 Aug 16 22:00 /usr/bin/newgrp
```

- **What you typed**: You searched `/usr/bin` for files with bit `4000` (SUID) or `2000` (SGID).
- **Why you typed it**: Security compliance frameworks require auditing all executables running with elevated privileges.
- **What happened**: `find` scanned file permission bits and listed all system binaries configured with SUID/SGID.

---

## DevOps Use Cases

- **Shared Developer Workspaces**: Apply `chmod 2775 /srv/app` SGID bit on shared repository directories across team servers so all developers maintain group edit rights.
- **Multi-Tenant System Security**: Apply `chmod 1777` Sticky Bit on shared scratch disks and temporary mount locations (`/mnt/scratch`) to prevent cross-tenant data tampering.
- **Container Image Hardening**: Remove unnecessary SUID/SGID bits from container images during build (`RUN find / -perm /6000 -type f -exec chmod a-s {} +`) to eliminate security vulnerabilities in Docker images.
- **Securing Custom Monitoring Scripts**: Restrict execution of custom administrative tools using SGID group validation.

---

## Quick Tip

If `ls -l` shows uppercase `S` or `T` (e.g., `-rwS--r--` or `drwxr-xr-T`), it means the SUID, SGID, or Sticky bit is set **without** the corresponding execute (`x`) permission! This is usually a misconfiguration. Run `chmod +x` to fix it and change the letter to lowercase `s` or `t`.

---

## Common Mistakes

- **Setting SUID on shell scripts**: Most modern Linux kernels ignore SUID bits on interpreted scripts (`#!/bin/bash`, `#!/usr/bin/python`) for security reasons; SUID works reliably only on compiled binary executables.
- **Creating world-writable directories without Sticky Bit**: Creating `chmod 777` directories allows any user to execute `rm -rf *` inside that folder, wiping out other users' files.
- **Overlooking SUID binaries in container base images**: Leaving unneeded SUID binaries inside Docker containers allows attacker container breakouts via GTFOBins techniques.

---

## Practice Challenge

1. Create a demo folder: `mkdir /tmp/special_demo && cd /tmp/special_demo`.
2. Create a subfolder for SGID test: `mkdir shared_folder && chmod 2775 shared_folder`.
3. Verify `shared_folder` permissions show `s`: `ls -ld shared_folder`.
4. Create a sticky bit directory: `mkdir sticky_folder && chmod 1777 sticky_folder`.
5. Verify `sticky_folder` permissions show `t`: `ls -ld sticky_folder`.
6. Clean up: `cd /tmp && rm -rf /tmp/special_demo`.

---

## Related Commands

- [chmod Command](./chmod.md) - Modify standard file permissions.
- [chown Command](./chown.md) - Change user and group ownership.
- [chgrp Command](./chgrp.md) - Change group ownership.
- [umask Command](./umask.md) - Configure default file creation mask.

---

## Interview Notes

**Interview Question**: What is GTFOBins, and why are SUID binaries dangerous on a Linux system?  
**Answer**: GTFOBins is a curated list of Unix binaries that can be exploited to bypass local security restrictions when misconfigured with SUID bits. If a binary like `find`, `vim`, `bash`, or `python` has the SUID bit set and is owned by `root`, an unprivileged local user can spawn a subshell or execute commands through that binary with full `root` privileges.
