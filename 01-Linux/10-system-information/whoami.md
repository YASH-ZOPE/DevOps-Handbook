# whoami Command (Current User Name) | Linux Command for Beginners

Learn how to use the Linux whoami command to check your effective user identity and verify active shell accounts with simple examples and DevOps use cases.

---

## What is this command?

The Linux `whoami` command displays the effective username of the user currently running the shell session.

---

## Why do we use this command?

We use `whoami` to verify which account (such as `ubuntu`, `root`, `jenkins`, or `www-data`) is running commands.

---

## Syntax

```bash
whoami [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `--help` | Displays usage instructions. |
| `--version` | Displays version information. |

---

## Examples

### Example 1: Check your current logged-in username

Run `whoami` without arguments to view your active user name.

```bash
ubuntu@ip-172-31-14-151:~$ whoami
```

### Output

```bash
ubuntu
```

- **What you typed**: You typed `whoami` and pressed Enter.
- **Why you typed it**: You wanted to confirm which user account you are logged in as.
- **What happened**: Linux returned the username `ubuntu`.

---

### Example 2: Verify user identity after switching to root

Run `sudo -i` followed by `whoami` to confirm elevated root access.

```bash
ubuntu@ip-172-31-14-151:~$ sudo -i
root@ip-172-31-14-151:~# whoami
```

### Output

```bash
root
```

- **What you typed**: You elevated privileges to root shell and typed `whoami`.
- **Why you typed it**: You wanted to verify that administrative root privileges were granted successfully.
- **What happened**: Linux returned `root`.

---

### Example 3: Use whoami inside bash automation scripts

Incorporate `whoami` into shell scripts to display user execution context.

```bash
ubuntu@ip-172-31-14-151:~$ echo "Current user executing script: $(whoami)"
```

### Output

```bash
Current user executing script: ubuntu
```

- **What you typed**: You embedded `$(whoami)` inside an `echo` statement.
- **Why you typed it**: You wanted to log execution identity in automated build scripts.
- **What happened**: Linux substituted `$(whoami)` with `ubuntu` and printed the message.

---

## DevOps Use Cases

- **Verifying Script Execution Context**: Include `if [ "$(whoami)" != "root" ]; then exit 1; fi` in setup scripts to ensure they are executed with root privileges.
- **Auditing CI/CD Runner Environment**: Print `whoami` in Jenkins or GitHub Actions workflows to verify build agent user privileges.
- **Troubleshooting Permission Denied Errors**: Verify whether application services are running under `www-data`, `nginx`, or service accounts when debugging file permission errors.
- **Auditing Admin Privilege Escalation**: Verify effective identity after switching user context with `su` or `sudo`.

---

## Quick Tip

Add a user check at the beginning of administrative deployment scripts to prevent junior engineers from executing scripts under the wrong user account.

---

## Common Mistakes

- **Confusing whoami with who**: `whoami` displays *your* current effective username. `who` displays a list of *all* users logged into the system.
- **Confusing whoami with id**: `whoami` outputs only a simple username string. `id` outputs complete user IDs, group IDs, and group lists.

---

## Practice Challenge

1. Open your terminal.
2. Check your current username: `whoami`.
3. Switch to root session (if enabled): `sudo su`.
4. Verify user identity: `whoami`.
5. Exit root session: `exit`.

---

## Related Commands

- [id Command](./id.md) - View user ID, group ID, and group memberships.
- [who Command](./who.md) - List all users currently logged into the system.
- [hostname Command](./hostname.md) - View or manage system hostname.
- [uname Command](./uname.md) - View Linux kernel and OS details.

---

## Interview Notes

**Interview Question**: How do you prevent a bash script from running if it is executed by any user other than `root`?  
**Answer**: Add a check at the top of the script: `if [ "$(whoami)" != "root" ]; then echo "Must run as root"; exit 1; fi`.
