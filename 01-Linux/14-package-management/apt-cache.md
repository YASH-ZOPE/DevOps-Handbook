# apt-cache Command (Query APT Package Cache) | Linux Command for Beginners

Learn how to use the Linux apt-cache command to search for software packages, inspect package dependencies, verify repository version priority policies, and query Debian package metadata with simple examples and DevOps use cases.

---

## What is this command?

The Linux `apt-cache` command is a low-level query utility used to search and inspect metadata stored in the local APT package cache. Unlike `apt-get` or `dpkg`, `apt-cache` operates strictly in read-only mode, querying package details without making any changes to the system or installing software.

---

## Why do we use this command?

We use `apt-cache` to locate packages by keyword, audit package dependencies (`depends` and `rdepends`), verify package version availability across different repositories, and inspect installed vs available candidate package versions.

---

## Syntax

```bash
apt-cache [options] subcommand [package_name]
```

---

## Useful Subcommands & Options

### Core Subcommands

| Subcommand | What it does |
|---|---|
| `search` | Searches package names and descriptions for a specified keyword or regular expression. |
| `show` | Displays detailed metadata (version, maintainer, size, description, homepage) for a package. |
| `showpkg` | Displays technical package info, including reverse dependencies and available version records. |
| `depends` | Lists all library and package dependencies required by a specified package. |
| `rdepends` | Lists reverse dependencies (packages on the system that depend on the specified package). |
| `policy` | Displays repository priority settings, installed version, and candidate upgrade versions. |
| `pkgnames` | Prints the names of all packages present in the local APT cache matching a prefix. |
| `stats` | Displays general statistics about the local package cache (total packages, dependencies, etc.). |

---

## Examples

### Example 1: Search for packages using keywords

Run `apt-cache search prometheus` to find monitoring agent packages.

```bash
ubuntu@ip-172-31-14-151:~$ apt-cache search prometheus
```

### Output

```bash
prometheus - Lightweight service monitoring system and time series database
prometheus-node-exporter - Prometheus exporter for hardware and OS metrics
prometheus-alertmanager - Alert handling daemon for Prometheus
golang-github-prometheus-client-golang-dev - Prometheus instrumentation library
```

- **What you typed**: You passed subcommand `search` with keyword `prometheus`.
- **Why you typed it**: You wanted to find the exact official package name for Prometheus metrics collectors on Ubuntu.
- **What happened**: `apt-cache` scanned local index descriptions and returned matching package names with brief summaries.

---

### Example 2: Inspect package dependencies using apt-cache depends

Run `apt-cache depends nginx` to view required dependencies before installation.

```bash
ubuntu@ip-172-31-14-151:~$ apt-cache depends nginx
```

### Output

```bash
nginx
  Depends: nginx-core
  Depends: libc6
  Depends: libpcre2-8-0
  Depends: libssl3
  Suggests: nginx-doc
  Conflicts: <nginx-arch>
```

- **What you typed**: You passed subcommand `depends` with package name `nginx`.
- **Why you typed it**: You wanted to audit dependency prerequisites for security compliance or air-gapped deployment planning.
- **What happened**: `apt-cache` evaluated package metadata and printed all required libraries and conflicting packages.

---

### Example 3: Check package priority and version pinning with apt-cache policy

Run `apt-cache policy docker-ce` to inspect installed vs candidate versions.

```bash
ubuntu@ip-172-31-14-151:~$ apt-cache policy docker-ce
```

### Output

```bash
docker-ce:
  Installed: 5:26.1.3-1~ubuntu.24.04~noble
  Candidate: 5:27.0.1-1~ubuntu.24.04~noble
  Version table:
     5:27.0.1-1~ubuntu.24.04~noble 500
        500 https://download.docker.com/linux/ubuntu noble/stable amd64 Packages
 *** 5:26.1.3-1~ubuntu.24.04~noble 500
        500 https://download.docker.com/linux/ubuntu noble/stable amd64 Packages
```

- **What you typed**: You passed subcommand `policy` with package name `docker-ce`.
- **Why you typed it**: You needed to check whether a newer Docker version was available in the repository and verify repository priority scores (e.g., `500`).
- **What happened**: `apt-cache` listed the currently installed version, candidate version for upgrade, and repository origin URLs.

---

### Example 4: Discover reverse dependencies with apt-cache rdepends

Run `apt-cache rdepends python3-requests` to discover which installed applications rely on Python Requests.

```bash
ubuntu@ip-172-31-14-151:~$ apt-cache rdepends --installed python3-requests
```

### Output

```bash
python3-requests
Reverse Depends:
  cloud-init
  certbot
  awscli
  python3-urllib3
```

- **What you typed**: You passed `rdepends --installed` with package name `python3-requests`.
- **Why you typed it**: You were considering uninstalling `python3-requests` and wanted to verify what critical system services would break.
- **What happened**: `apt-cache` scanned the system database and listed all installed packages depending on `python3-requests`.

---

## DevOps Use Cases

- **Air-Gapped & Offline Server Deployments**: Use `apt-cache depends` to generate exhaustive dependency lists for offline package downloading and transfer to isolated network environments.
- **Auditing Package Pinning & PPA Repositories**: Use `apt-cache policy` in server validation scripts to ensure critical applications (like Kubernetes `kubelet` or Docker engine) maintain pinned versions.
- **Impact Analysis Before Package Removal**: Run `apt-cache rdepends --installed <package>` to prevent accidental deletion of shared system libraries required by production daemons.
- **CI/CD Pipeline Dependency Validation**: Automate pre-build checks to ensure required compiler libraries exist in candidate package repositories.

---

## Quick Tip

You do **not** need `sudo` privileges to run `apt-cache` commands! Because `apt-cache` only reads local database files without modifying system files, any unprivileged user account can run `apt-cache` queries.

---

## Common Mistakes

- **Running apt-cache queries on stale data**: `apt-cache` queries local database files stored in `/var/lib/apt/lists/`. If you haven't run `sudo apt update` recently, `apt-cache` will return outdated package version listings.
- **Confusing depends with rdepends**: `apt-cache depends` shows what the target package *needs to run*. `apt-cache rdepends` shows what *other packages need the target package to run*.
- **Expecting apt-cache search to show installed status**: `apt-cache search` lists all matching packages in repositories regardless of whether they are installed. Use `dpkg -l | grep <name>` or `apt list --installed` to check local installation status.

---

## Practice Challenge

1. Open your terminal.
2. Search for all packages related to `memcached`: `apt-cache search memcached`.
3. View detailed info for `memcached`: `apt-cache show memcached`.
4. Inspect the exact dependencies required by `memcached`: `apt-cache depends memcached`.
5. Check if `memcached` is installed and what candidate version exists: `apt-cache policy memcached`.

---

## Related Commands

- [apt Command](./apt.md) - Modern unified APT package management interface.
- [apt-get Command](./apt-get.md) - Non-interactive package handling utility for scripts.
- [dpkg Command](./dpkg.md) - Low-level installer for `.deb` package files.
- [yum-dnf Command](./yum-dnf.md) - Package management for RHEL/CentOS systems.

---

## Interview Notes

**Interview Question**: How do you find out which repository a package was installed from and whether it is pinned to a specific version?  
**Answer**: Run `apt-cache policy <package_name>`. The output shows:
1. `Installed`: The version currently active on the host.
2. `Candidate`: The version APT will install upon running `apt upgrade`.
3. `Version table`: Lists all available versions across configured repository sources alongside priority weights (e.g. `100` for installed, `500` for standard repos, `1000` for pinned packages).
