# su Command (Switch User) | Linux Command for Beginners

Learn how to use the Linux su command to switch user accounts, open login shells with full environment variables, and run single commands as another user with simple examples and DevOps use cases.

---

## What is this command?

The Linux `su` command stands for **Switch User** (or Substitute User). It allows you to switch from your current user session to another user account (including the root superuser) within a terminal session.

---

## Why do we use this command?

We use `su` to temporarily switch to another user identity to perform tasks under that user's permissions, test environment settings, or switch to a full root shell.

---

## Syntax

```bash
su [options] [username]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-`, `-l`, `--login` | Starts the shell as a full login shell, initializing the target user's environment variables (`$PATH`, `$HOME`, `$USER`). |
| `-c`, `--command` | Runs a single command as the target user and returns to the current shell immediately. |
| `-s`, `--shell` | Specifies a non-default shell to run for the session. |
| `-m`, `-p`, `--preserve-environment` | Preserves existing environment variables when switching users. |

---

## Examples

### Example 1: Switch to another user account with a full login shell

Run `su - devuser` to open a fresh login shell for `devuser`.

```bash
ubuntu@ip-172-31-14-151:~$ su - devuser
Password: 
devuser@ip-172-31-14-151:~$ pwd
/home/devuser
```

- **What you typed**: You typed `su - devuser` and entered `devuser`'s password.
- **Why you typed it**: You wanted a clean login session loaded with `devuser`'s environment variables, working directory, and PATH.
- **What happened**: Linux authenticated the user, loaded `/home/devuser` environment profiles (`.bashrc`, `.profile`), and changed working directory to `/home/devuser`.

---

### Example 2: Execute a single command as another user

Run `su - devuser -c "whoami"` to run one command without switching shells interactively.

```bash
ubuntu@ip-172-31-14-151:~$ su - devuser -c "whoami"
Password: 
devuser
```

- **What you typed**: You passed `-c "whoami"` with `su - devuser`.
- **Why you typed it**: You wanted to run a single command under another user's identity.
- **What happened**: Linux authenticated the target user, executed `whoami`, printed the output, and exited back to your original shell prompt.

---

### Example 3: Switch to the root user login shell

Run `su -` to open a root login shell.

```bash
ubuntu@ip-172-31-14-151:~$ su -
Password: 
root@ip-172-31-14-151:~# whoami
root
```

- **What you typed**: You typed `su -` (omitting username defaults to `root`).
- **Why you typed it**: You needed full root administrative access to perform server configuration tasks.
- **What happened**: Linux prompted for the **root account password** and started an interactive root login shell.

---

## DevOps Use Cases

- **Testing Application User Permissions**: Switch to non-root service accounts (`su - www-data`) to test application file write permissions and environment configs before deployment.
- **Running Administrative Maintenance**: Switch to root (`su -`) when performing extensive system upgrades or multi-step maintenance operations.
- **Automated Script Execution**: Use `su - username -c "command"` inside deployment scripts to execute specific build steps as a dedicated service account.

---

## Quick Tip

Always use `su -` (with the hyphen `-`) instead of plain `su`. Plain `su` keeps your current user's environment variables (`$HOME`, `$PATH`), which can lead to unexpected permission errors or running programs in the wrong directory.

---

## Common Mistakes

- **Using plain su instead of su -**: Running `su root` keeps your standard user's `$PATH` and `$HOME` instead of loading root's environment profiles, causing command not found errors for administrative tools.
- **Confusing target user password with own user password**: `su username` requires the **target user's password** (or root password), whereas `sudo command` requires **your own user password**.
- **Leaving root sessions open**: Forgetting to type `exit` after finishing root tasks leaves an elevated shell session active.

---

## Practice Challenge

1. Open your terminal.
2. Create a test user: `sudo useradd -m testsu`.
3. Set password for test user: `sudo passwd testsu`.
4. Switch to test user with full login shell: `su - testsu`.
5. Check current user and home directory: `whoami` and `pwd`.
6. Return to original session: `exit`.
7. Clean up test user: `sudo userdel -r testsu`.

---

## Related Commands

- [sudo Command](../11-system-control/sudo.md) - Execute commands with elevated permissions using your own password.
- [passwd Command](./passwd.md) - Change user passwords.
- [whoami Command](../10-system-information/whoami.md) - Print current effective user identity.
- [id Command](../10-system-information/id.md) - Display active UID, GID, and group information.

---

## Interview Notes

**Interview Question**: What is the difference between `su` and `su -`?  
**Answer**: `su` switches to the target user identity but retains the original user's environment variables (`$HOME`, `$PATH`, `$USER`) and current working directory. `su -` starts a full login shell, resetting environment variables and changing working directory to the target user's home directory (`/home/username` or `/root`).
