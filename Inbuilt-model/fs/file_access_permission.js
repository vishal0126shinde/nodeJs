/*
============================================================
# fs.constants — File Access Permissions
============================================================

Q. What are the possible mode values of fs.access()?

Syntax:

fs.access(path, mode, callback);

- fs.access() checks whether a file or directory is accessible
  with the requested permission.

- The `mode` tells Node.js WHAT permission you want to check.

------------------------------------------------------------
1. fs.constants.F_OK
------------------------------------------------------------

- Checks whether the file or directory exists.

fs.access("demo.txt", fs.constants.F_OK, (err) => {
  if (err) {
    console.log("File does not exist");
  } else {
    console.log("File exists");
  }
});

- F_OK means:
  "Does this path exist?"

- It does NOT check read/write/execute permission.

------------------------------------------------------------
2. fs.constants.R_OK
------------------------------------------------------------

- Checks whether the current process has READ permission.

fs.access("demo.txt", fs.constants.R_OK, (err) => {
  if (err) {
    console.log("File is not readable");
  } else {
    console.log("File is readable");
  }
});

------------------------------------------------------------
3. fs.constants.W_OK
------------------------------------------------------------

- Checks whether the current process has WRITE permission.

fs.access("demo.txt", fs.constants.W_OK, (err) => {
  if (err) {
    console.log("File is not writable");
  } else {
    console.log("File is writable");
  }
});

------------------------------------------------------------
4. fs.constants.X_OK
------------------------------------------------------------

- Checks whether the current process has EXECUTE permission.

fs.access("script.sh", fs.constants.X_OK, (err) => {
  if (err) {
    console.log("File is not executable");
  } else {
    console.log("File is executable");
  }
});

- X_OK is mainly meaningful on systems that support executable
  permissions, such as Linux/macOS.

------------------------------------------------------------
Checking Multiple Permissions
------------------------------------------------------------

- You can combine permissions using the bitwise OR operator `|`.

Example:

fs.access(
  "demo.txt",
  fs.constants.R_OK | fs.constants.W_OK,
  (err) => {
    if (err) {
      console.log("File is not readable/writable");
    } else {
      console.log("File is readable and writable");
    }
  }
);

Meaning:

R_OK | W_OK

      ↓

Check READ permission
      +
Check WRITE permission

============================================================
# fs.chmod()
============================================================

Q. What is fs.chmod()?

- `fs.chmod()` is used to CHANGE the permissions of a file or
  directory.

Syntax:

fs.chmod(path, mode, callback);

Example:

fs.chmod("demo.txt", 0o644, (err) => {
  if (err) throw err;

  console.log("Permissions changed");
});

- `fs.access()` → checks permissions
- `fs.chmod()`  → changes permissions

IMPORTANT:

  access() → CHECK
  chmod()  → CHANGE

------------------------------------------------------------
# What is mode in chmod()?
------------------------------------------------------------

- The `mode` defines who can:
  - read
  - write
  - execute

- Node.js commonly uses UNIX-style permission values.

- Example:

  0o644
  means:

  Owner  → read + write
  Group  → read
  Others → read

------------------------------------------------------------
# Why 0o?
------------------------------------------------------------

- `0o` is JavaScript's prefix for an OCTAL number.

Example:

0o644

- This tells JavaScript:

  "644 is an octal number."

- File permissions traditionally use octal notation because each
  permission can be represented using three bits.

------------------------------------------------------------
# Permission Numeric Values
------------------------------------------------------------

READ    = 4
WRITE   = 2
EXECUTE = 1

These values can be added together.

Example:

4 + 2 = 6

Therefore:

6 = READ + WRITE

------------------------------------------------------------
# Permission Positions
------------------------------------------------------------

Example:

0o755

     7     5     5
     ↓     ↓     ↓
   Owner  Group Others

So:

0o755

Owner  → 7
Group  → 5
Others → 5

------------------------------------------------------------
# What does 7 mean?
------------------------------------------------------------

7 = 4 + 2 + 1

   4 → READ
   2 → WRITE
   1 → EXECUTE

Therefore:

7 = READ + WRITE + EXECUTE

Symbolically:

rwx

------------------------------------------------------------
# What does 5 mean?
------------------------------------------------------------

5 = 4 + 1

   4 → READ
   1 → EXECUTE

Therefore:

5 = READ + EXECUTE

Symbolically:

r-x

------------------------------------------------------------
# What does 6 mean?
------------------------------------------------------------

6 = 4 + 2

   4 → READ
   2 → WRITE

Therefore:

6 = READ + WRITE

Symbolically:

rw-

------------------------------------------------------------
# What does 4 mean?
------------------------------------------------------------

4 = READ

Symbolically:

r--

------------------------------------------------------------
# What does 0 mean?
------------------------------------------------------------

0 = No permission

Symbolically:

---

============================================================
# Individual Octal Permission Values
============================================================

1. 0o400
------------------------------------------------------------

- Read permission for OWNER.

0o400

Symbolic:

r--------

Meaning:

Owner  → READ
Group  → nothing
Others → nothing


2. 0o200
------------------------------------------------------------

- Write permission for OWNER.

0o200

Symbolic:

-w-------

Owner → WRITE


3. 0o100
------------------------------------------------------------

- Execute permission for OWNER.

0o100

Symbolic:

--x------

Owner → EXECUTE


4. 0o040
------------------------------------------------------------

- Read permission for GROUP.

0o040

Symbolic:

---r-----

Group → READ


5. 0o020
------------------------------------------------------------

- Write permission for GROUP.

0o020

Symbolic:

----w----

Group → WRITE


6. 0o010
------------------------------------------------------------

- Execute permission for GROUP.

0o010

Symbolic:

-----x---

Group → EXECUTE


7. 0o004
------------------------------------------------------------

- Read permission for OTHERS.

0o004

Symbolic:

------r--

Others → READ


8. 0o002
------------------------------------------------------------

- Write permission for OTHERS.

0o002

Symbolic:

-------w-

Others → WRITE


9. 0o001
------------------------------------------------------------

- Execute permission for OTHERS.

0o001

Symbolic:

--------x

Others → EXECUTE


============================================================
# Common Combined Permission Values
============================================================

1. 0o777
------------------------------------------------------------

0o777

Owner  → 7 → rwx
Group  → 7 → rwx
Others → 7 → rwx

Symbolic:

rwxrwxrwx

Meaning:

- Owner can read/write/execute
- Group can read/write/execute
- Others can read/write/execute


2. 0o755
------------------------------------------------------------

0o755

Owner  → 7 → rwx
Group  → 5 → r-x
Others → 5 → r-x

Symbolic:

rwxr-xr-x

Meaning:

- Owner → read + write + execute
- Group → read + execute
- Others → read + execute


3. 0o644
------------------------------------------------------------

0o644

Owner  → 6 → rw-
Group  → 4 → r--
Others → 4 → r--

Symbolic:

rw-r--r--

Meaning:

- Owner → read + write
- Group → read
- Others → read

This is a very common permission for regular files.


4. 0o600
------------------------------------------------------------

0o600

Owner  → 6 → rw-
Group  → 0 → ---
Others → 0 → ---

Symbolic:

rw-------

Meaning:

- Owner → read + write
- Group → no permission
- Others → no permission


5. 0o400
------------------------------------------------------------

0o400

Owner  → 4 → r--
Group  → 0 → ---
Others → 0 → ---

Symbolic:

r--------

Meaning:

- Owner → read only
- Group → no permission
- Others → no permission


============================================================
# Permission Calculation
============================================================

The three permission numbers are calculated using:

READ    = 4
WRITE   = 2
EXECUTE = 1

Example:

7 = 4 + 2 + 1
  = rwx

6 = 4 + 2
  = rw-

5 = 4 + 1
  = r-x

4 = 4
  = r--

3 = 2 + 1
  = -wx

2 = 2
  = -w-

1 = 1
  = --x

0 = 0
  = ---

============================================================
# Easy Way to Remember
============================================================

Permission:

READ    → 4
WRITE   → 2
EXECUTE → 1

Think:

     R   W   X
     4   2   1

Then combine them.

Example:

R + W + X

4 + 2 + 1 = 7

R + X

4 + 1 = 5

R + W

4 + 2 = 6


============================================================
# Complete 0o777 Breakdown
============================================================

0o777

      Owner    Group    Others
        ↓        ↓        ↓
        7        7        7

        7        7        7
        ↓        ↓        ↓
       rwx      rwx      rwx

Therefore:

0o777

=

rwxrwxrwx


============================================================
# Important Difference: access() vs chmod()
============================================================

fs.access()
------------

Purpose:

  CHECK permissions

Example:

fs.access(
  "demo.txt",
  fs.constants.R_OK,
  callback
);

Question:

  "Can I READ this file?"

------------------------------------------------------------

fs.chmod()
----------

Purpose:

  CHANGE permissions

Example:

fs.chmod(
  "demo.txt",
  0o644,
  callback
);

Question:

  "Set this file's permissions to 644."

------------------------------------------------------------

Easy Interview Answer:

  access() → checks
  chmod()  → changes


============================================================
# FINAL INTERVIEW SUMMARY
============================================================

Q. Explain fs permissions, streams, watchers and fs/promises.

- Node.js's `fs` module provides APIs for interacting with files
  and directories.

- `fs.access()` is used to CHECK whether a path exists or whether
  the current process has read, write, or execute access.

- `fs.chmod()` is used to CHANGE file or directory permissions.

- Permissions use values:

    READ    = 4
    WRITE   = 2
    EXECUTE = 1

- A permission such as:

    0o755

  means:

    Owner  → rwx
    Group  → r-x
    Others → r-x

- Streams allow Node.js to process large amounts of data in
  smaller chunks instead of loading everything into memory.

- `fs.createReadStream()` reads a file incrementally.

- `fs.createWriteStream()` writes data incrementally.

- `fs.watch()` monitors filesystem changes using OS-level
  facilities where available.

- `fs.watchFile()` monitors changes using polling.

- `fs.unwatchFile()` stops a `watchFile()` listener.

- For modern asynchronous file operations, Node.js provides
  `fs/promises`, which works naturally with `async/await` and
  Promise-based error handling.

- This makes file-system code cleaner and easier to maintain.
*/



/*
===========================================================
# FILE PERMISSIONS IN NODE.JS
===========================================================

Q. What are file permissions?

- File permissions define what different users are allowed
  to do with a file or directory.

- In Unix/Linux/macOS systems, permissions are divided into
  three categories:

  1. Owner
  2. Group
  3. Others

- Each category can have three basic permissions:

  r = Read
  w = Write
  x = Execute


-----------------------------------------------------------
# 1. BASIC PERMISSION TYPES
-----------------------------------------------------------

1. Read (r)
   - Numeric value = 4
   - Allows reading the contents of a file.

2. Write (w)
   - Numeric value = 2
   - Allows modifying the contents of a file.

3. Execute (x)
   - Numeric value = 1
   - For a file:
       Allows executing the file/program.

   - For a directory:
       Allows entering/traversing the directory.


-----------------------------------------------------------
# 2. PERMISSION NUMERIC VALUES
-----------------------------------------------------------

    Permission       Value

    Read (r)           4
    Write (w)          2
    Execute (x)        1
    No permission      0


Example:

    r-- = 4
    -w- = 2
    --x = 1

    rw- = 4 + 2 = 6
    r-x = 4 + 1 = 5
    -wx = 2 + 1 = 3
    rwx = 4 + 2 + 1 = 7


-----------------------------------------------------------
# 3. HOW OCTAL PERMISSIONS WORK
-----------------------------------------------------------

- Permissions are commonly represented using three digits.

Example:

    755

The three digits represent:

    7   5   5
    ↑   ↑   ↑
    │   │   └── Others
    │   └────── Group
    └────────── Owner


Therefore:

    755

    Owner  = 7
    Group  = 5
    Others = 5


-----------------------------------------------------------
# 4. WHY 7 MEANS rwx
-----------------------------------------------------------

- Remember:

    Read    = 4
    Write   = 2
    Execute = 1

- Therefore:

    7 = 4 + 2 + 1

    7 = rwx


So:

    7 → rwx
    6 → rw-
    5 → r-x
    4 → r--
    3 → -wx
    2 → -w-
    1 → --x
    0 → ---


-----------------------------------------------------------
# 5. COMPLETE OCTAL PERMISSION TABLE
-----------------------------------------------------------

    Decimal     Permission       Meaning

       0        ---              No permission
       1        --x              Execute only
       2        -w-              Write only
       3        -wx              Write + Execute
       4        r--              Read only
       5        r-x              Read + Execute
       6        rw-              Read + Write
       7        rwx              Read + Write + Execute


-----------------------------------------------------------
# 6. COMPLETE 3-DIGIT PERMISSION COMBINATIONS
-----------------------------------------------------------

Every permission combination from 000 to 777 can be
represented using three octal digits.

Examples:

    000
    001
    002
    003
    ...
    777


The first digit controls OWNER.

The second digit controls GROUP.

The third digit controls OTHERS.


Example:

    640

    Owner  = 6 = rw-
    Group  = 4 = r--
    Others = 0 = ---

    Result:

    rw-r-----


Example:

    751

    Owner  = 7 = rwx
    Group  = 5 = r-x
    Others = 1 = --x

    Result:

    rwxr-x--x


-----------------------------------------------------------
# 7. WHAT DOES 0o MEAN?
-----------------------------------------------------------

- In JavaScript, the prefix:

      0o

  means that the number is written in OCTAL notation.

Example:

    0o755
    0o644
    0o600

- Therefore:

    0o755

  is an octal number.

- Do NOT confuse:

    755

  with:

    0o755

- In JavaScript code, using 0o makes the intention clear.

Example:

    fs.chmodSync("file.txt", 0o644);


-----------------------------------------------------------
# 8. OWNER, GROUP AND OTHERS
-----------------------------------------------------------

Every permission set has three sections:

    OWNER | GROUP | OTHERS

Example:

    rwxr-xr--

    rwx | r-x | r--
    ↑     ↑     ↑
    │     │     └── Others
    │     └──────── Group
    └────────────── Owner


Owner:
- The user who owns the file.

Group:
- Users belonging to the file's group.

Others:
- Everyone else.


-----------------------------------------------------------
# 9. COMMON PERMISSION VALUES
-----------------------------------------------------------

1. 0o777

    rwxrwxrwx

    Owner  → rwx
    Group  → rwx
    Others → rwx

    Everyone has read, write and execute permission.

    NOTE:
    Giving 777 permissions is generally discouraged for
    security-sensitive files/directories.


2. 0o755

    rwxr-xr-x

    Owner  → rwx
    Group  → r-x
    Others → r-x

    Commonly used for executable files/directories.


3. 0o644

    rw-r--r--

    Owner  → rw-
    Group  → r--
    Others → r--

    Commonly used for normal files.


4. 0o600

    rw-------

    Owner  → rw-
    Group  → ---
    Others → ---

    Only the owner can read/write.


5. 0o400

    r--------

    Owner  → r--
    Group  → ---
    Others → ---

    Owner can only read.


6. 0o700

    rwx------

    Owner  → rwx
    Group  → ---
    Others → ---

    Only owner has full access.


7. 0o750

    rwxr-x---

    Owner  → rwx
    Group  → r-x
    Others → ---

    Owner has full access.
    Group can read/execute.
    Others have no access.


8. 0o640

    rw-r-----

    Owner  → rw-
    Group  → r--
    Others → ---

    Owner can read/write.
    Group can read.
    Others have no access.


9. 0o660

    rw-rw----

    Owner  → rw-
    Group  → rw-
    Others → ---

    Owner and group can read/write.
    Others have no access.


-----------------------------------------------------------
# 10. IMPORTANT PERMISSION COMBINATIONS
-----------------------------------------------------------

    0o000 → ---------
    0o001 → --------x
    0o002 → -------w-
    0o003 → -------wx
    0o004 → ------r--
    0o005 → ------r-x
    0o006 → ------rw-
    0o007 → ------rwx

    0o010 → -----x---
    0o020 → ----w----
    0o040 → ---r-----
    0o050 → ---r-x---
    0o060 → ---rw----
    0o070 → ---rwx---

    0o100 → --x------
    0o200 → -w-------
    0o400 → r--------
    0o500 → r-x------
    0o600 → rw-------
    0o700 → rwx------


-----------------------------------------------------------
# 11. INDIVIDUAL OCTAL PERMISSION BITS
-----------------------------------------------------------

OWNER:

    0o400 → Owner Read
    0o200 → Owner Write
    0o100 → Owner Execute


GROUP:

    0o040 → Group Read
    0o020 → Group Write
    0o010 → Group Execute


OTHERS:

    0o004 → Others Read
    0o002 → Others Write
    0o001 → Others Execute


-----------------------------------------------------------
# 12. HOW TO CALCULATE A PERMISSION
-----------------------------------------------------------

Example:

    rwxr-xr--

Step 1:

    Owner:

    rwx
    = 4 + 2 + 1
    = 7


Step 2:

    Group:

    r-x
    = 4 + 0 + 1
    = 5


Step 3:

    Others:

    r--

    = 4 + 0 + 0
    = 4


Therefore:

    rwxr-xr--

    = 754

    In Node.js:

    0o754


-----------------------------------------------------------
# 13. ANOTHER EXAMPLE
-----------------------------------------------------------

Suppose we want:

    Owner  → Read + Write
    Group  → Read
    Others → No permission


Owner:

    rw-
    = 4 + 2
    = 6


Group:

    r--
    = 4


Others:

    ---
    = 0


Therefore:

    640


Node.js:

    0o640


-----------------------------------------------------------
# 14. fs.chmod()
-----------------------------------------------------------

Q. What is fs.chmod()?

- fs.chmod() changes the permissions of a file or directory.

Syntax:

    fs.chmod(path, mode, callback);


Example:

    fs.chmod("example.txt", 0o644, (err) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log("Permissions changed");

    });


-----------------------------------------------------------
# 15. fs.chmodSync()
-----------------------------------------------------------

- Synchronous version of chmod.

Syntax:

    fs.chmodSync(path, mode);


Example:

    fs.chmodSync("example.txt", 0o600);

- This changes the permissions synchronously.


-----------------------------------------------------------
# 16. fs.promises.chmod()
-----------------------------------------------------------

- Promise-based version.

Example:

    await fs.chmod("example.txt", 0o600);


Using:

    import fs from "fs/promises";


Example:

    import fs from "fs/promises";

    await fs.chmod("example.txt", 0o600);


-----------------------------------------------------------
# 17. fs.access()
-----------------------------------------------------------

- fs.access() checks whether a file/directory is accessible
  with a particular permission.

Syntax:

    fs.access(path, mode, callback);


Available constants:

    fs.constants.F_OK
    fs.constants.R_OK
    fs.constants.W_OK
    fs.constants.X_OK


-----------------------------------------------------------
# 18. fs.constants.F_OK
-----------------------------------------------------------

    F_OK

- Checks whether the file exists / is accessible.

Example:

    fs.access("example.txt", fs.constants.F_OK, (err) => {

        if (err) {
            console.log("File does not exist");
        } else {
            console.log("File exists");
        }

    });


-----------------------------------------------------------
# 19. fs.constants.R_OK
-----------------------------------------------------------

    R_OK

- Checks read permission.

Example:

    fs.access("example.txt", fs.constants.R_OK, (err) => {

        if (err) {
            console.log("File is not readable");
        } else {
            console.log("File is readable");
        }

    });


-----------------------------------------------------------
# 20. fs.constants.W_OK
-----------------------------------------------------------

    W_OK

- Checks write permission.

Example:

    fs.access("example.txt", fs.constants.W_OK, (err) => {

        if (err) {
            console.log("File is not writable");
        } else {
            console.log("File is writable");
        }

    });


-----------------------------------------------------------
# 21. fs.constants.X_OK
-----------------------------------------------------------

    X_OK

- Checks execute permission.

Example:

    fs.access("example.sh", fs.constants.X_OK, (err) => {

        if (err) {
            console.log("File is not executable");
        } else {
            console.log("File is executable");
        }

    });


-----------------------------------------------------------
# 22. COMBINING ACCESS PERMISSIONS
-----------------------------------------------------------

- Permissions can be combined using bitwise OR:

    |


Example:

    fs.constants.R_OK | fs.constants.W_OK


Meaning:

    Check READ + WRITE access.


Example:

    fs.access(
        "example.txt",
        fs.constants.R_OK | fs.constants.W_OK,
        (err) => {

            if (err) {
                console.log("File is not readable/writable");
            } else {
                console.log("File is readable and writable");
            }

        }
    );


-----------------------------------------------------------
# 23. chmod vs access
-----------------------------------------------------------

fs.chmod():

    Changes permissions.


fs.access():

    Checks whether the requested access is available.


Example:

    chmod → "Give this file read/write permission."

    access → "Can I read/write this file?"


-----------------------------------------------------------
# 24. IMPORTANT: FILE PERMISSIONS VS DIRECTORY PERMISSIONS
-----------------------------------------------------------

The meaning of r/w/x is slightly different for directories.


For a FILE:

    r → Read file contents
    w → Modify file contents
    x → Execute file


For a DIRECTORY:

    r → List directory contents
    w → Create/delete/rename entries
    x → Enter/traverse the directory


This distinction is very important in Linux/Unix interviews.


-----------------------------------------------------------
# 25. DIRECTORY EXAMPLE
-----------------------------------------------------------

Suppose:

    directory = 0o755

    Owner  → rwx
    Group  → r-x
    Others → r-x


Owner can:

    - List contents
    - Create/delete entries
    - Enter directory


Group/Others can:

    - List contents
    - Enter/traverse directory

But they cannot create/delete entries because they do not
have write permission.


-----------------------------------------------------------
# 26. FILE EXAMPLE
-----------------------------------------------------------

Suppose:

    file = 0o644

    rw-r--r--

Owner:

    Read + Write


Group:

    Read


Others:

    Read


No execute permission is given.


-----------------------------------------------------------
# 27. UMASK
-----------------------------------------------------------

Q. What is umask?

- umask stands for "user file-creation mode mask".

- It controls which permission bits are removed when new
  files or directories are created.

- It does NOT directly set the final permission.

- Instead, it masks/removes permissions from the default
  creation mode.


Example commonly:

    File base permission:

        0o666

    umask:

        0o022

    Result:

        0o644


Directory base permission:

        0o777

    umask:

        0o022

    Result:

        0o755


-----------------------------------------------------------
# 28. UMASK CALCULATION
-----------------------------------------------------------

File:

    Base       = 666
    umask      = 022
    result     = 644


Meaning:

    Owner:
        6 → 6

    Group:
        6 - masked write → 4

    Others:
        6 - masked write → 4


Result:

    644


IMPORTANT:

- The exact behavior is permission-bit masking, not ordinary
  arithmetic subtraction.


-----------------------------------------------------------
# 29. CHECK CURRENT UMASK IN NODE.JS
-----------------------------------------------------------

Node.js provides:

    process.umask()


Example:

    console.log(process.umask());


You can also temporarily change it:

    process.umask(0o022);


NOTE:

- Changing the process umask affects permissions used when
  creating new files/directories in that Node.js process.


-----------------------------------------------------------
# 30. SPECIAL PERMISSIONS
-----------------------------------------------------------

Unix/Linux permissions have three additional special bits:

    1. setuid
    2. setgid
    3. sticky bit


These are beyond the normal:

    rwxrwxrwx


They occupy an additional leading octal digit.


Example:

    0o4755
    0o2755
    0o1777


-----------------------------------------------------------
# 31. SETUID
-----------------------------------------------------------

- setuid = Set User ID.

- Numeric value:

    4


Example:

    0o4755


The leading:

    4

represents setuid.


For executable files, setuid can cause the process to run
with the effective user identity of the file owner.


Symbolic representation often appears as:

    rws


instead of:

    rwx


depending on the execute bit.


IMPORTANT:

- setuid has security implications.
- It should only be used when required.


-----------------------------------------------------------
# 32. SETGID
-----------------------------------------------------------

- setgid = Set Group ID.

- Numeric value:

    2


Example:

    0o2755


The leading:

    2

represents setgid.


For executable files, it can cause the process to run with
the file's group identity.

For directories, setgid has an important behavior:

- Newly created files/directories inside the directory can
  inherit the directory's group.


-----------------------------------------------------------
# 33. STICKY BIT
-----------------------------------------------------------

- Sticky bit has numeric value:

    1


Example:

    0o1777


The leading:

    1

represents the sticky bit.


It is commonly used on shared directories such as:

    /tmp


The sticky bit restricts deletion/renaming of entries so
that users generally cannot remove another user's files
just because the directory itself is writable.


-----------------------------------------------------------
# 34. SPECIAL PERMISSION SUMMARY
-----------------------------------------------------------

    Leading digit

    4 → setuid
    2 → setgid
    1 → sticky bit


Example:

    0o4755

    4 → setuid
    755 → normal permissions


Example:

    0o2755

    2 → setgid
    755 → normal permissions


Example:

    0o1777

    1 → sticky bit
    777 → normal permissions


-----------------------------------------------------------
# 35. FOUR-DIGIT OCTAL PERMISSION
-----------------------------------------------------------

Normal:

    0755

    0 | 7 | 5 | 5
      |   |   |
      |   |   └── Others
      |   └────── Group
      └────────── Owner


Special:

    4755

    4 | 7 | 5 | 5
    ↑
    └── Special permission


Therefore:

    4 → setuid
    2 → setgid
    1 → sticky


-----------------------------------------------------------
# 36. SPECIAL PERMISSION + NORMAL PERMISSION
-----------------------------------------------------------

Example:

    0o4755

    4   7   5   5
    ↑   ↑   ↑   ↑
    │   │   │   └── Others
    │   │   └────── Group
    │   └────────── Owner
    └────────────── setuid


Example:

    0o2775

    2 → setgid
    775 → rwxrwxr-x


Example:

    0o1777

    1 → sticky bit
    777 → rwxrwxrwx


-----------------------------------------------------------
# 37. SYMBOLIC PERMISSION FORMAT
-----------------------------------------------------------

Linux often displays permissions like:

    -rwxr-xr--

The first character indicates the type:

    - → regular file
    d → directory
    l → symbolic link


Then:

    rwx | r-x | r--

    Owner | Group | Others


Example:

    -rw-r--r--


Means:

    -    → regular file
    rw-  → owner read/write
    r--  → group read
    r--  → others read


-----------------------------------------------------------
# 38. DIRECTORY SYMBOLIC EXAMPLE
-----------------------------------------------------------

    drwxr-xr-x


First:

    d

means directory.


Then:

    rwx | r-x | r-x

Owner:

    rwx


Group:

    r-x


Others:

    r-x


This corresponds to:

    0o755


-----------------------------------------------------------
# 39. SYMBOLIC SPECIAL PERMISSIONS
-----------------------------------------------------------

setuid:

    s


setgid:

    s


sticky bit:

    t


Examples can appear as:

    rwsr-xr-x

    rwxr-sr-x

    rwxrwxrwt


The exact position depends on whether the execute bit
is also set.


-----------------------------------------------------------
# 40. chmod SYMBOLIC MODE
-----------------------------------------------------------

chmod can also use symbolic notation.

Examples:

    u+r

    Add read permission for owner.


    u+w

    Add write permission for owner.


    u+x

    Add execute permission for owner.


    g+r

    Add read permission for group.


    o-r

    Remove read permission from others.


    a+x

    Add execute permission for everyone.


Where:

    u = user/owner
    g = group
    o = others
    a = all


-----------------------------------------------------------
# 41. chmod SYMBOLIC EXAMPLES
-----------------------------------------------------------

Example:

    fs.chmodSync("file.txt", "u+x");


Meaning:

    Add execute permission for owner.


Example:

    fs.chmodSync("file.txt", "g-w");


Meaning:

    Remove write permission from group.


Example:

    fs.chmodSync("file.txt", "o-r");


Meaning:

    Remove read permission from others.


Example:

    fs.chmodSync("file.txt", "a+r");


Meaning:

    Add read permission for everyone.


-----------------------------------------------------------
# 42. OCTAL vs SYMBOLIC chmod
-----------------------------------------------------------

Octal:

    fs.chmodSync("file.txt", 0o644);


Symbolic:

    fs.chmodSync("file.txt", "u=rw,g=r,o=r");


Both can represent:

    rw-r--r--


Octal is often preferred when you want to specify the
complete permission set explicitly.


-----------------------------------------------------------
# 43. chmod "=" OPERATOR
-----------------------------------------------------------

Example:

    u=rw


Means:

    Set owner's permissions exactly to read + write.


Example:

    u=rwx,g=rx,o=


Means:

    Owner  → rwx
    Group  → r-x
    Others → ---


Equivalent:

    0o750


-----------------------------------------------------------
# 44. chmod "+" AND "-"
-----------------------------------------------------------

"+" means add permission.

    u+x

Add execute permission to owner.


"-" means remove permission.

    u-x

Remove execute permission from owner.


"=" means set exact permissions.

    u=rwx

Set owner exactly to rwx.


-----------------------------------------------------------
# 45. fs.stat() AND PERMISSIONS
-----------------------------------------------------------

fs.stat() returns an fs.Stats object.

It contains metadata such as:

    stats.size
    stats.mode
    stats.uid
    stats.gid
    stats.mtime
    stats.ctime
    stats.atime


Example:

    const stats = fs.statSync("example.txt");

    console.log(stats.mode);


The mode contains file type and permission information.


-----------------------------------------------------------
# 46. stats.mode
-----------------------------------------------------------

Example:

    const stats = fs.statSync("example.txt");

    console.log(stats.mode.toString(8));


- toString(8) converts the number to octal representation.

Example output may look like:

    100644


The extra leading portion includes file-type bits.

The permission portion is:

    644


This is why you may see values larger than 777 when inspecting
stats.mode.


-----------------------------------------------------------
# 47. FILE TYPE + PERMISSION
-----------------------------------------------------------

The mode value contains more than just:

    rwxrwxrwx

It can contain:

    File type information
    +
    Permission bits
    +
    Special permission bits


Therefore:

    stats.mode

should not simply be treated as only the 3-digit permission.


-----------------------------------------------------------
# 48. COMMON NODE.JS EXAMPLE
-----------------------------------------------------------

const fs = require("fs");


// Give owner read/write permission.
// Give group read permission.
// Give others read permission.

fs.chmodSync("example.txt", 0o644);


// Check permissions.

const stats = fs.statSync("example.txt");

console.log(stats.mode.toString(8));


-----------------------------------------------------------
# 49. IMPORTANT SECURITY RULE
-----------------------------------------------------------

Avoid blindly using:

    0o777

especially on files/directories exposed to users or network
services.

Why?

Because:

    Owner  → read/write/execute
    Group  → read/write/execute
    Others → read/write/execute

This can give unnecessary access.

Prefer the minimum permissions required.


-----------------------------------------------------------
# 50. QUICK INTERVIEW TABLE
-----------------------------------------------------------

Permission:

    r = 4
    w = 2
    x = 1


Users:

    u = owner
    g = group
    o = others
    a = all


Special:

    4 = setuid
    2 = setgid
    1 = sticky


fs.access():

    F_OK = existence/access check
    R_OK = readable
    W_OK = writable
    X_OK = executable


Common permissions:

    777 → rwxrwxrwx
    755 → rwxr-xr-x
    750 → rwxr-x---
    700 → rwx------
    666 → rw-rw-rw-
    644 → rw-r--r--
    640 → rw-r-----
    600 → rw-------
    400 → r--------


-----------------------------------------------------------
# 51. MOST IMPORTANT INTERVIEW CONCEPT
-----------------------------------------------------------

Q. Explain 755.

Answer:

- 755 is an octal permission value.

- It contains three permission groups:

      7 | 5 | 5
      ↑   ↑   ↑
      │   │   └── Others
      │   └────── Group
      └────────── Owner

- 7 = 4 + 2 + 1 = rwx
- 5 = 4 + 0 + 1 = r-x
- 5 = 4 + 0 + 1 = r-x

Therefore:

    755 = rwxr-xr-x


-----------------------------------------------------------
# 52. MOST IMPORTANT INTERVIEW CONCEPT
-----------------------------------------------------------

Q. Explain 644.

Answer:

    6 | 4 | 4

    6 = 4 + 2 = rw-
    4 = r--
    4 = r--

Therefore:

    644 = rw-r--r--


Owner:

    Read + Write


Group:

    Read


Others:

    Read


-----------------------------------------------------------
# 53. MOST IMPORTANT INTERVIEW CONCEPT
-----------------------------------------------------------

Q. What is the difference between 755 and 644?

755:

    rwxr-xr-x

- Owner can read/write/execute.
- Group can read/execute.
- Others can read/execute.

644:

    rw-r--r--

- Owner can read/write.
- Group can read.
- Others can read.
- Nobody has execute permission.


-----------------------------------------------------------
# 54. INTERVIEW-READY ANSWER
-----------------------------------------------------------

Q. What are octal permissions in Node.js?

- Node.js can use Unix-style file permissions through APIs
  such as fs.chmod(), fs.chmodSync(), and fs.promises.chmod().

- Permissions are represented using octal values.

- The three main permission groups are:

    Owner
    Group
    Others

- The basic permission values are:

    Read    = 4
    Write   = 2
    Execute = 1

- These values are combined to create permissions.

Example:

    0o755

    7 = rwx
    5 = r-x
    5 = r-x

Therefore:

    0o755 = rwxr-xr-x

- Node.js also provides fs.access() and fs.constants such as
  F_OK, R_OK, W_OK and X_OK to check accessibility.


-----------------------------------------------------------
# 55. FINAL MEMORY MAP
-----------------------------------------------------------

                    FILE PERMISSIONS
                           |
          +----------------+----------------+
          |                |                |
        Owner            Group            Others
          |                |                |
        rwx              rwx              rwx
          |                |                |
        4 2 1            4 2 1            4 2 1


Basic values:

    r = 4
    w = 2
    x = 1


Octal:

    0o755
      |
      +-- Owner  = 7 = rwx
      +-- Group  = 5 = r-x
      +-- Others = 5 = r-x


Special permissions:

    4xxx → setuid
    2xxx → setgid
    1xxx → sticky bit


Node.js APIs:

    fs.access()
    fs.chmod()
    fs.chmodSync()
    fs.promises.chmod()
    fs.stat()
    fs.statSync()


Related concept:

    process.umask()


-----------------------------------------------------------
# FINAL ONE-LINE INTERVIEW ANSWER
-----------------------------------------------------------

- "In Node.js, Unix-style file permissions use octal values
  where 4 represents read, 2 represents write, and 1
  represents execute. The three digits represent owner,
  group, and others. For example, 0o755 means the owner has
  read/write/execute permission while group and others have
  read/execute permission."

*/