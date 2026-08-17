# ssh Command (Secure Shell) | Linux Command for Beginners

Learn how to use the Linux ssh command with simple examples, DevOps use cases, and interview tips.

---

## What is this command?

The `ssh` (Secure Shell) command lets you connect to a remote Linux server safely over a network. It encrypts all traffic, so passwords and commands stay secure while you work on remote machines.

---

## Why do we use this command?

We use `ssh` to log into cloud servers (like AWS EC2), run commands on remote hosts, and manage infrastructure safely from our local machine.

---

## Syntax

```bash
ssh [options] user@hostname_or_ip
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-i identity_file` | Selects a private key file (like `.pem`) for key-based authentication. |
| `-p port` | Connects to a specific port instead of default port 22. |
| `-v` | Enables verbose mode to show detailed connection debug logs. |
| `-C` | Compresses data during file transfers to speed up slow connections. |
| `-N` | Connects without running a remote shell command (used for port forwarding). |
| `-L [local_ip:]local_port:destination:dest_port` | Forwards a local port to a remote host and port. |

---

## Examples

### Example 1: Connect to a remote server using a username and IP address

Run `ssh ubuntu@192.168.1.50` to log into a remote Ubuntu machine.

```bash
ubuntu@ip-172-31-14-151:~$ ssh ubuntu@192.168.1.50
```

### Output

```bash
The authenticity of host '192.168.1.50 (192.168.1.50)' can't be established.
ED25519 key fingerprint is SHA256:7uK2x9ZqW8yX0vL3mN4pQ5rS6tU7vW8xY9z0a1b2c3d.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '192.168.1.50' (ED25519) to the list of known hosts.
ubuntu@192.168.1.50's password: 
Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)
ubuntu@remote-server:~$
```

- **What you typed**: You entered `ssh ubuntu@192.168.1.50`.
- **Why you typed it**: You needed to log into a remote server to inspect files.
- **What happened**: `ssh` connected to the remote IP, saved the host key to `~/.ssh/known_hosts`, prompted for a password, and opened a remote shell session.

---

### Example 2: Connect using an SSH private key file

Run `ssh -i ~/.ssh/my-key.pem ubuntu@54.210.12.34` to log into an AWS EC2 instance without entering a password.

```bash
ubuntu@ip-172-31-14-151:~$ ssh -i ~/.ssh/my-key.pem ubuntu@54.210.12.34
```

### Output

```bash
Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

Last login: Mon Aug 17 20:15:42 2026 from 103.21.12.4
ubuntu@ip-172-31-10-20:~$
```

- **What you typed**: You passed `-i ~/.ssh/my-key.pem` along with the user and cloud IP.
- **Why you typed it**: AWS EC2 instances use SSH key pairs instead of passwords for authentication.
- **What happened**: `ssh` authenticated your session using the private key file and granted shell access.

---

### Example 3: Connect using a custom SSH port

Run `ssh -p 2222 admin@192.168.1.100` to connect to a server running SSH on port 2222.

```bash
ubuntu@ip-172-31-14-151:~$ ssh -p 2222 admin@192.168.1.100
```

### Output

```bash
admin@192.168.1.100's password: 
Linux server-node-01 6.8.0-31-generic #31-Ubuntu SMP x86_64
admin@server-node-01:~$
```

- **What you typed**: You used `-p 2222` to specify a non-default SSH port.
- **Why you typed it**: System administrators change the default SSH port (22) to custom ports to lower automatic bot scans.
- **What happened**: `ssh` opened a connection on port 2222 and authenticated the user.

---

### Example 4: Run a single command on a remote server without opening an interactive shell

Run `ssh ubuntu@192.168.1.50 "uptime"` to get uptime information from a remote machine.

```bash
ubuntu@ip-172-31-14-151:~$ ssh ubuntu@192.168.1.50 "uptime"
```

### Output

```bash
 22:45:10 up 45 days,  3:12,  1 user,  load average: 0.12, 0.08, 0.05
```

- **What you typed**: You appended `"uptime"` to the end of the SSH command.
- **Why you typed it**: You wanted to check quick status information on a remote server without opening a full session.
- **What happened**: `ssh` executed `uptime` on the remote server, printed the output to your local terminal, and closed the connection.

---

## DevOps Use Cases

- **Accessing Cloud Virtual Machines**: Connect safely to AWS EC2 instances, Azure VMs, or GCP Compute Engine instances using private keys.
- **CI/CD Pipeline Deployment**: Execute remote deployment scripts on web servers inside GitHub Actions, GitLab CI, or Jenkins pipelines.
- **Local Port Forwarding**: Access internal database services running inside a private cloud subnet by creating an SSH tunnel (`ssh -L 5432:db.internal:5432 user@bastion`).
- **Automated Configuration Management**: Tools like Ansible use `ssh` under the hood to configure hundreds of remote servers without installing custom agents.

---

## Quick Tip

Always set strict file permissions on your SSH private key (`chmod 600 ~/.ssh/id_rsa`). `ssh` will reject keys that have public read permissions!

---

## Common Mistakes

- **Incorrect Key Permissions**: Setting weak permissions on private key files causes `ssh` to display `WARNING: UNPROTECTED PRIVATE KEY FILE!` and reject the connection.
- **Wrong Remote Username**: Trying to connect as `root` on cloud instances where the default user is `ubuntu` (Ubuntu), `ec2-user` (Amazon Linux), or `admin` (Debian).
- **Forgetting the Host Key Warning**: Canceling when `ssh` asks to accept a new host key fingerprint on the first connection attempt.

---

## Practice Challenge

1. Generate a new SSH key pair: `ssh-keygen -t ed25519 -C "admin@example.com"`.
2. Check your key directory: `ls -la ~/.ssh/`.
3. Set correct permissions on your private key: `chmod 600 ~/.ssh/id_ed25519`.
4. Check your SSH configuration file: `cat ~/.ssh/config`.
5. Connect to a test machine or run a quick remote command: `ssh -v localhost date`.

---

## Related Commands

- [scp Command](./scp.md) - Copy files securely over an SSH connection.
- [rsync Command](./rsync.md) - Fast file sync tool working over SSH.
- [chmod Command](../13-file-permissions/chmod.md) - Fix file permissions on SSH key files.

---

## Interview Notes

**Interview Question**: How does SSH public key authentication work?  
**Answer**: SSH public key authentication uses asymmetric cryptography. The public key lives on the remote server in `~/.ssh/authorized_keys`, while the private key stays on the local client machine. When connecting, the server sends a challenge encrypted with the public key; the client proves its identity by decrypting the challenge using its private key without sending the private key over the network.
