# uname Command (Unix Name) | Linux Command for Beginners

Learn how to use the Linux uname command to check system architecture, kernel version, operating system details, and hardware info with simple examples and DevOps use cases.

---

## What is this command?

The Linux `uname` command stands for **Unix Name**. It displays detailed information about your system operating system and Linux kernel.

---

## Why do we use this command?

We use `uname` to check kernel versions, identify CPU architecture (like x86_64 or arm64), and confirm system compatibility before installing software.

---

## Syntax

```bash
uname [options]
```

---

## Useful Options

| Option | What it does |
|---|---|
| `-a` | Displays all system information (kernel name, host, release version, architecture, OS). |
| `-s` | Displays the kernel name (default option). |
| `-r` | Displays the kernel release version. |
| `-m` | Displays the machine hardware architecture (x86_64 or aarch64). |
| `-o` | Displays the operating system name (GNU/Linux). |

---

## Examples

### Example 1: View basic kernel name

Run `uname` without flags to display the operating system kernel name.

```bash
ubuntu@ip-172-31-14-151:~$ uname
```

### Output

```bash
Linux
```

- **What you typed**: You typed `uname` and pressed Enter.
- **Why you typed it**: You wanted to check the underlying operating system kernel type.
- **What happened**: Linux returned the kernel name `Linux`.

---

### Example 2: View complete system information

Run `uname -a` to print all available system hardware and kernel details.

```bash
ubuntu@ip-172-31-14-151:~$ uname -a
```

### Output

```bash
Linux ip-172-31-14-151 6.2.0-39-generic #40~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC x86_64 x86_64 x86_64 GNU/Linux
```

- **What you typed**: You typed `uname -a` using the all (`-a`) option.
- **Why you typed it**: You wanted to check system hostname, kernel release version, build date, and machine architecture all at once.
- **What happened**: Linux printed a comprehensive single line listing all system details.

---

### Example 3: View exact kernel release version

Run `uname -r` to display the active Linux kernel release version.

```bash
ubuntu@ip-172-31-14-151:~$ uname -r
```

### Output

```bash
6.2.0-39-generic
```

- **What you typed**: You passed the release (`-r`) flag.
- **Why you typed it**: You wanted to verify if the server kernel meets minimum software dependencies.
- **What happened**: Linux returned `6.2.0-39-generic`.

---

### Example 4: Check hardware CPU architecture

Run `uname -m` to identify whether your machine runs on 64-bit x86 or ARM architecture.

```bash
ubuntu@ip-172-31-14-151:~$ uname -m
```

### Output

```bash
x86_64
```

- **What you typed**: You used `-m` to target machine hardware architecture.
- **Why you typed it**: You needed to select the correct binary download (x86 vs ARM) for a tool like Docker or Terraform.
- **What happened**: Linux returned `x86_64`, indicating 64-bit Intel/AMD architecture.

---

## DevOps Use Cases

- **Selecting Binary Releases in CI/CD**: Run `ARCH=$(uname -m)` inside deployment scripts to automatically fetch the matching ARM64 or AMD64 software binaries.
- **Verifying Kernel Security Patches**: Check `uname -r` after system updates to confirm that a kernel security patch has taken effect.
- **Container Host Compatibility Checks**: Verify kernel version requirements before installing container runtimes like Docker or Podman.
- **Auditing Cloud EC2 Instances**: Verify machine architecture on AWS EC2 instances (t3.micro x86 vs t4g.micro Graviton ARM).

---

## Quick Tip

Use `uname -m` in shell scripts to dynamically download correct installer packages for ARM64 vs AMD64 server platforms.

---

## Common Mistakes

- **Confusing kernel version with Linux distribution release**: `uname -r` shows kernel version (e.g. `6.2.0`), whereas Linux distro version (Ubuntu 22.04) is stored in `/etc/os-release`.
- **Expecting uname to show total memory or CPU cores**: `uname` reports OS and kernel information; use `free` or `lscpu` for memory and CPU metrics.

---

## Practice Challenge

1. Open your terminal.
2. View basic OS kernel name: `uname`.
3. View full system information: `uname -a`.
4. Display kernel release version: `uname -r`.
5. Check machine hardware architecture: `uname -m`.

---

## Related Commands

- [hostname Command](./hostname.md) - View or configure system hostname.
- [uptime Command](./uptime.md) - Check how long the server has been running.
- [whoami Command](./whoami.md) - View your current logged-in username.
- [df Command](../09-disk-memory-management/df.md) - View storage devices and partition usage.

---

## Interview Notes

**Interview Question**: How do you determine if a Linux server is running on 64-bit x86 or ARM architecture using command line?  
**Answer**: Run `uname -m`. If the output shows `x86_64`, the system is running 64-bit Intel/AMD hardware. If it shows `aarch64` or `arm64`, it is running 64-bit ARM hardware (like AWS Graviton or Apple Silicon).
