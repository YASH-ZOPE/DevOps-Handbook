# hostname Command (System Hostname) | Linux Command for Beginners

Learn how to use the Linux hostname command to view, display, and verify server network names and IP addresses with simple examples and DevOps use cases.

---

## What is this command?

The Linux `hostname` command displays or manages the unique network name assigned to your machine.

---

## Why do we use this command?

We use `hostname` to identify which server you are connected to and check assigned network IP addresses.

---

## Syntax

```bash
hostname [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-I` | Displays all network IP addresses assigned to all network interfaces. |
| `-i` | Displays the IP address associated with the host name. |
| `-f` | Displays the Fully Qualified Domain Name (FQDN). |
| `-d` | Displays the DNS domain name of the machine. |
| `-s` | Displays the short hostname (truncated before the first dot). |

---

## Examples

### Example 1: View current server hostname

Run `hostname` without flags to display your system name.

```bash
ubuntu@ip-172-31-14-151:~$ hostname
```

### Output

```bash
ip-172-31-14-151
```

- **What you typed**: You typed `hostname` and pressed Enter.
- **Why you typed it**: You wanted to verify which server you are currently logged into.
- **What happened**: Linux returned the system network name `ip-172-31-14-151`.

---

### Example 2: View all assigned server IP addresses

Run `hostname -I` to list all active IP addresses attached to system interfaces.

```bash
ubuntu@ip-172-31-14-151:~$ hostname -I
```

### Output

```bash
172.31.14.151 172.17.0.1
```

- **What you typed**: You passed `-I` (capital I).
- **Why you typed it**: You wanted to discover the server private IP address and docker interface IP.
- **What happened**: Linux listed all network interface IP addresses separated by spaces.

---

### Example 3: View fully qualified domain name

Run `hostname -f` to display the complete domain name of your server.

```bash
ubuntu@ip-172-31-14-151:~$ hostname -f
```

### Output

```bash
web-01.us-east-1.compute.internal
```

- **What you typed**: You added `-f` for fully qualified domain name.
- **Why you typed it**: You wanted to check full DNS name resolution for your server.
- **What happened**: Linux resolved and displayed the complete FQDN.

---

### Example 4: View short hostname without domain suffix

Run `hostname -s` to view only the primary host string.

```bash
ubuntu@ip-172-31-14-151:~$ hostname -s
```

### Output

```bash
web-01
```

- **What you typed**: You used `-s` to strip domain extensions.
- **Why you typed it**: You needed just the short machine identifier for log formatting.
- **What happened**: Linux printed `web-01` without domain extensions.

---

## DevOps Use Cases

- **Preventing Production Mistakes**: Run `hostname` immediately after SSH connection to confirm you are on a staging server and not production.
- **Dynamic Infrastructure Tagging**: Use `hostname` inside Ansible playbooks or Terraform cloud-init scripts to dynamically name nodes.
- **Network Troubleshooting**: Run `hostname -I` to verify private IP binding when configuring web servers or databases.
- **Kubernetes Node Auditing**: Verify worker node hostnames when registering instances with a Kubernetes cluster.

---

## Quick Tip

Run `hostname -I` whenever you need to find your server private IP address quickly without scrolling through `ip a` or `ifconfig` outputs.

---

## Common Mistakes

- **Running temporary name change**: Running `hostname newname` changes the hostname only for the current session. Use `sudo hostnamectl set-hostname newname` to save changes permanently.
- **Confusing hostname with web domain**: System hostname identifies the operating system on the network, whereas web domain names (like `example.com`) are configured in web server settings.

---

## Practice Challenge

1. Open your terminal.
2. Check system hostname: `hostname`.
3. Display all assigned IP addresses: `hostname -I`.
4. Display short host identifier: `hostname -s`.
5. Display domain name: `hostname -d`.

---

## Related Commands

- [uname Command](./uname.md) - View kernel and machine system information.
- [whoami Command](./whoami.md) - View current logged-in username.
- [id Command](./id.md) - View user and group IDs.
- [uptime Command](./uptime.md) - View system uptime and load average.

---

## Interview Notes

**Interview Question**: How do you permanently set a server hostname on modern Ubuntu or Red Hat Linux distributions?  
**Answer**: Run `sudo hostnamectl set-hostname <new-name>`. This command updates the systemd configuration and modifies `/etc/hostname` permanently across system reboots.
