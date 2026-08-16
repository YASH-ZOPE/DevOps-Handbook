# umask Command (User File-Creation Mask) | Linux Command for Beginners

Learn how to use the Linux umask command to set default file and directory permissions, prevent insecure file creation, and configure system-wide security baselines with simple examples and DevOps use cases.

---

## What is this command?

The Linux `umask` (user file-creation mask) command determines the default access permissions assigned to newly created files and directories. It acts as a permission filter by removing ("masking out") specific permission bits from default system base permissions.

---

## Why do we use this command?

We use `umask` to enforce security baselines, ensuring newly created files (like application logs, configuration files, or database dumps) are not exposed to unauthorized local users with overly permissive default settings.

---

## Syntax

```bash
umask [-S] [mask]
```

- Running `umask` with no arguments displays the current mask value for the active shell session.
- Specifying a 3-digit or 4-digit octal `mask` (e.g., `022`, `027`, `077`) updates the mask for the active shell session.

---

## How Umask Works (Math & Calculation)

Linux applies different maximum base permissions for files vs directories upon creation:
- **Base permissions for regular files**: `666` (`rw-rw-rw-`) — *Files are never given execute (`x`) permissions by default for security reasons.*
- **Base permissions for directories**: `777` (`rwxrwxrwx`) — *Directories require execute (`x`) permissions so users can enter (`cd`) and list contents.*

### Mathematical Formula

$$\text{Effective Permissions} = \text{Base Permissions} - \text{Umask Value}$$

*(Bitwise AND-NOT: $\text{Base} \ \& \ \sim\text{Umask}$)*

### Step-by-Step Calculation Examples

#### Scenario 1: Standard System Default (`umask 022`)
- **Files**: `666` - `022` = **`644`** (`rw-r--r--`) $\rightarrow$ Owner can read/write; Group and Others can only read.
- **Directories**: `777` - `022` = **`755`** (`rwxr-xr-x`) $\rightarrow$ Owner has full access; Group and Others can list and enter directory.

#### Scenario 2: Strict Security Mode (`umask 077`)
- **Files**: `666` - `077` = **`600`** (`rw-------`) $\rightarrow$ Owner can read/write; Group and Others have **zero access**.
- **Directories**: `777` - `077` = **`700`** (`rwx------`) $\rightarrow$ Owner has full access; Group and Others have **zero access**.

#### Scenario 3: Shared Group Collaboration Mode (`umask 002`)
- **Files**: `666` - `002` = **`664`** (`rw-rw-r--`) $\rightarrow$ Owner and Group members can read/write; Others can only read.
- **Directories**: `777` - `002` = **`775`** (`rwxrwxr-x`) $\rightarrow$ Owner and Group members have full access; Others can list and enter.

---

## Umask Reference Table

| Umask Octal | Effective File Permission | Effective Directory Permission | Security Level & Typical Environment |
|---|---|---|---|
| `022` | `644` (`rw-r--r--`) | `755` (`rwxr-xr-x`) | Standard Linux distribution default (Ubuntu, Debian, RHEL). |
| `002` | `664` (`rw-rw-r--`) | `775` (`rwxrwxr-x`) | User Private Group (UPG) model / shared team folders. |
| `027` | `640` (`rw-r-----`) | `750` (`rwxr-x---`) | Hardened server environments (CIS benchmarks, financial systems). |
| `077` | `600` (`rw-------`) | `700` (`rwx------`) | High-security mode (private keys, secret storage, isolated daemons). |

---

## Useful Options

| Option | What it does |
|---|---|
| `-S` | Displays or sets the umask value using human-readable symbolic format (e.g., `u=rwx,g=rx,o=rx`). |
| `-p` | Prints current umask setting formatted as a reusable shell command (`umask 0022`). |

---

## Examples

### Example 1: View current umask setting

Run `umask` to check active session settings in numeric octal format.

```bash
ubuntu@ip-172-31-14-151:~$ umask
```

### Output

```bash
0022
```

- **What you typed**: You ran `umask` with no arguments.
- **Why you typed it**: You wanted to verify default permissions for new files in your terminal session.
- **What happened**: Linux returned `0022` (leading zero represents special bits; `022` represents standard user umask).

---

### Example 2: View umask in symbolic format

Run `umask -S` for human-readable output.

```bash
ubuntu@ip-172-31-14-151:~$ umask -S
```

### Output

```bash
u=rwx,g=rx,o=rx
```

- **What you typed**: You passed option `-S`.
- **Why you typed it**: You wanted to see permitted base rights directly without doing octal math mentally.
- **What happened**: Linux displayed the allowed user (`u`), group (`g`), and others (`o`) permission classes.

---

### Example 3: Set strict temporary umask for current shell session

Run `umask 077` to enforce confidential file creation mode.

```bash
ubuntu@ip-172-31-14-151:~$ umask 077
ubuntu@ip-172-31-14-151:~$ touch secret.txt && mkdir confidential_dir
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -l secret.txt
-rw------- 1 ubuntu ubuntu 0 Aug 16 22:00 secret.txt
ubuntu@ip-172-31-14-151:~$ ls -ld confidential_dir
drwx------ 2 ubuntu ubuntu 4096 Aug 16 22:00 confidential_dir
```

- **What you typed**: You set `umask 077` and created a file and directory.
- **Why you typed it**: You were generating secret credentials and wanted zero group or world visibility.
- **What happened**: Linux stripped all group (`0`) and others (`0`) permissions, yielding `600` for files and `700` for directories.

---

### Example 4: Persist custom umask in system profile

Edit `/etc/profile` or `~/.bashrc` to make umask settings permanent across user shell sessions.

```bash
ubuntu@ip-172-31-14-151:~$ echo "umask 027" >> ~/.bashrc
ubuntu@ip-172-31-14-151:~$ source ~/.bashrc
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ umask
0027
```

- **What you typed**: You appended `umask 027` to `~/.bashrc` and reloaded shell configuration.
- **Why you typed it**: Running `umask` directly in terminal only affects the active session; modifying shell startup files makes settings persistent.
- **What happened**: Linux loads `027` umask every time a new interactive shell session starts.

---

## DevOps Use Cases

- **Hardening CI/CD Pipeline Runners**: Set `umask 027` or `umask 077` in build runner configurations (GitLab CI, GitHub Actions, Jenkins) to prevent build artifacts and token secrets from being world-readable.
- **Shared Storage & NFS Directory Provisioning**: Set `umask 002` in team build environments so multi-developer teams can edit each other's project build files seamlessly.
- **CIS Benchmark Security Compliance**: CIS Linux Hardening Benchmarks require configuring `umask 027` inside `/etc/profile.d/set_umask.sh` and `/etc/bashrc` to enforce enterprise server compliance.
- **Container Application Startup Hardening**: Set `ENV UMASK=0027` or run `umask 0027` in container entrypoint scripts before initializing application daemons.

---

## Quick Tip

`umask` subtracts permissions; it **never** grants execute (`x`) permissions to newly created regular files! Even if you set `umask 000`, newly created files will have `666` (`rw-rw-rw-`) permissions, NOT `777`. You must still run `chmod +x file` to make a file executable.

---

## Common Mistakes

- **Confusing umask octal values with chmod octal values**: Setting `umask 755` does **not** grant `755` permissions! It strips `755`, leaving `011` (zero permissions). To get `755` directory permissions, you must set `umask 022`.
- **Expecting umask to update existing files**: Changing `umask` only affects *future* files created in that shell session. It does not retroactively change existing files on disk.
- **Setting temporary umask without updating profile files**: Setting `umask 077` directly in terminal is lost as soon as the terminal window closes. Update `/etc/profile` or `~/.bashrc` for permanent changes.

---

## Practice Challenge

1. Open terminal and view current umask: `umask`.
2. Create a test directory: `mkdir /tmp/umask_test && cd /tmp/umask_test`.
3. Create a test file under current umask: `touch default_file.txt && ls -l default_file.txt`.
4. Set strict umask: `umask 077`.
5. Create a new test file: `touch secure_file.txt && ls -l secure_file.txt`.
6. Verify `secure_file.txt` has `-rw-------` (`600`) permissions.
7. Reset umask to standard value: `umask 022`.
8. Clean up: `cd /tmp && rm -rf /tmp/umask_test`.

---

## Related Commands

- [chmod Command](./chmod.md) - Modify permissions on existing files.
- [chown Command](./chown.md) - Change user and group file ownership.
- [chgrp Command](./chgrp.md) - Change group file ownership.
- [special-permissions Command](./special-permissions.md) - Learn SUID, SGID, and Sticky Bit behaviors.

---

## Interview Notes

**Interview Question**: If the system `umask` is set to `027`, what will be the exact permissions on a newly created regular file and a newly created directory?  
**Answer**:
- For a regular file: Base `666` (`rw-rw-rw-`) minus `027` (`---r-xrwx`) results in **`640`** (`rw-r-----`). Owner has read/write, group has read-only, others have no access.
- For a directory: Base `777` (`rwxrwxrwx`) minus `027` (`---r-xrwx`) results in **`750`** (`rwxr-x---`). Owner has full access, group has read/execute access, others have no access.
