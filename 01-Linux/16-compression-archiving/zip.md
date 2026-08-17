# zip / unzip Commands | Linux Command for Beginners

Learn how to use the Linux zip and unzip commands with simple examples, DevOps use cases, and interview tips.

---

## What are these commands?

`zip` compresses one or more files into a single `.zip` archive to save disk space and network bandwidth. `unzip` extracts files from `.zip` archives back to their original state.

---

## Why do we use these commands?

We use `zip` and `unzip` to share files easily across Linux, Windows, and macOS systems, compress application logs, and unpack software distributed in the standard `.zip` format.

---

## Syntax

```bash
# Create a zip archive
zip [options] archive_name.zip file1 file2 folder/

# Extract a zip archive
unzip [options] archive_name.zip -d /target/directory/
```

---

## Useful Options

### zip Options

| Option | What it does |
|---|---|
| `-r` | Compresses directory contents recursively. |
| `-q` | Quiet mode; suppresses command output while zipping files. |
| `-e` | Encrypts the zip archive with a password prompt. |
| `-9` | Uses maximum compression level (slower but smaller file size). |
| `-u` | Updates an existing zip archive by adding only changed or new files. |

### unzip Options

| Option | What it does |
|---|---|
| `-l` | Lists files inside the zip archive without extracting them. |
| `-d dir` | Extracts files into a specified target directory. |
| `-q` | Suppresses extraction progress output. |
| `-o` | Overwrites existing files without asking for confirmation. |

---

## Examples

### Example 1: Compress a folder recursively into a .zip archive

Run `zip -r website.zip ./website/` to compress a web application directory.

```bash
ubuntu@ip-172-31-14-151:~$ zip -r website.zip ./website/
```

### Output

```bash
  adding: website/ (stored 0%)
  adding: website/index.html (deflated 65%)
  adding: website/css/ (stored 0%)
  adding: website/css/style.css (deflated 58%)
```

- **What you typed**: You passed `-r` to recursively zip `./website/` into `website.zip`.
- **Why you typed it**: You wanted to package site files to send to a team member who uses Windows.
- **What happened**: `zip` traversed all files in `./website/`, compressed them, and produced `website.zip`.

---

### Example 2: Extract a .zip archive into a specific directory using unzip

Run `unzip website.zip -d /var/www/html/` to extract web files.

```bash
ubuntu@ip-172-31-14-151:~$ unzip website.zip -d /var/www/html/
```

### Output

```bash
Archive:  website.zip
   creating: /var/www/html/website/
  inflating: /var/www/html/website/index.html
   creating: /var/www/html/website/css/
  inflating: /var/www/html/website/css/style.css
```

- **What you typed**: You passed `-d /var/www/html/` to `unzip` to specify the output location.
- **Why you typed it**: You uploaded a website archive to your server and needed to unpack it into the web server directory.
- **What happened**: `unzip` extracted the files into `/var/www/html/website/`.

---

### Example 3: View zip archive contents without extracting

Run `unzip -l backup.zip` to inspect file lists inside the archive.

```bash
ubuntu@ip-172-31-14-151:~$ unzip -l backup.zip
```

### Output

```bash
Archive:  backup.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
     2048  2026-08-17 21:00   app.conf
     8192  2026-08-17 21:00   server.js
---------                     -------
    10240                     2 files
```

- **What you typed**: You used `unzip -l backup.zip`.
- **Why you typed it**: You wanted to check what files were inside `backup.zip` before extracting them.
- **What happened**: `unzip` listed the file names, original sizes, modified dates, and file count without unzipping.

---

### Example 4: Create a password-protected zip file

Run `zip -e -r secure-data.zip ./confidential/` to create an encrypted zip archive.

```bash
ubuntu@ip-172-31-14-151:~$ zip -e -r secure-data.zip ./confidential/
```

### Output

```bash
Enter password: 
Verify password: 
  adding: confidential/ (stored 0%)
  adding: confidential/keys.json (deflated 40%)
```

- **What you typed**: You included `-e` (encrypt) along with `-r` (recursive).
- **Why you typed it**: You needed to archive sensitive API keys and configuration files securely.
- **What happened**: `zip` prompted for a password, encrypted the archive data, and saved `secure-data.zip`.

---

## DevOps Use Cases

- **AWS Lambda Deployment Packages**: Create `.zip` deployment archives containing Node.js/Python code and dependencies to upload to AWS Lambda.
- **Cross-Platform File Sharing**: Compress reports, build logs, and assets to share with team members using Windows, macOS, or Linux.
- **Unpacking Vendor Software Downloads**: Unzip third-party software releases, SDKs, and driver packages downloaded from vendor sites.
- **CI/CD Build Artifact Packaging**: Zip build outputs (like compiled static assets or test report directories) inside GitHub Actions or Jenkins stages.

---

## Quick Tip

On fresh minimal Ubuntu or RHEL cloud server instances, `zip` and `unzip` commands might not be pre-installed! Install them using `sudo apt install zip unzip` (Ubuntu/Debian) or `sudo dnf install zip unzip` (RHEL/Rocky).

---

## Common Mistakes

- **Forgetting -r when Zipping Directories**: Running `zip archive.zip ./folder/` without `-r` stores only the empty directory entry without any inside files.
- **Using -d with zip Instead of unzip**: Trying to set destination directories during zipping with `-d` (in `zip`, `-d` actually deletes files from an existing zip archive!).
- **Assuming zip Preserves All Linux Permissions**: Standard zip archives may lose specific Linux file ownership, symlinks, or special device file attributes compared to `tar`.

---

## Practice Challenge

1. Make sure zip tools are installed: `sudo apt update && sudo apt install -y zip unzip`.
2. Create test files: `mkdir -p ~/zip-demo && echo "hello" > ~/zip-demo/test.txt`.
3. Create a zip archive: `zip -r demo.zip ~/zip-demo`.
4. List contents: `unzip -l demo.zip`.
5. Extract to a test directory: `unzip demo.zip -d ~/zip-out`.
6. Clean up: `rm -rf ~/zip-demo ~/zip-out demo.zip`.

---

## Related Commands

- [tar Command](./tar.md) - Standard Linux archiving tool for tarballs (`.tar.gz`).
- [scp Command](../15-remote-access/scp.md) - Transfer archives securely to remote Linux servers.
- [rsync Command](../15-remote-access/rsync.md) - Sync files and folders across servers.

---

## Interview Notes

**Interview Question**: Why is `tar.gz` preferred over `.zip` for Linux backups and system software distribution?  
**Answer**: `.tar.gz` preserves native Linux file permissions, user/group ownership, hard links, and symbolic links perfectly. `.zip` was primarily designed for DOS/Windows filesystems and does not preserve all Unix permission bits and symlinks as reliably as `tar`.
