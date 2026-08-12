# id Command (User and Group Identity) | Linux Command for Beginners

Learn how to use the Linux id command to check user IDs, group IDs, and security memberships with simple examples and DevOps use cases.

---

## What is this command?

The Linux `id` command displays real and effective user IDs (UID), group IDs (GID), and group memberships for your account or any specified user.

---

## Why do we use this command?

We use `id` to check security permissions, verify group memberships (such as `sudo` or `docker` groups), and troubleshoot permission issues.

---

## Syntax

```bash
id [options] [username]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-u` | Displays only the numerical user ID (UID). |
| `-g` | Displays only the primary numerical group ID (GID). |
| `-G` | Displays all supplementary group IDs assigned to the user. |
| `-n` | Displays names instead of numerical IDs (used with `-u`, `-g`, or `-G`). |
| `-a` | Displays full identity details (default behavior). |

---

## Examples

### Example 1: View complete identity details for current user

Run `id` without flags to view full user, group, and membership data.

```bash
ubuntu@ip-172-31-14-151:~$ id
```

### Output

```bash
uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu),4(adm),27(sudo),999(docker)
```

- **What you typed**: You typed `id` and pressed Enter.
- **Why you typed it**: You wanted to check your user ID, primary group, and secondary group memberships.
- **What happened**: Linux listed UID 1000 (`ubuntu`), primary GID 1000 (`ubuntu`), and supplementary groups (`sudo`, `docker`).

---

### Example 2: View numerical User ID (UID)

Run `id -u` to display only the numerical user ID number.

```bash
ubuntu@ip-172-31-14-151:~$ id -u
```

### Output

```bash
1000
```

- **What you typed**: You passed `-u` (user ID).
- **Why you typed it**: You needed the raw numerical UID for a script or container configuration.
- **What happened**: Linux printed `1000`.

---

### Example 3: View human-readable group names

Run `id -nG` to print a list of all group names assigned to your account.

```bash
ubuntu@ip-172-31-14-151:~$ id -nG
```

### Output

```bash
ubuntu adm sudo docker
```

- **What you typed**: You combined `-n` (names) and `-G` (all groups).
- **Why you typed it**: You wanted to check group names without reading numerical IDs.
- **What happened**: Linux listed assigned group names separated by spaces.

---

### Example 4: View identity information for another user

Run `id www-data` to inspect details for the Nginx/Apache web user account.

```bash
ubuntu@ip-172-31-14-151:~$ id www-data
```

### Output

```bash
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

- **What you typed**: You passed `www-data` as the target username argument.
- **Why you typed it**: You wanted to check the UID and GID assigned to the web service account.
- **What happened**: Linux returned UID 33 and GID 33 for `www-data`.

---

## DevOps Use Cases

- **Verifying Docker Group Access**: Run `id` to confirm your user belongs to the `docker` group, allowing you to run Docker without `sudo`.
- **Setting Non-Root Users in Dockerfiles**: Use `USER 1001` or `USER 1000` based on `id -u` output to adhere to container security best practices.
- **Troubleshooting File Permission Denied Errors**: Verify user and group IDs when debugging file access errors on mounted volumes.
- **Auditing Sudo Privileges**: Check whether a user belongs to the `sudo` or `wheel` administrative group.

---

## Quick Tip

Run `id -u` inside automation scripts to quickly verify if the script is executing under root (UID `0`) or a non-root account.

---

## Common Mistakes

- **Forgetting to re-login after group additions**: Adding a user to a group (e.g. `usermod -aG docker ubuntu`) does not update `id` output until you open a fresh terminal session.
- **Assuming UID 1000 is always the same across machines**: UID 1000 is usually the first regular user created on Ubuntu, but user IDs can vary across different Linux distributions.

---

## Practice Challenge

1. Open your terminal.
2. View your complete identity information: `id`.
3. Display your numerical UID: `id -u`.
4. Display all group names you belong to: `id -nG`.
5. Check identity details for system users: `id root`.

---

## Related Commands

- [whoami Command](./whoami.md) - View current username string.
- [who Command](./who.md) - List active logged-in users.
- [hostname Command](./hostname.md) - View system host name.
- [uname Command](./uname.md) - View OS and kernel info.

---

## Interview Notes

**Interview Question**: What is the numerical User ID (UID) of the administrative `root` user in Linux?  
**Answer**: The `root` user in Linux always has a UID of `0`. Any account configured with UID `0` possesses full superuser permissions on the system.
