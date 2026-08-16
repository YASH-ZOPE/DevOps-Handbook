# dpkg Command (Debian Package Manager) | Linux Command for Beginners

Learn how to use the Linux dpkg command to install standalone .deb files, list installed packages, inspect file contents, and repair broken package states on Debian and Ubuntu distributions with practical examples and DevOps use cases.

---

## What is this command?

The Linux `dpkg` (Debian Package) command is the fundamental low-level package manager for Debian-based systems. It handles the installation, building, removal, and querying of individual `.deb` software package files directly on the local filesystem.

---

## Why do we use this command?

We use `dpkg` to install standalone third-party software packages downloaded as `.deb` files (such as Google Chrome, Datadog agents, or custom internal enterprise software), query which package owns a specific file on disk, list all installed packages on a host, and troubleshoot corrupted package installations.

---

## Syntax

```bash
dpkg [options] action [package_name | file.deb]
```

---

## Useful Options & Actions

### Package Installation & Removal Actions

| Option | Short Flag | Action Description |
|---|---|---|
| Install Package | `-i`, `--install` | Installs a specified local `.deb` package file (`sudo dpkg -i package.deb`). |
| Remove Package | `-r`, `--remove` | Removes installed package binaries while preserving configuration files. |
| Purge Package | `-P`, `--purge` | Removes package binaries and deletes all associated configuration files completely. |

### Query & Inspection Actions

| Option | Short Flag | Action Description |
|---|---|---|
| List Packages | `-l`, `--list` | Lists all installed packages on the system matching an optional pattern. |
| Package Status | `-s`, `--status` | Displays detailed installation status and metadata for an installed package. |
| List Files | `-L`, `--listfiles` | Lists all files installed onto the filesystem by a specific package. |
| Search File Owner | `-S`, `--search` | Searches installed packages to find which package owns a specific file path. |
| Contents of .deb | `-c`, `--contents` | Lists the files contained inside an uninstalled `.deb` package file. |
| Unpack Only | `--unpack` | Unpacks `.deb` archive files without configuring them. |
| Configure | `--configure` | Configures unpacked packages that were not yet configured. |

---

## Difference Between dpkg and apt

| Feature | `dpkg` Command | `apt` / `apt-get` Commands |
|---|---|---|
| Level | Low-level package installer. | High-level package manager interface. |
| Input Target | Operates on local `.deb` files on disk (e.g., `app.deb`). | Operates on package name strings from remote repositories (e.g., `nginx`). |
| Dependency Resolution | Cannot download missing dependencies automatically. | Automatically resolves and downloads dependencies from internet repositories. |
| Repository Access | No knowledge of remote software repositories. | Queries and syncs with remote repository index mirrors. |

---

## Examples

### Example 1: Install a standalone .deb package file

Run `sudo dpkg -i google-chrome-stable_current_amd64.deb` to install a local package archive.

```bash
ubuntu@ip-172-31-14-151:~$ sudo dpkg -i google-chrome-stable_current_amd64.deb
```

### Output

```bash
Selecting previously unselected package google-chrome-stable.
(Reading database ... 184520 files and directories currently installed.)
Preparing to unpack google-chrome-stable_current_amd64.deb ...
Unpacking google-chrome-stable (125.0.6422.141-1) ...
Setting up google-chrome-stable (125.0.6422.141-1) ...
Processing triggers for man-db (2.12.0-3) ...
```

- **What you typed**: You passed action `-i` with local file `google-chrome-stable_current_amd64.deb`.
- **Why you typed it**: You downloaded a third-party software binary not hosted in official Ubuntu repositories and needed to install it.
- **What happened**: `dpkg` unpacked the archive binaries, placed files into system paths (`/usr/bin`, `/opt`), and registered the package in `/var/lib/dpkg/status`.

---

### Example 2: List all installed packages and filter with grep

Run `dpkg -l | grep nginx` to check if Nginx is installed on the host.

```bash
ubuntu@ip-172-31-14-151:~$ dpkg -l | grep nginx
```

### Output

```bash
ii  nginx          1.24.0-2ubuntu7  amd64  small, powerful, scalable web/proxy server
ii  nginx-common   1.24.0-2ubuntu7  all    small, powerful, scalable web/proxy server - common files
```

- **What you typed**: You ran `dpkg -l` and piped output to `grep nginx`.
- **Why you typed it**: You wanted to verify whether Nginx was installed and check its exact version number.
- **What happened**: `dpkg` scanned local package status database and printed matching installed packages. `ii` indicates "Desired: Install, Status: Installed".

---

### Example 3: Find which package owns a specific system file

Run `dpkg -S /usr/bin/curl` to identify the owner package.

```bash
ubuntu@ip-172-31-14-151:~$ dpkg -S /usr/bin/curl
```

### Output

```bash
curl: /usr/bin/curl
```

- **What you typed**: You passed `-S` with absolute binary path `/usr/bin/curl`.
- **Why you typed it**: You found a binary on the server and wanted to know which Debian package installed it.
- **What happened**: `dpkg` searched file manifests in `/var/lib/dpkg/info/*.list` and returned package name `curl`.

---

### Example 4: List all files installed by a package

Run `dpkg -L nginx-common` to see installed file paths.

```bash
ubuntu@ip-172-31-14-151:~$ dpkg -L nginx-common
```

### Output

```bash
/.
/etc
/etc/nginx
/etc/nginx/nginx.conf
/etc/nginx/mime.types
/usr/share/doc/nginx-common
```

- **What you typed**: You passed `-L` with package name `nginx-common`.
- **Why you typed it**: You wanted to locate default configuration files and directories created during package installation.
- **What happened**: `dpkg` printed every file and directory path associated with `nginx-common`.

---

## DevOps Use Cases

- **Installing Custom Enterprise Agents**: Install proprietary monitoring agents (Datadog, Dynatrace, CrowdStrike Falcon) delivered as standalone `.deb` artifacts in cloud server initialization scripts.
- **Auditing System Package Bills of Materials (SBOM)**: Run `dpkg-query -W -f='${Package} ${Version}\n'` in CI/CD pipelines to output software bill of materials for security compliance scanning.
- **Building Custom Debian Packages**: Test custom `.deb` packages produced by build pipelines using `dpkg -c file.deb` (inspect files) and `dpkg -i file.deb` (test execution).
- **Recovering from Broken Package Installation States**: Use `dpkg --configure -a` to fix interrupted package installations on servers following sudden network disconnects or reboots.

---

## Quick Tip

If `dpkg -i package.deb` fails due to **missing dependencies**, do not panic! Simply run **`sudo apt-get install -f`** (or `sudo apt --fix-broken install`). APT will automatically scan missing dependencies, download them from remote repositories, and complete your `dpkg` package installation!

---

## Common Mistakes

- **Passing remote package names to dpkg -i**: Running `dpkg -i nginx` fails because `dpkg` expects a *local filename* ending in `.deb` (`dpkg -i nginx.deb`), not a remote package name. Use `apt install nginx` for remote packages.
- **Forgetting sudo for install/remove actions**: Query actions (`dpkg -l`, `dpkg -S`, `dpkg -L`) work for regular users, but installation/removal actions (`dpkg -i`, `dpkg -r`, `dpkg -P`) require `root` privileges.
- **Using dpkg -r when configuration files need deleting**: `dpkg -r` leaves config files in `/etc`. Use `dpkg -P` (purge) for clean removal.

---

## Practice Challenge

1. Open your terminal.
2. List all installed packages containing `net`: `dpkg -l | grep net`.
3. Find which package owns the `ls` command binary: `dpkg -S /bin/ls`.
4. List all files installed by package `coreutils`: `dpkg -L coreutils | head -n 10`.
5. Check package installation status for `curl`: `dpkg -s curl`.

---

## Related Commands

- [apt Command](./apt.md) - High-level unified APT package management interface.
- [apt-get Command](./apt-get.md) - Non-interactive scriptable package installer.
- [apt-cache Command](./apt-cache.md) - Search and inspect package metadata in local cache.
- [rpm Command](./rpm.md) - Equivalent low-level package manager for Red Hat `.rpm` files.

---

## Interview Notes

**Interview Question**: How do you fix a server state where `dpkg` throws errors like `dpkg was interrupted, you must manually run 'sudo dpkg --configure -a'`?  
**Answer**: Run `sudo dpkg --configure -a`. This forces `dpkg` to iterate through all unpacked but unconfigured `.deb` packages stored in `/var/lib/dpkg/updates/` and run their post-installation setup scripts (`postinst`) to restore system package state integrity. If missing dependencies remain, follow up with `sudo apt-get install -f`.
