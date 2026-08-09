/*
============================================================
# FS MODULE — FILE SYSTEM MODULE
============================================================

Q1. What is the `fs` module in Node.js?
------------------------------------------------------------

- `fs` stands for **File System**.

- The `fs` module is a built-in/core Node.js module that
  provides APIs for interacting with the file system.

- Using the `fs` module, a Node.js application can work with:

    - Files
    - Directories/folders
    - File metadata
    - File permissions
    - Symbolic links
    - File streams
    - File/directory changes

- For example, Node.js can:

    1. Read a file
    2. Write a file
    3. Append data to a file
    4. Update file content
    5. Rename a file
    6. Delete a file
    7. Copy a file
    8. Create a directory
    9. Delete a directory
   10. Read directory contents
   11. Get file information/metadata
   12. Check permissions
   13. Change permissions
   14. Create/read symbolic links
   15. Watch files for changes
   16. Work with streams for large files

- Since `fs` is a core Node.js module:

    ✔ No npm installation is required.
    ✔ It comes with Node.js.
    ✔ We can directly import/require it.


============================================================
# IMPORTING THE FS MODULE
============================================================

# CommonJS:

const fs = require("node:fs");


# ES Module:

import fs from "node:fs";


- `node:fs` explicitly indicates that `fs` is a built-in
  Node.js module.


============================================================
# TWO MAIN WAYS OF WORKING WITH FS
============================================================

The `fs` module provides APIs in different styles:

1. Synchronous APIs
2. Asynchronous callback APIs
3. Promise-based APIs

------------------------------------------------------------

1. Synchronous
------------------------------------------------------------

Example:

const data = fs.readFileSync("hello.txt", "utf-8");

console.log(data);

- The operation completes before the next line executes.

- If the file operation takes time, the JavaScript execution
  thread waits for it to complete.

- Therefore synchronous file operations can block the
  Node.js event loop.

Example:

console.log("Start");

const data = fs.readFileSync("hello.txt", "utf-8");

console.log(data);

console.log("End");


Execution order:

Start
↓
Read file
↓
Wait until reading finishes
↓
Print file data
↓
End


------------------------------------------------------------

2. Asynchronous callback API
------------------------------------------------------------

Example:

fs.readFile("hello.txt", "utf-8", (err, data) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log(data);

});

console.log("End");


Possible execution:

Start
↓
Start file read
↓
Node.js can continue doing other work
↓
File read completes
↓
Callback executes


- This approach does not block the JavaScript thread while
  waiting for the file operation.

------------------------------------------------------------

3. Promise API
------------------------------------------------------------

Node.js also provides a promise-based version:

const fs = require("node:fs/promises");

const data = await fs.readFile("hello.txt", "utf-8");

console.log(data);


- This allows us to use modern `async/await` syntax.


============================================================
# IMPORTANT NOTE ABOUT "PARALLEL"
============================================================

- Do not simply say:

    "All fs tasks run in parallel."

- That is not always correct.

- Node.js asynchronous file-system operations allow JavaScript
  to continue without synchronously blocking on the operation.

- Multiple operations may be in progress concurrently, but
  their exact execution depends on the operating system and
  Node.js internals.

- The important interview point is:

    Synchronous fs operation
    → blocks the JavaScript execution thread.

    Asynchronous fs operation
    → allows JavaScript to continue while the I/O operation
      is handled asynchronously.


============================================================
# FILE OPERATIONS
============================================================


------------------------------------------------------------
1. fs.readFileSync()
------------------------------------------------------------

Q. What is `fs.readFileSync()`?

- `fs.readFileSync()` reads the contents of a file
  synchronously.

Syntax:

fs.readFileSync(path[, options])


Example:

const fs = require("node:fs");

const data = fs.readFileSync("hello.txt");

console.log(data);


- By default, the returned value is a `Buffer`.

Example:

const data = fs.readFileSync("hello.txt");

console.log(data);


To get a string:

const data = fs.readFileSync("hello.txt", "utf-8");

console.log(data);


You can also use:

const data = fs.readFileSync("hello.txt");

console.log(data.toString());


------------------------------------------------------------
# Why does readFileSync return Buffer?
------------------------------------------------------------

- Files contain bytes.

- When no encoding is specified, Node.js gives us those
  bytes as a `Buffer`.

File:

Hello Node.js

↓ readFileSync()

Buffer

↓ toString()

"Hello Node.js"


- If we specify `"utf-8"`:

fs.readFileSync("hello.txt", "utf-8");

then Node.js converts the file bytes into a string for us.


Parameters:

1. `path`
   → Path of the file.

2. `options`
   → Optional configuration such as encoding.


============================================================
2. fs.writeFileSync()
============================================================

Q. What is `fs.writeFileSync()`?

- `fs.writeFileSync()` writes data to a file synchronously.

Syntax:

fs.writeFileSync(file, data[, options])


Example:

const fs = require("node:fs");

fs.writeFileSync(
    "hello.txt",
    "Hello Node.js"
);


- If the file does not exist:

    → Node.js creates the file.

- If the file already exists:

    → Existing content is overwritten by default.


Example:

Before:

hello.txt

Hello


Code:

fs.writeFileSync("hello.txt", "Node.js");


After:

hello.txt

Node.js


------------------------------------------------------------
# Parameters

1. filepath
   → File path.

2. data
   → Data that should be written.

3. options
   → Optional encoding, mode, flag, etc.


Example:

fs.writeFileSync(
    "hello.txt",
    "Hello Node.js",
    "utf-8"
);


============================================================
3. fs.appendFileSync()
============================================================

Q. What is `fs.appendFileSync()`?

- `appendFileSync()` adds data to the end of an existing file.

Example:

fs.appendFileSync(
    "hello.txt",
    "\nWelcome to Node.js"
);


If the file initially contains:

Hello


After append:

Hello
Welcome to Node.js


- Existing content is preserved.

- If the file does not exist, Node.js creates it.

Syntax:

fs.appendFileSync(file, data[, options])


Parameters:

1. filepath
2. data
3. options


============================================================
4. fs.renameSync()
============================================================

Q. What is `fs.renameSync()`?

- Renames a file or directory synchronously.

Syntax:

fs.renameSync(oldPath, newPath);


Example:

fs.renameSync(
    "old.txt",
    "new.txt"
);


Before:

old.txt


After:

new.txt


- The same API can also be used to move a file when the
  destination path is different.


============================================================
5. fs.unlinkSync()
============================================================

Q. What is `fs.unlinkSync()`?

- Deletes a file synchronously.

Example:

fs.unlinkSync("hello.txt");


Before:

hello.txt


After:

File is deleted.


IMPORTANT:

- `unlinkSync()` is used for files.
- For directories, use directory-specific APIs such as
  `fs.rmSync()`.


============================================================
6. fs.existsSync()
============================================================

Q. What is `fs.existsSync()`?

- Checks whether a file or directory exists.

Example:

const exists = fs.existsSync("hello.txt");

console.log(exists);


Possible output:

true

or

false


- `true`
  → path exists.

- `false`
  → path does not exist.


IMPORTANT:

- `existsSync()` returns a boolean.

------------------------------------------------------------


============================================================
7. fs.accessSync()
============================================================

Q. What is `fs.accessSync()`?

- `fs.accessSync()` checks whether a file or directory can
  be accessed with the requested permissions.

Example:

try {

    fs.accessSync(
        "hello.txt",
        fs.constants.R_OK
    );

    console.log("File is readable.");

} catch (error) {

    console.log("File cannot be accessed.");

}


- If access is allowed:

    → no value is returned
    → no error is thrown.

- If access is not allowed:

    → an error is thrown.


------------------------------------------------------------
# Common permission constants
------------------------------------------------------------

fs.constants.F_OK
→ File exists/access check

fs.constants.R_OK
→ Read permission

fs.constants.W_OK
→ Write permission

fs.constants.X_OK
→ Execute permission


Example:

fs.accessSync(
    "hello.txt",
    fs.constants.R_OK
);


============================================================
8. fs.copyFileSync()
============================================================

Q. What is `fs.copyFileSync()`?

- Copies a file from one location to another.

Syntax:

fs.copyFileSync(source, destination);


Example:

fs.copyFileSync(
    "hello.txt",
    "backup.txt"
);


Before:

hello.txt


After:

hello.txt
backup.txt


- `source`
  → file that should be copied.

- `destination`
  → location/name of the copied file.


============================================================
# DIRECTORY OPERATIONS
============================================================


============================================================
1. fs.mkdirSync()
============================================================

Q. What is `fs.mkdirSync()`?

- Creates a directory synchronously.

Example:

fs.mkdirSync("documents");


Result:

documents/
    ↓
    directory created


------------------------------------------------------------
# recursive option
------------------------------------------------------------

Example:

fs.mkdirSync(
    "parent/child/grandchild",
    { recursive: true }
);


- Without `recursive: true`, parent directories may need to
  already exist.

- With:

    { recursive: true }

  Node.js can create the required parent directories as well.


Example:

parent
  └── child
       └── grandchild


============================================================
2. fs.rmdirSync()
============================================================

Q. What is `fs.rmdirSync()`?

- Removes a directory synchronously.

Example:

fs.rmdirSync("documents");


IMPORTANT:

- This older API is intended for removing directories.
- The directory normally needs to be empty.

- For modern Node.js code, `fs.rmSync()` is preferred when
  you need more flexible removal behavior.


Example:

fs.rmSync("documents", { recursive: true });


============================================================
3. fs.readdirSync()
============================================================

Q. What is `fs.readdirSync()`?

- Reads the contents of a directory synchronously.

Example:

const files = fs.readdirSync("./");

console.log(files);


Possible output:

[
    "app.js",
    "package.json",
    "hello.txt",
    "images"
]


- It returns an array containing directory entries.

------------------------------------------------------------
# Getting more information about entries
------------------------------------------------------------

fs.readdirSync("./", { withFileTypes: true });


- This can return `Dirent` objects, allowing us to determine
  whether an entry is a file or directory.


============================================================
4. fs.mkdtempSync()
============================================================

Q. What is `fs.mkdtempSync()`?

- Creates a unique temporary directory.

Example:

const tempDir = fs.mkdtempSync("temp-");

console.log(tempDir);


Possible output:

temp-a8Kx2P


- The returned value is the path of the newly created
  temporary directory.

- A prefix is used to generate the temporary directory name.


============================================================
# FILE INFORMATION / METADATA
============================================================


============================================================
1. fs.statSync()
============================================================

Q. What is `fs.statSync()`?

- Returns information/metadata about a file or directory.

Example:

const stats = fs.statSync("hello.txt");

console.log(stats);


The returned `Stats` object contains information such as:

- File size
- Creation time
- Modification time
- Access time
- File type information
- Permission-related information


------------------------------------------------------------
# Check whether it is a file
------------------------------------------------------------

const stats = fs.statSync("hello.txt");

console.log(stats.isFile());


Output:

true


------------------------------------------------------------
# Check whether it is a directory
------------------------------------------------------------

console.log(stats.isDirectory());


Output:

false


------------------------------------------------------------
# Get file size
------------------------------------------------------------

console.log(stats.size);


- Size is generally returned in bytes.


============================================================
2. fs.lstatSync()
============================================================

Q. What is `fs.lstatSync()`?

- `lstatSync()` is similar to `statSync()`.

The important difference is:

    statSync()
    → follows symbolic links.

    lstatSync()
    → provides information about the symbolic link itself
      instead of following it.


Example:

const stats = fs.lstatSync("my-link");

console.log(stats.isSymbolicLink());


Output:

true


------------------------------------------------------------
# Simple difference

statSync()
    ↓
follows symbolic link
    ↓
gets information about target


lstatSync()
    ↓
does NOT follow symbolic link
    ↓
gets information about link itself


============================================================
3. fs.realpathSync()
============================================================

Q. What is `fs.realpathSync()`?

- Resolves a path to its absolute/canonical path.

Example:

const realPath = fs.realpathSync("./hello.txt");

console.log(realPath);


Possible output:

C:\project\hello.txt


- It can also resolve symbolic links to their target path.


============================================================
4. fs.readlinkSync()
============================================================

Q. What is `fs.readlinkSync()`?

- Reads the target/path stored in a symbolic link.

Example:

const target = fs.readlinkSync("my-link");

console.log(target);


- It does not return the content of the target file.
- It returns the path that the symbolic link points to.


============================================================
5. fs.chmodSync()
============================================================

Q. What is `fs.chmodSync()`?

- Changes the permissions of a file or directory.

Syntax:

fs.chmodSync(path, mode);


Example:

fs.chmodSync(
    "hello.txt",
    0o644
);


Common permission examples:

0o644
→ owner can read/write
→ others can read


0o755
→ owner can read/write/execute
→ others can read/execute


0o777
→ read/write/execute permissions for everyone

IMPORTANT:

- Permission behavior is primarily relevant to
  Unix-like systems such as Linux and macOS.
- Windows handles permissions differently.


============================================================
6. fs.chownSync()
============================================================

Q. What is `fs.chownSync()`?

- Changes the ownership of a file or directory.

Syntax:

fs.chownSync(path, uid, gid);


Where:

uid
→ User ID

gid
→ Group ID


Example:

fs.chownSync(
    "hello.txt",
    1000,
    1000
);


IMPORTANT:

- This is primarily relevant to Unix/Linux/macOS systems.
- It generally requires appropriate operating-system
  permissions.
- It is not something you should expect to work the same way
  on Windows.


============================================================
# IMPORTANT FS METHODS — QUICK REVISION
============================================================

# FILE

readFileSync()
→ Read file

writeFileSync()
→ Write/overwrite file

appendFileSync()
→ Add data to file

renameSync()
→ Rename/move file

unlinkSync()
→ Delete file

existsSync()
→ Check whether path exists

accessSync()
→ Check access/permissions

copyFileSync()
→ Copy file


# DIRECTORY

mkdirSync()
→ Create directory

rmdirSync()
→ Remove directory

readdirSync()
→ Read directory contents

mkdtempSync()
→ Create temporary directory


# FILE INFORMATION

statSync()
→ File/directory metadata

lstatSync()
→ Metadata without following symbolic links

realpathSync()
→ Resolve real/absolute path

readlinkSync()
→ Read symbolic-link target


# PERMISSIONS / OWNERSHIP

chmodSync()
→ Change permissions

chownSync()
→ Change ownership


============================================================
# SIMPLE FS FLOW
============================================================

                    FS MODULE
                        |
        +---------------+---------------+
        |               |               |
        v               v               v
      FILE           DIRECTORY       METADATA
        |               |               |
        |               |               |
   +----+----+      +---+----+      +---+----+
   |    |    |      |   |    |      |   |    |
   v    v    v      v   v    v      v   v    v
 read write append mkdir read remove stat lstat realpath
 rename delete copy
 access


============================================================
# SYNCHRONOUS VS ASYNCHRONOUS
============================================================

                    FS OPERATION
                         |
              +----------+----------+
              |                     |
              v                     v
        Synchronous            Asynchronous
              |                     |
              v                     v
       readFileSync()         readFile()
       writeFileSync()        writeFile()
       appendFileSync()       appendFile()
              |                     |
              v                     v
          BLOCKING              NON-BLOCKING
              |                     |
              v                     v
       waits for result       JavaScript can
                              continue


============================================================
# IMPORTANT INTERVIEW POINT
============================================================

Q. Why should we be careful with synchronous fs methods
   in a Node.js server?

- Node.js uses an event-driven architecture.

- Synchronous file-system operations block the JavaScript
  execution thread while the operation completes.

- If a server receives many requests and performs a slow
  synchronous file operation, other JavaScript work can be
  delayed.

Example:

// Avoid for frequent server requests:

const data = fs.readFileSync("large-file.txt", "utf-8");


- For server applications, asynchronous APIs are generally
  preferred for I/O operations.

Example:

fs.readFile(
    "large-file.txt",
    "utf-8",
    (err, data) => {

        if (err) {
            console.log(err);
            return;
        }

        console.log(data);
    }
);


============================================================
# PRACTICAL EXAMPLE
============================================================

const fs = require("node:fs");


// 1. Create/write a file

fs.writeFileSync(
    "user.txt",
    "Vishal"
);


// 2. Read the file

const data = fs.readFileSync(
    "user.txt",
    "utf-8"
);

console.log(data);


// 3. Append data

fs.appendFileSync(
    "user.txt",
    "\nNode.js Developer"
);


// 4. Check whether file exists

console.log(
    fs.existsSync("user.txt")
);


// 5. Get file information

const stats = fs.statSync("user.txt");

console.log("Size:", stats.size);

console.log(
    "Is File:",
    stats.isFile()
);


// 6. Copy the file

fs.copyFileSync(
    "user.txt",
    "user-backup.txt"
);


// 7. Rename the backup

fs.renameSync(
    "user-backup.txt",
    "user-copy.txt"
);


// 8. Delete the copy

fs.unlinkSync("user-copy.txt");


============================================================
# REAL-WORLD USE CASES OF FS MODULE
============================================================

1. Reading configuration files

2. Creating log files

3. Writing application data

4. Uploading/storing files

5. Creating temporary files

6. Reading templates

7. Serving static files

8. Creating backups

9. Processing large files using streams

10. Monitoring file changes

11. Managing application-generated files

12. Working with directories


============================================================
# INTERVIEW-READY ANSWER
============================================================

Q. What is the `fs` module in Node.js?

- The `fs` (File System) module is a built-in Node.js module
  used to interact with the file system.

- It provides APIs for reading, writing, appending, renaming,
  deleting, copying, and managing files and directories.

- It can also provide file metadata, handle permissions,
  work with symbolic links, and watch file-system changes.

- The `fs` module provides synchronous, callback-based
  asynchronous, and Promise-based APIs.

- Synchronous APIs block the JavaScript execution thread,
  while asynchronous APIs allow Node.js to continue handling
  other work while the I/O operation is in progress.

Example:

const fs = require("node:fs");

const data = fs.readFileSync(
    "hello.txt",
    "utf-8"
);

console.log(data);


============================================================
# ONE-LINE INTERVIEW ANSWER
============================================================

- The `fs` module is Node.js's built-in File System module
  that allows applications to read, write, update, delete,
  rename, copy, and manage files and directories, with both
  synchronous and asynchronous APIs.
*/