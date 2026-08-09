/*
============================================================
# MODULE WRAPPER FUNCTION IN NODE.JS
============================================================


Q. What is the Module Wrapper Function in Node.js?
------------------------------------------------------------

- The Module Wrapper Function is an internal mechanism used
  by Node.js for CommonJS modules.

- In CommonJS, before Node.js executes the code of a module,
  Node.js wraps that module's code inside a function.

- This gives every CommonJS module its own private function
  scope.

- Conceptually, Node.js does something similar to:

    (function (exports, require, module, __filename, __dirname) {

        // Your module code

    });


- Node.js then invokes this function internally.

- Developers normally do NOT write this wrapper themselves.

- You can think of it as an IIFE-like mechanism, because
  Node.js creates the function and executes it for the module.

- More precisely:

    Module code
        ↓
    Node.js wraps the code
        ↓
    Wrapper function
        ↓
    Node.js invokes the wrapper
        ↓
    Module code executes

============================================================
# IMPORTANT CLARIFICATION
============================================================

- The wrapper function is mainly associated with the
  CommonJS module system.

- Do NOT think that every JavaScript file in every
  JavaScript environment is physically wrapped this way.

- This is a Node.js CommonJS implementation mechanism.

- ES Modules (ESM) use a different module system and do not
  use the CommonJS wrapper variables such as:

    require
    module
    exports
    __filename
    __dirname


============================================================
# WHAT DOES THE WRAPPER LOOK LIKE?
============================================================

Suppose we have:

    // index.js

    const name = "Vishal";

    console.log(name);


Conceptually, Node.js executes something similar to:

    (function (
        exports,
        require,
        module,
        __filename,
        __dirname
    ) {

        const name = "Vishal";

        console.log(name);

    });


- Node.js supplies the arguments internally.

- You normally do NOT write:

    (function (...) {
        ...
    })();


- Node.js handles this internally for CommonJS modules.


============================================================
# WHY DOES NODE.JS WRAP THE FILE?
============================================================

The most important reason is:

    PRIVATE MODULE SCOPE


Example:

    // file1.js

    const name = "Vishal";


    // file2.js

    const name = "Rahul";


- Both files can have a variable called `name`.

- They do not automatically overwrite each other's variable.

Conceptually:

    file1.js
       |
       v
    +----------------------+
    | Module Wrapper       |
    |                      |
    | const name = Vishal  |
    +----------------------+


    file2.js
       |
       v
    +----------------------+
    | Module Wrapper       |
    |                      |
    | const name = Rahul   |
    +----------------------+


- Each CommonJS module gets its own function scope.


============================================================
# WHAT PROBLEM DOES THE WRAPPER SOLVE?
============================================================

Without module-level isolation, variables declared at the
top level could interfere with variables from other files.

The wrapper gives:

    File A
      ↓
    Private scope


    File B
      ↓
    Different private scope


Therefore:

    File A variables
          X
          |
          | cannot directly access
          v
    File B variables


- This provides module isolation and helps prevent unwanted
  global namespace pollution.


============================================================
# THE 5 PARAMETERS OF THE MODULE WRAPPER
============================================================

Conceptually, the CommonJS wrapper looks like:

    (function (
        exports,
        require,
        module,
        __filename,
        __dirname
    ) {

        // module code

    });


The five parameters are:

    1. exports
    2. require
    3. module
    4. __filename
    5. __dirname


============================================================
# 1. exports
============================================================

- `exports` is a convenient reference to the module's
  `module.exports` object when the module starts.

Example:

    exports.add = function(a, b) {
        return a + b;
    };


This exposes `add` from the CommonJS module.


Important:

    exports
       |
       v
    module.exports


Initially, they refer to the same exports object.

But:

    exports = something;

does NOT replace `module.exports`.

Whereas:

    module.exports = something;

changes the actual exported value.


Example:

    exports.add = add;

    // works


    module.exports = add;

    // also works, but replaces the exports object/value


Therefore, remember:

    exports.add = add;
          ↓
    adds a property


    module.exports = add;
          ↓
    replaces the exported value


============================================================
# 2. require
============================================================

- `require` is used in CommonJS to load/import another
  module.

Example:

    const fs = require("fs");


or:

    const math = require("./math");


Conceptually, the wrapper provides `require` to the module:

    function (
        exports,
        require,    <-- available here
        module,
        __filename,
        __dirname
    ) {

        const math = require("./math");

    }


- Therefore, `require` is available inside a CommonJS module
  without you having to define it yourself.


============================================================
# 3. module
============================================================

- `module` represents the current CommonJS module.

Example:

    console.log(module);


- It contains information about the current module and its
  exports.

Important properties can include:

    module.exports
    module.filename
    module.id
    module.loaded
    module.children
    module.paths


Most importantly:

    module.exports


is the value that the module exposes to another CommonJS
module.


Example:

    function add(a, b) {
        return a + b;
    }

    module.exports = {
        add
    };


Then another module can do:

    const math = require("./math");


============================================================
# 4. __filename
============================================================

- `__filename` gives the absolute path of the current
  CommonJS module file.

Example:

    console.log(__filename);


Conceptually:

    project/
       |
       +-- src/
            |
            +-- app.js

Inside app.js:

    console.log(__filename);


will give the path to `app.js`.


Example conceptually:

    D:\project\src\app.js


- The exact path depends on your operating system and
  project location.


============================================================
# 5. __dirname
============================================================

- `__dirname` gives the absolute path of the directory
  containing the current CommonJS module.

Example:

    console.log(__dirname);


If:

    __filename

is:

    D:\project\src\app.js


then:

    __dirname

is conceptually:

    D:\project\src


Difference:

    __filename
        ↓
    Full path of current FILE


    __dirname
        ↓
    Full path of current DIRECTORY


============================================================
# COMPLETE WRAPPER VISUALIZATION
============================================================

Suppose:

    // app.js

    const name = "Vishal";

    console.log(__filename);
    console.log(__dirname);


Conceptually Node.js does:

    +---------------------------------------------------+
    | Node.js CommonJS Module Wrapper                   |
    |                                                   |
    | (function (                                       |
    |     exports,                                     |
    |     require,                                     |
    |     module,                                      |
    |     __filename,                                  |
    |     __dirname                                    |
    | ) {                                               |
    |                                                   |
    |     const name = "Vishal";                       |
    |                                                   |
    |     console.log(__filename);                     |
    |     console.log(__dirname);                      |
    |                                                   |
    | })                                                |
    +---------------------------------------------------+


Node.js supplies:

    exports
    require
    module
    __filename
    __dirname


and then executes the wrapper.


============================================================
# HOW DOES THE MODULE WRAPPER WORK?
============================================================

Step 1:
------------------------------------------------------------

You create a file:

    // app.js

    const name = "Vishal";

    console.log(name);


Step 2:
------------------------------------------------------------

Node.js loads the CommonJS module.

    app.js
      |
      v
    Node.js Module System


Step 3:
------------------------------------------------------------

Node.js wraps the module code conceptually:

    (function (
        exports,
        require,
        module,
        __filename,
        __dirname
    ) {

        const name = "Vishal";

        console.log(name);

    });


Step 4:
------------------------------------------------------------

Node.js supplies the required arguments.

    exports
    require
    module
    __filename
    __dirname


Step 5:
------------------------------------------------------------

Node.js invokes the function.

    wrapperFunction(...arguments)


Step 6:
------------------------------------------------------------

The code executes inside that function's scope.


============================================================
# WHY CAN WE USE require() WITHOUT DEFINING IT?
============================================================

Normally in JavaScript, if we write:

    console.log(require);


you might ask:

    "Where did require come from?"


The answer is:

- In CommonJS, Node.js makes `require` available to the
  module through the module wrapper mechanism.

Conceptually:

    (function (
        exports,
        require,
        module,
        __filename,
        __dirname
    ) {

        // require is available here

    });


Therefore:

    const fs = require("fs");


works inside a CommonJS module.


============================================================
# WHY CAN WE USE __dirname AND __filename?
============================================================

For the same reason.

Node.js provides them through the CommonJS module context.

Conceptually:

    function (
        exports,
        require,
        module,
        __filename,
        __dirname
    ) {

        console.log(__dirname);
        console.log(__filename);

    }


So they are available inside the CommonJS module.


============================================================
# IS THE MODULE WRAPPER AN IIFE?
============================================================

- It is useful to understand it as IIFE-like behavior.

An IIFE is:

    (function () {

        console.log("Hello");

    })();


It means:

    1. Create a function.
    2. Immediately invoke the function.


Node's CommonJS module mechanism behaves similarly:

    (function (
        exports,
        require,
        module,
        __filename,
        __dirname
    ) {

        // module code

    })(...);


- However, the important point for interviews is:

    "Node.js wraps CommonJS module code in a function
     before executing it."


This is better than simply saying:

    "Node.js uses an IIFE."


============================================================
# MODULE WRAPPER AND GLOBAL OBJECT
============================================================

Important distinction:

    module
    exports
    require
    __filename
    __dirname


are NOT ordinary properties of the global object.

For example:

    console.log(global.module);


does not mean that `module` is globally available as a
normal global property.

Instead, CommonJS provides these names inside the module's
execution context.


Therefore:

    module
       ↓
    local to CommonJS module context


not:

    global
       |
       +-- module


============================================================
# MODULE WRAPPER AND ENCAPSULATION
============================================================

Example:

    // file1.js

    const secret = "12345";


    // file2.js

    console.log(secret); // ❌


Why?

Because `secret` belongs to the scope of file1's module.

Conceptually:

    file1.js
       |
       v
    +---------------------+
    | Wrapper Function    |
    |                     |
    | const secret = ...  |
    +---------------------+


    file2.js
       |
       v
    +---------------------+
    | Different Wrapper   |
    | Function            |
    +---------------------+


file2.js does not automatically have access to file1.js's
local variables.


This is module encapsulation.


============================================================
# MODULE WRAPPER + module.exports + require()
============================================================

These three concepts are strongly connected.

    Module Wrapper
          |
          +--------------------------+
          |                          |
          v                          v
      module                   require()
          |
          v
    module.exports
          |
          v
       exports
          |
          v
     Other module


Example:

    // math.js

    function add(a, b) {
        return a + b;
    }

    module.exports = {
        add
    };


Then:

    // app.js

    const math = require("./math");

    console.log(math.add(10, 20));


Conceptually:

    math.js
       |
       | module.exports
       v
    { add }
       |
       | require("./math")
       v
    app.js


============================================================
# MODULE WRAPPER AND MODULE CACHING
============================================================

- The wrapper is also part of how CommonJS modules are
  evaluated and managed.

- When a CommonJS module is loaded, Node.js evaluates the
  module and stores its module record in the module cache.

Example:

    const math1 = require("./math");
    const math2 = require("./math");


- For the same resolved module, Node.js normally returns the
  cached module rather than evaluating the module code again.


Conceptually:

    First require()
          |
          v
    Load module
          |
          v
    Execute wrapper
          |
          v
    Store in cache


    Second require()
          |
          v
       Cache
          |
          v
    Reuse module


============================================================
# IMPORTANT: MODULE WRAPPER IS COMMONJS
============================================================

CommonJS:

    module
    module.exports
    exports
    require
    __filename
    __dirname


ES Modules:

    import
    export
    import.meta


For example:

    // CommonJS

    console.log(module);
    console.log(__dirname);


In an ES Module, those CommonJS-specific names are not
provided in the same way.

Instead:

    console.log(import.meta.url);


can provide information about the current ES module.


============================================================
# COMMONJS vs ESM - WRAPPER VIEW
============================================================

            Node.js
               |
        +------+------+
        |             |
        v             v
    CommonJS         ESM
        |             |
        v             v
  Module wrapper   ESM module
        |             |
        |             +--> import
        |             +--> export
        |
        +--> exports
        +--> require
        +--> module
        +--> __filename
        +--> __dirname


============================================================
# IMPORTANT CORRECTION ABOUT "GLOBAL"
============================================================

You mentioned:

    "Which global objects in Node.js can be used directly?"

Be careful here.

There are two different concepts:

1. True/global runtime globals
2. CommonJS module-local variables


Examples of Node.js globals include:

    global
    process
    console
    Buffer
    setTimeout
    setInterval
    setImmediate


These can generally be accessed without importing them.


But these CommonJS-specific variables:

    require
    module
    exports
    __filename
    __dirname


are better understood as being provided in the CommonJS
module context rather than as ordinary global properties.

This distinction is important for interviews.


============================================================
# SIMPLE MEMORY TRICK
============================================================

Remember the five CommonJS wrapper parameters as:

    E R M F D

    E = exports
    R = require
    M = module
    F = __filename
    D = __dirname


Wrapper:

    (function (
        E = exports,
        R = require,
        M = module,
        F = __filename,
        D = __dirname
    ) {

        // code

    });


Or simply remember:

    exports
    require
    module
    __filename
    __dirname


============================================================
# INTERVIEW-READY ANSWER
============================================================

Q. What is the Module Wrapper Function in Node.js?
------------------------------------------------------------

- The Module Wrapper Function is an internal mechanism used
  by Node.js for CommonJS modules.

- Before executing a CommonJS module, Node.js conceptually
  wraps the module's code inside a function:

    (function (
        exports,
        require,
        module,
        __filename,
        __dirname
    ) {

        // module code

    });


- Node.js invokes this function internally.

- The wrapper gives each CommonJS module its own private
  scope and provides important module-specific variables
  such as `exports`, `require`, `module`, `__filename`, and
  `__dirname`.

- This helps provide encapsulation, module isolation, and
  prevents module-level variables from automatically
  polluting the global namespace.

- It is also part of the mechanism through which Node.js
  manages CommonJS modules and their execution.


============================================================
# VERY SHORT INTERVIEW ANSWER
============================================================

- Node.js uses a module wrapper function to wrap each
  CommonJS module before execution.

- The wrapper creates a private scope for the module and
  provides five important parameters:

    exports
    require
    module
    __filename
    __dirname

- This provides module isolation and enables the CommonJS
  module system.


============================================================
# FINAL VISUAL SUMMARY
============================================================

                 app.js
                   |
                   v
          Node.js CommonJS
           Module System
                   |
                   v
       +-----------------------+
       |   Module Wrapper      |
       |                       |
       | exports               |
       | require               |
       | module                |
       | __filename            |
       | __dirname             |
       |                       |
       | -------------------   |
       | Your module code      |
       +-----------------------+
                   |
                   v
              Execute code
                   |
                   v
          Private module scope


============================================================
# ONE-LINE MEMORY
============================================================

Node.js CommonJS does not simply execute your file directly;
it conceptually wraps the file in a function, supplies
module-related variables, and executes that function to give
the module its own scope and CommonJS functionality.

*/