/*
============================================================
# INBUILT / CORE MODULES IN NODE.JS
============================================================

- Node.js provides several modules as part of the Node.js
  runtime itself.

- These are called:

    Core Modules
    or
    Built-in Modules

- They are already included with Node.js.

- Therefore, we do NOT need to install them separately
  using npm.

Examples:

    1. path
    2. os
    3. fs
    4. http
    5. events
    6. crypto
    7. stream
    etc.


------------------------------------------------------------
Example
------------------------------------------------------------

const path = require("path");

- `path` is already provided by Node.js.

- We don't need:

    npm install path

- For a built-in module, we can directly use:

    require("path")


============================================================
# PATH MODULE
============================================================


Q. What is the Path Module in Node.js?
------------------------------------------------------------

- The `path` module is a built-in Node.js module that
  provides utilities for working with file and directory
  paths.

- It helps us create, analyze, transform, and manipulate
  file-system paths.

- Since `path` is a core Node.js module:

    - No installation is required.
    - No third-party package is required.


Example:

    const path = require("path");


------------------------------------------------------------
Why do we need the path module?
------------------------------------------------------------

- Different operating systems use different path separators.

Windows:

    C:\Users\Vishal\project\app.js

Linux / macOS:

    /Users/Vishal/project/app.js


- If we manually create paths using strings, our code can
  become OS-dependent.

Example:

    "folder/" + "file.txt"


- The `path` module provides utilities that help Node.js
  work with paths in a platform-aware way.


Example:

    path.join("folder", "file.txt");


Conceptually:

    Windows
        ↓
    folder\file.txt


    Linux/macOS
        ↓
    folder/file.txt


- This makes path-related code more portable.


============================================================
# IMPORTING THE PATH MODULE
============================================================

CommonJS:

    const path = require("path");


ES Module:

    import path from "node:path";


- In modern Node.js, using the `node:` prefix explicitly
  identifies a built-in Node.js module:

    import path from "node:path";

- Similarly:

    const path = require("node:path");


============================================================
# IMPORTANT NODE.JS PATH VARIABLES
============================================================

In CommonJS modules, Node.js provides:

    1. __filename
    2. __dirname


These are NOT methods of the path module.

They are CommonJS module-specific variables.


------------------------------------------------------------
1. __filename
------------------------------------------------------------

- `__filename` represents the absolute path of the current
  CommonJS module file.

Example:

    console.log(__filename);


If the file is:

    D:\project\src\app.js


then conceptually:

    __filename
         |
         v
    D:\project\src\app.js


- It includes:

    Drive
    Directories
    File name
    Extension


------------------------------------------------------------
2. __dirname
------------------------------------------------------------

- `__dirname` represents the absolute path of the directory
  containing the current CommonJS module.

If:

    __filename

is:

    D:\project\src\app.js


then:

    __dirname

is:

    D:\project\src


Difference:

    __filename
        ↓
    Complete path + file name


    __dirname
        ↓
    Directory path only


------------------------------------------------------------
IMPORTANT
------------------------------------------------------------

- `__filename` and `__dirname` are available directly in
  CommonJS modules.

- They are NOT methods of the `path` module.

- In ES Modules, `__filename` and `__dirname` are not
  provided in the same CommonJS way.


============================================================
# PATH MODULE METHODS
============================================================

The `path` module provides several useful methods and
properties for manipulating paths.


------------------------------------------------------------
1. path.parse()
------------------------------------------------------------

Q. What does path.parse() do?
------------------------------------------------------------

- `path.parse()` breaks a path into its individual
  components.

Syntax:

    path.parse(path)


Example:

    const path = require("path");

    const result = path.parse(
        "/home/user/project/app.js"
    );

    console.log(result);


Conceptually, the result contains:

    {
        root: "/",
        dir: "/home/user/project",
        base: "app.js",
        ext: ".js",
        name: "app"
    }


Meaning:

    root
      ↓
    Root of the path

    dir
      ↓
    Directory portion

    base
      ↓
    File name + extension

    ext
      ↓
    File extension

    name
      ↓
    File name without extension


Visual:

    /home/user/project/app.js
    |   |               |
    |   |               +--> base = app.js
    |   |
    |   +------------------> dir
    |
    +----------------------> root


------------------------------------------------------------
2. path.join()
------------------------------------------------------------

Q. What does path.join() do?
------------------------------------------------------------

- `path.join()` joins multiple path segments into a single
  path.

Syntax:

    path.join(...paths)


Example:

    const result = path.join(
        "users",
        "vishal",
        "documents",
        "file.txt"
    );


Result conceptually:

    users/vishal/documents/file.txt


- On Windows, Node.js uses the appropriate Windows
  separator.

- `path.join()` also normalizes the resulting path.


Example:

    path.join("users", "vishal", "..", "file.txt");


Conceptually:

    users/vishal/../file.txt
                    |
                    v
    users/file.txt


------------------------------------------------------------
IMPORTANT:
join() vs simple string concatenation
------------------------------------------------------------

Instead of:

    "users/" + "vishal/" + "file.txt"


Prefer:

    path.join("users", "vishal", "file.txt");


Because `path.join()` handles separators correctly for the
current platform.


============================================================
# 3. path.resolve()
============================================================

Q. What does path.resolve() do?
------------------------------------------------------------

- `path.resolve()` resolves a sequence of path segments into
  an absolute path.

Syntax:

    path.resolve(...paths)


Example:

    const result = path.resolve(
        "users",
        "vishal",
        "file.txt"
    );


If the current working directory is:

    D:\project


the result could conceptually be:

    D:\project\users\vishal\file.txt


------------------------------------------------------------
Important difference:
join() vs resolve()
------------------------------------------------------------

    path.join()
        ↓
    Joins path segments


    path.resolve()
        ↓
    Produces an absolute path


Example:

    path.join("folder", "file.txt");

    folder/file.txt


    path.resolve("folder", "file.txt");

    /current/directory/folder/file.txt


Memory trick:

    JOIN
      =
    Combine paths


    RESOLVE
      =
    Find absolute path


============================================================
# 4. path.extname()
============================================================

Q. What does path.extname() do?
------------------------------------------------------------

- `path.extname()` returns the extension of a file path.

Syntax:

    path.extname(path)


Example:

    path.extname("app.js");


Result:

    ".js"


Another example:

    path.extname("image.png");

Result:

    ".png"


Another:

    path.extname("document.pdf");

Result:

    ".pdf"


Example:

    const extension = path.extname(
        "/project/src/app.js"
    );

    console.log(extension);

    // .js


------------------------------------------------------------
What about a file without an extension?
------------------------------------------------------------

    path.extname("README");

Result:

    ""


============================================================
# 5. path.basename()
============================================================

Q. What does path.basename() do?
------------------------------------------------------------

- `path.basename()` returns the last portion of a path.

Usually, this means the file name.

Example:

    path.basename(
        "/home/user/project/app.js"
    );


Result:

    "app.js"


Visual:

    /home/user/project/app.js
                       |
                       v
                    basename
                       |
                       v
                    app.js


------------------------------------------------------------
Removing the extension
------------------------------------------------------------

`path.basename()` can also accept an extension to remove.

Example:

    path.basename(
        "/home/user/project/app.js",
        ".js"
    );


Result:

    "app"


============================================================
# 6. path.dirname()
============================================================

Q. What does path.dirname() do?
------------------------------------------------------------

- `path.dirname()` returns the directory portion of a path.

Example:

    path.dirname(
        "/home/user/project/app.js"
    );


Result:

    "/home/user/project"


Visual:

    /home/user/project/app.js
    |                  |
    |                  +--> app.js
    |
    +---------------------> dirname


Compare:

    path.basename()
        ↓
    app.js


    path.dirname()
        ↓
    /home/user/project


============================================================
# 7. path.sep
============================================================

Q. What is path.sep?
------------------------------------------------------------

- `path.sep` gives the platform-specific path separator.

On Windows:

    path.sep

    \


On Linux/macOS:

    path.sep

    /


Example:

    console.log(path.sep);


Conceptually:

    Windows
       ↓
    \


    Linux/macOS
       ↓
    /


------------------------------------------------------------
Why is this useful?
------------------------------------------------------------

- It allows code to work with the separator used by the
  current operating system.


Example:

    const fullPath =
        "folder" + path.sep + "file.txt";


============================================================
# 8. path.delimiter
============================================================

Q. What is path.delimiter?
------------------------------------------------------------

- `path.delimiter` gives the platform-specific delimiter
  used for lists of paths.

Windows:

    ;


POSIX systems such as Linux/macOS:

    :


Example:

    console.log(path.delimiter);


Windows:

    ;


Linux/macOS:

    :


------------------------------------------------------------
Important:
sep vs delimiter
------------------------------------------------------------

    path.sep
        ↓
    Separates parts of ONE path


Example:

    folder/file.txt


    path.delimiter
        ↓
    Separates MULTIPLE paths in a path list


Example conceptually:

    path1:path2:path3


On Windows:

    path1;path2;path3


============================================================
# 9. path.toNamespacedPath()
============================================================

Q. What does path.toNamespacedPath() do?
------------------------------------------------------------

- `path.toNamespacedPath()` converts a path to a
  Windows-specific namespace path when applicable.

Example:

    path.toNamespacedPath(path);


- It is mainly useful for Windows path handling and
  compatibility with Windows namespace paths.

- It is less commonly used in normal Node.js applications.

Important:

    Normal application
        ↓
    Usually don't need it


    Advanced Windows path handling
        ↓
    May be useful


============================================================
# 10. path.format()
============================================================

Q. What does path.format() do?
------------------------------------------------------------

- `path.format()` does approximately the reverse of
  `path.parse()`.

`path.parse()`:

    path string
        ↓
    path object


`path.format()`:

    path object
        ↓
    path string


Example:

    const pathObject = {
        dir: "/home/user/project",
        base: "app.js"
    };

    const result = path.format(pathObject);


Result:

    "/home/user/project/app.js"


------------------------------------------------------------
Remember:
------------------------------------------------------------

    parse()
       ↓
    String → Object


    format()
       ↓
    Object → String


============================================================
# 11. path.relative()
============================================================

Q. What does path.relative() do?
------------------------------------------------------------

- `path.relative(from, to)` returns the relative path from
  one location to another.

Syntax:

    path.relative(from, to)


Example:

    const result = path.relative(
        "/home/user/project/src",
        "/home/user/project/test"
    );


Result:

    "../test"


Why?

Starting from:

    /home/user/project/src

go one level up:

    /home/user/project

then go into:

    test


Therefore:

    ../test


Visual:

    project
       |
       +-- src
       |
       +-- test


From:

    src


To:

    test


Relative path:

    ../test


============================================================
# 12. path.isAbsolute()
============================================================

Q. What does path.isAbsolute() do?
------------------------------------------------------------

- `path.isAbsolute()` checks whether a path is absolute.

- It returns:

    true
    or
    false


Example:

    path.isAbsolute(
        "/home/user/app.js"
    );


Result:

    true


Relative path:

    path.isAbsolute(
        "src/app.js"
    );


Result:

    false


------------------------------------------------------------
Absolute path
------------------------------------------------------------

An absolute path starts from a root/location.

Example:

    /home/user/app.js


Windows:

    C:\Users\Vishal\app.js


------------------------------------------------------------
Relative path
------------------------------------------------------------

A relative path depends on another location/current
directory.

Example:

    ./app.js

    ../app.js

    src/app.js


============================================================
# 13. path.normalize()
============================================================

Q. What does path.normalize() do?
------------------------------------------------------------

- `path.normalize()` normalizes a path.

- It resolves unnecessary:

    .
    ..

and repeated separators where appropriate.

Example:

    path.normalize(
        "/home/user/project/./src/../app.js"
    );


Conceptually:

    /home/user/project/./src/../app.js
                       |    |
                       |    +--> go back
                       +-------> current directory
                                  |
                                  v

    /home/user/project/app.js


------------------------------------------------------------
Meaning of:
------------------------------------------------------------

    .
      =
    Current directory


    ..
      =
    Parent directory


Example:

    /project/src/../app.js


means:

    /project/app.js


============================================================
# PATH METHODS SUMMARY
============================================================

    path.parse()
        ↓
    Path string → path object


    path.format()
        ↓
    Path object → path string


    path.join()
        ↓
    Join path segments


    path.resolve()
        ↓
    Create absolute path


    path.basename()
        ↓
    Get last part of path


    path.dirname()
        ↓
    Get directory part


    path.extname()
        ↓
    Get extension


    path.relative()
        ↓
    Get relative path between two locations


    path.isAbsolute()
        ↓
    Check absolute path


    path.normalize()
        ↓
    Clean/normalize path


    path.sep
        ↓
    Platform path separator


    path.delimiter
        ↓
    Platform path-list delimiter


    path.toNamespacedPath()
        ↓
    Windows namespace path handling


============================================================
# COMPLETE PATH MODULE VISUALIZATION
============================================================

                         PATH MODULE
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
      Analyze              Build               Check
          |                   |                   |
          |                   |                   |
    +-----+------+       +----+-----+       +-----+------+
    |            |       |          |       |            |
    v            v       v          v       v            v
  parse()     basename  join()   resolve() isAbsolute  relative
             dirname
             extname


                         PATH MODULE
                              |
                              v
                     Manipulate paths
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
      normalize()          format()          platform
                                              properties
                                                 |
                                      +----------+----------+
                                      |                     |
                                      v                     v
                                   path.sep          path.delimiter


============================================================
# REAL-WORLD EXAMPLE
============================================================

Suppose we have:

    project/
    |
    +-- src/
    |    |
    |    +-- app.js
    |
    +-- files/
         |
         +-- data.txt


Inside `app.js`:

    const path = require("path");


------------------------------------------------------------
Get current file:
------------------------------------------------------------

    console.log(__filename);


------------------------------------------------------------
Get current directory:
------------------------------------------------------------

    console.log(__dirname);


------------------------------------------------------------
Create path to data.txt:
------------------------------------------------------------

    const filePath = path.join(
        __dirname,
        "..",
        "files",
        "data.txt"
    );


- This is much safer and more portable than manually writing
  Windows/Linux separators.


Conceptually:

    __dirname
        |
        v
    project/src
        |
        | .. 
        v
    project
        |
        | files
        v
    project/files/data.txt


============================================================
# PATH MODULE vs __dirname / __filename
============================================================

IMPORTANT DIFFERENCE:


    path
      ↓
    Built-in Node.js MODULE


    __dirname
      ↓
    CommonJS module-specific variable


    __filename
      ↓
    CommonJS module-specific variable


Example:

    const path = require("path");

    console.log(path.join(...));

    console.log(__dirname);

    console.log(__filename);


Here:

    path.join()
        ↓
    Method provided by path module


    __dirname
        ↓
    Current CommonJS module's directory


    __filename
        ↓
    Current CommonJS module's file path


============================================================
# INTERVIEW-READY ANSWER
============================================================

Q. What is the Path Module in Node.js?
------------------------------------------------------------

- The `path` module is a built-in Node.js module that
  provides utilities for working with file and directory
  paths.

- It helps us join, resolve, parse, format, normalize, and
  analyze paths in a platform-independent way.

- It is especially useful because different operating
  systems use different path separators.

- Commonly used methods include:

    path.join()
    path.resolve()
    path.parse()
    path.format()
    path.basename()
    path.dirname()
    path.extname()
    path.relative()
    path.isAbsolute()
    path.normalize()


- It also provides platform-specific properties such as:

    path.sep
    path.delimiter


- Since it is a built-in Node.js module, it does not need to
  be installed separately.


============================================================
# VERY SHORT INTERVIEW ANSWER
============================================================

- The Node.js `path` module is a built-in module used to
  work with file and directory paths.

- It provides utilities such as `join()`, `resolve()`,
  `parse()`, `basename()`, `dirname()`, `extname()`,
  `normalize()`, and `relative()`.

- It also handles platform-specific path differences,
  making path-related code more portable across Windows,
  Linux, and macOS.


============================================================
# MEMORY TRICK
============================================================

Remember the most important methods like this:

    JOIN
      ↓
    Combine paths


    RESOLVE
      ↓
    Absolute path


    PARSE
      ↓
    Path → Object


    FORMAT
      ↓
    Object → Path


    BASENAME
      ↓
    Last part / file name


    DIRNAME
      ↓
    Directory


    EXTNAME
      ↓
    Extension


    RELATIVE
      ↓
    Path from A → B


    ISABSOLUTE
      ↓
    true / false


    NORMALIZE
      ↓
    Clean path


============================================================
*/