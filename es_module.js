/*
============================================================
# MODULE SYSTEM IN NODE.JS
============================================================


Q. What is a Module System in Node.js?
------------------------------------------------------------

- A module system is a mechanism that allows us to divide
  an application into separate, independent pieces of code.

- Instead of writing the complete application in one file,
  we can divide the application into multiple files/modules.

- Each module can contain related:

    - Variables
    - Functions
    - Classes
    - Objects
    - Constants
    - Business logic

- A module can:

    1. Keep its internal code private.
    2. Export functionality that other modules need.
    3. Import functionality from other modules.


Example:

    user.js       -> user-related functionality
    auth.js       -> authentication functionality
    database.js   -> database functionality
    payment.js    -> payment functionality
    server.js     -> server functionality


- This makes the application:

    - Modular
    - Reusable
    - Maintainable
    - Testable
    - Easier to debug
    - Easier to understand


------------------------------------------------------------
Q. What is a Module?
------------------------------------------------------------

- A module is a self-contained, reusable and encapsulated
  unit of code.

- In CommonJS, each JavaScript file is treated as a separate
  module.

Example:

    // math.js

    const pi = 3.14;

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

- Here math.js is a module.

- It contains related functionality:

    pi
    add()
    subtract()


------------------------------------------------------------
Q. Are variables from one module automatically available
to another module?
------------------------------------------------------------

- NO.

- Variables, functions and objects defined inside one
  module are private to that module by default.

Example:

    // math.js

    const secret = 100;

    function add(a, b) {
        return a + b;
    }


    // app.js

    console.log(secret); // ❌ Not directly accessible
    add(10, 20);         // ❌ Not directly accessible


- If another module needs something, it must be explicitly
  exported.


------------------------------------------------------------
Q. Why are modules useful?
------------------------------------------------------------

- Modules prevent unrelated code from being placed into the
  same scope.

- They provide:

    Encapsulation
         ↓
    Reusability
         ↓
    Separation of concerns
         ↓
    Maintainability
         ↓
    Easier testing/debugging


============================================================
# MODULE SYSTEMS IN NODE.JS
============================================================

- Node.js supports two major JavaScript module systems:

    1. CommonJS
    2. ES Modules (ESM)


------------------------------------------------------------
1. CommonJS
------------------------------------------------------------

- CommonJS is the traditional module system in Node.js.

- CommonJS commonly uses:

    module.exports
    require()


Example:

    // math.js

    function add(a, b) {
        return a + b;
    }

    module.exports = {
        add
    };


    // app.js

    const math = require("./math");

    console.log(math.add(10, 20));


Flow:

    math.js
       |
       | module.exports
       v
    Export
       |
       | require()
       v
    app.js


------------------------------------------------------------
2. ES Modules (ESM)
------------------------------------------------------------

- ES Modules are the standard JavaScript module system.

- ESM uses:

    export
    import


Example:

    // math.js

    export function add(a, b) {
        return a + b;
    }


    // app.js

    import { add } from "./math.js";

    console.log(add(10, 20));


Flow:

    math.js
       |
       | export
       v
    add
       |
       | import
       v
    app.js


------------------------------------------------------------
CommonJS vs ESM
------------------------------------------------------------

    CommonJS
       |
       +--> module.exports
       |
       +--> require()


    ES Modules
       |
       +--> export
       |
       +--> import


- Important:

  `module.exports` and `require()` belong to CommonJS.

  `export` and `import` belong to ES Modules.


============================================================
# WHY DO WE NEED MODULES?
============================================================


Q. Why do we need a Module?
------------------------------------------------------------

There are several important reasons.


------------------------------------------------------------
1. Encapsulation
------------------------------------------------------------

- Encapsulation means keeping the internal implementation
  of a module private.

Example:

    // bank.js

    const balance = 10000;

    function getBalance() {
        return balance;
    }

    module.exports = {
        getBalance
    };


- `balance` is not directly exported.

- Other modules cannot directly access the internal variable.

- They can only use what we expose.


    Internal implementation
             |
             v
        +----------+
        | balance  |
        +----------+
             |
             | only expose
             v
        getBalance()


- This prevents unnecessary access to internal data.


------------------------------------------------------------
2. Reusability
------------------------------------------------------------

- A module can be written once and reused in multiple files.

Example:

    // math.js

    function add(a, b) {
        return a + b;
    }

    module.exports = { add };


- Now multiple files can use it:

    // app.js

    const { add } = require("./math");


    // test.js

    const { add } = require("./math");


- We don't need to rewrite add() in every file.


------------------------------------------------------------
3. Better Code Organization
------------------------------------------------------------

- Related functionality can be kept together.

Example:

    project/
    |
    +-- server.js
    |
    +-- user/
    |    +-- userController.js
    |    +-- userService.js
    |
    +-- auth/
    |    +-- authController.js
    |    +-- authService.js
    |
    +-- database/
         +-- database.js


- This makes a large application easier to understand.


------------------------------------------------------------
4. Separation of Concerns
------------------------------------------------------------

- Each module can have a specific responsibility.

Example:

    database.js
        ↓
    Database connection


    auth.js
        ↓
    Authentication


    user.js
        ↓
    User operations


    payment.js
        ↓
    Payment operations


- Each module focuses on a particular responsibility.


------------------------------------------------------------
5. Easier Maintenance
------------------------------------------------------------

- Suppose authentication logic contains a bug.

- Without modules:

    One huge file
        ↓
    Find authentication code
        ↓
    Difficult to maintain


- With modules:

    auth.js
        ↓
    Fix authentication logic


- You only need to modify the relevant module.


------------------------------------------------------------
6. Easier Testing
------------------------------------------------------------

- Modules make it easier to test individual functionality.

Example:

    math.js
        |
        +--> add()
        +--> subtract()
        +--> multiply()


- We can test each function independently.


------------------------------------------------------------
7. Prevent Global Scope Pollution
------------------------------------------------------------

- Module variables are not automatically placed into the
  global scope.

Example:

    // file1.js

    const name = "Vishal";


    // file2.js

    const name = "Rahul";


- Both modules can have their own `name` variable without
  directly conflicting with each other.

- Modules provide separate scopes.


------------------------------------------------------------
8. Performance through Module Caching
------------------------------------------------------------

- Node.js caches modules after they have been loaded.

Example:

    // app1.js

    const math = require("./math");


    // app2.js

    const math = require("./math");


- CommonJS does not normally execute the same cached module
  from scratch for every require of the same resolved module.

- This avoids unnecessary repeated module evaluation and
  improves efficiency.


============================================================
# TYPES OF MODULES IN NODE.JS
============================================================


There are commonly three categories:


1. Core / Built-in Modules
2. User-defined Modules
3. Third-party Modules


------------------------------------------------------------
1. Core / Built-in Modules
------------------------------------------------------------

Q. What is a Core Module?
------------------------------------------------------------

- Core modules are modules provided by Node.js itself.

- They do not need to be installed separately.

Examples:

    fs
    path
    os
    http
    events
    url
    crypto
    stream


Example:

    const fs = require("fs");

    const path = require("path");


- These modules are part of the Node.js runtime.


------------------------------------------------------------
2. User-defined Module
------------------------------------------------------------

- A user-defined module is a module created by the
  developer.

Example:

    // math.js

    function add(a, b) {
        return a + b;
    }

    module.exports = { add };


- This is our own custom module.


------------------------------------------------------------
3. Third-party Module
------------------------------------------------------------

- Third-party modules are packages created outside the
  Node.js core and commonly installed through npm.

Examples:

    express
    mongoose
    lodash
    cors


- Example:

    npm install express


- Then in CommonJS:

    const express = require("express");


- Or in ESM:

    import express from "express";


------------------------------------------------------------
Module Types Visualization
------------------------------------------------------------

                    MODULES
                       |
          +------------+------------+
          |            |            |
          v            v            v
        Core        User-defined  Third-party
          |            |            |
          v            v            v
        fs.js        math.js      express
        path         auth.js      mongoose
        os           user.js      lodash


============================================================
# COMMONJS EXPORTS
============================================================


Q. How can we export something in CommonJS?
------------------------------------------------------------

There are two common approaches.


------------------------------------------------------------
1. Assign an object to module.exports
------------------------------------------------------------

Example:

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    module.exports = {
        add,
        subtract,
        multiply
    };


- This exports one object containing multiple properties.


Then:

    const math = require("./math");

    console.log(math.add(10, 20));
    console.log(math.subtract(20, 10));
    console.log(math.multiply(5, 4));


------------------------------------------------------------
2. Assign properties individually
------------------------------------------------------------

Example:

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    module.exports.add = add;
    module.exports.subtract = subtract;


- This adds properties to the existing exports object.


------------------------------------------------------------
IMPORTANT:
module.exports is a VALUE
------------------------------------------------------------

- `module.exports` represents the value that will be
  exported by the CommonJS module.

Example:

    module.exports = add;


- Now the entire exported value is the add function.

If later you write:

    module.exports = multiply;


- The previous value is replaced.

Conceptually:

    module.exports = add;
             |
             v
          [ add ]

    module.exports = multiply;
             |
             v
       [ multiply ]


- `multiply` replaced the previous exported value.

------------------------------------------------------------
Avoid confusing these two:
------------------------------------------------------------

    module.exports.add = add;

and

    module.exports = add;


They are NOT the same.


Example 1:

    module.exports.add = add;

means:

    exports object
        |
        +-- add


Example 2:

    module.exports = add;

means:

    exports
        |
        v
       add function


------------------------------------------------------------
Important:
module.exports = { add, sub, mul }
------------------------------------------------------------

- This syntax:

    module.exports = {
        add,
        sub,
        mul
    };


is an object literal using property shorthand.

- It is NOT destructuring.

- It means approximately:

    module.exports = {
        add: add,
        sub: sub,
        mul: mul
    };


- This is an important correction.

============================================================
# COMMONJS IMPORT
============================================================


Example:

    // math.js

    function add(a, b) {
        return a + b;
    }

    function sub(a, b) {
        return a - b;
    }

    module.exports = {
        add,
        sub
    };


    // app.js

    const math = require("./math");


- `require("./math")` receives the value assigned to
  `module.exports`.

Therefore:

    math
      |
      +-- add
      |
      +-- sub


You can also destructure it:

    const { add, sub } = require("./math");


============================================================
# MODULE vs FUNCTION
============================================================


Q. What is the difference between a Module and a Function?
------------------------------------------------------------


                    MODULE
                       |
                       v
              Container / unit
                       |
          +------------+------------+
          |            |            |
          v            v            v
       Function     Variable      Class
          |
          v
      Performs
      specific task


------------------------------------------------------------
1. Module
------------------------------------------------------------

- A module is a larger unit of organization.

- It can contain:

    - Functions
    - Variables
    - Classes
    - Objects
    - Constants
    - Logic


Example:

    // math.js

    const pi = 3.14;

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    class Calculator {
        // ...
    }

- The complete math.js file can be considered a module.


------------------------------------------------------------
2. Function
------------------------------------------------------------

- A function is a reusable block of code designed to perform
  a particular operation.

Example:

    function add(a, b) {
        return a + b;
    }


- `add()` performs one particular operation.

- A function can exist inside a module.


------------------------------------------------------------
Relationship
------------------------------------------------------------

Think of it this way:

    MODULE
      |
      +------------------------+
      |                        |
      v                        v
   Function                 Function
   add()                    subtract()
      |
      +------------------------+
      |
      v
   Variables
   Classes
   Objects


- Module = container/organizational unit.
- Function = reusable piece of logic inside that unit.


------------------------------------------------------------
Module vs Function Table
------------------------------------------------------------

    Module
    ----------------------------------------
    - Organizes related code
    - Usually represented by a file/module unit
    - Can contain multiple functions
    - Can contain variables/classes/objects
    - Can export functionality
    - Can be imported into another module


    Function
    ----------------------------------------
    - Performs a specific task
    - Is a piece of executable logic
    - Can exist inside a module
    - Can accept parameters
    - Can return a value
    - Can be exported from a module


------------------------------------------------------------
Simple Example
------------------------------------------------------------

    // math.js

    function add(a, b) {
        return a + b;
    }

    function multiply(a, b) {
        return a * b;
    }

    module.exports = {
        add,
        multiply
    };


- `math.js` = Module

- `add()` = Function

- `multiply()` = Function

- `module.exports` = mechanism used to expose them to
  another CommonJS module.


============================================================
# FINAL INTERVIEW-READY ANSWER
============================================================

Q. What is a Module System in Node.js?
------------------------------------------------------------

- The module system in Node.js is a mechanism for organizing
  application code into separate, reusable, and encapsulated
  units.

- In CommonJS, each JavaScript file is treated as a separate
  module.

- Variables, functions, classes, and objects inside a module
  are private by default and are not directly accessible from
  another module.

- We explicitly expose functionality using `module.exports`
  and consume it using `require()`.

- Node.js also supports ES Modules, which use `export` and
  `import`.

- Modules provide:

    - Encapsulation
    - Reusability
    - Separation of concerns
    - Better organization
    - Easier maintenance
    - Easier testing
    - Easier debugging
    - Module caching


------------------------------------------------------------
Q. Why do we need Modules?
------------------------------------------------------------

- We need modules to divide a large application into smaller
  and manageable units.

- They keep related functionality together, prevent
  unnecessary global scope pollution, allow code reuse,
  improve maintainability, and make testing/debugging easier.


------------------------------------------------------------
Q. Difference between Module and Function?
------------------------------------------------------------

- A module is an organizational unit that contains related
  code such as functions, variables, classes, and objects.

- A function is a reusable block of executable code designed
  to perform a particular task.

- Therefore:

    Module = organizes and encapsulates code

    Function = performs a specific operation


------------------------------------------------------------
ONE-LINE MEMORY
------------------------------------------------------------

    Module
       =
    Self-contained container for related code

    Function
       =
    Reusable block of logic that performs a task


============================================================
# IMPORTANT CORRECTIONS TO REMEMBER
============================================================

1. Don't say:

    "module.exports = { add, sub, mul } is destructuring"

- Correct:

    It is an object literal using property shorthand.


2. Don't say:

    "Node.js has only CommonJS."

- Correct:

    Node.js supports both CommonJS and ES Modules.


3. Don't say:

    "module exists globally."

- Correct:

    `module` is a local CommonJS variable provided by
    Node.js's CommonJS module mechanism.


4. Don't say:

    "Every JavaScript environment has module.exports."

- Correct:

    `module.exports` is part of CommonJS, not standard
    JavaScript ESM.


5. Remember:

    CommonJS
       ↓
    require()
    module.exports


    ES Modules
       ↓
    import
    export
*/