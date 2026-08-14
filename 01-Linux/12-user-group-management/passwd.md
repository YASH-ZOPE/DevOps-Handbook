# passwd Command (Change User Password) | Linux Command for Beginners

Learn how to use the Linux passwd command to set user passwords, enforce password expiration policies, lock/unlock accounts, and inspect password security status with simple examples and DevOps use cases.

---

## What is this command?

The Linux `passwd` command updates user authentication credentials. It modifies password hashes stored in `/etc/shadow` and configures password aging and expiration policy attributes.

---

## Why do we use this command?

We use `passwd` to assign initial passwords for new user accounts, update compromised credentials, lock suspicious accounts, and enforce regular password rotation for compliance.

---

## Syntax

```bash
passwd [options] [username]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-l`, `--lock` | Locks the password of the specified account by prefixing the hash in `/etc/shadow`. |
| `-u`, `--unlock` | Unlocks a previously locked account password. |
| `-e`, `--expire` | Immediately expires a user's password, forcing a change on next login. |
| `-S`, `--status` | Displays password status info (creation date, lock state, expiration rules). |
| `-n`, `--mindays` | Sets minimum number of days required between password changes. |
| `-x`, `--maxdays` | Sets maximum number of days a password remains valid before expiring. |
| `-w`, `--warndays` | Sets number of warning days before password expires. |

---

## Examples

### Example 1: Change current user's password

Run `passwd` without arguments to change your own password.

```bash
ubuntu@ip-172-31-14-151:~$ passwd
```

### Output

```bash
Changing password for ubuntu.
Current password: 
New password: 
Retype new password: 
passwd: password updated successfully
```

- **What you typed**: You typed `passwd` and pressed Enter.
- **Why you typed it**: You wanted to update your personal login password.
- **What happened**: Linux prompted for your current password, validated strength rules for the new password, and updated `/etc/shadow`.

---

### Example 2: Change password for another user account (as root)

Run `sudo passwd devuser` to assign a new password to user `devuser`.

```bash
ubuntu@ip-172-31-14-151:~$ sudo passwd devuser
```

### Output

```bash
New password: 
Retype new password: 
passwd: password updated successfully
```

- **What you typed**: You typed `sudo passwd devuser`.
- **Why you typed it**: An engineer forgot their password or needed an initial login credential.
- **What happened**: As root, `passwd` bypasses current password prompts and sets the new user password directly.

---

### Example 3: Inspect password aging and security status

Run `sudo passwd -S devuser` to view account security status.

```bash
ubuntu@ip-172-31-14-151:~$ sudo passwd -S devuser
```

### Output

```bash
devuser P 2026-08-14 0 90 7 -1
```

- **What you typed**: You passed `-S devuser` (status).
- **Why you typed it**: You wanted to check if the password is active (`P`), locked (`L`), or unconfigured (`NP`).
- **What happened**: Linux outputted the username, password status code (`P`), last change date, min days (`0`), max days (`90`), warning days (`7`), and inactivity period (`-1`).

---

### Example 4: Force user to change password on next login

Run `sudo passwd -e devuser` to set immediate password expiration.

```bash
ubuntu@ip-172-31-14-151:~$ sudo passwd -e devuser
```

### Output

```bash
passwd: password expiry information changed.
```

- **What you typed**: You passed `-e devuser` (expire).
- **Why you typed it**: You created a temporary password and want the user to pick a private password upon logging in.
- **What happened**: Linux marked the password as expired in `/etc/shadow`, prompting the user for a new password at next SSH login.

---

## DevOps Use Cases

- **Enforcing Password Aging Policies**: Run `passwd -x 90 username` in automated security hardening scripts to enforce 90-day password rotation requirements.
- **Initial Credential Setup**: Assign initial temporary passwords during account provisioning and expire them immediately (`passwd -e`).
- **Rapid Security Incident Response**: Lock compromised accounts using `passwd -l username` during active security incidents.
- **Automated Non-Interactive Password Resets**: Pass passwords via piped commands in automation scripts: `echo "username:NewPass123!" | sudo chpasswd`.

---

## Quick Tip

Regular users must enter their current password to set a new one, but root/sudo can set any user's password without knowing their old password.

---

## Common Mistakes

- **Setting weak passwords**: Entering passwords that fail PAM complexity checks (PAM module rejects passwords that are too short or dictionary words).
- **Locking root account unexpectedly**: Running `passwd -l root` when no sudo users exist can permanently lock administrators out of standalone servers.
- **Confusing passwd with chpasswd**: `passwd` is designed for interactive command line usage, while `chpasswd` is designed for batch processing multiple passwords in scripts.

---

## Practice Challenge

1. Open your terminal.
2. Check password status for your current account: `sudo passwd -S $USER`.
3. Create a test user: `sudo useradd -m testpass`.
4. Set a password for the test user: `sudo passwd testpass`.
5. Force password expiration for the test user: `sudo passwd -e testpass`.
6. Clean up the test user: `sudo userdel -r testpass`.

---

## Related Commands

- [useradd Command](./useradd.md) - Create new user accounts.
- [usermod Command](./usermod.md) - Modify user parameters and lock states.
- [su Command](./su.md) - Switch user accounts after setting passwords.
- [whoami Command](../10-system-information/whoami.md) - Verify current authenticated identity.

---

## Interview Notes

**Interview Question**: How do you force a user to change their password upon their very next SSH login?  
**Answer**: Run `sudo passwd -e username` (or `sudo chage -d 0 username`). This sets the last password change timestamp in `/etc/shadow` to `0`, which signals Linux to force a mandatory password update immediately after successful authentication.
