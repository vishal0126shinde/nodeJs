/*
============================================================
# fs/promises
============================================================

Q. What is fs/promises?

- Node.js provides a Promise-based API for file-system operations
  through:

  fs/promises

- It allows us to use:

  async/await

or:

  .then()
  .catch()

- This is often easier to read than callback-based APIs.

------------------------------------------------------------
CommonJS
------------------------------------------------------------

const fs = require("fs/promises");

------------------------------------------------------------
ES Module
------------------------------------------------------------

import fs from "fs/promises";

------------------------------------------------------------
# Why use fs/promises?
------------------------------------------------------------

Callback style:

fs.readFile("demo.txt", "utf8", (err, data) => {

  if (err) {
    console.error(err);
    return;
  }

  console.log(data);

});

Promise style:

const data =
  await fs.readFile("demo.txt", "utf8");

console.log(data);

- With async/await, multiple asynchronous operations can be
  written in a sequential-looking and readable way.


============================================================
# CORRECTION IN YOUR fs/promises METHODS
============================================================

- Some method names in the original notes were swapped.

Correct methods are:

READ
----

fs.readFile(path, options)


WRITE
-----

fs.writeFile(path, data, options)


APPEND
------

fs.appendFile(path, data, options)


DELETE
------

fs.unlink(path)


RENAME
------

fs.rename(oldPath, newPath)


STAT
----

fs.stat(path)


COPY
----

fs.copyFile(src, dest)


ACCESS
------

fs.access(path, mode)


DIRECTORY CREATE
---------------

fs.mkdir(path, options)


DIRECTORY READ
--------------

fs.readdir(path, options)


DIRECTORY REMOVE
----------------

fs.rm(path, options)

or:

fs.rmdir(path)

- `fs.rm()` is the modern, more flexible API.


OPEN DIRECTORY
--------------

fs.opendir(path, options)


TRUNCATE
--------

fs.truncate(path, len)


============================================================
# fs/promises — FILE OPERATIONS
============================================================

1. READ FILE
------------------------------------------------------------

const data =
  await fs.readFile("demo.txt", "utf8");

- Reads the contents of a file.
- Returns a Promise.
- `await` gives you the resolved file data.

------------------------------------------------------------
2. WRITE FILE
------------------------------------------------------------

await fs.writeFile(
  "demo.txt",
  "Hello Node.js",
  "utf8"
);

- Creates the file if it doesn't exist.
- If it exists, normally replaces its contents.

------------------------------------------------------------
3. APPEND FILE
------------------------------------------------------------

await fs.appendFile(
  "demo.txt",
  "\nNew content"
);

- Adds data to the end of the existing file.
- Creates the file if it doesn't exist.

------------------------------------------------------------
4. DELETE FILE
------------------------------------------------------------

await fs.unlink("demo.txt");

- Deletes the file.

------------------------------------------------------------
5. RENAME / MOVE
------------------------------------------------------------

await fs.rename(
  "old.txt",
  "new.txt"
);

- Renames a file.
- Can also move a file when the destination is on the same
  filesystem and the paths differ.

------------------------------------------------------------
6. FILE INFORMATION
------------------------------------------------------------

const stats =
  await fs.stat("demo.txt");

console.log(stats.size);

- Returns file metadata.

Examples:

stats.size
stats.mtime
stats.birthtime
stats.isFile()
stats.isDirectory()

------------------------------------------------------------
7. COPY FILE
------------------------------------------------------------

await fs.copyFile(
  "demo.txt",
  "demo_copy.txt"
);

- Copies one file to another location.

------------------------------------------------------------
8. ACCESS
------------------------------------------------------------

await fs.access(
  "demo.txt",
  fs.constants.R_OK
);

- Checks whether the file is readable.

- Important:

`fs.access()` resolves successfully if access is allowed.

If access fails, it rejects with an error.

============================================================
# DIRECTORY OPERATIONS — fs/promises
============================================================

1. mkdir()
------------------------------------------------------------

await fs.mkdir(
  "demoDir/subDir",
  {
    recursive: true
  }
);

- Creates a directory.

- `recursive: true` allows parent directories to be created
  automatically.

Example:

demoDir/subDir

If `demoDir` doesn't exist:

demoDir
  └── subDir

will be created.

------------------------------------------------------------
2. readdir()
------------------------------------------------------------

const files =
  await fs.readdir("demoDir");

console.log(files);

- Returns the names of files/directories inside the directory.

------------------------------------------------------------
Using withFileTypes
------------------------------------------------------------

const entries =
  await fs.readdir(
    "demoDir",
    { withFileTypes: true }
  );

for (const entry of entries) {

  console.log(
    entry.name,
    entry.isDirectory()
      ? "DIR"
      : "FILE"
  );

}

- `withFileTypes: true` returns `Dirent` objects instead of just
  strings.

------------------------------------------------------------
3. rm()
------------------------------------------------------------

await fs.rm(
  "demoDir",
  {
    recursive: true,
    force: true
  }
);

- Removes a file or directory.

- `recursive: true`
  → removes contents recursively.

- `force: true`
  → ignores certain errors such as a missing path.

------------------------------------------------------------
4. opendir()
------------------------------------------------------------

const dir =
  await fs.opendir("demoDir");

for await (const dirent of dir) {

  console.log(dirent.name);

}

- Opens a directory for iteration.

- `for await...of` allows entries to be processed asynchronously.

------------------------------------------------------------
5. truncate()
------------------------------------------------------------

await fs.truncate(
  "demo.txt",
  0
);

- Changes the size of a file.

- When length is `0`, the file becomes empty.

Example:

Before:

Hello Node.js

After:

""

============================================================
# fs/promises + async/await — COMPLETE EXAMPLE
============================================================

import fs from "fs/promises";
import { constants } from "fs";

async function fileAndDirectoryDemo() {

  try {

    console.log("===== FILE OPERATIONS =====");

    // 1. WRITE
    await fs.writeFile(
      "demo.txt",
      "Hello Node.js",
      "utf8"
    );

    console.log("File written");


    // 2. APPEND
    await fs.appendFile(
      "demo.txt",
      "\nAppending new content",
      "utf8"
    );

    console.log("File appended");


    // 3. READ
    const data =
      await fs.readFile(
        "demo.txt",
        "utf8"
      );

    console.log(
      "File content:\n",
      data
    );


    // 4. STAT
    const stats =
      await fs.stat("demo.txt");

    console.log(
      "File size:",
      stats.size,
      "bytes"
    );


    // 5. COPY
    await fs.copyFile(
      "demo.txt",
      "demo_copy.txt"
    );

    console.log("File copied");


    // 6. RENAME
    await fs.rename(
      "demo_copy.txt",
      "demo_renamed.txt"
    );

    console.log("File renamed");


    // 7. ACCESS
    await fs.access(
      "demo.txt",
      constants.R_OK |
      constants.W_OK
    );

    console.log(
      "File is readable & writable"
    );


    // 8. TRUNCATE
    await fs.truncate(
      "demo_renamed.txt",
      0
    );

    console.log(
      "File truncated"
    );


    // 9. DELETE
    await fs.unlink(
      "demo_renamed.txt"
    );

    console.log(
      "File deleted"
    );


    console.log(
      "\n===== DIRECTORY OPERATIONS ====="
    );


    // 10. CREATE DIRECTORY
    await fs.mkdir(
      "demoDir/subDir",
      {
        recursive: true
      }
    );

    console.log(
      "Directory created"
    );


    // 11. READ DIRECTORY
    const entries =
      await fs.readdir(
        "demoDir",
        {
          withFileTypes: true
        }
      );

    for (const entry of entries) {

      console.log(
        entry.name,
        entry.isDirectory()
          ? "DIR"
          : "FILE"
      );

    }


    // 12. OPEN DIRECTORY
    const dir =
      await fs.opendir("demoDir");

    for await (
      const dirent of dir
    ) {

      console.log(
        "Dirent:",
        dirent.name
      );

    }


    // 13. REMOVE DIRECTORY
    await fs.rm(
      "demoDir",
      {
        recursive: true,
        force: true
      }
    );

    console.log(
      "Directory removed"
    );


  } catch (error) {

    console.error(
      "Error:",
      error.message
    );

  }

}


// Start the asynchronous function
fileAndDirectoryDemo();


*/