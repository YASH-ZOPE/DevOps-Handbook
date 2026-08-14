# useradd Command (Create User Account) | Linux Command for Beginners

Learn how to use the Linux useradd command to create user accounts, set home directories, assign default shells, and configure group memberships with simple examples and DevOps use cases.

---

## What is this command?

The Linux `useradd` command creates new user accounts on the system. It updates system user files (`/etc/passwd`, `/etc/shadow`, `/etc/group`), creates default home directories, and sets user configuration profiles.

---

## Why do we use this command?

We use `useradd` to onboard new system users, configure service accounts for applications (like Nginx, Docker, or Jenkins), and assign security boundaries on Linux servers.

---

## Syntax

```bash
useradd [options] username
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-m`, `--create-home` | Creates the user's home directory (usually `/home/username`). |
| `-s`, `--shell` | Specifies the default login shell for the new user (e.g., `/bin/bash`). |
| `-g`, `--gid` | Assigns the primary group name or GID for the user. |
| `-G`, `--groups` | Adds the user to a comma-separated list of supplementary groups. |
| `-c`, `--comment` | Adds descriptive text info (such as the user's full name) in `/etc/passwd`. |
| `-d`, `--home-dir` | Specifies a custom home directory path instead of default `/home/username`. |
| `-e`, `--expiredate` | Sets an account expiration date (`YYYY-MM-DD`). |
| `-r`, `--system` | Creates a system service account without home directory defaults. |

---

## Examples

### Example 1: Create a basic user account with a home directory and Bash shell

Run `sudo useradd -m -s /bin/bash devuser` to create a standard user account.

```bash
ubuntu@ip-172-31-14-151:~$ sudo useradd -m -s /bin/bash devuser
```

### Output

```bash
*(Command succeeds silently with exit status 0)*
```

- **What you typed**: You passed `-m` (create home) and `-s /bin/bash` with the username `devuser`.
- **Why you typed it**: You wanted to create a usable user account with its own home directory and standard login shell.
- **What happened**: Linux created the user record in `/etc/passwd`, generated `/home/devuser`, and copied default shell profiles from `/etc/skel`.

---

### Example 2: Create a user with supplementary group memberships

Run `sudo useradd -m -s /bin/bash -G docker,sudo devuser2` to assign permissions on creation.

```bash
ubuntu@ip-172-31-14-151:~$ sudo useradd -m -s /bin/bash -G docker,sudo devuser2
```

### Output

```bash
*(User devuser2 created and added to groups docker and sudo)*
```

- **What you typed**: You passed `-G docker,sudo` to add `devuser2` to secondary groups during account creation.
- **Why you typed it**: You wanted the user to have immediate Docker execution and administrative sudo rights.
- **What happened**: Linux updated `/etc/passwd` and appended `devuser2` to group entries inside `/etc/group`.

---

### Example 3: Create a system service account for an application

Run `sudo useradd -r -s /bin/false apprunner` to create a non-login background service user.

```bash
ubuntu@ip-172-31-14-151:~$ sudo useradd -r -s /bin/false apprunner
```

### Output

```bash
*(System service user apprunner created without interactive shell access)*
```

- **What you typed**: You used `-r` (system user) and `-s /bin/false` (disable login).
- **Why you typed it**: You needed a dedicated user to run background daemons securely without enabling shell login.
- **What happened**: Linux created a system account with a low numerical UID (< 1000) and no interactive shell access.

---

### Example 4: Verify new user details in system databases

Run `grep devuser /etc/passwd` to inspect the user entry.

```bash
ubuntu@ip-172-31-14-151:~$ grep devuser /etc/passwd
```

### Output

```bash
devuser:x:1001:1001:devuser:/home/devuser:/bin/bash
```

- **What you typed**: You ran `grep devuser /etc/passwd` to check user record details.
- **Why you typed it**: You wanted to verify UID, GID, home directory path, and default shell settings.
- **What happened**: Linux returned the colon-delimited user configuration line stored in `/etc/passwd`.

---

## DevOps Use Cases

- **Automated User Provisioning**: Run `useradd` in cloud-init scripts, Ansible playbooks, or Terraform initialization to set up engineer accounts automatically.
- **Securing Microservices**: Create dedicated system accounts (e.g., `useradd -r nodeapp`) to run Node.js, Python, or Go microservices under unprivileged accounts.
- **CI/CD Build Runners**: Create isolated user accounts for self-hosted GitHub Actions or GitLab CI build runners to restrict runner process permissions.
- **Container Base Image Setup**: Use `useradd` inside Dockerfiles (`RUN useradd -m appuser`) to avoid running container applications as root.

---

## Quick Tip

Always pair `useradd` with `passwd username` immediately after creation to set an initial password so the user account can log in.

---

## Common Mistakes

- **Forgetting the -m option**: Running `useradd username` without `-m` creates the user account without a home directory, leading to login warnings and missing profile settings.
- **Confusing useradd with adduser**: `useradd` is the standard native low-level binary command available across all Linux distros. `adduser` is a high-level interactive Perl script on Debian/Ubuntu.
- **Not specifying a login shell**: Omitting `-s` may set the default shell to `/bin/sh` or `/bin/false` instead of `/bin/bash`.

---

## Practice Challenge

1. Open your terminal.
2. Create a test user with a home directory: `sudo useradd -m testuser`.
3. Set a password for the new user: `sudo passwd testuser`.
4. Inspect the user record: `grep testuser /etc/passwd`.
5. Verify the home directory creation: `ls -ld /home/testuser`.

---

## Related Commands

- [usermod Command](./usermod.md) - Modify existing user account settings and groups.
- [userdel Command](./userdel.md) - Delete user accounts and home directories.
- [passwd Command](./passwd.md) - Change user passwords and expiration rules.
- [groupadd Command](./groupadd.md) - Create new user groups.

---

## Interview Notes

**Interview Question**: What is the difference between `/etc/passwd` and `/etc/shadow`?  
**Answer**: `/etc/passwd` is a world-readable file containing basic user account info (username, UID, GID, home dir, shell). `/etc/shadow` is accessible only by root and contains encrypted password hashes and account expiration metadata.
