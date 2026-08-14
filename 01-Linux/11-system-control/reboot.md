# reboot Command (System Restart) | Linux Command for Beginners

Learn how to use the Linux reboot command to restart servers, manage reboot flags, and safely perform system restarts with simple examples and DevOps use cases.

---

## What is this command?

The Linux `reboot` command instructs the operating system to shut down safely, stop all running processes, unmount filesystems, and restart the system hardware or virtual machine.

---

## Why do we use this command?

We use `reboot` after applying Linux kernel updates, system upgrades, or configuration changes that require a clean system start to take effect.

---

## Syntax

```bash
reboot [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-f`, `--force` | Forces an immediate reboot without contacting systemd or shutting down daemons gracefully. |
| `-p`, `--poweroff` | Powers down the system machine instead of rebooting. |
| `-w`, `--wtmp-only` | Does not reboot the machine; writes a reboot record entry to `/var/log/wtmp` only. |
| `-d`, `--no-wtmp` | Reboots system without writing the reboot record entry to `/var/log/wtmp`. |
| `--dry-run` | Simulates the reboot action without actually restarting the machine. |

---

## Examples

### Example 1: Reboot a Linux server immediately

Run `sudo reboot` to initiate a clean and safe server restart.

```bash
ubuntu@ip-172-31-14-151:~$ sudo reboot
```

### Output

```bash
PolicyKit daemon disconnected from the bus.
System is rebooting...
Connection to ip-172-31-14-151 closed by remote host.
```

- **What you typed**: You typed `sudo reboot` and pressed Enter.
- **Why you typed it**: You completed system maintenance and needed to restart the operating system cleanly.
- **What happened**: Linux broadcasted a shutdown message to logged-in users, safely terminated background services, unmounted drives, and restarted the server hardware.

---

### Example 2: Test reboot execution without restarting

Run `sudo reboot --dry-run` to simulate a reboot procedure.

```bash
ubuntu@ip-172-31-14-151:~$ sudo reboot --dry-run
```

### Output

```bash
Would reboot system.
```

- **What you typed**: You typed `sudo reboot --dry-run`.
- **Why you typed it**: You wanted to verify command execution privileges and syntax without interrupting server operations.
- **What happened**: Linux performed checks and confirmed it would initiate a reboot, but left the system running normally.

---

### Example 3: Check system boot and reboot history

Run `last reboot` to view a historical log of when the server was restarted.

```bash
ubuntu@ip-172-31-14-151:~$ last reboot | head -n 3
```

### Output

```bash
reboot   system boot  5.15.0-1034-aws  Fri Aug 14 07:30   still running
reboot   system boot  5.15.0-1034-aws  Wed Jul 29 04:53 - 07:30 (16+02:37)
reboot   system boot  5.15.0-1031-aws  Mon Jul 13 10:15 - 04:52 (15+18:37)
```

- **What you typed**: You typed `last reboot` and filtered output with `head`.
- **Why you typed it**: You wanted to inspect system stability history and see past boot timestamps.
- **What happened**: Linux parsed `/var/log/wtmp` to show past reboot events and durations.

---

## DevOps Use Cases

- **Post-Kernel Patch Maintenance**: Reboot production servers after security patch installations to load updated kernel modules.
- **Automated Cloud Instance Recycling**: Issue `reboot` via AWS EC2 User Data or SSM agents during scheduled maintenance windows.
- **Troubleshooting Unresponsive Nodes**: Execute a forced reboot (`reboot -f`) when a node hangs during hardware daemon failures.
- **CI/CD Pipeline Validation**: Test custom OS image builds by verifying that a freshly configured VM reboots cleanly without errors.

---

## Quick Tip

Before running `reboot` on a production server, always check active SSH users with `who` or `w` and active processes with `top` or `ps aux` to avoid terminating someone's work unexpectedly.

---

## Common Mistakes

- **Using reboot -f unnecessarily**: Running `reboot -f` skips graceful daemon shutdown and unmounting, which can cause database corruption or data loss.
- **Rebooting without notifying team members**: Initiating a reboot without sending a notification or scheduling a maintenance window can break running user sessions and background jobs.
- **Rebooting remote servers without console access**: Rebooting a remote cloud instance with broken network configs might prevent SSH access post-boot; ensure serial console access is available.

---

## Practice Challenge

1. Open your terminal.
2. Check when your server was last rebooted using: `uptime -s`.
3. View the reboot log history: `last reboot`.
4. Test dry-run reboot mode safely: `sudo reboot --dry-run`.

---

## Related Commands

- [shutdown Command](./shutdown.md) - Schedule system shutdowns or reboots with user notification timer.
- [systemctl Command](./systemctl.md) - Manage system services and reboot via systemd (`systemctl reboot`).
- [uptime Command](../10-system-information/uptime.md) - Check system running duration since last boot.
- [who Command](../10-system-information/who.md) - List active users before initiating a restart.

---

## Interview Notes

**Interview Question**: What is the difference between `reboot` and `shutdown -r now`?  
**Answer**: On modern systemd-based Linux distributions, both commands invoke systemd target `reboot.target` to cleanly stop services and reboot. However, `shutdown -r` allows scheduling a delayed restart with custom broadcast messages (e.g., `shutdown -r +10 "Maintenance in 10 mins"`), while `reboot` triggers immediately.
