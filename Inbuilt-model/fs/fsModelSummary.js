/*
============================================================
# FILE SYSTEM (fs) MODULE IN NODE.JS
============================================================

Q. What is the fs module in Node.js?

- fs stands for File System.

- The fs module is a built-in/core Node.js module used to
  interact with the operating system's file system.

- It allows a Node.js application to work with:

  1. Files
  2. Directories
  3. File metadata
  4. File permissions
  5. Symbolic links
  6. File streams
  7. File watching
  8. Temporary files/directories

- Using fs, we can:

  - create files
  - read files
  - write files
  - append data
  - update files
  - rename files
  - move files
  - copy files
  - delete files
  - create directories
  - read directories
  - delete directories
  - get file information
  - change file permissions
  - change file ownership
  - create/read symbolic links
  - watch files for changes
  - work with large files using streams


- fs is a built-in Node.js module.

- Therefore, we do NOT need to install it using npm.


------------------------------------------------------------
# Importing fs
------------------------------------------------------------

CommonJS:

const fs = require("fs");


ES Module:

import fs from "node:fs";


Recommended modern Node.js style:

import fs from "node:fs";


For Promise-based API:

import fs from "node:fs/promises";


CommonJS Promise API:

const fs = require("node:fs/promises");


NOTE:

- "fs" and "node:fs" refer to Node's built-in file system module.

- Using "node:fs" clearly indicates that we are importing
  Node's built-in module rather than a package from node_modules.


============================================================
# TYPES OF fs APIs
============================================================

Node.js provides three major styles for file-system operations:

1. Synchronous API
2. Callback-based asynchronous API
3. Promise-based asynchronous API


------------------------------------------------------------
1. Synchronous API
------------------------------------------------------------

Examples:

fs.readFileSync()
fs.writeFileSync()
fs.appendFileSync()

- These methods block the JavaScript thread until the
  file-system operation is completed.

Example:

const data = fs.readFileSync("data.txt", "utf8");

console.log(data);

console.log("Next code");


Execution:

    readFileSync()
          |
          |---- wait until file is read
          |
          v
    console.log(data)
          |
          v
    next code


NOTE:

- Synchronous APIs are simple.
- But they block execution.

- Therefore, they are generally avoided in request-handling
  code of servers because a slow file-system operation can
  delay other work.


------------------------------------------------------------
2. Callback-based asynchronous API
------------------------------------------------------------

Examples:

fs.readFile()
fs.writeFile()
fs.appendFile()

Example:

fs.readFile("data.txt", "utf8", (err, data) => {

    if (err) {
        console.error(err);
        return;
    }

    console.log(data);

});

console.log("Next code");


Here:

- readFile() starts the file-system operation.
- Node.js does not block JavaScript execution while waiting.
- "Next code" can execute.
- The callback is called after the operation completes.


------------------------------------------------------------
3. Promise-based asynchronous API
------------------------------------------------------------

Available through:

node:fs/promises


Example:

import fs from "node:fs/promises";

const data = await fs.readFile("data.txt", "utf8");

console.log(data);


- Promise-based fs APIs are asynchronous.
- They work very well with async/await.
- They usually make asynchronous file operations easier
  to read and maintain.


============================================================
# FILE OPERATIONS
============================================================


------------------------------------------------------------
1. READ FILE
------------------------------------------------------------

Synchronous:

fs.readFileSync(path, options)


Asynchronous:

fs.readFile(path, options, callback)


Promise:

fs.promises.readFile(path, options)


Example:

const data = fs.readFileSync("data.txt", "utf8");

console.log(data);


What does readFile do?

- Reads the complete contents of a file into memory.

- If no encoding is specified, the result is normally
  returned as a Buffer.

Example:

const data = fs.readFileSync("data.txt");

console.log(data);

- data is a Buffer.


If we specify:

const data = fs.readFileSync("data.txt", "utf8");

- data is returned as a string.


IMPORTANT:

- readFile() is suitable for files that can reasonably be
  loaded completely into memory.

- For very large files, prefer streams.


------------------------------------------------------------
2. WRITE FILE
------------------------------------------------------------

Synchronous:

fs.writeFileSync(path, data, options)


Asynchronous:

fs.writeFile(path, data, options, callback)


Promise:

fs.promises.writeFile(path, data, options)


Example:

fs.writeFileSync(
    "data.txt",
    "Hello Node.js",
    "utf8"
);


Behavior:

- If file does not exist:

      File is created.


- If file already exists:

      Existing content is replaced/overwritten
      by default.


Example:

Existing:

Hello


write:

World


Result:

World


IMPORTANT:

- writeFile() is NOT used to append data.

- To add data without replacing existing content,
  use appendFile().


------------------------------------------------------------
3. APPEND FILE
------------------------------------------------------------

Synchronous:

fs.appendFileSync(path, data, options)


Asynchronous:

fs.appendFile(path, data, options, callback)


Promise:

fs.promises.appendFile(path, data, options)


Example:

fs.appendFileSync(
    "data.txt",
    "\nNew line",
    "utf8"
);


Behavior:

- If file exists:

      New data is added after existing content.


- If file does not exist:

      Node.js creates the file.


Common use:

- log files
- audit logs
- adding records
- continuous text output


------------------------------------------------------------
4. RENAME / MOVE FILE
------------------------------------------------------------

Synchronous:

fs.renameSync(oldPath, newPath)


Asynchronous:

fs.rename(oldPath, newPath, callback)


Promise:

fs.promises.rename(oldPath, newPath)


Example:

fs.renameSync(
    "old.txt",
    "new.txt"
);


IMPORTANT:

- rename() can rename a file.
- It can also move a file/directory when the destination
  is on the same filesystem and the operation is supported.


------------------------------------------------------------
5. DELETE FILE
------------------------------------------------------------

Traditional:

fs.unlinkSync(path)

fs.unlink(path, callback)

fs.promises.unlink(path)


Example:

await fs.unlink("data.txt");


- unlink() removes a file.

- It is generally used for files rather than directories.


------------------------------------------------------------
6. COPY FILE
------------------------------------------------------------

Synchronous:

fs.copyFileSync(src, dest)


Asynchronous:

fs.copyFile(src, dest, callback)


Promise:

fs.promises.copyFile(src, dest)


Example:

await fs.copyFile(
    "source.txt",
    "backup.txt"
);


- Copies the contents of one file to another file.


------------------------------------------------------------
7. TRUNCATE FILE
------------------------------------------------------------

Synchronous:

fs.truncateSync(path, len)


Asynchronous:

fs.truncate(path, len, callback)


Promise:

fs.promises.truncate(path, len)


Example:

await fs.truncate("data.txt", 0);


- Changes the size of a file.

- If length is 0:

      File becomes empty.


Example:

Before:

Hello Node.js


truncate(..., 0)


After:

(empty file)


- If the specified length is smaller than the current size,
  the file is shortened.

- If the specified length is larger, the file can be extended.


============================================================
# FILE EXISTENCE / ACCESS
============================================================


------------------------------------------------------------
1. fs.existsSync()
------------------------------------------------------------

fs.existsSync(path)


Example:

if (fs.existsSync("data.txt")) {
    console.log("File exists");
}


- Synchronously checks whether a path exists.

- Returns:

      true
      false


IMPORTANT:

- existsSync() is synchronous.

- For detailed permission checking, use access/accessSync.


------------------------------------------------------------
2. fs.access()
------------------------------------------------------------

Asynchronous:

fs.access(path, mode, callback)


Promise:

fs.promises.access(path, mode)


Synchronous:

fs.accessSync(path, mode)


Example:

fs.access(
    "data.txt",
    fs.constants.R_OK,
    (err) => {

        if (err) {
            console.log("File cannot be read");
            return;
        }

        console.log("File is readable");

    }
);


Possible modes:

1. fs.constants.F_OK

   - Checks whether the path exists.


2. fs.constants.R_OK

   - Checks read permission.


3. fs.constants.W_OK

   - Checks write permission.


4. fs.constants.X_OK

   - Checks execute permission.


Multiple permissions can be combined:

fs.constants.R_OK | fs.constants.W_OK


IMPORTANT:

- access() does not return true/false.

- If access is successful:

      callback receives no error.


- If access fails:

      callback receives an error.


============================================================
# DIRECTORY OPERATIONS
============================================================


------------------------------------------------------------
1. CREATE DIRECTORY
------------------------------------------------------------

Synchronous:

fs.mkdirSync(path, options)


Asynchronous:

fs.mkdir(path, options, callback)


Promise:

fs.promises.mkdir(path, options)


Example:

await fs.mkdir("uploads");


Recursive:

await fs.mkdir(
    "uploads/images/profile",
    {
        recursive: true
    }
);


recursive: true

- Creates parent directories if they do not already exist.


------------------------------------------------------------
2. READ DIRECTORY
------------------------------------------------------------

Synchronous:

fs.readdirSync(path, options)


Asynchronous:

fs.readdir(path, options, callback)


Promise:

fs.promises.readdir(path, options)


Example:

const files = await fs.readdir("uploads");

console.log(files);


Result:

[
    "image.jpg",
    "data.txt",
    "index.js"
]


Using withFileTypes:

const entries = await fs.readdir(
    "uploads",
    {
        withFileTypes: true
    }
);


Now each result is a Dirent object.


Example:

for (const entry of entries) {

    console.log(entry.name);

    if (entry.isFile()) {
        console.log("FILE");
    }

    if (entry.isDirectory()) {
        console.log("DIRECTORY");
    }

}


------------------------------------------------------------
3. REMOVE DIRECTORY
------------------------------------------------------------

Older API:

fs.rmdir()
fs.rmdirSync()


Modern approach:

fs.rm()
fs.rmSync()


Promise:

fs.promises.rm()


Example:

await fs.rm("uploads");


For directory with contents:

await fs.rm(
    "uploads",
    {
        recursive: true,
        force: true
    }
);


IMPORTANT:

- rm() is the modern general-purpose removal API.

- rmdir() is mainly retained for compatibility/legacy usage.


------------------------------------------------------------
4. CREATE TEMPORARY DIRECTORY
------------------------------------------------------------

fs.mkdtemp()

fs.mkdtempSync()

fs.promises.mkdtemp()


Example:

const folder = await fs.mkdtemp("temp-");

console.log(folder);


- Creates a unique temporary directory.

- Useful for:

  - temporary processing
  - uploads
  - temporary files
  - caching
  - intermediate operations


------------------------------------------------------------
5. OPENDIR
------------------------------------------------------------

Promise:

fs.promises.opendir(path)


Example:

const dir = await fs.opendir("uploads");

for await (const dirent of dir) {

    console.log(dirent.name);

}


- Opens a directory for iteration.

- Useful when you want to iterate through directory
  entries efficiently.


============================================================
# FILE INFORMATION / METADATA
============================================================


------------------------------------------------------------
1. fs.stat()
------------------------------------------------------------

Synchronous:

fs.statSync(path)


Asynchronous:

fs.stat(path, callback)


Promise:

fs.promises.stat(path)


Example:

const stats = await fs.stat("data.txt");

console.log(stats);


Stats object provides information such as:

- size
- birthtime
- mtime
- ctime
- mode
- uid
- gid


Useful methods:

stats.isFile()

stats.isDirectory()

stats.isSymbolicLink()

stats.isBlockDevice()

stats.isCharacterDevice()

stats.isFIFO()

stats.isSocket()


Example:

const stats = await fs.stat("data.txt");

console.log(stats.size);

if (stats.isFile()) {
    console.log("This is a file");
}


------------------------------------------------------------
2. fs.lstat()
------------------------------------------------------------

fs.lstat()

fs.lstatSync()

fs.promises.lstat()


Difference:

stat()
    |
    └── follows symbolic links


lstat()
    |
    └── gives information about the symbolic link itself


Example:

const stats = await fs.lstat("mylink");

console.log(stats.isSymbolicLink());


------------------------------------------------------------
3. fs.realpath()
------------------------------------------------------------

fs.realpath()

fs.realpathSync()

fs.promises.realpath()


- Resolves a path to its absolute/canonical path.

Example:

const resolved = await fs.realpath("shortcut");

console.log(resolved);


Useful when:

- dealing with relative paths
- symbolic links
- canonical filesystem paths


------------------------------------------------------------
4. fs.readlink()
------------------------------------------------------------

fs.readlink()

fs.readlinkSync()

fs.promises.readlink()


- Reads the target stored inside a symbolic link.


Example:

const target = await fs.readlink("mylink");

console.log(target);


============================================================
# SYMBOLIC LINKS
============================================================

A symbolic link is a filesystem entry that points to
another file or directory.

Example:

original.txt
     ^
     |
   mylink


Node.js provides:

fs.symlink()

fs.symlinkSync()

fs.promises.symlink()


Example:

await fs.symlink(
    "original.txt",
    "mylink"
);


Now:

mylink

points to:

original.txt


Useful methods:

fs.symlink()
    -> create symbolic link

fs.readlink()
    -> read symbolic link target

fs.lstat()
    -> inspect the symbolic link itself

fs.stat()
    -> inspect the target


============================================================
# FILE PERMISSIONS
============================================================


------------------------------------------------------------
# fs.chmod()
------------------------------------------------------------

Used to change file/directory permissions.

Synchronous:

fs.chmodSync(path, mode)


Asynchronous:

fs.chmod(path, mode, callback)


Promise:

fs.promises.chmod(path, mode)


Example:

await fs.chmod(
    "data.txt",
    0o644
);


------------------------------------------------------------
# OCTAL PERMISSIONS
------------------------------------------------------------

Permission values:

4 = READ

2 = WRITE

1 = EXECUTE


Example:

7 = 4 + 2 + 1

Therefore:

7 = read + write + execute


------------------------------------------------------------

0o777

   Owner   Group   Others
     7       7       7

   rwx      rwx      rwx


------------------------------------------------------------

0o755

   Owner   Group   Others
     7       5       5

   rwx      r-x      r-x


Meaning:

Owner:
    read + write + execute

Group:
    read + execute

Others:
    read + execute


------------------------------------------------------------

0o644

   Owner   Group   Others
     6       4       4

   rw-      r--      r--


Meaning:

Owner:
    read + write

Group:
    read

Others:
    read


------------------------------------------------------------

0o600

   Owner   Group   Others
     6       0       0

   rw-      ---      ---


Meaning:

Owner:
    read + write

Group:
    no permission

Others:
    no permission


------------------------------------------------------------
# IMPORTANT
------------------------------------------------------------

0o777

   ↑   ↑   ↑
   |   |   |
   |   |   └── Others
   |   └────── Group
   └────────── Owner


0o

- "0o" indicates an octal number in JavaScript.


Permission calculation:

4 = read
2 = write
1 = execute


Example:

6 = 4 + 2

Therefore:

6 = read + write


Example:

5 = 4 + 1

Therefore:

5 = read + execute


Example:

7 = 4 + 2 + 1

Therefore:

7 = read + write + execute


------------------------------------------------------------
# COMMON PERMISSION VALUES
------------------------------------------------------------

0o777
    rwxrwxrwx

0o755
    rwxr-xr-x

0o644
    rw-r--r--

0o600
    rw-------

0o400
    r--------


NOTE:

- Exact permission behavior can depend on the operating system,
  filesystem, process privileges, and umask.


============================================================
# FILE OWNERSHIP
============================================================


------------------------------------------------------------
# fs.chown()
------------------------------------------------------------

Changes file ownership.

Asynchronous:

fs.chown(path, uid, gid, callback)


Synchronous:

fs.chownSync(path, uid, gid)


Promise:

fs.promises.chown(path, uid, gid)


Example:

await fs.chown(
    "data.txt",
    1000,
    1000
);


Parameters:

path
    -> file/directory path

uid
    -> user ID

gid
    -> group ID


NOTE:

- Ownership operations are OS/permission dependent.
- They are mainly relevant on Unix-like systems.


============================================================
# FILE DESCRIPTOR / OPENING FILES
============================================================


This is an important fs topic that was missing from the
previous notes.


------------------------------------------------------------
# fs.open()
------------------------------------------------------------

Used to open a file and obtain a file descriptor.


Callback:

fs.open(path, flags, callback)


Promise:

const handle = await fs.promises.open(
    path,
    "r"
);


A file descriptor is a number/handle that the operating
system uses to identify an opened file.


Example:

const fd = await fs.promises.open(
    "data.txt",
    "r"
);


console.log(fd);


Modern Promise API returns a FileHandle object.


Example:

const fileHandle = await fs.promises.open(
    "data.txt",
    "r"
);


await fileHandle.close();


------------------------------------------------------------
# COMMON FILE FLAGS
------------------------------------------------------------

"r"
    -> open for reading


"r+"
    -> open for reading and writing


"w"
    -> open for writing
    -> creates file if needed
    -> truncates existing file


"w+"
    -> read + write
    -> creates file
    -> truncates existing file


"a"
    -> append
    -> creates file if needed


"a+"
    -> read + append


"x"
    -> exclusive creation behavior


============================================================
# FILE HANDLE
============================================================

Promise-based fs.open() returns a FileHandle.

Example:

const fileHandle = await fs.open(
    "data.txt",
    "r"
);


FileHandle provides operations such as:

- read()
- write()
- close()
- stat()
- truncate()
- sync()
- datasync()
- readFile()
- writeFile()


Example:

await fileHandle.close();


IMPORTANT:

- Always close a file handle when it is no longer needed.


============================================================
# LOW-LEVEL READ / WRITE
============================================================


The fs module also provides lower-level operations using
file descriptors.


Examples:

fs.read()

fs.readSync()

fs.write()

fs.writeSync()


These are useful when you need more control over:

- file descriptors
- buffers
- positions
- offsets
- bytes


Most normal applications can use:

readFile()
writeFile()
streams
fs/promises


instead of low-level APIs.


============================================================
# STREAMS
============================================================


Streams are extremely important when working with large files.


------------------------------------------------------------
# WHY STREAMS?
------------------------------------------------------------

Suppose we have:

largefile.txt = 10 GB


Using:

fs.readFile()

means:

    10 GB file
        |
        v
    Load complete file
        |
        v
       RAM


This can consume a lot of memory.


With a stream:

    10 GB file
        |
        v
    chunk
        |
        v
    process
        |
        v
    next chunk
        |
        v
    process


Only a portion of the file is processed at a time.


------------------------------------------------------------
# fs.createReadStream()
------------------------------------------------------------

Creates a readable stream.


Example:

const readStream = fs.createReadStream(
    "largefile.txt",
    "utf8"
);


readStream.on("data", (chunk) => {

    console.log("Chunk:", chunk);

});


readStream.on("end", () => {

    console.log("Reading complete");

});


Common events:

"data"
    -> receives chunks


"end"
    -> no more data


"error"
    -> error occurred


"close"
    -> stream/file descriptor closed


------------------------------------------------------------
# fs.createWriteStream()
------------------------------------------------------------

Creates a writable stream.


Example:

const writeStream = fs.createWriteStream(
    "output.txt"
);


writeStream.write(
    "Hello\n"
);


writeStream.write(
    "Node.js\n"
);


writeStream.end(
    "Finished"
);


Useful for:

- large files
- logs
- continuous writing
- HTTP response/file processing
- copying data through streams


============================================================
# PIPE
============================================================


Readable streams can be connected to writable streams
using pipe().


Example:

const readStream =
    fs.createReadStream("large.txt");


const writeStream =
    fs.createWriteStream("copy.txt");


readStream.pipe(writeStream);


Flow:

large.txt
    |
    v
Read Stream
    |
    v
chunks
    |
    v
Write Stream
    |
    v
copy.txt


This is much more memory-efficient than loading the
entire large file into memory.


============================================================
# WATCHING FILE CHANGES
============================================================


------------------------------------------------------------
# fs.watch()
------------------------------------------------------------

Watches a file or directory for filesystem changes.


Example:

fs.watch(
    "data.txt",
    (eventType, filename) => {

        console.log(
            eventType,
            filename
        );

    }
);


Possible event types commonly include:

"rename"

"change"


IMPORTANT:

- Exact filesystem event behavior can vary between
  operating systems.


------------------------------------------------------------
# fs.watchFile()
------------------------------------------------------------

Uses polling to monitor a file.


Example:

fs.watchFile(
    "data.txt",
    (current, previous) => {

        console.log(
            current.mtime,
            previous.mtime
        );

    }
);


- It periodically checks the file.

- It is generally less efficient than fs.watch().


------------------------------------------------------------
# fs.unwatchFile()
------------------------------------------------------------

Stops watching a file monitored using watchFile().


Example:

fs.unwatchFile("data.txt");


============================================================
# PROMISE API
============================================================


Modern Node.js provides:

node:fs/promises


Example:

import fs from "node:fs/promises";


The Promise API provides asynchronous file-system
operations that return Promises.


This allows:

async/await

or:

.then()

.catch()


Example:

async function readData() {

    try {

        const data =
            await fs.readFile(
                "data.txt",
                "utf8"
            );

        console.log(data);

    } catch (error) {

        console.error(error);

    }

}


============================================================
# IMPORTANT fs/promises METHODS
============================================================


------------------------------------------------------------
# FILE METHODS
------------------------------------------------------------

fs.readFile()

    -> read file


fs.writeFile()

    -> write/overwrite file


fs.appendFile()

    -> append data


fs.rename()

    -> rename/move


fs.unlink()

    -> delete file


fs.copyFile()

    -> copy file


fs.truncate()

    -> change file size


fs.access()

    -> check accessibility


fs.stat()

    -> get metadata


fs.lstat()

    -> get metadata without following symlink


fs.realpath()

    -> resolve path


fs.readlink()

    -> read symbolic link


fs.symlink()

    -> create symbolic link


fs.chmod()

    -> change permissions


fs.chown()

    -> change ownership


fs.open()

    -> open file


------------------------------------------------------------
# DIRECTORY METHODS
------------------------------------------------------------

fs.mkdir()

    -> create directory


fs.readdir()

    -> read directory


fs.rm()

    -> remove file/directory


fs.mkdtemp()

    -> create temporary directory


fs.opendir()

    -> open directory for iteration


============================================================
# MODERN fs.rm()
============================================================


Instead of:

fs.rmdir()


Modern code commonly uses:

fs.rm()


Example:

await fs.rm(
    "myFolder",
    {
        recursive: true,
        force: true
    }
);


recursive: true

    -> remove directory contents recursively


force: true

    -> ignore certain missing-path errors


============================================================
# fs.cp()
============================================================


Another useful API that was missing from the previous notes.


fs.cp()

- Copies files and directories.


Promise:

await fs.cp(
    "source",
    "destination",
    {
        recursive: true
    }
);


This is useful when copying an entire directory.


Concept:

copyFile()
    -> primarily for a file


cp()
    -> can copy files/directories


============================================================
# fs.constants
============================================================


Node.js exposes filesystem-related constants.


Example:

fs.constants.R_OK

fs.constants.W_OK

fs.constants.X_OK

fs.constants.F_OK


Permission checking:

R_OK
    -> read


W_OK
    -> write


X_OK
    -> execute


F_OK
    -> existence/access check


============================================================
# ENCODING
============================================================


When reading/writing files, encoding determines how
binary data is represented as text.


Common encodings:

1. utf8
2. utf16le
3. latin1
4. ascii
5. base64
6. base64url
7. hex
8. buffer


------------------------------------------------------------
# UTF-8
------------------------------------------------------------

Most commonly used text encoding.


Supports:

- English
- Marathi
- Hindi
- Chinese
- Japanese
- emojis
- many other Unicode characters


Example:

fs.readFileSync(
    "data.txt",
    "utf8"
);


------------------------------------------------------------
# ASCII
------------------------------------------------------------

Represents a limited set of characters.

- Historically 7-bit character encoding.
- Node.js's "ascii" handling is related to its Buffer
  encoding behavior and should not be confused with
  full Unicode support.


------------------------------------------------------------
# BASE64
------------------------------------------------------------

Represents binary data as Base64 text.


Common use cases:

- transferring binary data as text
- encoding data
- data URLs


Example:

const data = fs.readFileSync(
    "image.png"
);

const base64 = data.toString(
    "base64"
);


------------------------------------------------------------
# HEX
------------------------------------------------------------

Represents binary data using hexadecimal characters.


Example:

const buffer =
    fs.readFileSync("data.txt");


console.log(
    buffer.toString("hex")
);


------------------------------------------------------------
# LATIN1
------------------------------------------------------------

Also called binary-style single-byte encoding in
Node.js Buffer APIs.


Useful in situations involving byte-oriented data,
but UTF-8 should normally be preferred for Unicode text.


------------------------------------------------------------
# UTF16LE
------------------------------------------------------------

Little-endian UTF-16 encoding.


Node.js supports this encoding as:

"utf16le"


------------------------------------------------------------
# BUFFER
------------------------------------------------------------

If no encoding is specified when reading a file,
Node.js normally returns a Buffer.


Example:

const data =
    await fs.readFile("image.png");


console.log(data);


data is a Buffer.


This is important for:

- images
- PDFs
- videos
- audio
- compressed files
- other binary data


============================================================
# BUFFER + fs
============================================================


Text file:

    File
     |
     v
   UTF-8
     |
     v
   String


Binary file:

    File
     |
     v
   Buffer
     |
     v
   binary data


Example:

const image =
    await fs.readFile(
        "image.png"
    );


console.log(
    Buffer.isBuffer(image)
);


Result:

true


============================================================
# CALLBACK ERROR HANDLING
============================================================


Most callback-based fs APIs follow:

callback(err, result)


Example:

fs.readFile(
    "data.txt",
    "utf8",
    (err, data) => {

        if (err) {

            console.error(
                err.message
            );

            return;
        }

        console.log(data);

    }
);


Pattern:

(err, data)


If successful:

err = null
data = file content


If failed:

err = Error
data may be undefined


============================================================
# PROMISE ERROR HANDLING
============================================================


With async/await:

try {

    const data =
        await fs.readFile(
            "data.txt",
            "utf8"
        );

} catch (error) {

    console.error(
        error.message
    );

}


With .then():

fs.readFile(
    "data.txt",
    "utf8"
)
.then(data => {

    console.log(data);

})
.catch(error => {

    console.error(error);

});


============================================================
# SYNCHRONOUS vs ASYNCHRONOUS
============================================================


Synchronous:

fs.readFileSync()


    JavaScript
        |
        v
   Start operation
        |
        v
       WAIT
        |
        v
   Operation complete
        |
        v
   Continue code


Asynchronous:

fs.readFile()


    JavaScript
        |
        v
   Start operation
        |
        v
   Continue execution
        |
        v
   Other work
        |
        v
   callback later


Promise:

fs.promises.readFile()


    Start operation
          |
          v
       Promise
          |
          v
    other work
          |
          v
     Promise settles
          |
          v
      await resumes


============================================================
# readFile() vs createReadStream()
============================================================


readFile():

- Reads the complete file.
- Stores the result in memory.
- Simple to use.
- Good for small/normal-sized files.


createReadStream():

- Reads file in chunks.
- Does not load the entire file at once.
- Better for large files.
- Supports streaming.


Example:

readFile:

    File
     |
     v
 Entire file
     |
     v
   Memory


createReadStream:

    File
     |
     v
   chunk
     |
     v
   chunk
     |
     v
   chunk
     |
     v
   process


============================================================
# writeFile() vs appendFile()
============================================================


writeFile():

    Existing content
          |
          v
      REPLACED
          |
          v
      New content


appendFile():

    Existing content
          |
          +
          |
      New content
          |
          v
      Combined content


Example:

writeFile:

Before:

Hello


writeFile("data.txt", "World")


After:

World


appendFile:

Before:

Hello


appendFile("data.txt", " World")


After:

Hello World


============================================================
# stat() vs lstat()
============================================================


stat():

- Follows symbolic links.
- Gives information about the target.


lstat():

- Does NOT follow the symbolic link.
- Gives information about the link itself.


Example:

link ---> original.txt


stat(link)

    -> information about original.txt


lstat(link)

    -> information about link


============================================================
# fs.watch() vs fs.watchFile()
============================================================


fs.watch():

- Uses operating-system file-system notifications
  where available.
- Generally preferred for watching changes.
- Behavior can vary by OS/filesystem.


fs.watchFile():

- Uses polling.
- Checks file metadata periodically.
- Generally less efficient.


============================================================
# fs.access() vs fs.existsSync()
============================================================


existsSync():

    Checks:

    "Does this path exist?"

    returns:

    true / false


access():

    Checks:

    "Can this path be accessed with
     the requested permission?"

    success:

    no error


    failure:

    error


============================================================
# FILE OPERATIONS SUMMARY
============================================================


READ:

fs.readFile()


WRITE:

fs.writeFile()


APPEND:

fs.appendFile()


RENAME / MOVE:

fs.rename()


DELETE FILE:

fs.unlink()


COPY FILE:

fs.copyFile()


CHANGE SIZE:

fs.truncate()


CHECK EXISTENCE:

fs.existsSync()


CHECK ACCESS:

fs.access()


GET METADATA:

fs.stat()


GET LINK METADATA:

fs.lstat()


RESOLVE PATH:

fs.realpath()


READ SYMLINK:

fs.readlink()


CREATE SYMLINK:

fs.symlink()


CHANGE PERMISSION:

fs.chmod()


CHANGE OWNER:

fs.chown()


OPEN FILE:

fs.open()


============================================================
# DIRECTORY OPERATIONS SUMMARY
============================================================


CREATE DIRECTORY:

fs.mkdir()


READ DIRECTORY:

fs.readdir()


REMOVE DIRECTORY:

fs.rm()


TEMP DIRECTORY:

fs.mkdtemp()


OPEN DIRECTORY:

fs.opendir()


COPY DIRECTORY:

fs.cp()


============================================================
# STREAM OPERATIONS SUMMARY
============================================================


READ STREAM:

fs.createReadStream()


WRITE STREAM:

fs.createWriteStream()


CONNECT STREAMS:

readStream.pipe(writeStream)


============================================================
# WATCH OPERATIONS SUMMARY
============================================================


WATCH:

fs.watch()


POLL WATCH:

fs.watchFile()


STOP POLL WATCH:

fs.unwatchFile()


============================================================
# IMPORTANT FILE SYSTEM CONCEPTS
============================================================


1. File

   - Stores data.


2. Directory

   - Container for files/directories.


3. File descriptor

   - OS-level identifier for an opened file.


4. Buffer

   - Represents raw binary data in Node.js.


5. Stream

   - Processes data incrementally in chunks.


6. Metadata

   - Information about a file such as size,
     timestamps, permissions, etc.


7. Symbolic link

   - A filesystem entry pointing to another path.


8. Permission

   - Determines who can read/write/execute.


9. Ownership

   - Determines the user/group associated with
     a filesystem object.


============================================================
# COMPLETE fs API CATEGORIES
============================================================


                     fs MODULE
                         |
        +----------------+----------------+
        |                |                |
      FILE            DIRECTORY        METADATA
        |                |                |
   readFile()          mkdir()         stat()
   writeFile()         readdir()       lstat()
   appendFile()        rm()            realpath()
   rename()            mkdtemp()       readlink()
   unlink()            opendir()
   copyFile()          cp()
   truncate()
   open()
   access()
   chmod()
   chown()
   symlink()
        |
        +-----------------------------+
        |
      STREAMS
        |
   createReadStream()
   createWriteStream()
        |
        +-----------------------------+
        |
      WATCHING
        |
   watch()
   watchFile()
   unwatchFile()


============================================================
# COMPLETE fs API STYLES
============================================================


                    fs
                     |
       +-------------+-------------+
       |             |             |
       v             v             v

   Synchronous    Callback       Promise
      API           API            API

       |             |             |
       v             v             v

 readFileSync()  readFile()   fs/promises
 writeFileSync() writeFile()  readFile()
 appendFileSync() ...         writeFile()
 ...                         appendFile()
                             ...


============================================================
# REAL-WORLD EXAMPLE
============================================================


A Node.js backend may use fs like this:


1. Application starts

        |
        v

2. Read configuration file

        |
        v

   fs.readFile()


3. User uploads a file

        |
        v

   createWriteStream()


4. Save uploaded file

        |
        v

   filesystem


5. Check file information

        |
        v

   fs.stat()


6. Move/rename file

        |
        v

   fs.rename()


7. Create backup

        |
        v

   fs.copyFile()


8. Delete temporary file

        |
        v

   fs.unlink()


9. Monitor configuration changes

        |
        v

   fs.watch()

   

============================================================
# COMPLETE PRACTICAL EXAMPLE
============================================================


import fs from "node:fs/promises";
import { constants } from "node:fs";

async function fileSystemDemo() {

    try {

        /*
        ----------------------------------------------------
        1. CREATE DIRECTORY
        ----------------------------------------------------
        */

        await fs.mkdir(
            "demo",
            {
                recursive: true
            }
        );


        /*
        ----------------------------------------------------
        2. WRITE FILE
        ----------------------------------------------------
        */

        await fs.writeFile(
            "demo/data.txt",
            "Hello Node.js",
            "utf8"
        );


        /*
        ----------------------------------------------------
        3. APPEND FILE
        ----------------------------------------------------
        */

        await fs.appendFile(
            "demo/data.txt",
            "\nLearning fs module",
            "utf8"
        );


        /*
        ----------------------------------------------------
        4. READ FILE
        ----------------------------------------------------
        */

        const data =
            await fs.readFile(
                "demo/data.txt",
                "utf8"
            );

        console.log(data);


        /*
        ----------------------------------------------------
        5. GET FILE INFORMATION
        ----------------------------------------------------
        */

        const stats =
            await fs.stat(
                "demo/data.txt"
            );

        console.log(
            "Size:",
            stats.size
        );


        /*
        ----------------------------------------------------
        6. CHECK ACCESS
        ----------------------------------------------------
        */

        await fs.access(
            "demo/data.txt",
            constants.R_OK |
            constants.W_OK
        );

        console.log(
            "File is readable and writable"
        );


        /*
        ----------------------------------------------------
        7. COPY FILE
        ----------------------------------------------------
        */

        await fs.copyFile(
            "demo/data.txt",
            "demo/backup.txt"
        );


        /*
        ----------------------------------------------------
        8. RENAME FILE
        ----------------------------------------------------
        */

        await fs.rename(
            "demo/backup.txt",
            "demo/backup-renamed.txt"
        );


        /*
        ----------------------------------------------------
        9. READ DIRECTORY
        ----------------------------------------------------
        */

        const entries =
            await fs.readdir(
                "demo",
                {
                    withFileTypes: true
                }
            );

        for (const entry of entries) {

            console.log(
                entry.name,
                entry.isDirectory()
                    ? "DIRECTORY"
                    : "FILE"
            );

        }


        /*
        ----------------------------------------------------
        10. DELETE FILE
        ----------------------------------------------------
        */

        await fs.unlink(
            "demo/backup-renamed.txt"
        );


        /*
        ----------------------------------------------------
        11. DELETE DIRECTORY
        ----------------------------------------------------
        */

        await fs.rm(
            "demo",
            {
                recursive: true,
                force: true
            }
        );


    } catch (error) {

        console.error(
            "Error:",
            error.message
        );

    }

}


fileSystemDemo();


============================================================
# IMPORTANT INTERVIEW QUESTIONS
============================================================


Q. What is fs in Node.js?

- fs is Node.js's built-in File System module.
- It allows applications to interact with files and
  directories.


Q. Is fs a third-party module?

- No.
- fs is a built-in/core Node.js module.
- No npm installation is required.


Q. What are the three ways to use fs?

1. Synchronous API
2. Callback-based asynchronous API
3. Promise-based asynchronous API


Q. What is the difference between readFile and
createReadStream?

- readFile reads the entire file into memory.
- createReadStream reads the file in chunks.
- Streams are better for large files.


Q. What is the difference between writeFile and appendFile?

- writeFile replaces existing content by default.
- appendFile adds content to existing content.


Q. What is the difference between stat and lstat?

- stat follows symbolic links.
- lstat does not follow symbolic links.


Q. What is fs/promises?

- fs/promises provides Promise-based asynchronous
  filesystem APIs.
- It works naturally with async/await.


Q. What is a Buffer?

- Buffer represents raw binary data in Node.js.


Q. Why are streams useful?

- Streams process data in chunks instead of loading
  the entire data into memory.


Q. What is a file descriptor?

- A file descriptor is an OS-level identifier used
  to refer to an opened file.


Q. What is chmod?

- chmod changes file/directory permissions.


Q. What is chown?

- chown changes file ownership.


Q. What is fs.watch?

- fs.watch monitors filesystem changes using filesystem
  notifications where available.


Q. What is fs.watchFile?

- fs.watchFile monitors a file using polling.


Q. What is fs.rm?

- fs.rm removes files or directories.
- With recursive: true, it can remove directory trees.


Q. What is fs.cp?

- fs.cp copies files and directories.


============================================================
# INTERVIEW-READY FINAL ANSWER
============================================================


Q. What is the fs module in Node.js?

- The fs (File System) module is a built-in Node.js module
  that provides APIs for interacting with the operating
  system's file system.

- It allows us to create, read, write, append, rename,
  copy and delete files, create and remove directories,
  read file metadata, modify permissions and ownership,
  create symbolic links, watch file changes, and process
  large files using streams.

- Node.js provides fs APIs in three major styles:

  1. Synchronous
  2. Callback-based asynchronous
  3. Promise-based asynchronous

- For example:

      fs.readFileSync()
      fs.readFile()
      fs/promises.readFile()


- Synchronous methods block execution, while asynchronous
  callback and Promise APIs allow Node.js applications to
  continue doing other work while filesystem operations
  are in progress.

- For large files, Node.js provides streams such as:

      fs.createReadStream()
      fs.createWriteStream()

  which process data in chunks instead of loading the
  entire file into memory.


============================================================
# FINAL FS CHECKLIST
============================================================

Your previous notes covered:

[✓] What is fs
[✓] Core module
[✓] readFile
[✓] writeFile
[✓] appendFile
[✓] rename
[✓] unlink
[✓] existsSync
[✓] access
[✓] copyFile
[✓] mkdir
[✓] rmdir
[✓] readdir
[✓] mkdtemp
[✓] stat
[✓] lstat
[✓] realpath
[✓] readlink
[✓] chmod
[✓] chown
[✓] fs.constants
[✓] permissions
[✓] streams
[✓] createReadStream
[✓] createWriteStream
[✓] watch
[✓] watchFile
[✓] unwatchFile
[✓] fs/promises
[✓] async/await
[✓] encoding


IMPORTANT TOPICS THAT WERE MISSING / NEEDED EXPANSION:

[+] fs.rm()
[+] fs.cp()
[+] fs.open()
[+] File descriptors
[+] FileHandle
[+] File flags (r, w, a, r+, w+, a+)
[+] fs.read()
[+] fs.write()
[+] Symbolic links
[+] fs.symlink()
[+] pipe()
[+] Buffer + fs
[+] stat() vs lstat()
[+] readFile() vs createReadStream()
[+] existsSync() vs access()
[+] writeFile() vs appendFile()
[+] fs.watch() vs fs.watchFile()
[+] Directory Dirent objects
[+] Complete fs/promises API organization
[+] Modern rm() instead of relying on rmdir()


============================================================
# ONE IMPORTANT CORRECTION TO YOUR PREVIOUS NOTES
============================================================


Your previous fs/promises list had some methods mixed up.

CORRECT:

Read:

fs.readFile()


Write:

fs.writeFile()


Append:

fs.appendFile()


Delete:

fs.unlink()


Rename:

fs.rename()


Stat:

fs.stat()


Copy:

fs.copyFile()


Access:

fs.access()


Create directory:

fs.mkdir()


Read directory:

fs.readdir()


Remove directory/tree:

fs.rm()


Open directory:

fs.opendir()


Truncate:

fs.truncate()


Therefore, remember:

    READ      -> readFile()
    WRITE     -> writeFile()
    APPEND    -> appendFile()
    DELETE    -> unlink()
    RENAME    -> rename()
    COPY      -> copyFile()
    INFO      -> stat()
    ACCESS    -> access()
    DIRECTORY -> mkdir()
    LIST      -> readdir()
    REMOVE    -> rm()
    OPEN      -> open()
    LINK      -> symlink()
    PERMISSION-> chmod()
    OWNER     -> chown()
    SIZE      -> truncate()


============================================================
# FINAL MEMORY MAP
============================================================


                         NODE.JS fs
                             |
       +---------------------+----------------------+
       |                     |                      |
      FILE                DIRECTORY              OTHER
       |                     |                      |
       |                     |                      |
   readFile()             mkdir()              stat()
   writeFile()            readdir()             lstat()
   appendFile()            rm()                 access()
   rename()                mkdtemp()             chmod()
   unlink()                opendir()             chown()
   copyFile()              cp()                  realpath()
   truncate()                                    readlink()
   open()                                        symlink()
                                                watch()
                                                watchFile()
       |
       +---------------------+
       |
     STREAMS
       |
   createReadStream()
   createWriteStream()
       |
       v
      pipe()
       |
       v
   Large-file processing


============================================================
# MOST IMPORTANT FS TOPICS FOR NODE.JS INTERVIEW
============================================================

If you are preparing for a Node.js interview, prioritize
these topics:

1. What is fs?
2. Synchronous vs asynchronous fs
3. readFile vs readFileSync
4. writeFile vs appendFile
5. unlink
6. rename
7. copyFile
8. mkdir / readdir / rm
9. stat vs lstat
10. access
11. chmod and 0o permissions
12. Buffer
13. Streams
14. createReadStream
15. createWriteStream
16. pipe()
17. fs/promises
18. fs.open and file descriptors
19. Symbolic links
20. fs.watch
21. fs.rm
22. fs.cp
23. Error handling
24. File encoding
25. Large-file handling


/*
============================================================
END OF COMPLETE fs MODULE NOTES
============================================================
*/


/*
============================================================
# NODE.JS FILE SYSTEM (fs) + STREAMS
============================================================

1. What is fs module?
2. Why use fs module?
3. Three fs APIs
   ├── Synchronous API
   ├── Callback-based Asynchronous API
   └── Promise-based Asynchronous API

4. File Operations
   ├── read
   ├── write
   ├── append
   ├── rename
   ├── delete
   ├── copy
   ├── access
   └── truncate

5. Directory Operations
   ├── mkdir
   ├── readdir
   ├── rmdir
   ├── rm
   ├── mkdtemp
   └── opendir

6. File Information / Metadata
   ├── stat
   ├── lstat
   ├── realpath
   ├── readlink
   ├── chmod
   └── chown

7. File Permissions
   ├── fs.constants.F_OK
   ├── fs.constants.R_OK
   ├── fs.constants.W_OK
   ├── fs.constants.X_OK
   ├── chmod()
   ├── octal permissions
   ├── owner / group / others
   └── 0o777, 0o755, 0o644, 0o600, etc.

8. Encoding
   ├── utf8
   ├── ascii
   ├── base64
   ├── hex
   ├── latin1
   ├── utf16le / ucs2
   └── buffer / binary concept

9. Streams
   ├── What is a stream?
   ├── Why streams?
   ├── Readable Stream
   ├── Writable Stream
   ├── createReadStream()
   ├── createWriteStream()
   ├── data event
   ├── end event
   ├── error event
   └── finish event

10. Pipe
    ├── stream.pipe()
    ├── Readable → Writable
    ├── why pipe?
    ├── automatic flow handling
    ├── backpressure
    └── pipe chaining

11. Types of Streams
    ├── Readable
    ├── Writable
    ├── Duplex
    └── Transform

12. File Watching
    ├── fs.watch()
    ├── fs.watchFile()
    ├── fs.unwatchFile()
    └── watcher.close()

13. fs/promises
    ├── readFile()
    ├── writeFile()
    ├── appendFile()
    ├── unlink()
    ├── rename()
    ├── copyFile()
    ├── stat()
    ├── access()
    ├── mkdir()
    ├── readdir()
    ├── rm()
    ├── opendir()
    └── truncate()

14. Important Differences
    ├── readFile vs createReadStream
    ├── writeFile vs appendFile
    ├── sync vs async
    ├── callback vs promises
    ├── watch vs watchFile
    ├── stat vs lstat
    ├── rm vs rmdir
    └── stream vs buffer

15. Interview Questions
    ├── What is fs?
    ├── sync vs async?
    ├── Why streams?
    ├── What is pipe()?
    ├── What is backpressure?
    ├── Types of streams?
    ├── readStream vs writeStream?
    ├── watch vs watchFile?
    ├── stat vs lstat?
    └── fs/promises vs callback API?

============================================================
# END
============================================================
*/