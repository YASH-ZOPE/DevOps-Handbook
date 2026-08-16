# rpm Command (Red Hat Package Manager) | Linux Command for Beginners

Learn how to use the Linux rpm command to install standalone .rpm packages, query installed software databases, verify file integrity against corruption, and inspect Red Hat packages with practical examples and DevOps use cases.

---

## What is this command?

The Linux `rpm` (Red Hat Package Manager) command is the low-level package management tool for RHEL, CentOS, Rocky Linux, AlmaLinux, Fedora, and SUSE distributions. It installs, upgrades, queries, verifies, and uninstalls individual `.rpm` software package files directly on the host machine.

---

## Why do we use this command?

We use `rpm` to install standalone `.rpm` package files downloaded offline, verify system binary integrity against tampered or corrupted files (`rpm -V`), query which RPM package installed a specific configuration file on disk (`rpm -qf`), and list all installed packages across Red Hat systems.

---

## Syntax

```bash
rpm [options] [package_file.rpm | package_name]
```

---

## Useful Options & Query Flags

### Installation & Removal Flags

| Option | Short Flag | Action Description |
|---|---|---|
| Install | `-i`, `--install` | Installs a specified local `.rpm` package file (`rpm -ivh package.rpm`). |
| Upgrade | `-U`, `--upgrade` | Upgrades an existing package, or installs it if not currently present (`rpm -Uvh package.rpm`). |
| Erase | `-e`, `--erase` | Uninstalls a specified package from the system (`rpm -e package_name`). |
| Verbose | `-v` | Displays detailed status messages during package processing. |
| Hash Marks | `-h` | Prints 50 hash marks (`#`) to show a visual progress bar during installation. |

### Query Flags (`-q`)

| Option | Short Flag | Action Description |
|---|---|---|
| Query All | `-qa` | Queries and lists all installed RPM packages on the host system. |
| Query Info | `-qi` | Displays detailed metadata (version, release, vendor, build date, description). |
| Query Files | `-ql` | Lists all files installed onto the filesystem by a specified RPM package. |
| Query Configs | `-qc` | Lists configuration files (`/etc`) installed by a specified RPM package. |
| Query File Owner | `-qf` | Identifies which installed RPM package owns a specified file path. |
| Query Uninstalled .rpm | `-qp` | Tells `rpm` to query an uninstalled `.rpm` file on disk rather than the database. |
| Verify Package | `-V`, `--verify` | Verifies installed package files against original RPM database checksums and permissions. |

---

## Difference Between rpm and dnf/yum

| Feature | `rpm` Command | `dnf` / `yum` Commands |
|---|---|---|
| Level | Low-level package installer. | High-level package manager interface. |
| Input Target | Operates on local `.rpm` files on disk (e.g., `app.rpm`). | Operates on package names from remote repositories (e.g., `nginx`). |
| Dependency Resolution | Cannot download missing dependencies automatically. | Automatically resolves and downloads dependencies from internet repositories. |
| Repository Access | No knowledge of remote RPM repositories. | Queries and syncs with remote repository index mirrors. |

---

## Examples

### Example 1: Install or upgrade a local .rpm package file

Run `sudo rpm -Uvh google-chrome-stable_current_x86_64.rpm` to install a local RPM package.

```bash
[root@ip-172-31-14-151 ~]# sudo rpm -Uvh google-chrome-stable_current_x86_64.rpm
```

### Output

```bash
Preparing...                          ################################# [100%]
Updating / installing...
   1:google-chrome-stable-125.0.642 ################################# [100%]
```

- **What you typed**: You passed `-Uvh` (`U`pgrade, `v`erbose, `h`ash progress) with package file `google-chrome-stable_current_x86_64.rpm`.
- **Why you typed it**: You downloaded an offline RPM package and wanted to install it while viewing visual installation progress hash marks (`#`).
- **What happened**: `rpm` unpacked package binaries, installed them, and registered metadata in `/var/lib/rpm/`.

---

### Example 2: Query all installed RPM packages and filter with grep

Run `rpm -qa | grep nginx` to check installed Nginx RPM packages.

```bash
[root@ip-172-31-14-151 ~]# rpm -qa | grep nginx
```

### Output

```bash
nginx-filesystem-1.24.0-1.el9.noarch
nginx-1.24.0-1.el9.x86_64
```

- **What you typed**: You ran `rpm -qa` and piped output to `grep nginx`.
- **Why you typed it**: You wanted to verify whether Nginx was installed on a RHEL server and retrieve its full RPM version string.
- **What happened**: `rpm` queried the RPM database (`/var/lib/rpm/rpmdb.sqlite`) and printed matching installed packages.

---

### Example 3: Identify which RPM package owns a file path

Run `rpm -qf /etc/nginx/nginx.conf` to discover the owner package.

```bash
[root@ip-172-31-14-151 ~]# rpm -qf /etc/nginx/nginx.conf
```

### Output

```bash
nginx-1.24.0-1.el9.x86_64
```

- **What you typed**: You passed `-qf` with absolute file path `/etc/nginx/nginx.conf`.
- **Why you typed it**: You found a configuration file on a server and needed to know which RPM package installed it.
- **What happened**: `rpm` queried file paths registered in the local RPM database and returned the owning package name.

---

### Example 4: Verify installed files against RPM checksums to detect corruption

Run `rpm -V nginx` to check if package files were tampered with or modified.

```bash
[root@ip-172-31-14-151 ~]# rpm -V nginx
```

### Output

```bash
S.5....T.  c /etc/nginx/nginx.conf
```

- **What you typed**: You passed `-V` (verify) with package name `nginx`.
- **Why you typed it**: You were conducting a security audit to see if binary or configuration files were altered unexpectedly.
- **What happened**: `rpm` compared current file size (`S`), MD5 checksum (`5`), and modification time (`T`) against original RPM database records. The `c` indicates a configuration file modification.

---

## DevOps Use Cases

- **Security & Integrity Auditing**: Run `rpm -Va` across critical production servers to detect unauthorized file tampering or binary modifications in compliance audits.
- **Offline / Air-Gapped Installation**: Deploy proprietary enterprise software packages (Datadog agent, Splunk forwarder, security sensors) on air-gapped RHEL servers without internet access.
- **Software Bill of Materials (SBOM) Generation**: Extract installed RPM inventory using `rpm -qa --qf '%{NAME},%{VERSION}-%{RELEASE},%{ARCH}\n'` for automated vulnerability management scanners.
- **Querying RPM Metadata in Build Pipelines**: Extract package dependency specifications from uninstalled RPM files using `rpm -qpR package.rpm`.

---

## Quick Tip

Always use **`rpm -Uvh`** instead of `rpm -ivh` when installing `.rpm` files! `-Uvh` (Upgrade) installs the package if it is not present **AND** cleanly upgrades it if an older version is already installed, avoiding duplicate installation conflicts.

---

## Common Mistakes

- **Using rpm when installing packages with missing dependencies**: Running `rpm -i package.rpm` fails if required dependency packages are missing. Use **`sudo dnf install ./package.rpm`** instead; DNF will automatically install the `.rpm` file while downloading missing dependencies from remote repositories!
- **Using --nodeps to force installation**: Forcing installation with `rpm -i --nodeps package.rpm` bypasses dependency checks, often resulting in broken applications that crash at runtime due to missing libraries.
- **Passing package names instead of filenames to rpm -i**: Running `rpm -i nginx` fails because `rpm` requires a local file path (`nginx.rpm`). Use `dnf install nginx` for remote package names.

---

## Practice Challenge

1. Open terminal on a RHEL/CentOS/Rocky system (or test container).
2. Count total installed RPM packages: `rpm -qa | wc -l`.
3. Find which package owns the `bash` shell binary: `rpm -qf /bin/bash`.
4. List all configuration files installed by package `bash`: `rpm -qc bash`.
5. Display detailed metadata for `bash`: `rpm -qi bash`.
6. Verify package integrity: `rpm -V bash`.

---

## Related Commands

- [yum-dnf Command](./yum-dnf.md) - High-level package manager for RHEL/CentOS distributions.
- [dpkg Command](./dpkg.md) - Low-level installer for Debian `.deb` package files.
- [apt Command](./apt.md) - High-level package manager for Debian/Ubuntu distributions.

---

## Interview Notes

**Interview Question**: What do the flags in `rpm -V` output (e.g. `S.5....T.`) mean during a security audit?  
**Answer**: Each character position in `rpm -V` output represents a specific verification attribute comparison:
- `S`: File **Size** differs.
- `M`: File **Mode** (permissions or file type) differs.
- `5`: **MD5/SHA256 checksum** differs (file content was modified).
- `D`: Major/Minor **Device** number mismatch.
- `L`: **SymLink** path mismatch.
- `U`: **User** ownership differs.
- `G`: **Group** ownership differs.
- `T`: **Modification Time** differs.
- `P`: **Capabilities** differ.
