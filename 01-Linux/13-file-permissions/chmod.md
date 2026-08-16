# chmod Command (Change File Permissions) | Linux Command for Beginners

Learn how to use the Linux chmod command to manage file and directory permissions using symbolic and numeric octal modes, secure sensitive files, and grant execution rights with clear examples and DevOps use cases.

---

## What is this command?

The Linux `chmod` (change mode) command modifies the access permissions of files and directories. It defines who can read, write, or execute a file by altering permission bits assigned to the file owner, group members, and other system users.

---

## Why do we use this command?

We use `chmod` to make shell scripts executable, secure private SSH keys and configuration files from unauthorized access, grant web servers read access to static assets, and establish access security boundaries across Linux systems.

---

## Syntax

```bash
chmod [options] mode file...
```

Permissions can be set using two modes:
- **Symbolic Mode**: References user classes (`u`, `g`, `o`, `a`) and operators (`+`, `-`, `=`) with permission types (`r`, `w`, `x`).
- **Numeric (Octal) Mode**: Uses a 3-digit or 4-digit octal number (e.g., `755`, `600`) representing combined binary permission values.

---

## Permission Modes & Octal Values

### Permission Types & Values

| Permission | Symbol | Binary Value | Description |
|---|---|---|---|
| Read | `r` | `4` | View file contents or list directory contents. |
| Write | `w` | `2` | Modify file contents or create/delete files in directory. |
| Execute | `x` | `1` | Run file as executable or enter (`cd` into) directory. |

### User Classes (Symbolic Mode)

| Class | Symbol | Meaning |
|---|---|---|
| User | `u` | The owner of the file. |
| Group | `g` | Users belonging to the file's group. |
| Others | `o` | All other users on the system. |
| All | `a` | All users (`u` + `g` + `o`). |

### Common Octal Permission Sets

| Octal Code | Permission String | File Usage | Directory Usage |
|---|---|---|---|
| `755` | `-rwxr-xr-x` | Executable scripts, binaries | Publicly accessible directories |
| `644` | `-rw-r--r--` | Standard configuration & text files | N/A |
| `600` | `-rw-------` | Private SSH keys, secret tokens | Confidential data files |
| `700` | `-rwx------` | Private executable scripts | Private user directories (`~/.ssh`) |
| `777` | `-rwxrwxrwx` | Full access for all (Security risk!) | Shared temp folders (Use sticky bit!) |

---

## Useful Options

| Option | What it does |
|---|---|
| `-R`, `--recursive` | Applies permission changes recursively to all files and subdirectories. |
| `-v`, `--verbose` | Output a diagnostic message for every file processed. |
| `-c`, `--changes` | Output diagnostic messages only when a permission change actually occurs. |
| `--reference=RFILE` | Applies the permissions of `RFILE` to target files instead of specifying explicit modes. |

---

## Examples

### Example 1: Make a shell script executable using symbolic mode

Run `chmod +x deploy.sh` to grant execution permissions to all user classes.

```bash
ubuntu@ip-172-31-14-151:~$ chmod +x deploy.sh
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -l deploy.sh
-rwxr-xr-x 1 ubuntu ubuntu 450 Aug 16 22:00 deploy.sh
```

- **What you typed**: You passed operator `+x` with filename `deploy.sh`.
- **Why you typed it**: You created a deployment shell script and needed permission to execute it directly (`./deploy.sh`).
- **What happened**: Linux added the execute (`x`) permission bit for owner, group, and others.

---

### Example 2: Secure a private SSH key using octal mode

Run `chmod 600 ~/.ssh/id_rsa` to restrict file access exclusively to the owner.

```bash
ubuntu@ip-172-31-14-151:~$ chmod 600 ~/.ssh/id_rsa
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -l ~/.ssh/id_rsa
-rw------- 1 ubuntu ubuntu 2602 Aug 16 22:00 /home/ubuntu/.ssh/id_rsa
```

- **What you typed**: You passed octal mode `600` (`rw-` for owner, `---` for group and others).
- **Why you typed it**: OpenSSH rejects private key files if group or others have read/write access.
- **What happened**: Linux removed read and write access for everyone except the file owner.

---

### Example 3: Recursively update web root permissions

Run `chmod -R 755 /var/www/html` to allow public read/execute access across directory trees.

```bash
ubuntu@ip-172-31-14-151:~$ sudo chmod -R 755 /var/www/html
```

### Output

```bash
ubuntu@ip-172-31-14-151:~$ ls -ld /var/www/html
drwxr-xr-x 4 www-data www-data 4096 Aug 16 22:00 /var/www/html
```

- **What you typed**: You used `-R` (recursive) with `755` mode on `/var/www/html`.
- **Why you typed it**: You deployed a website and needed the Nginx/Apache web server to traverse directories and serve files.
- **What happened**: Linux updated permissions for `/var/www/html` and every nested directory and file inside it.

---

### Example 4: Copy permissions from a reference file

Run `chmod --reference=config.env.bak config.env` to duplicate existing permission settings.

```bash
ubuntu@ip-172-31-14-151:~$ chmod --reference=config.env.bak config.env
```

### Output

```bash
*(Permissions of config.env updated to match config.env.bak)*
```

- **What you typed**: You passed `--reference=config.env.bak` followed by target file `config.env`.
- **Why you typed it**: You created a new configuration file and wanted it to mirror the security permissions of an audited backup file.
- **What happened**: Linux read the mode bits from `config.env.bak` and applied them to `config.env`.

---

## DevOps Use Cases

- **SSH & Cloud Security Hygiene**: Automate `chmod 600` on private keys (`id_rsa`, `pem` files) in Ansible playbooks, Terraform provisioners, and CI/CD pipelines.
- **Docker Container Build Hardening**: Use `RUN chmod +x /entrypoint.sh` inside Dockerfiles to ensure container startup scripts execute cleanly without permission errors.
- **Web Application Storage Lockdowns**: Enforce directory permission standards (`755` for directories, `644` for files) in automated deployment pipelines.
- **Managing Shared Workspace SUID/SGID**: Apply SGID mode (`chmod 2775 /shared`) on directory mounts to ensure newly created files inherit team group ownership automatically.

---

## Quick Tip

Directory permissions work differently than file permissions!
- **Read (`r`) on directory**: Allows listing directory contents (`ls`).
- **Write (`w`) on directory**: Allows creating, renaming, or deleting files inside the directory.
- **Execute (`x`) on directory**: Allows traversing/entering the directory (`cd`) and accessing file metadata inside it. Without `x`, you cannot access files inside a directory even if the file itself is `644`!

---

## Common Mistakes

- **Using chmod 777 as a quick fix**: Setting `777` grants write access to all users, creating severe security vulnerabilities and violating compliance rules.
- **Forgetting directory execute bit**: Setting a directory to `644` (`rw-r--r--`) removes the `x` bit, blocking users from entering or listing the directory.
- **Recursive chmod -R 755 on mixed directories and files**: Applying `755` recursively makes *all regular files* executable. Use `find /path -type d -exec chmod 755 {} +` and `find /path -type f -exec chmod 644 {} +` instead.

---

## Practice Challenge

1. Open your terminal and create a test directory: `mkdir permissions_demo && cd permissions_demo`.
2. Create a test shell script: `echo "echo Hello DevOps" > test.sh`.
3. Try executing it: `./test.sh` (Observe the "Permission denied" error).
4. Add execution rights: `chmod u+x test.sh`.
5. Run the script again: `./test.sh` (Verify it prints "Hello DevOps").
6. Secure a dummy key file: `touch id_rsa && chmod 600 id_rsa && ls -l id_rsa`.
7. Clean up: `cd .. && rm -rf permissions_demo`.

---

## Related Commands

- [chown Command](./chown.md) - Change user and group ownership of files.
- [chgrp Command](./chgrp.md) - Change group ownership of files.
- [umask Command](./umask.md) - Set default file creation permission mask.
- [special-permissions Command](./special-permissions.md) - Configure SUID, SGID, and Sticky Bits.
- [acl Command](./acl.md) - Configure Access Control Lists using getfacl and setfacl.

---

## Interview Notes

**Interview Question**: How do you fix directory permissions recursively so directories get `755` and files get `644` without making regular files executable?  
**Answer**: Do not use `chmod -R 755`. Instead, use `find` commands:
```bash
find /path/to/target -type d -exec chmod 755 {} +
find /path/to/target -type f -exec chmod 644 {} +
```
Alternatively, use symbolic uppercase `X`: `chmod -R u=rwX,g=rX,o=rX /path/to/target`, which applies the execute bit exclusively to directories.
