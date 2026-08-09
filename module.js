/*
===========================================================
Q. What is a Module in Node.js?
===========================================================

- In Node.js, a module is a self-contained, reusable, and
  encapsulated unit of code.

- In CommonJS, Node.js treats each JavaScript file as a
  separate module.

- For example:

    math.js
    user.js
    server.js
    app.js

  Each file has its own module scope.

-----------------------------------------------------------
1. Every File is a Module
-----------------------------------------------------------

- In the CommonJS module system, every JavaScript file is
  treated as an independent module.

- Example:

  // math.js

  const a = 10;

  function add(x, y) {
      return x + y;
  }

- The variables and functions defined inside math.js are
  private to that module by default.

- Another file cannot directly access them.

  // app.js

  console.log(a);       // ❌ Cannot access directly
  console.log(add(10, 20)); // ❌ Cannot access directly

- If another module needs to use them, we must explicitly
  export them.

-----------------------------------------------------------
2. Why do we use Modules?
-----------------------------------------------------------

- Modules help us divide a large application into smaller
  and manageable pieces.

- Instead of putting the entire application code into one
  large file, we can separate functionality.

  Example:

  user.js       → User-related logic
  auth.js       → Authentication logic
  database.js   → Database logic
  payment.js    → Payment logic
  server.js     → Server logic

- This makes the application:

  - Modular
  - Reusable
  - Maintainable
  - Easier to test
  - Easier to debug
  - Easier to understand

-----------------------------------------------------------
3. Encapsulation
-----------------------------------------------------------

- One important purpose of modules is encapsulation.

- Encapsulation means keeping the internal implementation
  of a module private and exposing only what is required.

- Example:

  // math.js

  const secretNumber = 100;

  function add(a, b) {
      return a + b;
  }

  module.exports = {
      add
  };

- Here:

  add()        → exported
  secretNumber → not exported

- Therefore another file can use add():

  const { add } = require("./math");

  console.log(add(10, 20)); // 30

- But it cannot directly access secretNumber.

-----------------------------------------------------------
4. Exporting a Module
-----------------------------------------------------------

- If we want to make something available to another
  CommonJS module, we use module.exports.

  // math.js

  function add(a, b) {
      return a + b;
  }

  module.exports = {
      add
  };

-----------------------------------------------------------
5. Importing a Module
-----------------------------------------------------------

- Another CommonJS module can load the exported value using
  require().

  // app.js

  const math = require("./math");

  console.log(math.add(10, 20));

- So the basic CommonJS flow is:

      Module A
         |
         | module.exports
         v
      Export
         |
         v
      require()
         |
         v
      Module B

-----------------------------------------------------------
6. What is console.log(module)?
-----------------------------------------------------------

- In a CommonJS file, if we write:

    console.log(module);

- Node.js displays an object representing the current
  CommonJS module.

- This object contains information/metadata about the
  current module.

- Example output can look similar to:

  {
      id: '.',
      path: 'D:\\Node\\project',
      exports: {},
      filename: 'D:\\Node\\project\\app.js',
      loaded: false,
      children: [],
      paths: [
          'D:\\Node\\project\\node_modules',
          'D:\\Node\\node_modules',
          ...
      ]
  }

- The exact output can vary depending on the Node.js version,
  module type, and application structure.

-----------------------------------------------------------
7. Important Properties of the module Object
-----------------------------------------------------------

1. module.id

- Identifies the current module.

- For the main/entry CommonJS module, it is commonly:

    '.'

- Example:

    console.log(module.id);

-----------------------------------------------------------

2. module.filename

- Contains the absolute path of the current module file.

  Example:

    console.log(module.filename);

- Output may look like:

    D:\Node\project\app.js

-----------------------------------------------------------

3. module.exports

- Contains the value that the module exports to other
  modules.

- Initially, it is commonly:

    {}

- Example:

    module.exports = {
        name: "Vishal"
    };

- Then another file can receive this value using:

    const user = require("./user");

-----------------------------------------------------------

4. module.loaded

- Indicates whether the module has finished loading.

- It can be observed as part of the module object's state
  during module execution.

-----------------------------------------------------------

5. module.children

- Contains information about CommonJS modules that were
  required by the current module.

- Example:

    // app.js

    const math = require("./math");
    const user = require("./user");

- app.js has dependencies on math.js and user.js.

-----------------------------------------------------------

6. module.paths

- Contains paths that Node.js uses when resolving
  dependencies for the CommonJS module.

- These paths commonly include node_modules directories.

-----------------------------------------------------------
8. module is NOT a Global Object
-----------------------------------------------------------

- An important point:

    module

  is NOT a property of the global object.

- For example:

    console.log(global.module);

  It is not the same as:

    console.log(module);

- `module` is available locally inside a CommonJS module.

-----------------------------------------------------------
9. Why is module not Global?
-----------------------------------------------------------

- Node.js provides each CommonJS file with its own module
  scope.

- Conceptually, Node.js wraps CommonJS module code inside
  a function similar to:

  (function (exports, require, module, __filename, __dirname) {

      // Your file code

  });

- Therefore, `module` behaves like a local parameter of the
  wrapper function.

- It is NOT attached to the global object.

-----------------------------------------------------------
10. What does the Module Wrapper provide?
-----------------------------------------------------------

- The CommonJS wrapper conceptually provides:

    exports
    require
    module
    __filename
    __dirname

- Example:

  (function (
      exports,
      require,
      module,
      __filename,
      __dirname
  ) {

      // your code

  });

- Because these are local to the module wrapper, every
  CommonJS file gets its own isolated module scope.

-----------------------------------------------------------
11. Why does Node.js use this isolation?
-----------------------------------------------------------

- The isolation provides:

  1. Encapsulation
  2. Scope isolation
  3. Prevention of unnecessary global variables
  4. Better code organization
  5. Independent modules

- Example:

  // file1.js

  const name = "Vishal";

  // file2.js

  const name = "Rahul";

- These variables do not conflict simply because they have
  the same name.

- Each CommonJS module has its own scope.

-----------------------------------------------------------
12. Is module available in every JavaScript environment?
-----------------------------------------------------------

- No.

- `module` is a Node.js CommonJS-specific concept.

- In a browser's normal JavaScript environment, you don't
  automatically get Node.js's CommonJS `module` object.

- Also, ES Modules use the standard ESM system rather than
  CommonJS's `module.exports` and `require()` mechanism.

-----------------------------------------------------------
13. CommonJS Module System
-----------------------------------------------------------

- Node.js traditionally uses CommonJS as one of its module
  systems.

- CommonJS commonly uses:

    module.exports
          +
    require()

- Example:

  // math.js

  module.exports = {
      add(a, b) {
          return a + b;
      }
  };


  // app.js

  const math = require("./math");

  console.log(math.add(10, 20));

-----------------------------------------------------------
14. CommonJS vs ES Modules
-----------------------------------------------------------

- Node.js supports both CommonJS and ES Modules.

- CommonJS:

    module.exports
    require()

- ES Modules:

    export
    import

- The `module` object discussed here refers specifically to
  the CommonJS module system.

-----------------------------------------------------------
15. Important Correction
-----------------------------------------------------------

- Avoid saying:

    "Everything in Node.js is a module."

- A better statement is:

    "In the CommonJS module system, each JavaScript file is
     treated as a separate module."

- Node.js also supports ES Modules, where the module system
  works differently.

-----------------------------------------------------------
16. Simple Module Visualization
-----------------------------------------------------------

        +----------------------+
        |      math.js         |
        |----------------------|
        | function add()       |
        | const secret = ...   |
        +----------+-----------+
                   |
                   | module.exports
                   v
        +----------------------+
        |       app.js         |
        |----------------------|
        | require("./math")    |
        +----------+-----------+
                   |
                   v
             use add()


-----------------------------------------------------------
17. Module Scope Visualization
-----------------------------------------------------------

        Node.js Application
                |
        +-------+-------+
        |               |
        v               v
     file A.js       file B.js
        |               |
        v               v
   Own module       Own module
      scope            scope
        |               |
        +-------+-------+
                |
        No direct access
        by default


-----------------------------------------------------------
18. module vs module.exports
-----------------------------------------------------------

- `module`:

    Represents the current CommonJS module.

- `module.exports`:

    Represents the value that the current module exposes
    to other modules.

Example:

    console.log(module);

    console.log(module.exports);

- `module` is the complete module object.

- `module.exports` is the export value of that module.

-----------------------------------------------------------
19. Example
-----------------------------------------------------------

  // user.js

  const name = "Vishal";
  const age = 25;

  function getUser() {
      return {
          name,
          age
      };
  }

  module.exports = {
      getUser
  };


  // app.js

  const user = require("./user");

  console.log(user.getUser());

- Here:

    user.js
       |
       | module.exports
       v
    getUser()
       |
       | require()
       v
    app.js

- `name` and `age` are not directly exported.

- `getUser()` is exported and therefore can be used by
  app.js.

-----------------------------------------------------------
20. Interview-Ready Answer
-----------------------------------------------------------

- In Node.js CommonJS, a module is a self-contained,
  reusable, and encapsulated unit of code.

- Each JavaScript file is treated as a separate module.
  Variables, functions, and objects inside the file are
  private to that module by default.

- To share something with another module, we explicitly
  export it using `module.exports`, and another module can
  load it using `require()`.

- When we use:

    console.log(module);

  Node.js displays the module object representing the
  current CommonJS module. It contains information such as
  the module's id, filename, exports, loaded state,
  children, and module resolution paths.

- The `module` object is not global. Node.js provides it
  locally through the CommonJS module wrapper function.

-----------------------------------------------------------
Q. Why is module not Global in Node.js?
-----------------------------------------------------------

- `module` is not global because Node.js isolates each
  CommonJS file inside its own module scope.

- Conceptually, Node.js wraps each CommonJS file in a
  function like:

  (function (exports, require, module, __filename, __dirname) {

      // your code

  });

- Because `module` is provided as a local parameter of this
  wrapper, it belongs to that module's scope.

- It is therefore not attached to the global object.

- This design provides:

    - Scope isolation
    - Encapsulation
    - Module independence
    - Prevention of global namespace pollution

-----------------------------------------------------------
Q. Final Interview Answer:
   Why is module not global?
-----------------------------------------------------------

- In Node.js CommonJS, `module` is not a global object.
  Node.js provides `module` as a local variable through the
  CommonJS module wrapper function.

- Since every CommonJS file gets its own module scope, each
  file has its own `module` object.

- This provides encapsulation and scope isolation and
  prevents unnecessary global namespace pollution.

- Therefore:

    module
       ↓
    local to the CommonJS module

    global
       ↓
    global object

- In one line:

    "The `module` object is not global because Node.js
     provides it locally inside each CommonJS module wrapper,
     allowing every file to have its own isolated module
     scope."

# Imp point 
    - ES Modules don't have the CommonJS module object."
    - ESM is itself a module system. It just uses a different mechanism:v


                 Node.js Module Systems
                         |
             +-----------+-----------+
             |                       |
             v                       v
        CommonJS                    ESM
             |                       |
             v                       v
        module object           no `module`
             |                       |
     +-------+-------+          +----+-----+
     |       |       |          |          |
     v       v       v          v          v
  module  require  exports   import    export
  .exports
                                  |
                                  v
                              import.meta


The important replacement: import.meta
In ESM, if you need information about the current module, you can use:
console.log(import.meta);
*/