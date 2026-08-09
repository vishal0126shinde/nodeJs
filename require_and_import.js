/*
==========================================================
Q. What is require() in Node.js?
==========================================================

- `require()` is the CommonJS module-loading mechanism
  provided by Node.js.

- It is used to load CommonJS modules such as:

    1. Built-in Node.js modules
    2. Third-party packages
    3. Local/custom modules


Example:

    const fs = require("fs");


==========================================================
KEY POINTS
==========================================================

1. MODULE LOADING
-----------------

- `require()` loads a CommonJS module and returns the
  value exported by that module.
Example:

    const fs = require("fs");


2. BUILT-IN MODULES
-------------------

- Can load Node.js built-in modules.

Example:

    const fs = require("fs");
    const path = require("path");
    const os = require("os");


3. THIRD-PARTY MODULES
----------------------

- Can load packages installed in the project.

Example:

    const express = require("express");


4. LOCAL / CUSTOM MODULES
-------------------------

- Can load modules created by us.

Example:

    const math = require("./math");


5. `.js` EXTENSION
------------------

- For CommonJS local module resolution, the `.js`
  extension can generally be omitted.

Example:

    require("./math");

instead of:

    require("./math.js");


6. MODULE CACHING
-----------------

- When a CommonJS module is loaded for the first time,
  Node.js executes it and caches the module.

- Subsequent `require()` calls for the same resolved
  module normally return the cached module.


Flow:

    First require()
         |
         v
       Load
         |
         v
      Execute
         |
         v
       Cache
         |
         v
       Return


    Second require()
         |
         v
       Cache
         |
         v
       Return cached module


7. SYNCHRONOUS LOADING
----------------------

- CommonJS `require()` loads modules synchronously.

Example:

    const fs = require("fs");

    console.log("Hello");


- The module loading completes before execution continues.


8. EXPORT VALUE
---------------

- `require()` returns the value assigned to
  `module.exports`.

Example:

    // math.js

    function add(a, b) {
        return a + b;
    }

    module.exports = add;


    // app.js

    const add = require("./math");


- Here `require("./math")` returns the `add` function.


==========================================================
SHORT ANSWER
==========================================================

`require()` is the CommonJS module-loading mechanism in
Node.js. It is used to load built-in modules, third-party
packages, and local modules. It returns the module's
exported value, loads CommonJS modules synchronously, and
Node.js caches loaded CommonJS modules within the process.


==========================================================
INTERVIEW ONE-LINER
==========================================================

"`require()` is Node.js's CommonJS module-loading mechanism
used to load a module and receive its exported value."
==========================================================

                 require()
                    |
                    v
              Load a module
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Built-in  Package    Local
          |         |         |
          +---------+---------+
                    |
                    v
              Module exports
                    |
                    v
             Returned value
                    |
                    v
              Your variable

--------------------

const fs = require("fs");"fs"
 ↓
Node.js resolves fs
 ↓
loads CommonJS module
 ↓
gets its exports
 ↓
returns exports
 ↓
stores them in `fs`


Q. Is require() a normal JavaScript function?
    - require() is a CommonJS module-loading mechanism provided by Node.js.
    - Calling it simply a "built-in JavaScript function" is not precise because require() is not part of the standard JavaScript language itself.
    - It is associated with the CommonJS environment in Node.js.


Q. require() does NOT mean only "import"
    - require() loads a CommonJS module and returns its exported value.
    - Because "import" can make people think about ES Modules specifically.
CommonJS
   |
   +--> require()
   +--> module.exports


ES Modules
   |
   +--> import
   +--> export


*/

/*
==========================================================
@ require() vs import in Node.js
==========================================================

Q. What is the difference between require() and import
   in Node.js?
==========================================================

- Both `require()` and `import` are used to load/reuse
  code from other modules.

- However, they belong to two different JavaScript
  module systems:

      require()
          |
          v
      CommonJS (CJS)


      import
          |
          v
      ES Modules (ESM)


==========================================================
1. TWO MODULE SYSTEMS IN NODE.JS
==========================================================

Node.js supports two major module systems:

1. CommonJS (CJS)
2. ECMAScript Modules (ESM)


                    Node.js Modules
                           |
                 +---------+---------+
                 |                   |
                 v                   v
             CommonJS              ESM
                 |                   |
                 v                   v
             require()             import
                 |                   |
                 v                   v
          module.exports           export


==========================================================
2. WHAT IS require()?
==========================================================

- `require()` is the CommonJS module-loading mechanism.

- It is traditionally used by Node.js CommonJS projects.

Example:

    const fs = require("fs");


Here:

    require("fs")
          |
          v
    Node.js loads the fs module
          |
          v
    returns its exported value
          |
          v
    stored in `fs`


==========================================================
3. WHAT IS import?
==========================================================

- `import` is the syntax used by ECMAScript Modules (ESM).

Example:

    import fs from "fs";


or:

    import { readFile } from "fs";


- ESM is the standardized JavaScript module system.

- Node.js supports ESM when the project is configured
  appropriately.


==========================================================
4. HOW DO YOU ENABLE ES MODULES IN NODE.JS?
==========================================================

There are two common ways.

----------------------------------------------------------
METHOD 1: "type": "module"
----------------------------------------------------------

package.json:

    {
      "type": "module"
    }


Then you can write:

    import fs from "fs";


----------------------------------------------------------
METHOD 2: .mjs EXTENSION
----------------------------------------------------------

You can use:

    app.mjs


and then:

    import fs from "fs";


==========================================================
5. IMPORTANT CORRECTION
==========================================================

Your note says:

    "Node.js does not support ES modules by default."

This needs to be understood carefully.

Better interview wording:

- Node.js supports both CommonJS and ES Modules.

- A `.js` file is treated as CommonJS by default when
  the nearest package.json does not specify another type.

- You can explicitly enable ESM using:

      "type": "module"

  or use:

      .mjs


So don't say:

    "Node.js doesn't support import."

Correct:

    "Node.js supports import through its ES Module system."


==========================================================
6. require() SYNTAX
==========================================================

CommonJS:

    const express = require("express");


The syntax looks like a function call:

    require("module")


You can also use variables:

    const moduleName = "fs";

    const fs = require(moduleName);


This is one reason `require()` is commonly described as
runtime/dynamic module loading.


==========================================================
7. import SYNTAX
==========================================================

ESM uses keyword-based syntax.

Example:

    import express from "express";


Named import:

    import { readFile } from "fs";


Multiple named imports:

    import {
        readFile,
        writeFile
    } from "fs";


Default import:

    import express from "express";


Namespace import:

    import * as fs from "fs";


==========================================================
8. require() EXPORTS
==========================================================

CommonJS generally uses:

    module.exports

or:

    exports


Example:

    // math.js

    function add(a, b) {
        return a + b;
    }

    module.exports = add;


Then:

    // app.js

    const add = require("./math");

    console.log(add(10, 20));


Output:

    30


Flow:


    math.js
       |
       v
    module.exports = add
       |
       v
    require("./math")
       |
       v
    const add
       |
       v
    add(10, 20)


==========================================================
9. ES MODULE EXPORTS
==========================================================

ESM uses:

    export

and:

    export default


Example:

    // math.js

    export function add(a, b) {
        return a + b;
    }


Then:

    // app.js

    import { add } from "./math.js";


Notice:

CommonJS:

    module.exports
          |
          v
      require()


ESM:

    export
      |
      v
    import


==========================================================
10. NAMED EXPORT
==========================================================

ESM:

    // math.js

    export function add(a, b) {
        return a + b;
    }

    export function subtract(a, b) {
        return a - b;
    }


Import:

    import { add, subtract } from "./math.js";


Here:

    { add, subtract }

are named imports.


==========================================================
11. DEFAULT EXPORT
==========================================================

Example:

    // math.js

    export default function add(a, b) {
        return a + b;
    }


Import:

    import add from "./math.js";


Notice that there are no `{ }` around `add`.

Compare:


Named:

    export function add() {}

    import { add } from "./math.js";


Default:

    export default function add() {}

    import add from "./math.js";


==========================================================
12. require() NAMED VALUES
==========================================================

CommonJS doesn't use ESM-style named exports.

For example:

    // math.js

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    module.exports = {
        add,
        subtract
    };


Then:

    const { add, subtract } = require("./math");


This is JavaScript object destructuring.

So your statement:

    "named exports are supported but must be
     destructured manually"

should be understood as:

- CommonJS can export an object containing multiple
  properties/functions.
- The consumer can destructure that returned object.

It is not exactly the same export/import mechanism as
ESM named exports.


==========================================================
13. require() IS SYNCHRONOUS
==========================================================

CommonJS `require()` is synchronous.

Example:

    const math = require("./math");

    console.log("Hello");


Conceptually:


    require("./math")
           |
           v
    Resolve module
           |
           v
    Load module
           |
           v
    Execute module
           |
           v
    Return exports
           |
           v
    Continue execution
           |
           v
    console.log("Hello")


This is why `require()` is generally described as
synchronous module loading.


==========================================================
14. import STATEMENTS ARE STATIC
==========================================================

Static `import` statements are part of the module's
structure.

Example:

    import { add } from "./math.js";


The module system can analyze the module's imports and
exports before normal module execution proceeds.


This is different from:

    const add = require("./math");


where `require()` is an expression/function call that
executes during CommonJS module evaluation.


==========================================================
15. CONDITIONAL require()
==========================================================

Because `require()` is an expression, it can be used
conditionally.

Example:

    if (isDevelopment) {
        const debug = require("./debug");
    }


This is commonly called conditional/dynamic loading with
CommonJS.


==========================================================
16. CONDITIONAL import
==========================================================

Static `import` cannot normally be placed inside an
ordinary `if` block like this:

    if (condition) {
        import { add } from "./math.js";   // invalid
    }


Instead, ESM provides dynamic `import()`:

    if (condition) {
        const module = await import("./math.js");
    }


IMPORTANT:

    import
       |
       v
    Static ESM import


    import()
       |
       v
    Dynamic ESM import


They are related but are not the same thing.


==========================================================
17. DYNAMIC import() IS ASYNCHRONOUS
==========================================================

Dynamic import:

    import("./math.js")


returns a Promise.

Example:

    const module = await import("./math.js");


or:

    import("./math.js")
        .then(module => {
            console.log(module);
        });


Flow:


    import("./math.js")
            |
            v
       Returns Promise
            |
            v
       Module loaded
            |
            v
       Promise fulfilled
            |
            v
       Module namespace object


==========================================================
18. require() vs import()
==========================================================

This is an important distinction.


    require("./math")
          |
          v
      CommonJS
          |
          v
     Synchronous


    import("./math.js")
          |
          v
         ESM
          |
          v
      Promise
          |
          v
    Asynchronous


So don't write:

    require() vs import()


without clarifying whether you mean:

    static import

or:

    dynamic import()


==========================================================
19. TREE SHAKING
==========================================================

ES Modules have static import/export structure.

This makes ESM suitable for tools that perform
tree-shaking, especially bundlers.

Tree-shaking means:

> Removing unused exports/code from a bundled application
> when the tooling can safely determine they are unused.


Example:

    // math.js

    export function add() {}

    export function subtract() {}

    export function multiply() {}


If an application only uses:

    import { add } from "./math.js";


a bundler may be able to eliminate unused code such as
`subtract` and `multiply`, depending on the tooling and
code structure.


IMPORTANT:

- Don't say:

      "import automatically makes Node.js faster."


- Better:

      "ESM's static structure enables build tools to perform
       optimizations such as tree-shaking."


Also, tree-shaking is mainly a **bundling/build-time
optimization**, not simply a runtime feature of `import`.


==========================================================
20. require() CACHING
==========================================================

CommonJS `require()` has module caching behavior.

Example:

    const a = require("./math");
    const b = require("./math");


The same resolved CommonJS module is normally loaded once
and subsequent requires return the cached module.


Flow:


    First require
         |
         v
       Load
         |
         v
      Execute
         |
         v
       Cache
         |
         v
       Return


    Second require
         |
         v
       Cache
         |
         v
       Return cached module


ES Modules also have module caching/identity semantics,
but the mechanism and module system are different from
CommonJS's `require.cache` model.


==========================================================
21. FILE EXTENSIONS
==========================================================

CommonJS local module:

    const math = require("./math");


CommonJS commonly allows the `.js` extension to be
omitted during resolution.

ESM local import:

    import { add } from "./math.js";


In Node.js ESM, relative/absolute imports generally need
the file extension specified.


So this is an important practical difference:


CommonJS:

    require("./math");


ESM:

    import { add } from "./math.js";


==========================================================
22. require() vs import — COMPLETE COMPARISON
==========================================================


+----------------------+---------------------------+
| Feature              | require()                 |
+----------------------+---------------------------+
| Module system        | CommonJS                  |
| Syntax               | Function/expression       |
| Export system        | module.exports / exports  |
| Loading              | Synchronous               |
| Conditional loading | Can be used directly      |
| Dynamic loading      | require() itself          |
| File extension       | Often optional for CJS   |
| Tree shaking         | Less suitable for static  |
|                      | analysis                  |
| Traditional Node.js  | Yes                       |
| style                |                           |
+----------------------+---------------------------+


+----------------------+---------------------------+
| Feature              | import                    |
+----------------------+---------------------------+
| Module system        | ES Modules (ESM)          |
| Syntax               | Keyword-based             |
| Export system        | export / export default   |
| Loading              | Static import             |
| Conditional loading | Use dynamic import()      |
| Dynamic loading      | import()                  |
| File extension       | Usually required for      |
|                      | relative Node.js ESM      |
| Tree shaking         | Friendly to static        |
|                      | analysis                  |
| Standard             | ECMAScript standard       |
+----------------------+---------------------------+


==========================================================
23. SIMPLE SIDE-BY-SIDE EXAMPLE
==========================================================


                 COMMONJS
                    |
                    v

// math.js

function add(a, b) {
    return a + b;
}

module.exports = { add };


                    |
                    v

// app.js

const { add } = require("./math");

console.log(add(10, 20));


----------------------------------------------------------


                  ES MODULE
                    |
                    v

// math.js

export function add(a, b) {
    return a + b;
}


                    |
                    v

// app.js

import { add } from "./math.js";

console.log(add(10, 20));


==========================================================
24. MAIN DIFFERENCE IN ONE DIAGRAM
==========================================================


                    MODULE SYSTEMS
                           |
              +------------+------------+
              |                         |
              v                         v
          CommonJS                    ESM
              |                         |
              v                         v
          require()                  import
              |                         |
              v                         v
       module.exports              export
              |                         |
              v                         v
        Runtime loading         Static module structure
              |                         |
              v                         v
        Synchronous             Tooling-friendly
        loading                 static analysis


==========================================================
25. WHEN SHOULD YOU USE require()?
==========================================================

Use `require()` when:

    - The project uses CommonJS.
    - Existing code uses module.exports.
    - package.json uses CommonJS configuration.
    - You are maintaining a legacy/traditional
      CommonJS Node.js application.
    - The project's tooling expects CommonJS.


Example:

    const express = require("express");


==========================================================
26. WHEN SHOULD YOU USE import?
==========================================================

Use ESM `import` when:

    - The project uses ES Modules.
    - package.json has:

          "type": "module"

    - Or the files use `.mjs`.
    - You want standard ECMAScript module syntax.
    - You want static import/export structure.
    - You want compatibility with the broader modern
      JavaScript ESM ecosystem.


Example:

    import express from "express";


==========================================================
27. DON'T MIX THEM RANDOMLY
==========================================================

A common mistake is to write:

    // package.json

    {
      "type": "module"
    }


and then:

    const express = require("express");


without considering the module system.

Similarly, don't blindly copy:

    import express from "express";


into a CommonJS project and expect every setup to behave
the same way.


Always first determine:

    "Is this project using CommonJS or ESM?"


==========================================================
28. HOW TO IDENTIFY COMMONJS
==========================================================

You will commonly see:


    const fs = require("fs");


and:


    module.exports = something;


This indicates CommonJS style.


==========================================================
29. HOW TO IDENTIFY ESM
==========================================================

You will commonly see:


    import fs from "fs";


and:


    export function add() {}


or:


    export default something;


This indicates ES Module style.


==========================================================
30. IMPORTANT CORRECTION TO "DEFAULT IN NODE.JS"
==========================================================

Your note says:

    "require() is default in Node.js."


For interview purposes, make it more precise:

    "CommonJS is the default interpretation for .js files
     when the package does not specify another module type."


Because Node.js supports both:

    CommonJS
    +
    ES Modules


And ESM can be explicitly enabled with:

    "type": "module"


or:

    .mjs


==========================================================
31. IMPORTANT CORRECTION:
    "import is synchronous-like"
==========================================================

Avoid writing:

    "import is synchronous-like."


Better:

    "Static ESM import declarations are resolved as part
     of the module loading/linking process before the
     module's normal evaluation."

And:

    "Dynamic import() is asynchronous and returns a Promise."


So:


    import x from "./x.js";
          |
          v
    Static ESM import


    import("./x.js")
          |
          v
    Dynamic ESM import
          |
          v
    Promise


==========================================================
32. IMPORTANT CORRECTION:
    "import is compiled before runtime"
==========================================================

Don't say:

    "import is compiled before runtime."

Static imports are **statically analyzable**.

That means the module's import/export relationships can
be determined from the source structure.

This is useful for:

    - Module linking
    - Dependency analysis
    - Tooling
    - Bundling
    - Tree-shaking


But "statically analyzed" does NOT mean:

    "compiled like C/C++ before the program runs."


==========================================================
33. INTERVIEW ANSWER
==========================================================

Q. Difference between require() and import in Node.js?

Answer:

"`require()` is the CommonJS module-loading mechanism,
while `import` belongs to the ES Module system.

`require()` uses CommonJS syntax such as `module.exports`,
is synchronous, and can be used as a runtime expression.

`import` uses ESM syntax such as `export` and
`export default`. Static imports are part of the module's
static structure and can be analyzed before evaluation.
For conditional/dynamic loading, ESM provides `import()`,
which returns a Promise.

Node.js supports both CommonJS and ES Modules. CommonJS is
the traditional/default interpretation for `.js` files when
no module type is specified, while ESM can be enabled using
`"type": "module"` or `.mjs`."


==========================================================
34. SHORT INTERVIEW ANSWER
==========================================================

- `require()` → CommonJS
- `import` → ES Modules
- `module.exports` → CommonJS export
- `export` → ESM export
- `require()` → synchronous
- static `import` → statically analyzable
- `import()` → dynamic and returns Promise
- CommonJS → traditional Node.js module system
- ESM → standardized JavaScript module system
- ESM → enables tooling-friendly static analysis and
  tree-shaking


==========================================================
35. ONE-LINE MEMORY TRICK
==========================================================


        CommonJS
           |
           v
       require()
           +
    module.exports


        ES Modules
           |
           v
         import
           +
         export


==========================================================
36. FINAL MEMORY DIAGRAM
==========================================================


                       Node.js
                          |
                +---------+---------+
                |                   |
                v                   v
            CommonJS               ESM
                |                   |
                v                   v
            require()             import
                |                   |
                v                   v
        module.exports           export
                |                   |
                v                   v
         Runtime loading      Static structure
                |                   |
                v                   v
         Synchronous           Static analysis
         module loading             |
                                    v
                              Tooling / bundling
                                    |
                                    v
                               Tree-shaking


==========================================================
*/


/*
==========================================================
@ TREE SHAKING
==========================================================

Q. What is Tree Shaking?
==========================================================

- Tree shaking is a code optimization technique used by
  modern JavaScript build tools / bundlers to remove
  unused code from the final bundle.

- The main goal is:

      Remove code that is not used
             |
             v
      Reduce final bundle size
             |
             v
      Send less JavaScript to the browser


----------------------------------------------------------
SIMPLE DEFINITION
----------------------------------------------------------

"Tree shaking is a build-time optimization technique that
uses static analysis to identify and remove unused code
from the final JavaScript bundle."


==========================================================
1. WHY IS IT CALLED "TREE SHAKING"?
==========================================================

- Think of your application's code as a tree.

- The tree contains:

      Trunk
        |
        +---- Branch
        |
        +---- Branch
        |
        +---- Branch
        |
        +---- Branch


- Some branches are required by the application.

- Some branches are never used.

- Tree shaking removes the unnecessary branches.


                    CODE TREE
                       |
              +--------+--------+
              |        |        |
              v        v        v
             add    subtract  multiply
              |        |        |
              v        v        v
            USED     UNUSED   UNUSED


After tree shaking:


                    CODE TREE
                       |
                       v
                      add
                       |
                       v
                     USED


So:

    Used code      = branches we need
    Unused code    = dead/unnecessary branches

Tree shaking "shakes off" the unused branches.


==========================================================
2. IMPORTANT:
   TREE SHAKING HAPPENS AT BUILD TIME
==========================================================

- Tree shaking is generally a BUILD-TIME optimization.

- It is not something that happens when the browser is
  executing your JavaScript at runtime.

The basic flow is:


    Source Code
         |
         v
    Bundler / Build Tool
         |
         v
    Static Analysis
         |
         v
    Identify unused code
         |
         v
    Remove unused code
         |
         v
    Optimized Bundle
         |
         v
    Browser


==========================================================
3. WHY DO WE NEED TREE SHAKING?
==========================================================

Suppose we have a utility file containing 100 functions.

But our application uses only 2 functions.

Without optimization:


    utils.js
       |
       +-- function 1
       +-- function 2  <-- USED
       +-- function 3
       +-- function 4
       +-- function 5
       +-- ...
       +-- function 100


The final bundle may contain unnecessary code.

With tree shaking:


    utils.js
       |
       +-- function 1
       +-- function 2  <-- USED
       +-- function 3
       +-- ...
       +-- function 100


                 |
                 v
            Tree Shaking
                 |
                 v

       +-- function 2  <-- USED


Only code that can safely be removed is eliminated.


==========================================================
4. BENEFITS OF TREE SHAKING
==========================================================

Tree shaking can help:

1. Reduce bundle size
2. Reduce JavaScript sent to the browser
3. Reduce download size
4. Reduce parsing/compilation work
5. Reduce execution work when code is removed
6. Improve application loading performance
7. Improve overall application efficiency


Simple flow:


    Unused Code
         |
         v
    Remove it
         |
         v
    Smaller Bundle
         |
         v
    Less JavaScript
         |
         v
    Potentially faster loading


==========================================================
5. SIMPLE EXAMPLE
==========================================================

Let's create:

    utils.js


// utils.js

    export function add(a, b) {
        return a + b;
    }

    export function subtract(a, b) {
        return a - b;
    }

    export function multiply(a, b) {
        return a * b;
    }

    export function divide(a, b) {
        return a / b;
    }


Now our application only uses `add()`.


// app.js

    import { add } from "./utils.js";

    console.log(add(2, 3));


The application does NOT use:

    subtract()
    multiply()
    divide()


So a bundler can analyze the module graph and determine
that those exports are not needed by the application.


==========================================================
6. WITHOUT TREE SHAKING
==========================================================

Conceptually, the bundle could contain:


    Bundle
      |
      +-- add()
      +-- subtract()
      +-- multiply()
      +-- divide()


Even though only:

    add()

is needed.


==========================================================
7. WITH TREE SHAKING
==========================================================

After tree shaking:


    Bundle
      |
      +-- add()


Unused exports may be removed when the bundler can safely
prove that they are not needed.


So:


    utils.js
       |
       +-- add()       <-- USED
       +-- subtract()  <-- UNUSED
       +-- multiply()  <-- UNUSED
       +-- divide()    <-- UNUSED

                    |
                    v
               Tree Shaking

                    |
                    v

    Final Bundle
       |
       +-- add()


==========================================================
8. HOW DOES TREE SHAKING KNOW WHAT IS UNUSED?
==========================================================

The key concept is:

                STATIC ANALYSIS


Static analysis means the bundler can inspect the source
code and determine the relationships between modules,
imports, and exports without needing to execute the
application to discover those relationships.


Example:


    import { add } from "./utils.js";


The bundler can see:

    app.js
       |
       | imports
       v
      add
       |
       v
    utils.js


And it can determine that the application is requesting
the `add` export.


The other exports may be unused.


==========================================================
9. STATIC IMPORT / EXPORT
==========================================================

ES Modules use static import/export syntax.


Example:


    // utils.js

    export function add() {}

    export function subtract() {}


    // app.js

    import { add } from "./utils.js";


The import/export relationships are visible in the source
code.


Conceptually:


             app.js
                |
                | import { add }
                v
             utils.js
                |
        +-------+-------+
        |               |
        v               v
      add()         subtract()
        |               |
        |               |
       USED           UNUSED


This static structure is very useful to bundlers.


==========================================================
10. MODULE GRAPH
==========================================================

A bundler builds a representation of the application's
module dependencies, often called a module graph.


Example:


                  app.js
                    |
          +---------+---------+
          |                   |
          v                   v
       utils.js             user.js
          |
     +----+----+
     |         |
     v         v
   add()    subtract()


If `app.js` only imports `add()`:


                  app.js
                    |
                    v
                 utils.js
                    |
                    v
                  add()


The unused `subtract()` export may be removed if it is
safe to do so.


==========================================================
11. WHY ES MODULES ARE GOOD FOR TREE SHAKING
==========================================================

ES Modules use:

    import
    export


These provide a statically analyzable module structure.

Example:


    import { add } from "./utils.js";


and:


    export function add() {}


A bundler can analyze:

    Who exports what?
    Who imports what?
    Which exports are actually used?
    Which modules are reachable?
    Which code can safely be removed?


This is why ESM is generally considered
tree-shaking-friendly.


==========================================================
12. WHAT ABOUT CommonJS require()?
==========================================================

Example:


    const utils = require("./utils");

    utils.add(2, 3);


The problem is that CommonJS uses runtime expressions.

`require()` itself is a function-like expression that is
evaluated during module execution.


A bundler may have a harder time determining exactly which
parts of a CommonJS module are used in all possible cases.


For example:


    const utils = require("./utils");

    utils.add(2, 3);


or:


    const method = "add";

    const utils = require("./utils");

    utils[method](2, 3);


The property being accessed may be determined dynamically.


Even more dynamic code can make static analysis difficult:


    const moduleName = getModuleName();

    const utils = require(moduleName);


The bundler may not be able to determine the exact module
at build time.


==========================================================
13. IMPORTANT CORRECTION:
   "CommonJS DOES NOT SUPPORT TREE SHAKING"
==========================================================

Your original note says:


    "ES Modules support tree shaking,
     but CommonJS does not."


This is useful as a simple interview rule, but it is too
absolute.


A better statement is:


    "ES Modules are much more suitable for reliable
     tree shaking because their import/export structure
     is statically analyzable. CommonJS is more dynamic,
     so tree shaking is harder and less reliable."


Some build tools can perform limited analysis of CommonJS
code, but ESM provides a much better foundation for
tree-shaking.


==========================================================
14. WHY require() MAKES STATIC ANALYSIS HARDER
==========================================================

Consider:


    const utils = require("./utils");


The entire exported object may be treated as potentially
needed because the bundler has less certainty about how
the module will be accessed.


For example:


    const method = "add";

    utils[method]();


The property is selected dynamically.


Or:


    const method = getMethod();

    utils[method]();


Now the bundler cannot simply assume that only `add()` is
needed.


This is one reason CommonJS is less tree-shaking-friendly.


==========================================================
15. STATIC vs DYNAMIC
==========================================================


ESM:

    import { add } from "./utils.js";


                 |
                 v
          Static structure
                 |
                 v
          Easy to analyze
                 |
                 v
        Tree-shaking friendly


CommonJS:

    const utils = require("./utils");


                 |
                 v
        Runtime expression
                 |
                 v
       More dynamic behavior
                 |
                 v
       Harder to analyze
                 |
                 v
       Less tree-shaking friendly


==========================================================
16. TREE SHAKING IS NOT JUST "DELETE UNUSED FUNCTIONS"
==========================================================

Tree shaking is more accurately about determining which
exports/modules/code are not reachable or needed and can
safely be removed from the generated bundle.


It can involve:

    - Unused exports
    - Unused modules
    - Dead code
    - Dependency relationships


However, tree shaking is not exactly the same thing as
every form of dead-code elimination.


----------------------------------------------------------
TREE SHAKING
----------------------------------------------------------

Primarily refers to eliminating unused module exports/code
based on static dependency analysis.


----------------------------------------------------------
DEAD CODE ELIMINATION
----------------------------------------------------------

A broader optimization technique that removes code that
cannot affect the program's observable behavior.


Example:


    if (false) {
        console.log("Never runs");
    }


A build tool may remove this through dead-code
elimination.


So:


    Tree Shaking
         +
    Other optimizations
         |
         v
    Smaller final bundle


==========================================================
17. TREE SHAKING + MINIFICATION
==========================================================

Tree shaking and minification are different optimizations.


Tree shaking:


    Removes unused code.


Minification:


    Makes remaining code smaller.


Example:


Before:


    function add(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    }


After minification:


    function add(a,b){return a+b}


Tree shaking decides:

    "Do we need this code?"


Minification decides:

    "Can we represent the needed code more compactly?"


Both can be used together.


==========================================================
18. TREE SHAKING + BUNDLING
==========================================================

A modern frontend build process may look like:


    Source Files
         |
         v
    Module Graph
         |
         v
    Static Analysis
         |
         v
    Tree Shaking
         |
         v
    Dead Code Elimination
         |
         v
    Minification
         |
         v
    Final Bundle
         |
         v
    Browser


==========================================================
19. REALISTIC EXAMPLE
==========================================================

Suppose:


    // utils.js

    export function add(a, b) {
        return a + b;
    }

    export function subtract(a, b) {
        return a - b;
    }

    export function multiply(a, b) {
        return a * b;
    }

    export function divide(a, b) {
        return a / b;
    }


Application:


    // app.js

    import { add } from "./utils.js";

    console.log(add(10, 20));


The dependency relationship is:


    app.js
      |
      | uses
      v
    add()
      |
      v
    utils.js


Other exports:


    subtract()
    multiply()
    divide()


are not imported by `app.js`.


A bundler can therefore determine that they may be
removable from the final bundle, assuming there are no
other uses or side effects that require them.


==========================================================
20. SIDE EFFECTS — VERY IMPORTANT
==========================================================

This is an important interview topic.


Not all unused-looking code can safely be removed.


Consider:


    // utils.js

    console.log("Module loaded");

    export function add(a, b) {
        return a + b;
    }


Even if the application only imports `add`, the module has
a side effect:


    console.log("Module loaded");


The bundler needs to consider whether removing module code
would change observable behavior.


Therefore, tree shaking is not simply:


    "Not imported = always deleted."


It is:


    "Can this code be safely removed without changing the
     application's observable behavior?"


==========================================================
21. SIDE EFFECT EXAMPLE
==========================================================


    // analytics.js

    console.log("Analytics initialized");

    export function track() {
        // ...
    }


Even if `track()` is not directly used, the module's
top-level `console.log()` is a side effect.


A bundler cannot blindly assume the entire module can be
removed without changing behavior.


This is why side-effect analysis is important.


==========================================================
22. package.json AND SIDE EFFECTS
==========================================================

Some package ecosystems allow packages to communicate
side-effect information to bundlers through metadata such
as:


    "sideEffects": false


This tells compatible tooling that modules are intended to
be free of side effects in the relevant sense, allowing
more aggressive optimization.


Example:


    {
      "sideEffects": false
    }


IMPORTANT:

- This should only be declared when it is actually true
  for the package.

- Incorrectly marking side-effectful modules as
  side-effect-free can cause required code to be removed
  and break an application.


==========================================================
23. TREE SHAKING AND NODE.JS
==========================================================

This is another important distinction.


Tree shaking is primarily associated with:

    Build tools
    +
    Bundlers
    +
    Static analysis


It is NOT simply a feature of the Node.js runtime.


For example:


    Node.js
       |
       v
    Runs JavaScript


while:


    Bundler
       |
       v
    Analyzes modules
       |
       v
    Tree shakes
       |
       v
    Creates optimized bundle


So don't say:


    "Node.js performs tree shaking when executing code."


Better:


    "Tree shaking is generally performed by build tools
     and bundlers during the build process."


==========================================================
24. DOES NODE.JS NEED TREE SHAKING?
==========================================================

For a normal Node.js application, the situation differs
from browser bundling.


A Node.js application can load modules directly without
necessarily creating one browser bundle.


However, Node.js applications can still use bundlers and
build tools.


For example:


    Node.js application
           |
           v
       Bundler
           |
           v
      Tree shaking
           |
           v
      Optimized output


So tree shaking is not inherently a "Node.js runtime
feature."


==========================================================
25. TREE SHAKING AND BROWSER APPLICATIONS
==========================================================

Tree shaking is especially valuable in frontend
applications because JavaScript is sent to users.


Example:


    Source code
         |
         v
      Bundler
         |
         v
    Tree shaking
         |
         v
    Smaller bundle
         |
         v
      Browser
         |
         v
    Less JavaScript to download


This can improve loading performance.


==========================================================
26. IMPORTANT:
   TREE SHAKING DOES NOT GUARANTEE SMALLER CODE
==========================================================

Tree shaking can reduce bundle size, but the actual result
depends on:

    - Module format
    - Bundler
    - Code structure
    - Side effects
    - Static analyzability
    - Build configuration
    - Minification
    - Dependencies


So don't say:


    "Using export automatically removes unused code."


Instead:


    "Using ESM makes code suitable for tree shaking, and a
     compatible bundler can remove unused code during the
     build."


==========================================================
27. TREE SHAKING COMPLETE FLOW
==========================================================


                Source Code
                     |
                     v
              import / export
                     |
                     v
                Bundler
                     |
                     v
              Module Graph
                     |
                     v
             Static Analysis
                     |
          +----------+----------+
          |                     |
          v                     v
      Used Code             Unused Code
          |                     |
          v                     v
       KEEP                  REMOVE
          |                     |
          +----------+----------+
                     |
                     v
              Optimized Bundle
                     |
                     v
                Minification
                     |
                     v
              Final Output


==========================================================
28. ESM TREE SHAKING EXAMPLE
==========================================================


    // utils.js

    export function add(a, b) {
        return a + b;
    }

    export function subtract(a, b) {
        return a - b;
    }

    export function multiply(a, b) {
        return a * b;
    }


                    |
                    |
                    v


    // app.js

    import { add } from "./utils.js";

    add(2, 3);


                    |
                    v


              STATIC ANALYSIS
                    |
          +---------+---------+
          |                   |
          v                   v
        add()            subtract()
        USED               UNUSED
                              |
                              v
                         multiply()
                           UNUSED


                    |
                    v


             FINAL BUNDLE
                    |
                    +-- add()


==========================================================
29. COMMONJS EXAMPLE
==========================================================


    // utils.js

    module.exports = {
        add,
        subtract,
        multiply
    };


    // app.js

    const utils = require("./utils");

    utils.add(2, 3);


                    |
                    v

              CommonJS module
                    |
                    v
            Runtime-oriented
               loading
                    |
                    v
          Harder static analysis
                    |
                    v
       Less reliable tree shaking


IMPORTANT:

This does NOT mean a bundler can never optimize
CommonJS. It means CommonJS is generally much harder to
analyze and optimize reliably than ESM.


==========================================================
30. INTERVIEW QUESTION:
    Why does ESM support tree shaking?
==========================================================

Answer:


"ES Modules use statically analyzable import and export
syntax. Because the relationships between modules and
exports can be determined during the build, bundlers can
identify unused exports and remove them from the final
bundle when it is safe to do so."


==========================================================
31. INTERVIEW QUESTION:
    Why is CommonJS less suitable for tree shaking?
==========================================================

Answer:


"CommonJS uses runtime-oriented constructs such as
`require()` and can access exports dynamically. This makes
it harder for bundlers to determine exactly which exports
are used at build time. Therefore, ESM is generally much
more tree-shaking-friendly."


==========================================================
32. INTERVIEW QUESTION:
    Is tree shaking done by JavaScript?

Answer:


"Tree shaking is not a JavaScript language feature and is
not normally performed by the JavaScript runtime itself.
It is a build-time optimization performed by compatible
bundlers/build tools using static analysis."


==========================================================
33. INTERVIEW QUESTION:
    Does import automatically perform tree shaking?

Answer:


"No. Using ESM makes code statically analyzable and
tree-shaking-friendly, but the actual removal of unused
code is performed by a compatible build tool or bundler
during the build."


==========================================================
34. INTERVIEW QUESTION:
    What is the difference between tree shaking and
    minification?

Answer:


"Tree shaking removes unused code, while minification
reduces the size of the code that remains, for example by
shortening identifiers and removing unnecessary characters."


==========================================================
35. INTERVIEW QUESTION:
    What is a side effect?

Answer:


"A side effect is an observable action performed by code
that can affect behavior outside of simply producing a
return value."


Examples:


    console.log("Hello");

    document.body.appendChild(element);

    globalValue = 10;

    databaseConnection();

These operations can have observable effects.


==========================================================
36. MOST IMPORTANT CORRECTIONS TO YOUR ORIGINAL NOTES
==========================================================

Your original:

    "Without tree shaking → both add and subtract go
     into the bundle."


Better:


    "Without tree shaking, unused exports may remain in
     the generated bundle."


Why?

Because the exact output depends on the bundler,
configuration, optimization settings, module format,
and other transformations.


----------------------------------------------------------

Your original:

    "CommonJS does not support tree shaking."


Better:


    "CommonJS is less suitable for reliable tree shaking
     because its runtime-oriented and dynamic nature makes
     static analysis harder. ESM is much more
     tree-shaking-friendly."


----------------------------------------------------------

Your original:

    "require() is dynamic."


Better:


    "`require()` is a runtime expression and CommonJS
     permits dynamic patterns, which can make static
     analysis harder."


----------------------------------------------------------

Your original:

    "Tree shaking removes unused exports."


Better:


    "Tree shaking is a build-time optimization that uses
     static analysis to identify code that is unused and
     can safely be removed from the generated bundle."


==========================================================
37. SHORT INTERVIEW ANSWER
==========================================================

Q. What is Tree Shaking?


"Tree shaking is a build-time code optimization technique
used by JavaScript bundlers to remove unused code from the
final bundle.

It relies heavily on static analysis of ES Module
`import` and `export` statements. Because ESM has a
statically analyzable module structure, bundlers can
determine which exports are actually used and remove
unused code when it is safe.

CommonJS is less suitable for tree shaking because
`require()` and CommonJS exports can be used dynamically.

The main benefits are smaller bundles, less JavaScript to
download, and potentially better application loading
performance."


==========================================================
38. ONE-LINE DEFINITION
==========================================================

"Tree shaking removes unused code from a JavaScript bundle
at build time using static analysis."


==========================================================
39. MEMORY TRICK
==========================================================


            TREE SHAKING
                  |
                  v
           Build-time process
                  |
                  v
           Static analysis
                  |
                  v
             ESM import
                  +
             ESM export
                  |
                  v
         Identify unused code
                  |
                  v
        Remove safely unused code
                  |
                  v
          Smaller final bundle


==========================================================
40. FINAL REVISION NOTES
==========================================================

Tree Shaking:

    - Build-time optimization
    - Performed by bundlers/build tools
    - Uses static analysis
    - Removes safely unused code
    - Reduces bundle size
    - ESM is tree-shaking-friendly
    - CommonJS is harder to analyze
    - Does not automatically happen just because you use
      `import`
    - Side effects can prevent safe removal
    - Different from minification
    - Especially useful for browser/frontend bundles


==========================================================
FINAL ONE-LINER FOR INTERVIEW
==========================================================

"Tree shaking is a build-time optimization technique in
which bundlers use static module analysis, especially with
ES Modules, to remove code that is not needed by the final
application, resulting in a smaller optimized bundle."


==========================================================
*/


/*
==========================================================
@ REQUIRE() vs IMPORT IN NODE.JS
==========================================================

Q. What is the difference between require() and import?
==========================================================

Node.js supports two major JavaScript module systems:

1. CommonJS (CJS)
2. ES Modules (ESM)

CommonJS uses:

    require()
    module.exports
    exports


ES Modules use:

    import
    export


The most important difference to understand is:

    WHEN and HOW the module is resolved,
    loaded, linked, evaluated, and made available
    to the current module.


==========================================================
1. COMMONJS vs ES MODULES
==========================================================


                 NODE.JS MODULE SYSTEMS
                         |
             +-----------+-----------+
             |                       |
             v                       v
        CommonJS                    ESM
             |                       |
             v                       v
        require()                 import
        module.exports             export
             |                       |
             v                       v
      Runtime-oriented       Statically declared
      module loading         module dependencies


CommonJS:

    const math = require("./math");


ESM:

    import { add } from "./math.js";


==========================================================
2. WHAT IS require()?
==========================================================

- require() is the CommonJS module-loading mechanism.

- It is used to load/import:

    1. Built-in Node.js modules
    2. Local/custom modules
    3. Third-party packages


Examples:

    const fs = require("fs");

    const math = require("./math");

    const express = require("express");


----------------------------------------------------------
IMPORTANT
----------------------------------------------------------

require() is a runtime-oriented operation.

That means the require() call is part of the execution of
the CommonJS module.


Example:


    console.log("1");

    const math = require("./math");

    console.log("2");


When Node executes the file, it reaches:

    require("./math")


At that point, Node performs the CommonJS module-loading
process and then continues execution.


==========================================================
3. HOW require() WORKS INTERNALLY - SIMPLE VIEW
==========================================================


    app.js
       |
       v
    Node starts executing app.js
       |
       v
    console.log("1")
       |
       v
    require("./math")
       |
       v
    Resolve module path
       |
       v
    Check module cache
       |
       +--------------------+
       |                    |
       | already cached      | not cached
       |                    |
       v                    v
    return cached       Load module
    exports                 |
                            v
                       Execute module
                            |
                            v
                       module.exports
                            |
                            v
                       Store in cache
                            |
                            v
                       Return exports
       |
       v
    Continue app.js
       |
       v
    console.log("2")


==========================================================
4. require() EXAMPLE
==========================================================


---------------------------
math.js
---------------------------

    console.log("math.js executing");

    function add(a, b) {
        return a + b;
    }

    module.exports = {
        add
    };


---------------------------
app.js
---------------------------

    console.log("Before require");

    const math = require("./math");

    console.log("After require");

    console.log(math.add(10, 20));


Output:


    Before require
    math.js executing
    After require
    30


Why?

Because execution reaches:

    require("./math")


Node loads/evaluates math.js and then returns its
module.exports.


==========================================================
5. IMPORTANT POINT ABOUT require()
==========================================================

When we say:

    require() loads a module at runtime

we mean:

    require() is executed as part of the CommonJS module's
    runtime execution.

It is NOT simply:

    "The module is downloaded at the exact moment the
     function is called."

Node's module system also performs resolution, caching,
and module evaluation.


A better interview statement is:

    "CommonJS require() is a runtime-oriented,
     synchronous module-loading mechanism."


==========================================================
6. require() IS SYNCHRONOUS
==========================================================

Example:


    const math = require("./math");

    console.log(math.add(10, 20));


The current CommonJS execution waits for the require()
operation to complete before the next statement executes.


Conceptually:


    require("./math")
          |
          v
    Resolve module
          |
          v
    Load / evaluate module if needed
          |
          v
    Return exports
          |
          v
    Continue execution


Therefore:

    require()
        |
        v
    synchronous CommonJS loading


==========================================================
7. require() AND MODULE CACHE
==========================================================

Node.js caches a CommonJS module after it has been loaded
and evaluated.


Example:


    const math1 = require("./math");

    const math2 = require("./math");


The second require() normally does not execute math.js
again.


Conceptually:


    First require()
          |
          v
    Load math.js
          |
          v
    Execute math.js
          |
          v
    Cache exports
          |
          v
    Return exports


    Second require()
          |
          v
    Check cache
          |
          v
    Found
          |
          v
    Return cached exports


So:


    require("./math")
          |
          v
       CACHE
          |
          v
    Avoid re-evaluating
    the module again


==========================================================
8. WHAT IS import?
==========================================================

There are actually two different concepts that are
important:

1. Static import
2. Dynamic import()


They should NOT be treated as the same thing.


----------------------------------------------------------
STATIC IMPORT
----------------------------------------------------------

Example:


    import { add } from "./math.js";


Static import is part of the ES Module syntax.


----------------------------------------------------------
DYNAMIC IMPORT
----------------------------------------------------------

Example:


    const math = await import("./math.js");


Dynamic import() is an expression that loads an ES module
asynchronously.


==========================================================
9. STATIC import
==========================================================

Example:


    import { add } from "./math.js";

    console.log(add(10, 20));


The important difference is:

    static import is NOT a normal runtime function call.


This:

    import { add } from "./math.js";


is part of the module's declared dependency structure.


It tells the ESM loader:

    "This module depends on ./math.js and needs
     the add export."


==========================================================
10. HOW STATIC import WORKS
==========================================================

Suppose we have:


---------------------------
app.js
---------------------------

    import { add } from "./math.js";

    console.log("app.js executing");

    console.log(add(10, 20));


---------------------------
math.js
---------------------------

    console.log("math.js executing");

    export function add(a, b) {
        return a + b;
    }


The ESM loader conceptually performs:


    app.js
       |
       | import
       v
    math.js
       |
       v
    Resolve dependency
       |
       v
    Load module
       |
       v
    Link modules
       |
       v
    Evaluate modules
       |
       v
    Execute module bodies


The important point is:

    Static imports are handled as part of ESM's
    module loading / resolution / linking process,
    before the importing module's body is evaluated.


==========================================================
11. DO NOT SAY:
==========================================================

Avoid saying:

    "import is compile-time."

This is an oversimplification.


JavaScript ESM is not exactly like C/C++ compilation.


Better answer:


    "Static import declarations are resolved and linked
     by the ESM loader before the importing module's body
     is evaluated."


This is technically more accurate.


==========================================================
12. require() vs STATIC import
==========================================================


COMMONJS:


    console.log("A");

    const math = require("./math");

    console.log("B");


Conceptually:


    Execute app.js
         |
         v
    console.log("A")
         |
         v
    require("./math")
         |
         v
    Load/evaluate math
         |
         v
    Return exports
         |
         v
    console.log("B")


----------------------------------------------------------

ESM:


    import { add } from "./math.js";

    console.log("A");


Conceptually:


    ESM loading
         |
         v
    Resolve dependency
         |
         v
    Link dependency
         |
         v
    Evaluate modules
         |
         v
    Execute app.js body
         |
         v
    console.log("A")


==========================================================
13. STATIC import CANNOT BE USED LIKE require()
==========================================================

This is invalid:


    if (isProduction) {

        import logger from "./logger.js";

    }


Why?

Because static import declarations are part of the
module's static dependency structure.


They cannot simply be executed conditionally as a normal
statement.


==========================================================
14. require() CAN BE USED CONDITIONALLY
==========================================================

Example:


    if (isProduction) {

        const logger = require("./logger");

    }


This is allowed in CommonJS because require() is a
runtime-oriented operation.


Conceptually:


    Application starts
          |
          v
    Check condition
          |
       +--+--+
       |     |
     false  true
       |     |
       |     v
       |  require()
       |     |
       |     v
       |  load module
       |
       v
    Continue


==========================================================
15. DYNAMIC import()
==========================================================

ES Modules solve the conditional/dynamic loading problem
using:


    import()


Example:


    if (isProduction) {

        const logger =
            await import("./logger.js");

    }


This is called:

    Dynamic import


IMPORTANT:

    import()
    
is different from:

    import x from "./x.js";


==========================================================
16. STATIC import vs DYNAMIC import()
==========================================================


STATIC:


    import { add } from "./math.js";


Characteristics:

    - ESM syntax
    - Static declaration
    - Dependency is known from module source
    - Used as part of ESM module loading/linking
    - Good for static analysis
    - Tree-shaking friendly


DYNAMIC:


    const math = await import("./math.js");


Characteristics:

    - ESM feature
    - Runtime request
    - Asynchronous
    - Returns a Promise
    - Can be used conditionally
    - Useful for lazy loading / code splitting


==========================================================
17. import() RETURNS A PROMISE
==========================================================

Example:


    const math = import("./math.js");


The result is a Promise.


Conceptually:


    import("./math.js")
           |
           v
        Promise
           |
           v
    Module namespace object


Therefore:


    const math = await import("./math.js");


After await, math contains the module's exports.


Example:


---------------------------
math.js
---------------------------

    export function add(a, b) {
        return a + b;
    }


---------------------------
app.js
---------------------------

    const math = await import("./math.js");

    console.log(math.add(10, 20));


==========================================================
18. WHY import() IS ASYNCHRONOUS
==========================================================

Dynamic import is designed to load modules asynchronously.


Flow:


    Application running
          |
          v
    import("./math.js")
          |
          v
    Promise returned
          |
          v
    Module loading
          |
          v
    Module evaluated
          |
          v
    Promise fulfilled
          |
          v
    Module namespace returned


Therefore:


    require()
        |
        v
    synchronous


    import()
        |
        v
    asynchronous
        |
        v
    Promise


==========================================================
19. THREE DIFFERENT THINGS TO REMEMBER
==========================================================


                MODULE LOADING
                     |
        +------------+------------+
        |            |            |
        v            v            v
     require()    import ...    import()
        |            |            |
        v            v            v
   CommonJS       ESM          ESM
        |            |            |
        v            v            v
   Runtime        Static       Dynamic
   oriented       import       import
        |            |            |
        v            v            v
 Synchronous   Dependency     Asynchronous
                declared       Promise


==========================================================
20. require() vs import — CORE DIFFERENCE
==========================================================


    require()
       |
       v
    CommonJS
       |
       v
    Runtime-oriented
       |
       v
    Synchronous
       |
       v
    Can be used conditionally
       |
       v
    module.exports


----------------------------------------------------------

    import
       |
       v
    ES Modules
       |
       v
    Static dependency declaration
       |
       v
    Resolved / linked before
    importing module body evaluation
       |
       v
    export


----------------------------------------------------------

    import()
       |
       v
    ES Modules
       |
       v
    Dynamic loading
       |
       v
    Asynchronous
       |
       v
    Promise
       |
       v
    Can be used conditionally


==========================================================
21. WHY ESM IS BETTER FOR TREE SHAKING
==========================================================

This is directly related to your previous
Tree Shaking topic.


Example:


---------------------------
math.js
---------------------------

    export function add(a, b) {
        return a + b;
    }

    export function subtract(a, b) {
        return a - b;
    }

    export function multiply(a, b) {
        return a * b;
    }


---------------------------
app.js
---------------------------

    import { add } from "./math.js";


The bundler can analyze the static relationship:


    app.js
       |
       | imports add
       v
    math.js
       |
       +---- add()       <-- USED
       |
       +---- subtract()  <-- UNUSED
       |
       +---- multiply()  <-- UNUSED


Therefore, a bundler may remove unused code when it can
prove that doing so is safe.


This is called:

    Tree Shaking


==========================================================
22. WHY CommonJS IS HARDER TO TREE SHAKE
==========================================================

Example:


    const math = require("./math");

    math.add();


CommonJS allows more dynamic patterns.


For example:


    const method = "add";

    const math = require("./math");

    math[method]();


Or:


    const moduleName = getModuleName();

    const math = require(moduleName);


Because these patterns can be dynamic, it can be harder
for a bundler to know exactly which modules/exports are
required.


Therefore:


    ESM
      |
      v
    Static structure
      |
      v
    Easier static analysis
      |
      v
    Better tree shaking


Whereas:


    CommonJS
      |
      v
    More runtime-oriented / dynamic patterns
      |
      v
    Harder static analysis
      |
      v
    Less tree-shaking-friendly


IMPORTANT:

Do NOT say:

    "CommonJS can never be optimized."


Better:


    "CommonJS is generally less suitable for reliable
     tree shaking than ESM."


==========================================================
23. require() MODULE RESOLUTION
==========================================================

When Node encounters:


    require("./math");


Node needs to determine what module that path refers to.


Conceptually:


    require("./math")
           |
           v
    Resolve module
           |
           v
    Is it cached?
       /         \
     YES          NO
      |            |
      v            v
 Return cache   Load module
                   |
                   v
              Execute module
                   |
                   v
             module.exports
                   |
                   v
                Cache
                   |
                   v
             Return exports


Node's actual resolution rules are more detailed, but this
is the useful conceptual model.


==========================================================
24. require() AUTO RESOLUTION
==========================================================

For local CommonJS modules, Node can resolve certain
extensions automatically in applicable CommonJS resolution
cases.


Example:


    const math = require("./math");


can resolve a corresponding JavaScript file such as:


    ./math.js


So you commonly don't need:


    require("./math.js");


although explicit extensions may be used depending on the
project/module system.


IMPORTANT:

Do not generalize this behavior to ESM.


==========================================================
25. ESM IMPORT PATHS
==========================================================

With ESM, local relative imports commonly use the explicit
file extension:


    import { add } from "./math.js";


This differs from the traditional CommonJS:


    const math = require("./math");


This is one of the practical differences developers notice
when moving from CommonJS to ESM.


==========================================================
26. EXPORTING WITH CommonJS
==========================================================


math.js:


    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    module.exports = {
        add,
        subtract
    };


Importing:


    const math = require("./math");

    console.log(math.add(10, 20));


Or destructure:


    const { add } = require("./math");

    console.log(add(10, 20));


==========================================================
27. EXPORTING WITH ESM
==========================================================


math.js:


    export function add(a, b) {
        return a + b;
    }

    export function subtract(a, b) {
        return a - b;
    }


Importing:


    import { add } from "./math.js";

    console.log(add(10, 20));


The syntax itself clearly expresses which export is being
requested.


==========================================================
28. NAMED EXPORT
==========================================================

ESM:


    export function add() {}

    export function subtract() {}


Import:


    import { add, subtract } from "./math.js";


You can import only the bindings you need.


Conceptually:


    math.js
       |
       +-- add
       +-- subtract


    app.js
       |
       +-- imports add


This explicit module relationship is useful for static
analysis.


==========================================================
29. DEFAULT EXPORT
==========================================================

ESM also supports:


    export default function add(a, b) {
        return a + b;
    }


Import:


    import add from "./math.js";


Default export and named exports are different ESM
concepts.


==========================================================
30. NODE.JS CONFIGURATION FOR ESM
==========================================================

Node.js supports both CommonJS and ESM.


For example, a package can use:


    {
        "type": "module"
    }


Then `.js` files in that package are treated as ES modules
unless otherwise specified by Node's module rules.


Another common option is using:


    .mjs


for ES modules.


CommonJS can use:


    .cjs


when an explicit CommonJS extension is useful.


So:


    .js + "type": "module"
             |
             v
           ESM


    .cjs
      |
      v
    CommonJS


==========================================================
31. VERY IMPORTANT:
    "import is always asynchronous"
==========================================================

This statement is often seen but is misleading.


Static import:


    import { add } from "./math.js";


should NOT simply be described as:


    "import is asynchronous"


The important distinction is:


    STATIC import
        |
        v
    ESM module loading/linking
        |
        v
    Before importing module body evaluation


while:


    DYNAMIC import()
        |
        v
    Asynchronous
        |
        v
    Promise


Therefore, in an interview, say:


    "Dynamic import() is asynchronous and returns a
     Promise."


For static import, explain the ESM module loading/linking
model rather than simply calling it synchronous or
asynchronous.


==========================================================
32. require() vs import() — VERY SIMPLE
==========================================================


require:


    const fs = require("fs");


Think:


    "At runtime, execute require and get the module."


----------------------------------------------------------

static import:


    import fs from "fs";


Think:


    "This module declares that it depends on fs."


----------------------------------------------------------

dynamic import:


    const fs = await import("fs");


Think:


    "At runtime, dynamically load this ESM module."


==========================================================
33. SIDE-BY-SIDE EXAMPLE
==========================================================


COMMONJS:


    // app.js

    console.log("START");

    const math = require("./math");

    console.log("END");


Conceptually:


    START
      |
      v
    require()
      |
      v
    load/evaluate math
      |
      v
    END


----------------------------------------------------------

ESM:


    // app.js

    import { add } from "./math.js";

    console.log("START");


Conceptually:


    ESM loader
       |
       v
    Resolve math.js
       |
       v
    Link dependency
       |
       v
    Evaluate modules
       |
       v
    Execute app.js
       |
       v
    START


----------------------------------------------------------

DYNAMIC ESM:


    // app.js

    console.log("START");

    const math = await import("./math.js");

    console.log("END");


Conceptually:


    START
      |
      v
    import()
      |
      v
    Promise
      |
      v
    Load/evaluate module
      |
      v
    await
      |
      v
    END


==========================================================
34. WHEN SHOULD I USE require()?
==========================================================

Use CommonJS require() when:

    - Working in an existing CommonJS project
    - The project uses module.exports
    - The package/module configuration is CommonJS
    - You need CommonJS-specific compatibility


Example:


    const express = require("express");


==========================================================
35. WHEN SHOULD I USE import?
==========================================================

Use ESM when:

    - Starting a modern Node.js project
    - The project uses ESM
    - You want standard JavaScript modules
    - You want static import/export syntax
    - You want strong compatibility with modern tooling
    - You want a module structure that is friendly to
      static analysis and tree shaking


Example:


    import express from "express";


==========================================================
36. WHEN SHOULD I USE dynamic import()?
==========================================================

Dynamic import is useful when the module is not needed
immediately.


Examples:

    - Conditional functionality
    - Lazy loading
    - Code splitting
    - Loading optional functionality
    - Loading a module based on runtime information


Example:


    if (usePDF) {

        const pdfModule =
            await import("./pdf.js");

    }


==========================================================
37. COMPLETE COMPARISON TABLE
==========================================================


    Feature             require()       static import     import()
    ----------------------------------------------------------------
    Module system       CommonJS        ESM               ESM
    Syntax              function-like   declaration       expression
    Loading model       runtime         static ESM        dynamic
    Synchronous?        Yes*             ESM loader        No
    Promise?             No              No direct         Yes
    Conditional?         Yes             No                Yes
    module.exports       Yes             No                No
    export               No              Yes               Yes
    Tree shaking         Harder          Friendly          Depends
    Static analysis      Harder          Strong            More dynamic
    Lazy loading         Possible        Not by itself     Yes


* `require()` is synchronous from the perspective of the
  CommonJS module execution.


==========================================================
38. MOST IMPORTANT CONCEPT
==========================================================

Remember this:


    require()
       |
       v
    "LOAD THIS MODULE NOW AS PART OF
     COMMONJS EXECUTION"
       |
       v
    Runtime-oriented
       |
       v
    Synchronous


----------------------------------------------------------

    import ...
       |
       v
    "THIS MODULE DEPENDS ON THAT MODULE"
       |
       v
    Static dependency declaration
       |
       v
    ESM loader resolves/links dependencies
       |
       v
    Before importing module body evaluation


----------------------------------------------------------

    import()
       |
       v
    "LOAD THIS MODULE DYNAMICALLY"
       |
       v
    Runtime
       |
       v
    Asynchronous
       |
       v
    Promise


==========================================================
39. INTERVIEW-READY ANSWER
==========================================================

Q. What is the difference between require() and import?

Answer:


"require() is the CommonJS module-loading mechanism in
Node.js. It is runtime-oriented and synchronous. When
execution reaches a require() call, Node resolves the
module, loads and evaluates it if necessary, and returns
its exports. CommonJS uses module.exports and exports."


"Static import belongs to the ES Module system. Its
dependencies are declared statically, and Node's ESM loader
resolves and links those dependencies as part of module
loading before the importing module's body is evaluated.
ESM uses import/export syntax and is more suitable for
static analysis and tree shaking."


"For dynamic runtime loading in ESM, we use import().
Dynamic import() is asynchronous and returns a Promise."


==========================================================
40. VERY SHORT INTERVIEW VERSION
==========================================================


    require()
        =
    CommonJS
        =
    Runtime-oriented
        =
    Synchronous


    import
        =
    ESM
        =
    Static dependency
        =
    Resolved / linked before module evaluation


    import()
        =
    Dynamic ESM
        =
    Asynchronous
        =
    Promise


==========================================================
41. ONE FINAL DIAGRAM TO REMEMBER
==========================================================


                    NODE.JS
                       |
             +---------+---------+
             |                   |
             v                   v
        CommonJS                ESM
             |                   |
             v                   |
        require()               |
             |                   |
             v                   |
     Runtime-oriented            |
             |                   |
             v                   |
       Synchronous               |
             |                   |
             v                   |
     module.exports              |
                                 |
                       +---------+---------+
                       |                   |
                       v                   v
                static import          import()
                       |                   |
                       v                   v
                  Static ESM          Dynamic ESM
                       |                   |
                       v                   v
                Resolve/link          Runtime load
                dependencies               |
                       |                   v
                       v                Promise
                Before importing
                module body
                evaluation




# Not exactly. require() and dynamic import() are similar in purpose, but they are NOT the same.
- require() — synchronous : it loads/evaluates the module if necessary and returns the exports directly. : equire() gives you the module directly.
- Dynamic import() — asynchronous :import() gives you a Promise, which eventually gives you the module.
- normal import is static : Static means that the module dependency is known from the code itself before the actual execution of that module's code.

    app.js
  |
  | import "./math.js"
  ↓
ES Module Loader
  |
  ↓
math.js शोधतो / resolve करतो
  |
  ↓
math.js load करतो
  |
  ↓
math.js evaluate करतो
  |
  ↓
dependencies link होतात
  |
  ↓
app.js चा actual code execute होतो




require()                    dynamic import()
   |                              |
   v                              v
CommonJS                        ES Module
   |                              |
   v                              v
Runtime loading              Runtime loading
   |                              |
   v                              v
Synchronous                   Asynchronous
   |                              |
   v                              v
Returns exports              Returns Promise


==========================================================
42. FINAL MEMORY TRICK
==========================================================


    require()
        |
        v
    "REQUIRE IT WHEN EXECUTION
     REACHES THIS CALL"
        |
        v
    CommonJS


    import
        |
        v
    "DECLARE THE DEPENDENCY"
        |
        v
    ESM

# dynamcaiily import

    import()
        |
        v
    "IMPORT IT DYNAMICALLY WHEN
     THE APPLICATION NEEDS IT"
        |
        v
    Promise



    Static import मध्ये ESM Loader ला module dependency आधीच माहिती असते. तो module resolve/load/link/evaluate करतो आणि त्यानंतर importing module चा body evaluate/execute होतो.

==========================================================
*/