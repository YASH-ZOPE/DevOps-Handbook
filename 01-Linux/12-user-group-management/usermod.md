# usermod Command (Modify User Account) | Linux Command for Beginners

Learn how to use the Linux usermod command to modify existing user account properties, append supplementary groups, lock/unlock accounts, and change login shells with simple examples and DevOps use cases.

---

## What is this command?

The Linux `usermod` command modifies existing user account settings in system database files (`/etc/passwd`, `/etc/shadow`, `/etc/group`). It allows administrators to update group memberships, usernames, login shells, home directory paths, and account lock states.

---

## Why do we use this command?

We use `usermod` to grant existing users additional privileges (such as adding them to the `docker` or `sudo` groups), lock compromised accounts, or update user profiles when roles change.

---

## Syntax

```bash
usermod [options] username
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-aG`, `--append --groups` | Appends the user to supplementary groups without removing existing group memberships. |
| `-s`, `--shell` | Changes the user's default login shell. |
| `-L`, `--lock` | Locks the user's password, preventing login access. |
| `-U`, `--unlock` | Unlocks a previously locked user password. |
| `-l`, `--login` | Changes the login name of the user account. |
| `-d`, `--home` | Changes the user's home directory path. |
| `-m`, `--move-home` | Moves existing home directory contents to a new location (used with `-d`). |
| `-e`, `--expiredate` | Updates account expiration date (`YYYY-MM-DD`). |

---

## Examples

### Example 1: Add a user to a supplementary group (e.g., docker group)

Run `sudo usermod -aG docker ubuntu` to give user "ubuntu" permission to run Docker containers.

```bash
ubuntu@ip-172-31-14-151:~$ sudo usermod -aG docker ubuntu
```

### Output

```bash
*(Command succeeds silently; take effect on next login session)*
```

- **What you typed**: You passed `-aG docker ubuntu` to append `ubuntu` to the `docker` group.
- **Why you typed it**: You wanted the user to run `docker` commands without prefixing them with `sudo`.
- **What happened**: Linux appended `ubuntu` to the `docker` line inside `/etc/group`.

---

### Example 2: Change a user's default login shell

Run `sudo usermod -s /bin/zsh devuser` to change user's shell.

```bash
ubuntu@ip-172-31-14-151:~$ sudo usermod -s /bin/zsh devuser
```

### Output

```bash
*(User devuser shell updated to /bin/zsh in /etc/passwd)*
```

- **What you typed**: You passed `-s /bin/zsh devuser`.
- **Why you typed it**: The user requested Zsh as their primary terminal shell environment.
- **What happened**: Linux updated the shell path field for `devuser` inside `/etc/passwd`.

---

### Example 3: Lock a user account to prevent login

Run `sudo usermod -L devuser` to disable login access temporarily.

```bash
ubuntu@ip-172-31-14-151:~$ sudo usermod -L devuser
```

### Output

```bash
*(User devuser account locked)*
```

- **What you typed**: You passed `-L devuser` (lock).
- **Why you typed it**: You wanted to block access for an inactive account without deleting files.
- **What happened**: Linux added an exclamation mark (`!`) in front of the encrypted password hash in `/etc/shadow`.

---

### Example 4: Unlock a locked user account

Run `sudo usermod -U devuser` to restore account login capability.

```bash
ubuntu@ip-172-31-14-151:~$ sudo usermod -U devuser
```

### Output

```bash
*(User devuser account unlocked)*
```

- **What you typed**: You passed `-U devuser` (unlock).
- **Why you typed it**: You wanted to restore access after completing a security audit.
- **What happened**: Linux removed the lock prefix from `/etc/shadow`, restoring login access.

---

## DevOps Use Cases

- **Granting Docker/Kubernetes Access**: Run `usermod -aG docker $USER` during developer workstation setup or onboarding scripts.
- **Granting Sudo Administrative Rights**: Add team members to the administrative group (`usermod -aG sudo username` on Ubuntu, `usermod -aG wheel username` on RHEL/CentOS).
- **Security Incident Quarantine**: Immediately lock compromised engineer or service accounts using `usermod -L username`.
- **Disabling Shell Login for Service Accounts**: Switch an account's shell to `/sbin/nologin` or `/bin/false` (`usermod -s /usr/sbin/nologin appuser`) to block interactive SSH logins.

---

## Quick Tip

**CRITICAL**: Always use `-aG` (append flag `-a` combined with `-G`) when adding a user to new groups. Omitting `-a` will remove the user from all existing secondary groups!

---

## Common Mistakes

- **Forgetting the -a flag when using -G**: Running `usermod -G docker username` without `-a` wipes out all existing secondary groups (including `sudo` or `wheel`), revoking admin rights!
- **Not logging out after group modifications**: Group membership changes take effect only when the user logs out and starts a new SSH/terminal session.
- **Locking account without disabling SSH keys**: `usermod -L` disables password logins, but users with authorized SSH public keys can still log in unless their key files or shell access are removed.

---

## Practice Challenge

1. Open your terminal.
2. Check your current user groups: `id`.
3. Create a test group: `sudo groupadd testgroup`.
4. Append your user to the group: `sudo usermod -aG testgroup $USER`.
5. Verify group addition: `groups $USER`.

---

## Related Commands

- [useradd Command](./useradd.md) - Create new system user accounts.
- [gpasswd Command](./gpasswd.md) - Administer group memberships directly.
- [passwd Command](./passwd.md) - Manage passwords and lock states.
- [id Command](../10-system-information/id.md) - View user ID, group ID, and active memberships.

---

## Interview Notes

**Interview Question**: Why is running `usermod -G group user` dangerous compared to `usermod -aG group user`?  
**Answer**: `usermod -G` replaces the user's secondary group list entirely with the specified group. Omitting `-a` (append) strips the user from all other secondary groups they previously belonged to (such as `sudo`, `docker`, `k8s`), causing accidental permission loss.
