# shutdown Command (System Power-off and Reboot) | Linux Command for Beginners

Learn how to use the Linux shutdown command to power off systems, schedule delayed shutdowns, broadcast warning messages, and cancel pending shutdowns with simple examples and DevOps use cases.

---

## What is this command?

The Linux `shutdown` command safely brings the operating system down. It notifies logged-in users, prevents new logins, terminates running processes gracefully, and powers off or restarts the machine.

---

## Why do we use this command?

We use `shutdown` to schedule safe server turn-offs or reboots, warn active users before system maintenance, and prevent filesystem corruption during power-down operations.

---

## Syntax

```bash
shutdown [options] [time] [message]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-h`, `--poweroff` | Powers off the system machine (default action on modern Linux). |
| `-r`, `--reboot` | Reboots the system after shutting down services. |
| `-H`, `--halt` | Halts the system hardware without turning off power completely. |
| `-c` | Cancels a pending scheduled shutdown operation. |
| `-k` | Sends warning messages to logged-in users without actually shutting down. |
| `--no-wall` | Suppresses broadcasting warning wall messages to logged-in users. |

---

## Examples

### Example 1: Shut down the server immediately

Run `sudo shutdown now` to start an instant power-off procedure.

```bash
ubuntu@ip-172-31-14-151:~$ sudo shutdown now
```

### Output

```bash
Broadcast message from root@ip-172-31-14-151 on pts/0 (Fri 2026-08-14 23:45:00 UTC):

The system is going down for poweroff NOW!
Connection to ip-172-31-14-151 closed by remote host.
```

- **What you typed**: You typed `sudo shutdown now` and pressed Enter.
- **Why you typed it**: You wanted to power off the machine immediately.
- **What happened**: Linux sent a wall message to all open terminals, closed services, unmounted storage, and turned off hardware power.

---

### Example 2: Schedule a shutdown in 15 minutes with a custom broadcast message

Run `sudo shutdown +15 "Server maintenance starting soon, please save your work."` to notify users.

```bash
ubuntu@ip-172-31-14-151:~$ sudo shutdown +15 "Server maintenance starting soon, please save your work."
```

### Output

```bash
Shutdown scheduled for Fri 2026-08-14 24:00:00 UTC, use 'shutdown -c' to cancel.
```

- **What you typed**: You passed time argument `+15` (15 minutes) and a custom announcement string.
- **Why you typed it**: You wanted to give logged-in team members time to finish active tasks before maintenance.
- **What happened**: Linux created a timer, broadcasted the custom message across active terminals, and blocked non-root logins 5 minutes prior to shutdown.

---

### Example 3: Cancel a pending scheduled shutdown

Run `sudo shutdown -c` to stop a scheduled shutdown.

```bash
ubuntu@ip-172-31-14-151:~$ sudo shutdown -c "Maintenance canceled."
```

### Output

```bash
Broadcast message from root@ip-172-31-14-151 on pts/0 (Fri 2026-08-14 23:50:00 UTC):

The system shutdown has been cancelled.
```

- **What you typed**: You passed `-c` along with an optional cancellation message.
- **Why you typed it**: Maintenance was postponed, so you needed to abort the pending timer.
- **What happened**: Linux removed the scheduled shutdown timer and notified logged-in users that the shutdown was aborted.

---

### Example 4: Schedule a reboot at a specific time

Run `sudo shutdown -r 02:00` to schedule an overnight system reboot at 2:00 AM.

```bash
ubuntu@ip-172-31-14-151:~$ sudo shutdown -r 02:00 "Automated nightly reboot"
```

### Output

```bash
Shutdown scheduled for Sat 2026-08-15 02:00:00 UTC, use 'shutdown -c' to cancel.
```

- **What you typed**: You used `-r` with exact 24-hour time format `02:00`.
- **Why you typed it**: You wanted to perform a reboot during low-traffic hours automatically.
- **What happened**: Linux queued a reboot timer for 02:00 AM UTC.

---

## DevOps Use Cases

- **Scheduled Server Maintenance**: Broadcast warnings to engineers and schedule off-peak maintenance shutdowns.
- **Cloud Infrastructure Cost Management**: Shut down non-production development environments automatically at the end of the workday using scheduled scripts.
- **Graceful Node Decommissioning**: Drain traffic, stop containers, and run `shutdown` when retiring cloud compute nodes or bare-metal servers.
- **Emergency System Containment**: Power down servers immediately (`shutdown now`) during critical hardware faults or severe security incidents.

---

## Quick Tip

If you schedule a shutdown by accident, open a terminal session immediately and type `sudo shutdown -c` to cancel it before the timer expires.

---

## Common Mistakes

- **Forgetting the time argument**: Running `shutdown` without a time argument defaults to `+1` (1 minute delay), not instant shutdown. Use `shutdown now` for immediate execution.
- **Not broadcasting warning messages**: Shutting down without giving active SSH users advance notice can cause lost work or interrupted deployments.
- **Using 12-hour format instead of 24-hour format**: Time specifications must use 24-hour format (`hh:mm`, e.g., `23:30` instead of `11:30 PM`).

---

## Practice Challenge

1. Open your terminal.
2. Schedule a test shutdown for 10 minutes from now: `sudo shutdown +10 "Testing shutdown schedule"`.
3. Check system wall message in your terminal session.
4. Cancel the pending shutdown: `sudo shutdown -c`.
5. Test warning message mode without shutting down: `sudo shutdown -k +5 "Simulated warning"`.

---

## Related Commands

- [reboot Command](./reboot.md) - Restart the operating system directly.
- [systemctl Command](./systemctl.md) - Manage system services and power state (`systemctl poweroff`).
- [uptime Command](../10-system-information/uptime.md) - Check system uptime before scheduling a shutdown.
- [who Command](../10-system-information/who.md) - View active user sessions prior to scheduling shutdown.

---

## Interview Notes

**Interview Question**: What happens behind the scenes when you run `shutdown +5` on a modern Linux server?  
**Answer**: Modern Linux systems create a `/run/nologin` file 5 minutes prior to shutdown to block non-root logins, send wall messages to all logged-in user terminals, notify `systemd`, terminate running processes via SIGTERM (and SIGKILL if needed), unmount file systems, and issue power-off signals to hardware.
