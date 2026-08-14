# systemctl Command (Systemd Control) | Linux Command for Beginners

Learn how to use the Linux systemctl command to manage systemd services, inspect daemon status, control boot startup programs, and manage system targets with simple examples and DevOps use cases.

---

## What is this command?

The Linux `systemctl` command is the primary central management tool for **systemd**, the init system and service manager used in modern Linux operating systems. It is used to start, stop, restart, enable, disable, and inspect background services and daemons.

---

## Why do we use this command?

We use `systemctl` to control system services (like Web servers, databases, SSH daemons, and Docker engines), reload configuration files without stopping services, and configure services to start automatically on system boot.

---

## Syntax

```bash
systemctl [command] [service_name]
```

---

## Useful Options

| Subcommand / Option | What it does |
|---|---|
| `status` | Displays the current running status, active state, PID, and recent logs of a service. |
| `start` | Starts an inactive service immediately. |
| `stop` | Stops a currently running service immediately. |
| `restart` | Restops and restarts a running service. |
| `reload` | Reloads a service's configuration files without dropping active connections. |
| `enable` | Configures a service to start automatically at system boot time. |
| `disable` | Prevents a service from starting automatically at system boot time. |
| `is-active` | Checks if a service is currently running (returns active/inactive). |
| `is-enabled` | Checks if a service is configured to start on boot. |
| `daemon-reload` | Reloads systemd manager configuration and rescans unit files. |

---

## Examples

### Example 1: Check the status of a system service

Run `systemctl status nginx` to inspect whether the Nginx web server is running.

```bash
ubuntu@ip-172-31-14-151:~$ systemctl status nginx
```

### Output

```bash
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2026-08-14 07:35:12 UTC; 16h ago
       Docs: man:nginx(8)
   Main PID: 2104 (nginx)
      Tasks: 2 (limit: 2314)
     Memory: 18.2M
        CPU: 1.45s
     CGroup: /system.slice/nginx.service
             ├─2104 nginx: master process /usr/sbin/nginx
             └─2105 nginx: worker process
```

- **What you typed**: You typed `systemctl status nginx` and pressed Enter.
- **Why you typed it**: You wanted to verify if Nginx is active, check its memory consumption, main PID, and unit configuration.
- **What happened**: Linux queried systemd and displayed detailed health, process tree, and log metrics for the `nginx.service` unit.

---

### Example 2: Restart a web server service

Run `sudo systemctl restart nginx` after making changes to your website configuration.

```bash
ubuntu@ip-172-31-14-151:~$ sudo systemctl restart nginx
```

### Output

```bash
*(Command succeeds silently with exit status 0)*
```

- **What you typed**: You ran `sudo systemctl restart nginx`.
- **Why you typed it**: You modified Nginx site configuration files and needed systemd to stop and restart the process with new settings.
- **What happened**: systemd stopped the master and worker processes of Nginx and spawned fresh instances.

---

### Example 3: Enable a service to start automatically on system boot

Run `sudo systemctl enable docker` to ensure Docker starts whenever the server reboots.

```bash
ubuntu@ip-172-31-14-151:~$ sudo systemctl enable docker
```

### Output

```bash
Created symlink /etc/systemd/system/multi-user.target.wants/docker.service → /lib/systemd/system/docker.service.
```

- **What you typed**: You typed `sudo systemctl enable docker`.
- **Why you typed it**: You wanted the Docker daemon to start automatically when the server boots up.
- **What happened**: systemd created a symbolic link in the startup target directory pointing to the Docker unit file.

---

### Example 4: Reload systemd configuration after modifying unit files

Run `sudo systemctl daemon-reload` after adding or updating custom unit files in `/etc/systemd/system/`.

```bash
ubuntu@ip-172-31-14-151:~$ sudo systemctl daemon-reload
```

### Output

```bash
*(systemd reloads unit configuration files into memory)*
```

- **What you typed**: You typed `sudo systemctl daemon-reload`.
- **Why you typed it**: You created or modified a custom systemd service file (e.g., `myapp.service`) and needed systemd to detect changes.
- **What happened**: systemd rescanned all unit directories and reloaded service definitions into system memory.

---

## DevOps Use Cases

- **Application Deployment & Management**: Control application daemons (Node.js, Python Gunicorn, Java Spring Boot, Nginx, Docker) using systemd units.
- **CI/CD Zero-Downtime Reloads**: Issue `sudo systemctl reload nginx` during CI/CD deployments to apply new reverse proxy settings without dropping active HTTPS requests.
- **Boot Service Persistence**: Ensure essential infrastructure agents (Prometheus node-exporter, Datadog agent, SSH daemon) are enabled (`systemctl enable`) to survive unexpected server restarts.
- **Custom Service Orchestration**: Create custom `.service` files in `/etc/systemd/system/` with restart policies (`Restart=always`) to automatically recover crashed applications.

---

## Quick Tip

Combine `systemctl` with `journalctl` to inspect detailed runtime logs for any service. For example: `journalctl -u nginx.service -n 50 --no-pager`.

---

## Common Mistakes

- **Forgetting sudo for state-changing commands**: Running `systemctl start nginx` without `sudo` will result in an "Access denied" or authentication error.
- **Confusing restart and reload**: `restart` stops the service completely and starts it again (causing brief downtime). `reload` re-reads config files while keeping the service running continuously.
- **Not running daemon-reload after editing unit files**: Editing a file in `/etc/systemd/system/` without running `sudo systemctl daemon-reload` causes systemd to use cached old unit definitions.

---

## Practice Challenge

1. Open your terminal.
2. Check the status of the SSH service: `systemctl status ssh` or `systemctl status sshd`.
3. Verify if SSH is enabled at boot: `systemctl is-enabled ssh`.
4. List all currently active systemd services: `systemctl list-units --type=service --state=running`.
5. Check if Nginx or Docker is active: `systemctl is-active docker`.

---

## Related Commands

- [sudo Command](./sudo.md) - Execute systemctl administrative commands with root privileges.
- [reboot Command](./reboot.md) - Restart the system (`systemctl reboot`).
- [shutdown Command](./shutdown.md) - Power off system hardware (`systemctl poweroff`).
- [ps Command](../08-process-management/ps.md) - View process status of running daemons.

---

## Interview Notes

**Interview Question**: What is the difference between `systemctl enable` and `systemctl start`?  
**Answer**: `systemctl start` starts a service immediately in the current running session, but does not affect boot behavior. `systemctl enable` creates symbolic links so that systemd starts the service automatically on subsequent system reboots, but does not start the service right away unless `--now` is passed (`systemctl enable --now service`).
