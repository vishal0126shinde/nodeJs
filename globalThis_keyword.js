/*
==========================================================
@ JAVASCRIPT / NODE.JS
==========================================================


Q. What is the use of the `globalThis` keyword in
   JavaScript or Node.js?
==========================================================

- `globalThis` is a standard way to access the global
  object in JavaScript.

- It provides a consistent way to access the global object
  regardless of the JavaScript environment.

- It works in:

    - Browser
    - Node.js
    - Web Workers
    - Other JavaScript environments


==========================================================
1. WHAT IS THE GLOBAL OBJECT?
==========================================================

- Every JavaScript environment has a global object.

- The global object contains values and functions that are
  available globally within that environment.


Examples:

Browser:

    window


Node.js:

    global


Modern JavaScript:

    globalThis


So:

    Browser
       |
       v
    window
       |
       v
    globalThis


    Node.js
       |
       v
    global
       |
       v
    globalThis


==========================================================
2. WHY DO WE NEED `globalThis`?
==========================================================

Before `globalThis`, different JavaScript environments
used different names for the global object.

Browser:

    window


Node.js:

    global


Web Workers:

    self


This created a problem when writing JavaScript code that
needed to work across different environments.

Instead of:

    if (browser) {
        window
    } else {
        global
    }


We can use:

    globalThis


Example:

    globalThis.myVariable = 100;


This can be accessed through `globalThis` in environments
that support it.


==========================================================
3. globalThis IN THE BROWSER
==========================================================

Example:

    console.log(globalThis === window);

Output:

    true


Because in a browser:

    globalThis
        |
        v
      window


Example:

    globalThis.myName = "Vishal";

    console.log(globalThis.myName);

Output:

    Vishal


==========================================================
4. globalThis IN NODE.JS
==========================================================

Example:

    console.log(globalThis === global);

Output:

    true


In Node.js:

    globalThis
        |
        v
      global


Example:

    globalThis.appName = "My Node App";

    console.log(globalThis.appName);

Output:

    My Node App


==========================================================
5. globalThis IS ENVIRONMENT-INDEPENDENT
==========================================================

The main advantage is:

    Same API
       |
       v
    globalThis
       |
       +---- Browser
       |
       +---- Node.js
       |
       +---- Web Worker
       |
       +---- Other JS environments


So we don't need environment-specific code just to
access the global object.


==========================================================
6. EXAMPLE — SHARED GLOBAL VALUE
==========================================================

Example:

    globalThis.appName = "My Application";

    console.log(globalThis.appName);


Output:

    My Application


Another part of the program can access:

    console.log(globalThis.appName);


Output:

    My Application


The value is attached to the global object.


==========================================================
7. EXAMPLE — CHECK WHETHER A GLOBAL API EXISTS
==========================================================

`globalThis` can also be useful when checking whether
a global API exists.

Example:

    if (globalThis.fetch) {
        console.log("fetch is available");
    }


Or:

    if (typeof globalThis.fetch === "function") {
        console.log("fetch is available");
    }


This avoids directly referencing an identifier that may
not exist in a particular environment.


==========================================================
8. globalThis vs window vs global
==========================================================


+-------------+-----------------------------+
| Name        | Environment                 |
+-------------+-----------------------------+
| window      | Browser                     |
| global      | Node.js                     |
| self        | Web Workers / browser      |
| globalThis  | Standard cross-environment |
+-------------+-----------------------------+


Example:

    Browser:

    globalThis === window
    // true


    Node.js:

    globalThis === global
    // true


==========================================================
9. globalThis vs GLOBAL SCOPE
==========================================================

IMPORTANT:

- `globalThis` refers to the global object.

- But a variable declared with `let`, `const`, or `class`
  does not automatically become a property of the global
  object in the same way as a `var` declaration in some
  global contexts.

Example:

    let x = 10;

    console.log(globalThis.x);


The result is generally:

    undefined


But:

    globalThis.x = 10;

    console.log(globalThis.x);


Output:

    10


Therefore:

    globalThis.x = 10;


explicitly creates/accesses a property on the global object.


==========================================================
10. NODE.JS EXAMPLE
==========================================================

Example:

    globalThis.config = {
        environment: "development",
        port: 3000
    };


    console.log(
        globalThis.config.environment
    );


Output:

    development


    console.log(
        globalThis.config.port
    );


Output:

    3000


==========================================================
11. SHOULD WE USE globalThis FOR EVERYTHING?
==========================================================

NO.

- Although `globalThis` allows global state, creating many
  global variables is generally not recommended.

Avoid:

    globalThis.user = {};
    globalThis.database = {};
    globalThis.config = {};
    globalThis.data = [];


Why?

    - Global state can be modified from many places.
    - It becomes difficult to track where values changed.
    - It can create naming conflicts.
    - It makes testing harder.
    - It increases coupling between modules.


Prefer:

    - Modules
    - Functions
    - Classes
    - Dependency injection
    - Explicit configuration


Use `globalThis` when there is a genuine reason to work
with a global environment-level value or API.


==========================================================
12. globalThis vs global IN NODE.JS
==========================================================

Older / Node-specific:

    global


Standard JavaScript:

    globalThis


Example:

    console.log(global === globalThis);

Output:

    true


`global` is Node.js-specific.

`globalThis` is the standard cross-environment API.


Therefore, if you want code that can work across
JavaScript environments:

    Prefer:

    globalThis


==========================================================
13. globalThis vs window IN BROWSER
==========================================================

Browser-specific:

    window


Standard:

    globalThis


Example:

    console.log(window === globalThis);

Output:

    true


Using:

    globalThis


makes code more portable because it does not depend
specifically on the browser's `window` name.


==========================================================
14. SIMPLE VISUALIZATION
==========================================================


                 JavaScript
                     |
                     v
                globalThis
                     |
          +----------+----------+
          |                     |
          v                     v
       Browser               Node.js
          |                     |
          v                     v
       window                 global


Therefore:

    Browser:

    globalThis === window
              |
             true


    Node.js:

    globalThis === global
              |
             true


==========================================================
15. REAL-WORLD USE CASE
==========================================================

One useful case is checking for an environment feature.

Example:

    if (typeof globalThis.fetch === "function") {

        console.log(
            "Fetch API is available"
        );

    }


This can be useful when the same JavaScript code may run
in different environments.


==========================================================
16. SHORT ANSWER
==========================================================

Q. What is the use of globalThis?

Answer:

"`globalThis` provides a standard and environment-independent
way to access the global object in JavaScript. 

In browsers, `globalThis` refers to the same global object
as `window`, while in Node.js it refers to the same global
object as `global`.

It is useful when writing JavaScript code that needs to
access global APIs or values without depending on an
environment-specific name."


==========================================================
17. INTERVIEW ONE-LINER
==========================================================

"`globalThis` is the standard cross-environment way to
access the global object in JavaScript."


==========================================================
18. EASY EXAMPLE TO REMEMBER
==========================================================

    globalThis.name = "Vishal";

    console.log(globalThis.name);


Output:

    Vishal


Browser:

    globalThis -> window


Node.js:

    globalThis -> global


==========================================================
*/

/*



Q1. How to access a variable globally without using
    export and import?
==========================================================

- Normally, when we want to share a variable between
  different modules/files, we use:

      export
          +
      import

- But if we want a value to be globally accessible
  without using export/import, we can attach it to the
  global object.


==========================================================
1. IN NODE.JS
==========================================================

- Node.js provides the `global` object.

- We can attach our variable to `global`.

Example:

    global.myVar = "Hello World";


Now the value can be accessed from another file without
using `export` or `import`.


Example:

File 1:

    // global.js

    global.myVar = "Hello World";


File 2:

    // app.js

    console.log(global.myVar);


Output:

    Hello World


==========================================================
2. USING globalThis
==========================================================

- `globalThis` is the standard cross-environment way
  to access the global object.

Example:

    globalThis.myVar = "Hello World";


Access it:

    console.log(globalThis.myVar);


Output:

    Hello World


In Node.js:

    globalThis.myVar
          |
          v
       global.myVar


Because:

    globalThis === global

Output:

    true


==========================================================
3. ACCESS FROM ANOTHER FILE
==========================================================


File 1:
----------------------------------------------------------

    // config.js

    globalThis.appName = "My Application";
    globalThis.port = 3000;


File 2:
----------------------------------------------------------

    // app.js

    console.log(globalThis.appName);
    console.log(globalThis.port);


Output:

    My Application
    3000


- No export is required.
- No import is required.


Flow:

    config.js
       |
       | globalThis.appName = ...
       v
    Global Object
       |
       v
    app.js
       |
       | globalThis.appName
       v
    "My Application"


==========================================================
4. USING global DIRECTLY
==========================================================

Node.js-specific approach:

    global.myVar = "Hello World";


Access:

    console.log(global.myVar);


Output:

    Hello World


You can also access it through:

    console.log(globalThis.myVar);


Output:

    Hello World


Because:

    global === globalThis

    // true


==========================================================
5. BROWSER JAVASCRIPT
==========================================================

- In browsers, the traditional global object is
  `window`.

Example:

    window.myVar = "Hello World";


Access:

    console.log(window.myVar);


Output:

    Hello World


You can also access it through:

    console.log(globalThis.myVar);


Output:

    Hello World


Because in the browser:

    window === globalThis

    // true


==========================================================
6. UNIVERSAL APPROACH
==========================================================

If you want code that works across JavaScript
environments, use:

    globalThis


Example:

    globalThis.myVar = "Hello World";


Access:

    console.log(globalThis.myVar);


This works with the standard global object API across
different JavaScript environments.


==========================================================
7. GLOBAL VARIABLE FLOW
==========================================================


             globalThis
                 |
        +--------+--------+
        |                 |
        v                 v
     Node.js            Browser
        |                 |
        v                 v
      global            window
        |                 |
        +--------+--------+
                 |
                 v
             myVar
                 |
                 v
          "Hello World"


==========================================================
8. IMPORTANT: GLOBAL OBJECT vs MODULE
==========================================================

Normal module approach:

    // config.js

    export const appName = "My App";


    // app.js

    import { appName } from "./config.js";


Global approach:

    // config.js

    globalThis.appName = "My App";


    // app.js

    console.log(globalThis.appName);


Difference:

    Module approach
        |
        v
    export + import
        |
        v
    Explicit dependency


    Global approach
        |
        v
    globalThis
        |
        v
    No import/export
        |
        v
    Global state


==========================================================
9. IMPORTANT: DON'T CONFUSE WITH `process`
==========================================================

- `process` is a built-in Node.js global object.

Example:

    console.log(process);


It provides information and control related to the
current Node.js process.

Examples:

    process.env
    process.argv
    process.pid
    process.cwd()


Your variable:

    globalThis.myVar = "Hello";


is NOT the same thing as `process`.

It simply creates a property on the global object.


==========================================================
10. GLOBAL VARIABLE CAN BE ACCESSED FROM MANY MODULES
==========================================================


             Node.js Process
                    |
                    v
              Global Object
                    |
          +---------+---------+
          |         |         |
          v         v         v
       file1.js  file2.js  file3.js
          |         |         |
          +---------+---------+
                    |
                    v
             globalThis.myVar


Example:

    // file1.js

    globalThis.appName = "My App";


    // file2.js

    console.log(globalThis.appName);


    // file3.js

    console.log(globalThis.appName);


Output:

    My App
    My App


==========================================================
11. IMPORTANT LIMITATION
==========================================================

- Global variables are available within the same Node.js
  process.

- They are NOT automatically shared between different
  Node.js processes.

Example:


    Process 1
       |
       +--> globalThis.myVar


    Process 2
       |
       +--> different global object


The two processes do not automatically share the same
global variable.


For sharing data between multiple processes or servers,
use something such as:

    - Redis
    - Database
    - Message broker
    - External storage


==========================================================
12. SHOULD WE USE GLOBAL VARIABLES?
==========================================================

Technically:

    YES


As a general application design:

    USE CAREFULLY


Avoid unnecessarily doing:

    globalThis.user = {};
    globalThis.data = [];
    globalThis.config = {};
    globalThis.database = {};


Problems:

    - Global state can be changed from anywhere.
    - Difficult to track where a value was changed.
    - Can create naming conflicts.
    - Makes testing harder.
    - Creates hidden dependencies.
    - Makes code harder to maintain.


Prefer:

    export
       +
    import


when sharing application-level dependencies between
modules.


==========================================================
13. WHEN CAN GLOBAL VARIABLES BE USEFUL?
==========================================================

They can be useful for specific environment-level
values or application-wide facilities when there is a
clear reason.

For example:

    globalThis.myAppVersion = "1.0.0";


Then:

    console.log(globalThis.myAppVersion);


But for normal module-to-module communication:

    Prefer modules.


==========================================================
14. SHORT ANSWER
==========================================================

Q. How can we access a variable globally without using
   export and import?

Answer:

"In Node.js, we can attach a value to the global object
using `global` or, preferably, `globalThis`.

For example:

    globalThis.myVar = "Hello World";

The value can then be accessed from other modules using:

    console.log(globalThis.myVar);

No explicit `export` or `import` is required.

However, global variables should be used carefully because
they create shared global state and can make an application
harder to maintain."


==========================================================
15. INTERVIEW ONE-LINER
==========================================================

"Attach a property to `globalThis` to make it accessible
throughout the current JavaScript runtime without using
export/import."


*/