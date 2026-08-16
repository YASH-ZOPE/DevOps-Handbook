# yum / dnf Commands (RHEL Package Managers) | Linux Command for Beginners

Learn how to use YUM and DNF package managers on Red Hat Enterprise Linux (RHEL), CentOS, Rocky Linux, AlmaLinux, and Fedora to install, update, and manage software packages with practical examples and DevOps use cases.

---

## What are these commands?

`yum` (Yellowdog Updater, Modified) and `dnf` (Dandified YUM) are the high-level package management utilities for Red Hat Enterprise Linux (RHEL), CentOS, Rocky Linux, AlmaLinux, and Fedora distributions. They automatically manage software installation, upgrades, removals, and dependency resolution for `.rpm` packages from configured remote repositories.

- **`yum`**: Legacy package manager used in RHEL 6 and RHEL 7.
- **`dnf`**: Next-generation, faster package manager introduced in RHEL 8, RHEL 9, and Fedora. (On modern RHEL systems, `yum` is symlinked directly to `dnf`).

---

## Why do we use these commands?

We use `yum` and `dnf` to install enterprise server software (like Nginx, PostgreSQL, Docker, or OpenJDK), apply kernel security updates, manage Extra Packages for Enterprise Linux (EPEL) repositories, perform transaction rollbacks, and automate server fleet deployments.

---

## Syntax

```bash
dnf [options] command [package_name]
# OR
yum [options] command [package_name]
```

---

## Useful Subcommands & Options

### Core Subcommands

| Subcommand | What it does |
|---|---|
| `install` | Installs specified packages along with required dependency packages from repositories. |
| `remove` / `erase` | Removes specified packages and unneeded dependency packages from the host. |
| `update` / `upgrade` | Updates installed packages to their latest versions available in active repositories. |
| `check-update` | Checks for available package updates without performing installations. |
| `search` | Searches package names and descriptions for a matching keyword string. |
| `info` | Displays detailed metadata (version, release, repository, summary) for a package. |
| `repolist` | Displays configured repository list along with status (enabled/disabled). |
| `groupinstall` / `group install` | Installs a group of related packages (e.g., `"Development Tools"`). |
| `history` | Displays transaction logs and allows undoing/redoing package installation operations. |
| `clean all` | Clears all cached package archives and repository header metadata from disk. |

### Essential Options

| Option | What it does |
|---|---|
| `-y`, `--assumeyes` | Automatically answers "yes" to all installation and removal confirmation prompts. |
| `--enablerepo=REPO` | Temporarily enables a specific disabled repository for a single command. |
| `--disablerepo=REPO` | Temporarily disables a specific active repository for a single command. |

---

## Difference Between YUM and DNF

| Feature | `yum` (Legacy) | `dnf` (Modern) |
|---|---|---|
| Core Engine | Python 2 backend with legacy dependency solver. | C-based `libsolv` engine with fast dependency resolution. |
| Performance & Memory | Slower performance; higher memory consumption during metadata sync. | Significantly faster performance and lower memory footprint. |
| Transaction Rollbacks | Limited history capabilities (`yum history`). | Advanced transaction history logging with robust `dnf history undo <id>`. |
| Modern RHEL Integration | Default in RHEL 6/7. Symlinked to `dnf` in RHEL 8/9. | Default native package manager in RHEL 8/9, Rocky Linux, Fedora. |

---

## Examples

### Example 1: Install a package and auto-confirm prompts

Run `sudo dnf install -y nginx` (or `sudo yum install -y nginx`) to install Nginx.

```bash
[root@ip-172-31-14-151 ~]# sudo dnf install -y nginx
```

### Output

```bash
Updating Subscription Management repositories.
Last metadata expiration check: 0:02:14 ago on Sun 16 Aug 2026.
Dependencies resolved.
================================================================================
 Package          Architecture   Version               Repository          Size
================================================================================
Installing:
 nginx            x86_64         1:1.24.0-1.el9        rhel-9-appstream   38 k
Installing dependencies:
 nginx-filesystem noarch         1:1.24.0-1.el9        rhel-9-appstream   11 k

Transaction Summary
================================================================================
Install  2 Packages

Total download size: 49 k
Installed size: 98 k
Downloading Packages:
Running transaction check
Transaction test succeeded.
Running transaction
  Installing : nginx-filesystem-1:1.24.0-1.el9.noarch                       1/2
  Installing : nginx-1:1.24.0-1.el9.x86_64                                  2/2
  Complete!
```

- **What you typed**: You passed `install -y` with package name `nginx`.
- **Why you typed it**: You needed to deploy an HTTP server on a RHEL/CentOS virtual machine.
- **What happened**: `dnf` resolved dependencies (`nginx-filesystem`), downloaded RPM archives, executed scriptlets, and installed Nginx.

---

### Example 2: Enable EPEL repository for additional open-source packages

Run `sudo dnf install -y epel-release` to add the EPEL repository.

```bash
[root@ip-172-31-14-151 ~]# sudo dnf install -y epel-release
```

### Output

```bash
Dependencies resolved.
================================================================================
 Package                Arch         Version          Repository           Size
================================================================================
Installing:
 epel-release           noarch       9-5.el9          extras               25 k

Installed:
  epel-release-9-5.el9.noarch
Complete!
```

- **What you typed**: You installed package `epel-release`.
- **Why you typed it**: Standard RHEL repositories contain conservative enterprise packages; EPEL (Extra Packages for Enterprise Linux) provides popular community packages like `htop`, `iperf3`, or `ansible`.
- **What happened**: `dnf` added repository configuration files into `/etc/yum.repos.d/epel.repo`.

---

### Example 3: View transaction history and undo an installation

Run `sudo dnf history` to inspect recent package modifications, then undo a transaction.

```bash
[root@ip-172-31-14-151 ~]# sudo dnf history
```

### Output

```bash
ID | Command line             | Date and time    | Action(s)      | Altered
-------------------------------------------------------------------------------
 3 | install -y nginx         | 2026-08-16 22:00 | Install        |    2   
 2 | install -y epel-release  | 2026-08-16 21:55 | Install        |    1   
 1 | System install           | 2026-08-16 21:00 | Install        | 1255 EE
```

- **What you typed**: You ran `sudo dnf history`.
- **Why you typed it**: An engineer installed software that broke an application, and you needed to identify when it happened and roll it back.
- **What happened**: Running `sudo dnf history undo 3` automatically uninstalls transaction ID 3 (`nginx`) and restores previous server state.

---

### Example 4: Clean repository cache and rebuild metadata

Run `sudo dnf clean all && sudo dnf makecache` to refresh repository data.

```bash
[root@ip-172-31-14-151 ~]# sudo dnf clean all && sudo dnf makecache
```

### Output

```bash
0 files removed
Metadata cache created successfully.
```

- **What you typed**: You combined `clean all` (purge cached headers/archives) and `makecache` (rebuild metadata index).
- **Why you typed it**: You updated repository URLs or added GPG keys and needed `dnf` to fetch fresh repository metadata.
- **What happened**: `dnf` wiped cached repository files from `/var/cache/dnf/` and re-downloaded active repository headers.

---

## DevOps Use Cases

- **Automated AMI & Cloud Instance Provisioning**: Execute `dnf install -y` inside cloud-init scripts, Packer image builds, or Terraform user-data scripts for RHEL/Rocky Linux EC2 instances.
- **Managing Software Repositories (`/etc/yum.repos.d/`)**: Deploy custom internal company RPM repositories (e.g. Nexus, JFrog Artifactory) by managing `.repo` files via Ansible `yum_repository` module.
- **Transaction Rollback in CI/CD Infrastructure**: Use `dnf history undo <id>` in automated rollback steps when automated integration tests fail on staging servers.
- **Minimal Red Hat Container Builds**: Build ultra-thin Red Hat UBI (Universal Base Image) container images using `microdnf` or `dnf --nodocs --setopt=install_weak_deps=False`.

---

## Quick Tip

On RHEL 8, RHEL 9, AlmaLinux, Rocky Linux, and Fedora, `yum` is just a symlink pointing to `dnf`. You can type `yum install package` or `dnf install package` interchangeably!

---

## Common Mistakes

- **Forgetting to enable EPEL repository**: Trying to run `dnf install htop` or `dnf install nginx` on fresh RHEL/CentOS instances often fails with `No match for argument` errors until you run `dnf install epel-release` first.
- **Not clearing cache after repository changes**: Modifying `.repo` files in `/etc/yum.repos.d/` without running `dnf clean all` causes `dnf` to use stale cached metadata.
- **Omitting -y in automated scripts**: Omitting `-y` in automated bash scripts or Packer builds causes process hangs waiting for interactive keyboard input.

---

## Practice Challenge

1. Open your terminal on a RHEL/CentOS/Rocky system (or test container).
2. Check configured repositories: `sudo dnf repolist`.
3. Search for package `tree`: `dnf search tree`.
4. View package information: `dnf info tree`.
5. Install package: `sudo dnf install -y tree`.
6. View transaction history: `sudo dnf history`.
7. Clean up: `sudo dnf remove -y tree`.

---

## Related Commands

- [rpm Command](./rpm.md) - Low-level installer for local `.rpm` package files.
- [apt Command](./apt.md) - Package manager for Debian/Ubuntu systems.
- [apt-get Command](./apt-get.md) - Scriptable package management utility.

---

## Interview Notes

**Interview Question**: What is `microdnf`, and why is it used instead of `dnf` or `yum` in Docker container images?  
**Answer**: `microdnf` is a lightweight, minimal C-implementation of DNF designed specifically for containers (like Red Hat Universal Base Images - UBI). It does not require Python runtime dependencies, reducing container image size by over 100 MB while providing core package installation capabilities (`microdnf install -y <package>`).
