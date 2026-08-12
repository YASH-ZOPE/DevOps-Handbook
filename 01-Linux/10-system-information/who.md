# who Command (Logged-in Users) | Linux Command for Beginners

Learn how to use the Linux who command to see who is logged into a server, active terminals, login timestamps, and system boot times with simple examples and DevOps use cases.

---

## What is this command?

The Linux `who` command displays a list of all user accounts currently logged into the system.

---

## Why do we use this command?

We use `who` to monitor active SSH connections, check terminal sessions, and audit logged-in users on shared servers.

---

## Syntax

```bash
who [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-H` | Displays column headings above the output table. |
| `-b` | Displays the date and time of the last system boot. |
| `-q` | Displays a quick count and list of active usernames. |
| `-u` | Displays idle time and process ID for each user session. |
| `am i` | Displays information for your active terminal session only. |

---

## Examples

### Example 1: View active logged-in users with column headings

Run `who -H` to list all logged-in users alongside clear column titles.

```bash
ubuntu@ip-172-31-14-151:~$ who -H
```

### Output

```bash
NAME     LINE         TIME           COMMENT
ubuntu   pts/0        2026-08-12 07:30 (172.31.0.5)
alex     pts/1        2026-08-12 08:10 (192.168.1.50)
```

- **What you typed**: You typed `who -H` with the header (`-H`) option.
- **Why you typed it**: You wanted to see all active user sessions with readable column labels.
- **What happened**: Linux displayed logged-in usernames, terminal line numbers, login timestamps, and remote IP addresses.

---

### Example 2: View a quick summary of logged-in users

Run `who -q` to view a short list of usernames and the total user count.

```bash
ubuntu@ip-172-31-14-151:~$ who -q
```

### Output

```bash
ubuntu alex
# users=2
```

- **What you typed**: You passed `-q` (quick count).
- **Why you typed it**: You wanted to check how many people are logged into the server without detailed session lines.
- **What happened**: Linux listed active usernames and printed `# users=2`.

---

### Example 3: View last system boot timestamp

Run `who -b` to display the exact date and time the system was started.

```bash
ubuntu@ip-172-31-14-151:~$ who -b
```

### Output

```bash
         system boot  2026-07-29 04:53
```

- **What you typed**: You passed `-b` (boot time).
- **Why you typed it**: You wanted to verify when the server was last booted.
- **What happened**: Linux returned the last system boot timestamp.

---

### Example 4: Check details for your own session

Run `who am i` to display information about your current terminal connection.

```bash
ubuntu@ip-172-31-14-151:~$ who am i
```

### Output

```bash
ubuntu   pts/0        2026-08-12 07:30 (172.31.0.5)
```

- **What you typed**: You typed `who am i`.
- **Why you typed it**: You wanted to check your specific pseudo-terminal number (`pts/0`) and login source IP.
- **What happened**: Linux filtered out other sessions and displayed only your active connection line.

---

## DevOps Use Cases

- **Auditing Bastion Server Connections**: Monitor active SSH user connections on jump hosts or bastion instances.
- **Pre-Maintenance Checks**: Verify that no other team members are logged in before rebooting or updating production servers.
- **Security Monitoring**: Identify unauthorized remote IP addresses connected to server terminal sessions.
- **Incident Response**: Track user sessions and login timestamps during security investigation audits.

---

## Quick Tip

Run `who -u` to see how long each user session has been idle (`.` means active in the last minute).

---

## Common Mistakes

- **Confusing who with whoami**: `whoami` returns a single string with your effective username. `who` lists all users logged into the system.
- **Expecting who to show running commands**: `who` shows user login sessions. Use `w` or `ps` if you want to see what commands users are currently executing.

---

## Practice Challenge

1. Open your terminal.
2. Display active users with table headers: `who -H`.
3. Display quick user count: `who -q`.
4. Display last system boot timestamp: `who -b`.
5. Check details for your session: `who am i`.

---

## Related Commands

- [whoami Command](./whoami.md) - View your effective username.
- [id Command](./id.md) - View user ID, group ID, and assigned security groups.
- [uptime Command](./uptime.md) - View total uptime and count of active users.
- [hostname Command](./hostname.md) - View system host name.

---

## Interview Notes

**Interview Question**: How do you inspect which IP addresses users are connecting from when auditing a Linux server?  
**Answer**: Run `who -H` or `who -u`. The output displays active terminal sessions alongside the remote IP address or domain name in parentheses for each user session.
