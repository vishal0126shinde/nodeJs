/*
# ASYNCHRONOUS FILE SYSTEM METHODS IN NODE.JS
================================================

Q. What is Asynchronous File System operation?

- The asynchronous methods of the `fs` module perform file-system
  operations without blocking the Node.js event loop.

- Node.js starts the file-system operation and continues executing
  other JavaScript code.

- When the operation is completed, Node.js executes the callback
  function with the result.

Basic flow:

    JavaScript Code
          |
          v
    fs asynchronous operation
          |
          +---------------------> File System
          |                            |
          |                            | operation
          |                            v
          |                       Operation done
          |                            |
          v                            |
    Node.js continues                 |
    other work                        |
          |                            |
          +<---------------------------+
                       |
                       v
                  Callback runs


IMPORTANT:
- Asynchronous does NOT mean that the file operation itself
  magically runs in JavaScript on another JavaScript thread.

- Node.js delegates the file-system work to the underlying system /
  Node.js I/O mechanisms, and JavaScript can continue doing other work.

- This is why asynchronous `fs` methods are generally preferred in
  server applications, where blocking the event loop can delay
  other requests.

------------------------------------------------
# 1. fs.readFile()
------------------------------------------------

Q. What is fs.readFile()?

- `fs.readFile()` reads the contents of a file asynchronously.

- It does NOT block the Node.js event loop while waiting for the
  file operation to complete.

Syntax:

    fs.readFile(path, options, callback)

Parameters:

1. path
   - Path of the file that we want to read.

2. options
   - Optional.
   - Can specify encoding such as `"utf8"`.
   - Can also contain other options such as flags.

3. callback
   - Function executed after the read operation completes.
   - Common callback form:

        (err, data) => {}

   - `err`  -> contains an error if the operation fails.
   - `data` -> contains the file contents if successful.


Example:

    const fs = require("fs");

    fs.readFile("example.txt", "utf8", (err, data) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(data);
    });


Without encoding:

    fs.readFile("example.txt", (err, data) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(data);
    });

- Without an encoding such as `"utf8"`, the returned `data` is
  normally a Buffer.

- If `"utf8"` is provided, Node.js returns the file content as a
  string.


Example:

    fs.readFile("example.txt", "utf8", (err, data) => {
        console.log(typeof data);
    });

Output:

    string


Without `"utf8"`:

    fs.readFile("example.txt", (err, data) => {
        console.log(Buffer.isBuffer(data));
    });

Output:

    true


------------------------------------------------
# IMPORTANT: Why is fs.readFile() non-blocking?
------------------------------------------------

Suppose we have:

    console.log("1");

    fs.readFile("example.txt", "utf8", (err, data) => {
        console.log(data);
    });

    console.log("2");


Output:

    1
    2
    file content


Why?

- Node.js starts the file-read operation.
- Node.js does not wait synchronously for the file operation to
  finish.
- It continues executing the next JavaScript statement.
- Once the file operation finishes, the callback becomes eligible
  to run.
- Therefore, `"2"` can be printed before the file content.


------------------------------------------------
# 2. fs.writeFile()
------------------------------------------------

Q. What is fs.writeFile()?

- `fs.writeFile()` writes data to a file asynchronously.

Syntax:

    fs.writeFile(file, data, options, callback)


Parameters:

1. file
   - Path of the file.

2. data
   - Data that should be written.

3. options
   - Optional.
   - Can specify encoding, mode, flag, etc.

4. callback
   - Runs after the write operation completes.

Example:

    const fs = require("fs");

    fs.writeFile(
        "example.txt",
        "Hello Node.js",
        "utf8",
        (err) => {

            if (err) {
                console.error(err);
                return;
            }

            console.log("File written successfully");
        }
    );


IMPORTANT:

- If the file does not exist:
      -> Node.js creates the file.

- If the file already exists:
      -> Existing content is overwritten by default.


Example:

Existing:

    Hello

Code:

    fs.writeFile("example.txt", "Node.js", callback);


New content:

    Node.js


------------------------------------------------
# 3. fs.appendFile()
------------------------------------------------

Q. What is fs.appendFile()?

- `fs.appendFile()` adds new data to the end of an existing file
  asynchronously.

Syntax:

    fs.appendFile(file, data, options, callback)


Example:

    fs.appendFile(
        "example.txt",
        "\nNew line",
        "utf8",
        (err) => {

            if (err) {
                console.error(err);
                return;
            }

            console.log("Data appended");
        }
    );


IMPORTANT:

- If the file exists:
      -> New data is added after the existing content.

- If the file does not exist:
      -> Node.js creates the file and writes the data.


------------------------------------------------
# Difference: writeFile() vs appendFile()
------------------------------------------------

writeFile():

    Existing:
        Hello

    writeFile("file.txt", "Node.js")

    Result:
        Node.js


appendFile():

    Existing:
        Hello

    appendFile("file.txt", " Node.js")

    Result:
        Hello Node.js


Remember:

    writeFile  -> replace/overwrite
    appendFile -> add at the end


------------------------------------------------
# 4. fs.rename()
------------------------------------------------

Q. What is fs.rename()?

- `fs.rename()` asynchronously renames a file or moves a file
  from one path to another.

Syntax:

    fs.rename(oldPath, newPath, callback)


Example:

    fs.rename(
        "oldname.txt",
        "newname.txt",
        (err) => {

            if (err) {
                console.error(err);
                return;
            }

            console.log("File renamed successfully");
        }
    );


Parameters:

1. oldPath
   - Existing file path.

2. newPath
   - New name or destination path.

3. callback
   - Runs after the operation completes.


It can be used for:

    Rename:
        old.txt -> new.txt

    Move:
        folder1/file.txt -> folder2/file.txt


------------------------------------------------
# 5. fs.unlink()
------------------------------------------------

Q. What is fs.unlink()?

- `fs.unlink()` asynchronously deletes a file.

Syntax:

    fs.unlink(path, callback)


Example:

    fs.unlink("output.txt", (err) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("File deleted");
    });


Parameters:

1. path
   - Path of the file to delete.

2. callback
   - Receives an error if deletion fails.


IMPORTANT:

    fs.unlink()
        -> deletes FILE

    It is not the method used to remove a directory.


------------------------------------------------
# 6. fs.copyFile()
------------------------------------------------

Q. What is fs.copyFile()?

- `fs.copyFile()` asynchronously copies a file from one location
  to another.

Syntax:

    fs.copyFile(src, dest, callback)


Parameters:

1. src
   - Source file.

2. dest
   - Destination file.

3. callback
   - Executes after copying completes.


Example:

    fs.copyFile(
        "source.txt",
        "copy.txt",
        (err) => {

            if (err) {
                console.error(err);
                return;
            }

            console.log("File copied successfully");
        }
    );


Result:

    source.txt
        |
        | copy
        v
    copy.txt


IMPORTANT:

- The original file remains unchanged.
- A new copy is created at the destination.


------------------------------------------------
# 7. fs.access()
------------------------------------------------

Q. What is fs.access()?

- `fs.access()` checks whether a file or directory can be accessed
  with specific permissions.

Syntax:

    fs.access(path, mode, callback)


Parameters:

1. path
   - File or directory path.

2. mode
   - Permission that you want to check.

3. callback
   - Receives an error if the access check fails.


Common permission constants:

    fs.constants.F_OK
        -> Check whether the path exists.

    fs.constants.R_OK
        -> Check whether it is readable.

    fs.constants.W_OK
        -> Check whether it is writable.

    fs.constants.X_OK
        -> Check whether it is executable.


Example:

    const fs = require("fs");

    fs.access(
        "example.txt",
        fs.constants.R_OK | fs.constants.W_OK,
        (err) => {

            if (err) {
                console.log("File is not readable/writable");
                return;
            }

            console.log("File is readable and writable");
        }
    );


IMPORTANT:

- `fs.access()` does not normally return `true` or `false`.
- If the access check succeeds:
      -> callback receives `err = null`.

- If it fails:
      -> callback receives an error.


------------------------------------------------
# DIRECTORY OPERATIONS
------------------------------------------------


# 8. fs.mkdir()
------------------------------------------------

Q. What is fs.mkdir()?

- `fs.mkdir()` asynchronously creates a directory.

Syntax:

    fs.mkdir(path, options, callback)


Example:

    fs.mkdir("myFolder", (err) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("Directory created");
    });


With nested directories:

    fs.mkdir(
        "parent/child/grandchild",
        { recursive: true },
        (err) => {

            if (err) {
                console.error(err);
                return;
            }

            console.log("Directories created");
        }
    );


`recursive: true`

- Creates parent directories if they do not already exist.


------------------------------------------------
# 9. fs.rmdir()
------------------------------------------------

Q. What is fs.rmdir()?

- `fs.rmdir()` asynchronously removes a directory.

Syntax:

    fs.rmdir(path, callback)


Example:

    fs.rmdir("myFolder", (err) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("Directory deleted");
    });


IMPORTANT:

- The directory generally needs to be empty.
- For modern Node.js applications, `fs.rm()` is preferred for
  more flexible removal of files/directories.


------------------------------------------------
# 10. fs.readdir()
------------------------------------------------

Q. What is fs.readdir()?

- `fs.readdir()` asynchronously reads the contents of a directory.

Syntax:

    fs.readdir(path, options, callback)


Example:

    fs.readdir(".", (err, files) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(files);
    });


Example result:

    [
        "app.js",
        "package.json",
        "server.js",
        "node_modules"
    ]


- It can return the names of files and directories.

- With appropriate options, it can also return `Dirent` objects
  containing information about each directory entry.


------------------------------------------------
# 11. fs.mkdtemp()
------------------------------------------------

Q. What is fs.mkdtemp()?

- `fs.mkdtemp()` asynchronously creates a unique temporary
  directory.

Syntax:

    fs.mkdtemp(prefix, callback)


Example:

    fs.mkdtemp("temp-", (err, folder) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("Temporary folder:", folder);
    });


Possible output:

    Temporary folder: temp-A7xKp2


IMPORTANT:

- Node.js adds random characters to the prefix.
- This helps create a unique temporary directory.


------------------------------------------------
# FILE INFORMATION / METADATA
------------------------------------------------


# 12. fs.stat()
------------------------------------------------

Q. What is fs.stat()?

- `fs.stat()` asynchronously obtains information about a file
  or directory.

Syntax:

    fs.stat(path, options, callback)


Example:

    fs.stat("example.txt", (err, stats) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(stats);
    });


The returned `stats` object can provide information such as:

    stats.size
    stats.isFile()
    stats.isDirectory()
    stats.mtime
    stats.birthtime


Example:

    fs.stat("example.txt", (err, stats) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("Size:", stats.size);
        console.log("Is file:", stats.isFile());
        console.log("Is directory:", stats.isDirectory());
    });


------------------------------------------------
# 13. fs.lstat()
------------------------------------------------

Q. What is fs.lstat()?

- `fs.lstat()` is similar to `fs.stat()` but it does NOT follow
  symbolic links.

Example:

    fs.lstat("shortcut.txt", (err, stats) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(stats);
    });


IMPORTANT DIFFERENCE:

    fs.stat()
        -> follows symbolic link
        -> gives information about the target

    fs.lstat()
        -> does not follow symbolic link
        -> gives information about the link itself


Think:

    shortcut.txt
          |
          v
      real.txt

    stat()
       -> information about real.txt

    lstat()
       -> information about shortcut.txt


------------------------------------------------
# 14. fs.realpath()
------------------------------------------------

Q. What is fs.realpath()?

- `fs.realpath()` asynchronously resolves a path into its
  absolute/canonical path.

Syntax:

    fs.realpath(path, callback)


Example:

    fs.realpath("shortcut.txt", (err, resolvedPath) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("Resolved path:", resolvedPath);
    });


It is useful when:

- You have a relative path.
- You have a symbolic link.
- You need the actual resolved filesystem path.


------------------------------------------------
# 15. fs.readlink()
------------------------------------------------

Q. What is fs.readlink()?

- `fs.readlink()` reads the target stored inside a symbolic link.

Syntax:

    fs.readlink(path, callback)


Example:

    fs.readlink("mylink", (err, linkString) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("Symlink points to:", linkString);
    });


Important:

    readlink()
        -> reads what the symbolic link points to

    realpath()
        -> resolves the actual final path


------------------------------------------------
# 16. fs.chmod()
------------------------------------------------

Q. What is fs.chmod()?

- `fs.chmod()` asynchronously changes the permissions of a file
  or directory.

Syntax:

    fs.chmod(path, mode, callback)


Example:

    fs.chmod(
        "example.txt",
        0o644,
        (err) => {

            if (err) {
                console.error(err);
                return;
            }

            console.log("Permissions changed");
        }
    );


Example:

    0o644

means a Unix-style permission mode.


IMPORTANT:

- Permission behavior is primarily relevant to POSIX systems
  such as Linux and macOS.
- Windows does not use Unix permissions in exactly the same way.


------------------------------------------------
# 17. fs.chown()
------------------------------------------------

Q. What is fs.chown()?

- `fs.chown()` asynchronously changes the ownership of a file
  or directory.

Syntax:

    fs.chown(path, uid, gid, callback)


Parameters:

1. path
   -> File or directory path.

2. uid
   -> User ID.

3. gid
   -> Group ID.

4. callback
   -> Executes after the operation.


Example:

    fs.chown(
        "example.txt",
        1000,
        1000,
        (err) => {

            if (err) {
                console.error(err);
                return;
            }

            console.log("Ownership changed");
        }
    );


IMPORTANT:

- `chown()` is mainly relevant to Unix/Linux/macOS systems.
- On Windows, ownership behavior and support differ.


================================================
# QUICK REVISION
================================================

FILE OPERATIONS:

    fs.readFile()
        -> Read file

    fs.writeFile()
        -> Write / overwrite file

    fs.appendFile()
        -> Add data to file

    fs.rename()
        -> Rename / move file

    fs.unlink()
        -> Delete file

    fs.copyFile()
        -> Copy file

    fs.access()
        -> Check access / permissions


DIRECTORY OPERATIONS:

    fs.mkdir()
        -> Create directory

    fs.rmdir()
        -> Remove empty directory

    fs.readdir()
        -> Read directory contents

    fs.mkdtemp()
        -> Create unique temporary directory


FILE INFORMATION:

    fs.stat()
        -> File/directory metadata, follows symlinks

    fs.lstat()
        -> Metadata, does not follow symlinks

    fs.realpath()
        -> Resolve actual/canonical path

    fs.readlink()
        -> Read symbolic-link target

    fs.chmod()
        -> Change permissions

    fs.chown()
        -> Change ownership


================================================
# ASYNC vs SYNC
================================================

Synchronous:

    fs.readFileSync()
    fs.writeFileSync()
    fs.appendFileSync()

    -> Blocks JavaScript execution until operation completes.

Asynchronous:

    fs.readFile()
    fs.writeFile()
    fs.appendFile()

    -> Starts operation and allows JavaScript to continue.
    -> Callback runs after the operation completes.


Simple comparison:

    SYNC:

        Start
          |
          v
        Read file
          |
          | WAIT
          v
        Read complete
          |
          v
        Continue


    ASYNC:

        Start
          |
          v
        Start file read
          |
          v
        Continue other JavaScript
          |
          v
        File read completes
          |
          v
        Callback executes


================================================
# INTERVIEW-READY ANSWER
================================================

Q. What is the asynchronous fs module in Node.js?

- The asynchronous methods of Node.js's `fs` module allow
  applications to perform file-system operations without
  synchronously blocking the JavaScript execution flow.

- Node.js starts the requested file-system operation and can
  continue handling other work.

- After the operation completes, the callback is executed with
  either an error or the result.

- Common asynchronous methods include:

    fs.readFile()
    fs.writeFile()
    fs.appendFile()
    fs.rename()
    fs.unlink()
    fs.copyFile()
    fs.access()
    fs.mkdir()
    fs.rmdir()
    fs.readdir()
    fs.mkdtemp()
    fs.stat()
    fs.lstat()
    fs.realpath()
    fs.readlink()
    fs.chmod()
    fs.chown()

- Asynchronous file-system APIs are especially useful in server
  applications because avoiding unnecessary synchronous waits
  helps keep the Node.js event loop responsive to other work.

*/