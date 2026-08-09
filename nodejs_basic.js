/*
==========================================================
@ NODE.JS
==========================================================
Q. What is Node.js?
----------------------------------------------------------
- Node.js is an open-source, cross-platform JavaScript
  runtime environment that allows developers to execute
  JavaScript code outside the browser.

- It is mainly used for building:
    - Server-side applications
    - Backend applications
    - REST APIs
    - Web servers
    - Real-time applications
    - Network applications

- Node.js embeds Google's V8 JavaScript engine and provides
  additional runtime APIs and capabilities that allow
  JavaScript to interact with the operating system,
  file system, network, etc.

- V8 uses JIT (Just-In-Time) compilation techniques to
  compile JavaScript into optimized machine code at runtime.

- Node.js is NOT a programming language.
- Node.js is NOT a framework.
- Node.js is NOT a library.
- Node.js is a JavaScript runtime environment.
==========================================================
1. OPEN SOURCE
==========================================================
- Node.js is open-source.
- Open-source means its source code is publicly available.
- Developers can:
    - Use it
    - Inspect the source code
    - Modify it
    - Contribute to it
==========================================================
2. CROSS-PLATFORM
==========================================================
- Node.js is cross-platform.
- Cross-platform means the same Node.js application can
  run on different operating systems.
Examples:
    - Windows
    - macOS
    - Linux
==========================================================
3. JAVASCRIPT RUNTIME ENVIRONMENT
==========================================================
- Normally, JavaScript runs inside a web browser.
Example:
    console.log("Hello World");
- The browser uses a JavaScript engine to execute
  JavaScript code.
- Different browsers use JavaScript engines such as:
    Chrome / Chromium  -> V8
    Firefox            -> SpiderMonkey
    Safari             -> JavaScriptCore
- Node.js allows JavaScript to execute outside the browser.
- Node.js uses the V8 JavaScript engine to execute
  JavaScript.
Browser:
    JavaScript
        |
        v
    Browser JavaScript Engine
        |
        v
    Operating System
Node.js:
    JavaScript
        |
        v
    Node.js
        |
        v
    V8 JavaScript Engine
        |
        v
    Node.js Runtime APIs
        |
        v
    Operating System
- Therefore:
    Node.js is a JavaScript runtime environment,
    not a programming language.
==========================================================
4. NODE.JS IS BUILT ON THE V8 JAVASCRIPT ENGINE
==========================================================

- Node.js uses Google's V8 JavaScript engine.
- V8 is the same JavaScript engine used by Chrome and
  Chromium-based browsers.
- V8 is responsible for executing JavaScript.
- V8 is primarily written in C++.
- V8 contains the components required to execute and
  optimize JavaScript efficiently.
- V8 uses JIT (Just-In-Time) compilation techniques
  to optimize JavaScript execution.
Basic flow:
    JavaScript Code
          |
          v
         V8
          |
          | JIT compilation
          v
    Optimized Machine Code
          |
          v
         CPU
          |
          v
       Execution

IMPORTANT:
- V8 is a JavaScript engine.
- V8's main responsibility is JavaScript execution.
- Node.js embeds V8 and adds additional runtime
  capabilities around it.


==========================================================
5. WHAT DOES NODE.JS ADD TO V8?
==========================================================
- V8 mainly provides JavaScript execution.
- Node.js adds runtime APIs and supporting components
  that allow JavaScript to interact with the operating
  system and network.
Node.js provides APIs/features for:
    - File System operations
    - HTTP networking
    - TCP networking
    - UDP networking
    - Streams
    - Timers
    - Process management
    - Environment variables
    - Operating-system interaction


Example: File System
    const fs = require("fs");
    fs.writeFileSync(
      "hello.txt",
      "Hello Node.js"
    );

- Here, the `fs` module is provided by Node.js.
- It allows JavaScript code to interact with the
  file system.


==========================================================
6. NODE.JS vs BROWSER JAVASCRIPT
==========================================================
- JavaScript running inside a normal browser does not
  have unrestricted access to the user's local file system.
- This restriction exists because of browser security
  and sandboxing.
For example:
    A website should NOT be able to freely execute:
        deleteFile("C:/Users/User/password.txt");
- If browsers allowed unrestricted file-system access,
  it would create serious security problems.

- Node.js is designed as a runtime environment that
  provides controlled APIs for interacting with the
  operating system.

==========================================================
7. SIMPLIFIED VIEW OF NODE.JS
==========================================================
A simplified conceptual view is:
    +--------------------------------------+
    |              Node.js                 |
    |                                      |
    |  +-------------------------------+   |
    |  |             V8                |   |
    |  |      JavaScript Engine        |   |
    |  +-------------------------------+   |
    |                                      |
    |  +-------------------------------+   |
    |  |      Node.js Runtime APIs     |   |
    |  |                               |   |
    |  |  File System                  |   |
    |  |  HTTP                         |   |
    |  |  Networking                   |   |
    |  |  Streams                      |   |
    |  |  Timers                       |   |
    |  |  Process / OS APIs            |   |
    |  +-------------------------------+   |
    |                                      |
    |          Event-driven Model          |
    |          Non-blocking I/O            |
    +--------------------------------------+

Conceptually:
    Node.js
       |
       +---- V8 JavaScript Engine
       |
       +---- Node.js Runtime APIs
       |
       +---- Event Loop
       |
       +---- Supporting Runtime Components

NOTE:
- This is a simplified conceptual model.
- Internally, Node.js contains additional components
  such as libuv and other runtime infrastructure.

==========================================================
8. NODE.JS ARCHITECTURE / DESIGN
==========================================================
- Node.js uses an event-driven, non-blocking I/O model.
- This architecture allows Node.js to handle many
  concurrent I/O operations efficiently.
- Node.js does not need to create a separate JavaScript
  thread for every incoming request.
- Instead, Node.js uses an event-driven architecture
  where asynchronous operations can be handled without
  blocking the main JavaScript execution thread.

Example:
    Request
       |
       v
    Node.js
       |
       v
    File Read Operation
       |
       |------> Node.js does not wait/block
       |
       v
    Node.js can handle other work
       |
       v
    File Read Completed
       |
       v
    Callback / Promise
       |
       v
    Process the Result

- This makes Node.js particularly suitable for applications
  that perform a lot of I/O operations.
Examples:
    - REST APIs
    - Real-time applications
    - Chat applications
    - Streaming applications
    - Web servers
    - Network applications

==========================================================
9. EVENT-DRIVEN
==========================================================
- Node.js follows an event-driven architecture.
- In an event-driven system, actions or events trigger
  corresponding handlers.

Example:

    File Read Completed
           |
           v
       Event occurs
           |
           v
      Callback runs

Another example:

    HTTP Request
         |
         v
    Request Event
         |
         v
    Request Handler
         |
         v
    Send Response


==========================================================
10. NON-BLOCKING I/O
==========================================================
- I/O means Input/Output operations.
Examples:

    - Reading a file
    - Writing a file
    - Database operations
    - Network requests
    - API calls
- Non-blocking means Node.js does not unnecessarily stop
  JavaScript execution while waiting for an I/O operation
  to complete.
Example:
    JavaScript Code
         |
         v
    Start File Read
         |
         +--------------------+
         |                    |
         v                    |
    Continue executing        |
    other code                |
                              |
                              v
                       File Read Complete
                              |
                              v
                         Callback /
                         Promise result

==========================================================
11. SCALABILITY
==========================================================
- Node.js is well suited for building scalable network
  applications.
- Its event-driven and non-blocking I/O architecture
  allows a relatively small number of threads to handle
  many concurrent I/O operations efficiently.

- This is especially useful for I/O-intensive applications.

Examples:

    - REST APIs
    - Chat applications
    - Real-time applications
    - Streaming applications
    - Web servers
IMPORTANT:
- "Single-threaded" does NOT mean Node.js can only do
  one thing at a time.
- JavaScript execution primarily happens on a single
  main thread.
- Node.js can use the operating system and its runtime
  components to handle asynchronous I/O operations.
- Some operations may also use a thread pool behind
  the scenes.

==========================================================
12. VERSATILITY
==========================================================
- Node.js can be used to build many types of applications.
Examples:
    - REST APIs
    - Web servers
    - Real-time applications
    - Chat applications
    - Streaming applications
    - Microservices
    - Command-line tools
    - Backend services
    - Network applications


==========================================================
13. NPM ECOSYSTEM
==========================================================
- Node.js has a large ecosystem through npm.
- npm stands for Node Package Manager.
- npm allows developers to install and use
  open-source packages and libraries.
- Instead of implementing everything from scratch,
  developers can reuse existing packages.
Example:
    npm install express

- This installs the Express package.
- npm helps developers:
    - Reuse existing packages
    - Speed up development
    - Manage dependencies
    - Share packages
    - Build applications faster

==========================================================
14. NODE.JS + V8 + RUNTIME APIs
==========================================================


                         NODE.JS
                            |
                            | uses
                            v
                  +-------------------+
                  |        V8         |
                  | JavaScript Engine |
                  +---------+---------+
                            |
                            | JIT compilation
                            v
                  +-------------------+
                  |   Machine Code    |
                  +---------+---------+
                            |
                            v
                           CPU


              V8 is primarily written in
                            |
                            v
                           C++


Node.js additionally provides:

    Node.js
       |
       +---- V8 JavaScript Engine
       |
       +---- Runtime APIs
       |       |
       |       +---- File System
       |       +---- HTTP
       |       +---- Networking
       |       +---- Streams
       |       +---- Timers
       |       +---- Process / OS
       |
       +---- Event Loop
       |
       +---- Supporting Runtime Components


==========================================================
15. NODE.JS IS NOT A FRAMEWORK OR LIBRARY
==========================================================
Q. Is Node.js a framework or a library?

- Node.js is neither a framework nor a library.

- Node.js is a JavaScript runtime environment.

Why is Node.js not a framework?
- A framework generally provides a predefined structure,
  conventions, and tools for building applications.

Examples:

    - Express.js
    - NestJS
    - Next.js


Why is Node.js not a library?

- A library is a collection of reusable functionality
  that an application can call.
Examples:

    - Lodash
    - Axios
    - Mongoose

- Node.js is a runtime environment in which JavaScript
  applications execute.

==========================================================
16. KEY FEATURES OF NODE.JS
==========================================================
1. JavaScript Runtime Environment
   - Executes JavaScript outside the browser.

2. Built on V8
   - Uses Google's V8 JavaScript engine.

3. Event-driven
   - Uses an event-driven programming model.

4. Non-blocking I/O
   - Handles asynchronous I/O efficiently.

5. Single JavaScript Thread
   - JavaScript execution primarily happens on one
     main thread.

6. Highly Scalable
   - Suitable for handling many concurrent I/O operations.

7. Cross-platform
   - Runs on Windows, macOS, and Linux.

8. Open-source
   - Source code is publicly available.

9. Large npm Ecosystem
   - Provides access to a huge collection of packages.

10. Versatile
    - Useful for APIs, web servers, real-time applications,
      microservices, streaming, and network applications.

==========================================================
17. COMPLETE NODE.JS FLOW
==========================================================
                    JavaScript Code
                           |
                           v
                  +----------------+
                  |    Node.js     |
                  +-------+--------+
                          |
                          | embeds
                          v
                  +----------------+
                  |      V8        |
                  | JavaScript     |
                  |    Engine      |
                  +-------+--------+
                          |
                          | JIT compilation
                          v
                  +----------------+
                  | Machine Code   |
                  +-------+--------+
                          |
                          v
                         CPU


                  Node.js also provides
                          |
          +---------------+---------------+
          |               |               |
          v               v               v
      File System       HTTP          Networking
          |
          +---- Streams
          |
          +---- Timers
          |
          +---- Process / OS APIs


                  Event-driven
                        +
                  Non-blocking I/O
                        |
                        v
                 Scalable Applications


==========================================================
18. IN SHORT
==========================================================
- Node.js is an open-source, cross-platform JavaScript
  runtime environment built on Google's V8 JavaScript
  engine.

- It allows JavaScript to run outside the browser.

- Node.js provides runtime APIs for:
    - File-system access
    - Networking
    - HTTP
    - Streams
    - Timers
    - Process / OS interaction

- Node.js uses an event-driven and non-blocking I/O
  architecture.

  - This makes Node.js well suited for building:
    - Scalable network applications
    - REST APIs
    - Web servers
    - Real-time applications
    - Backend services

    ==========================================================
INTERVIEW ANSWER
==========================================================
Q. What is Node.js?

Answer:

- "Node.js is an open-source, cross-platform JavaScript
runtime environment built on Google's V8 JavaScript
engine.

- It allows JavaScript to run outside the browser and
provides runtime APIs for interacting with the file
system, operating system, networking, HTTP, and streams.

- Node.js uses an event-driven and non-blocking I/O
architecture, which makes it well suited for building
scalable network applications, REST APIs, and
real-time applications."

==========================================================
ONE-LINE DEFINITION
==========================================================
Node.js = JavaScript Runtime Environment
          built on V8
          + Runtime APIs
          + Event-driven architecture
          + Non-blocking I/O
          
=========================================================
*/
/*
Q. Is Node.js a framework or a library?
==================================================
- Node.js is neither a framework nor a library.

- Node.js is a JavaScript runtime environment.

- It allows JavaScript to run outside the browser,
  typically for server-side and backend applications.

Why is Node.js NOT a framework?
--------------------------------------------------
- A framework provides a predefined structure and
  rules for building an application.

- Examples:
    Express.js
    NestJS
    Next.js

- Node.js itself does not provide a complete application
  structure or enforce how we should build our application.

Why is Node.js NOT a library?
--------------------------------------------------
- A library provides reusable functions/features that
  we can call from our application

- Examples:
    Lodash
    Axios
    Mongoose

- Node.js is not simply a collection of functions that
  we import and use.

- Instead, Node.js provides a complete runtime environment
  in which JavaScript code can execute.


KEY POINTS OF NODE.JS
==================================================

1. Runtime Environment
--------------------------------------------------
- Node.js allows JavaScript to execute outside the browser.

- It is commonly used for:
    - Backend applications
    - REST APIs
    - Web servers
    - Real-time applications
    - Network applications


2. Single-threaded and Highly Scalable
--------------------------------------------------
- Node.js uses a single main JavaScript thread.

- It uses an event-driven, non-blocking I/O model.

- Because I/O operations are handled asynchronously,
  Node.js can efficiently handle many concurrent requests.

- This makes Node.js suitable for I/O-intensive applications.

Example:

    Request
       |
       v
    Node.js
       |
       +----> Database / File / Network I/O
       |
       |       Node.js does NOT wait/block
       |
       v
    Handle other requests
       |
       v
    I/O completed
       |
       v
    Process the result


3. Built on Google's V8 JavaScript Engine
--------------------------------------------------
- Node.js uses Google's V8 JavaScript engine.

- V8 is responsible for executing JavaScript.

- V8 uses JIT (Just-In-Time) compilation techniques
  to compile JavaScript into optimized machine code
  at runtime.

- This helps JavaScript execute efficiently.


4. Cross-platform
--------------------------------------------------
- Node.js can run on multiple operating systems.
    - Windows
    - macOS
    - Linux


5. Rich / Large Ecosystem
--------------------------------------------------
- Node.js has a large ecosystem through npm
  (Node Package Manager).

- npm provides access to thousands of open-source
  packages and libraries.

Example:
    npm install express
- This allows developers to reuse existing packages
  instead of building everything from scratch.


6. Versatile
--------------------------------------------------
- Node.js can be used to build:

    - REST APIs
    - Web servers
    - Real-time applications
    - Chat applications
    - Streaming applications
    - Microservices
    - Network applications
    - Command-line tools


IN SHORT
==================================================
Node.js is a JavaScript runtime environment,
NOT a framework and NOT a library.

It uses the V8 JavaScript engine to execute JavaScript
and provides runtime APIs for tasks such as:

    - File system operations
    - Networking
    - HTTP
    - Streams
    - Processes
    - Environment variables

Its event-driven and non-blocking I/O architecture
makes it suitable for building scalable network
and backend applications.


INTERVIEW ANSWER
==================================================
Q: Is Node.js a framework or a library?
A:
"Node.js is neither a framework nor a library.
It is a JavaScript runtime environment built on
Google's V8 JavaScript engine.

It allows JavaScript to run outside the browser
and provides runtime APIs for backend operations
such as file-system access, networking, and HTTP.

It uses an event-driven, non-blocking I/O model,
which makes it suitable for building scalable
network applications and APIs."
*/

/*
==========================================================
@ NODE.JS
==========================================================

Q. What are the backend features available in Node.js?
==========================================================


1. SERVER-SIDE JAVASCRIPT
----------------------------------------------------------

- Node.js allows JavaScript to run outside the browser,
  typically on the server.

- This allows JavaScript to be used for backend development.

Example:

    Browser
       |
       | HTTP Request
       v
    Node.js Server
       |
       | Backend Logic
       v
    Database / File System / External API
       |
       v
    HTTP Response
       |
       v
    Browser


==========================================================
2. EVENT-DRIVEN ARCHITECTURE
==========================================================

- Node.js uses an event-driven architecture.

- In an event-driven system, events trigger corresponding
  callbacks, handlers, or functions.

Example:

    HTTP Request
         |
         v
    Request Event
         |
         v
    Request Handler
         |
         v
    Send Response


- This architecture allows Node.js to efficiently handle
  many concurrent requests, especially when applications
  perform a lot of I/O operations.


==========================================================
3. NON-BLOCKING I/O
==========================================================

- Node.js uses a non-blocking I/O model.

- I/O means Input/Output operations.

Examples:

    - File operations
    - Database operations
    - Network requests
    - API requests

- When an I/O operation takes time, Node.js can continue
  executing other JavaScript work instead of unnecessarily
  blocking the main JavaScript thread.

Example:

    Request
       |
       v
    Start File Read
       |
       |-------> File System
       |
       |        Node.js continues
       |        handling other work
       |
       v
    File Read Completed
       |
       v
    Callback / Promise
       |
       v
    Process Result


- This makes Node.js particularly suitable for
  I/O-heavy applications.


==========================================================
4. FILE SYSTEM ACCESS
==========================================================

- Node.js provides the built-in `fs` module for
  interacting with the file system.

- We can perform operations such as:

    - Create files
    - Read files
    - Write files
    - Update files
    - Delete files
    - Rename files
    - Create directories

Example:

    const fs = require("fs");

    fs.writeFileSync(
      "hello.txt",
      "Hello Node.js"
    );


- Browser JavaScript does not have unrestricted access
  to the user's local file system because of security
  and sandboxing restrictions.

- Node.js provides controlled APIs for server-side
  file-system operations.


==========================================================
5. NETWORKING SUPPORT
==========================================================

- Node.js provides APIs for network programming.

- It can work with:

    - HTTP
    - HTTPS
    - TCP
    - UDP
    - Sockets
    - Network connections

- Node.js provides built-in modules such as:

    - `http`
    - `https`
    - `net`
    - `dgram`


Example:

    const http = require("http");

    const server = http.createServer((req, res) => {
        res.end("Hello Node.js");
    });

    server.listen(3000);


- This allows Node.js to create web servers and APIs.


==========================================================
6. HTTP SERVER / SERVER-SIDE CAPABILITIES
==========================================================

- Node.js provides the built-in `http` and `https`
  modules for creating HTTP servers.

- A Node.js server can:

    - Receive HTTP requests
    - Process requests
    - Execute business logic
    - Access databases
    - Read/write files
    - Call external APIs
    - Send HTTP responses

Basic flow:

    Client
      |
      | HTTP Request
      v
    Node.js Server
      |
      +---- Business Logic
      |
      +---- Database
      |
      +---- File System
      |
      +---- External API
      |
      v
    HTTP Response
      |
      v
    Client


==========================================================
7. DATABASE CONNECTIVITY
==========================================================

- Node.js applications can connect to both relational
  and non-relational databases.

Examples:

    Relational Databases:
        - MySQL
        - PostgreSQL
        - SQL Server

    NoSQL Databases:
        - MongoDB
        - Redis
        - etc.


IMPORTANT:

- Database connectivity is generally provided through
  database drivers or npm packages.

Examples:

    MongoDB  -> mongodb / mongoose
    MySQL    -> mysql2
    PostgreSQL -> pg
    Redis    -> redis


Example:

    import mongoose from "mongoose";

    await mongoose.connect(
      "mongodb://127.0.0.1:27017/myDatabase"
    );


- So, Node.js provides the runtime environment, while
  database drivers/packages provide the specific database
  integration.


==========================================================
8. INPUT DATA VALIDATION
==========================================================

- Backend applications need to validate data received
  from clients.

Examples:

    - Check required fields
    - Validate email format
    - Validate password length
    - Validate data types
    - Validate ranges
    - Remove / reject invalid input


Example request:

    {
        "name": "Vishal",
        "age": 25,
        "email": "vishal@example.com"
    }


- Validation can be implemented manually using JavaScript
  or with npm validation libraries.

Examples:

    - Zod
    - Joi
    - express-validator


IMPORTANT:

- Input validation is a common backend responsibility,
  but it is NOT a special built-in Node.js core feature.

- Node.js provides the runtime; validation is usually
  implemented by application code or external packages.


==========================================================
9. MODULE SYSTEM
==========================================================

- Node.js provides a module system that allows us to
  organize code into reusable and maintainable modules.

- Node.js supports:

    1. CommonJS
    2. ECMAScript Modules (ES Modules)


CommonJS:

    const fs = require("fs");


ES Modules:

    import fs from "fs";


- Modules help us:

    - Organize code
    - Reuse code
    - Separate responsibilities
    - Maintain large applications
    - Avoid unnecessary global variables


Example:

    user.js

        export function getUser() {
            // ...
        }


    app.js

        import { getUser } from "./user.js";


==========================================================
10. ENVIRONMENT & PROCESS MANAGEMENT
==========================================================

- Node.js provides the `process` object for interacting
  with information about the current Node.js process.

Example:

    console.log(process.env.NODE_ENV);


- Environment variables are commonly used for:

    - Database URLs
    - API keys
    - Port numbers
    - Application configuration
    - Environment-specific settings


Example:

    const PORT = process.env.PORT || 3000;


- Node.js also provides process-related capabilities
  such as:

    - Process information
    - Command-line arguments
    - Environment variables
    - Process exit
    - Signals


==========================================================
11. STREAMS
==========================================================

- Node.js provides Streams for handling data gradually
  instead of loading everything into memory at once.

- Streams are useful for:

    - Large files
    - Video streaming
    - Network communication
    - HTTP requests/responses
    - Data processing


Example:

    const fs = require("fs");

    const stream =
      fs.createReadStream("large-file.txt");


- Streams improve memory efficiency when working with
  large amounts of data.


==========================================================
12. TIMERS
==========================================================

- Node.js provides timer APIs for scheduling operations.

Examples:

    - setTimeout()
    - setInterval()
    - setImmediate()


Example:

    setTimeout(() => {
        console.log("Executed after 2 seconds");
    }, 2000);


- Timers are integrated with Node.js's event-driven
  execution model.


==========================================================
13. EXTERNAL API / NETWORK REQUESTS
==========================================================

- Node.js applications can communicate with external
  services and APIs.

Examples:

    Node.js
       |
       | HTTP Request
       v
    Payment API
       |
       v
    Response


- This is commonly used for:

    - Payment gateways
    - Email services
    - Authentication services
    - Third-party APIs
    - Microservices communication


==========================================================
14. npm ECOSYSTEM
==========================================================

- Node.js has a large ecosystem through npm
  (Node Package Manager).

- npm allows developers to install and use
  third-party packages.

Examples:

    npm install express
    npm install mongoose
    npm install zod


- Packages can provide additional backend capabilities
  such as:

    - Web frameworks
    - Database connectivity
    - Authentication
    - Validation
    - Logging
    - Security
    - Testing


==========================================================
15. BACKEND FEATURES - COMPLETE VIEW
==========================================================


                     NODE.JS
                        |
        +---------------+---------------+
        |               |               |
        v               v               v
   JavaScript       Event-driven    Non-blocking
   Runtime          Architecture       I/O
        |               |               |
        +---------------+---------------+
                        |
                        v
              Backend Capabilities
                        |
       +----------------+----------------+
       |                |                |
       v                v                v
  File System       Networking        HTTP/HTTPS
       |                |                |
       v                v                v
    Files          TCP / UDP         Web Servers
       |
       +----------------------------------+
                                          |
                                          v
                                 Database Connectivity
                                          |
                              +-----------+-----------+
                              |                       |
                              v                       v
                           SQL DB                  NoSQL DB
                              |                       |
                              v                       v
                           MySQL                  MongoDB


Other capabilities:

    +---- Streams
    +---- Timers
    +---- Process Management
    +---- Environment Variables
    +---- Module System
    +---- External API Communication
    +---- npm Ecosystem


==========================================================
16. IMPORTANT DISTINCTION
==========================================================

Node.js CORE FEATURES / APIs:

    - File System (`fs`)
    - HTTP (`http`)
    - HTTPS (`https`)
    - TCP (`net`)
    - UDP (`dgram`)
    - Streams
    - Timers
    - Process
    - Events
    - Modules


COMMON BACKEND CAPABILITIES USING NODE.JS + PACKAGES:

    - Database connectivity
    - Input validation
    - Authentication
    - Authorization
    - Password hashing
    - JWT
    - Logging
    - Web frameworks
    - ORM / ODM
    - Request validation


==========================================================
17. SHORT ANSWER
==========================================================

- Node.js allows JavaScript to run outside the browser,
  typically on the server.

- It uses an event-driven, non-blocking I/O architecture
  to handle many concurrent I/O operations efficiently.

- Node.js provides runtime APIs for:

    - File-system access
    - HTTP and networking
    - Streams
    - Timers
    - Process / OS interaction
    - Modules


- Node.js applications can also connect to databases,
  validate input, communicate with external APIs, and
  implement authentication using appropriate drivers,
  libraries, and npm packages.


==========================================================
INTERVIEW ANSWER
==========================================================

Q. What are the backend features available in Node.js?

Answer:

"Node.js provides a runtime environment for building
server-side applications.

It provides built-in APIs for file-system operations,
HTTP, networking, streams, timers, process management,
and modules.

Node.js also uses an event-driven and non-blocking I/O
architecture, which makes it suitable for handling many
concurrent I/O operations.

For additional backend functionality such as database
connectivity, input validation, authentication, and
logging, we can use database drivers and npm packages."


==========================================================
ONE-LINE SUMMARY
==========================================================

Node.js
   =
JavaScript Runtime
   +
Event-driven Architecture
   +
Non-blocking I/O
   +
File System
   +
HTTP / Networking
   +
Streams / Timers
   +
Process / OS APIs
   +
Module System
   +
Large npm Ecosystem


==========================================================
*/

/*
==========================================================
@ NODE.JS
==========================================================


Q. What features are NOT available in Node.js?
OR
Q. What browser-specific features are NOT available
   in Node.js?
==========================================================

- Node.js is a server-side JavaScript runtime environment.

- It is designed to run JavaScript outside the browser,
  so browser-specific features such as DOM and BOM APIs
  are generally not available.

- These features are not "removed" from Node.js.

- Rather, they are browser-specific APIs that Node.js
  does not provide because Node.js does not run inside
  a web page.


==========================================================
1. `window` OBJECT
==========================================================

- The `window` object is the global object provided by
  browsers.

- It represents the browser window and provides access
  to browser-specific functionality.

Browser:

    console.log(window);


- In Node.js, there is no `window` object.

Node.js:

    console.log(window);

Output:

    ReferenceError: window is not defined


- Node.js provides its own global environment.

Node.js:

    console.log(global);


- In modern JavaScript, `globalThis` can be used as a
  standard way to access the global object.

Node.js:

    console.log(globalThis);


Browser:

    window === globalThis
    // true


Node.js:

    global === globalThis
    // true


==========================================================
2. DOM (DOCUMENT OBJECT MODEL)
==========================================================

- The DOM represents the HTML document loaded in a browser.

- Browser JavaScript can use objects such as:

    - document
    - HTMLElement
    - HTMLDivElement
    - querySelector()
    - createElement()
    - getElementById()


Example in Browser:

    document.getElementById("title");


- Node.js does not provide the browser DOM by default.

Node.js:

    console.log(document);

Output:

    ReferenceError: document is not defined


Why?

- Node.js is not running inside an HTML page.

- Therefore, there is no browser document for Node.js
  to manipulate.


Browser:

    JavaScript
        |
        v
    window
        |
        v
    document
        |
        v
    HTML Page
        |
        v
    DOM


Node.js:

    JavaScript
        |
        v
    Node.js Runtime
        |
        v
    Operating System


==========================================================
3. BOM (BROWSER OBJECT MODEL)
==========================================================

- BOM provides browser-specific objects and APIs for
  interacting with the browser environment.

Examples include:

    - navigator
    - screen
    - location
    - history
    - alert()
    - confirm()
    - prompt()


- These browser-specific APIs are not generally available
  in Node.js.

For example:

    console.log(navigator);
    console.log(screen);
    console.log(location);


- These objects should not be treated as Node.js core
  APIs.


==========================================================
4. `localStorage`
==========================================================

- `localStorage` is traditionally associated with the
  browser Web Storage API.

- It allows browser applications to store data locally.

Browser:

    localStorage.setItem(
        "username",
        "Vishal"
    );


    localStorage.getItem("username");


- Do not describe `localStorage` simply as "completely
  impossible in Node.js" because Node.js versions have
  evolved and some Web Storage support exists.

- For normal Node.js backend development, however,
  `localStorage` is not the standard way to store
  application data.

- Backend applications commonly use:

    - Database
    - Redis
    - Files
    - Session stores


==========================================================
5. `sessionStorage`
==========================================================

- `sessionStorage` is a browser Web Storage API used
  to store data for a browser tab/session.

Example in Browser:

    sessionStorage.setItem(
        "user",
        "Vishal"
    );


- It is not a typical Node.js backend storage mechanism.

- In backend applications, session information is
  commonly managed using:

    - Server-side session stores
    - Redis
    - Databases
    - Cookies
    - Authentication tokens


==========================================================
6. BROWSER DOM EVENTS
==========================================================

- Browser applications can listen for DOM events such as:

    - click
    - mouseover
    - keydown
    - keyup
    - submit
    - change


Example:

    document.addEventListener(
        "click",
        () => {
            console.log("Clicked");
        }
    );


- Node.js does not have a browser DOM, so these DOM
  events are not available in the same way.

- Node.js has its own event-driven system and provides
  an `EventEmitter` API.

Example:

    const EventEmitter = require("events");

    const emitter = new EventEmitter();

    emitter.on("message", () => {
        console.log("Message received");
    });

    emitter.emit("message");


IMPORTANT:

- Browser DOM events and Node.js events are different
  concepts.


==========================================================
7. BROWSER UI APIs
==========================================================

- Browser JavaScript can interact with the user's
  graphical browser interface.

Examples:

    - alert()
    - confirm()
    - prompt()
    - DOM manipulation
    - HTML elements
    - CSS through DOM


Example:

    alert("Hello");


- These browser UI APIs are not Node.js core APIs.

- Node.js applications normally communicate through:

    - HTTP
    - APIs
    - Command line
    - Files
    - Network
    - Server-side services


==========================================================
8. BROWSER-SPECIFIC APIs
==========================================================

Browser JavaScript has many APIs designed specifically
for the browser environment.

Examples:

    - window
    - document
    - navigator
    - screen
    - location
    - history
    - DOM APIs
    - Browser UI APIs


Node.js does not provide these browser APIs because
Node.js is not a browser environment.


==========================================================
9. IMPORTANT: `fetch()` 
==========================================================

- Do NOT say:

    "fetch() is not available in Node.js."


- Modern Node.js provides a built-in `fetch()` API.

Example:

    const response = await fetch(
        "https://example.com"
    );


- Therefore, `fetch()` can be used in both modern browsers
  and modern Node.js.

The important difference is:

    Browser
       |
       +-- fetch()
       +-- DOM
       +-- window
       +-- document
       +-- Browser APIs


    Node.js
       |
       +-- fetch()
       +-- fs
       +-- http
       +-- net
       +-- process
       +-- streams
       +-- OS APIs


==========================================================
10. BROWSER vs NODE.JS
==========================================================


                 JAVASCRIPT
                      |
          +-----------+-----------+
          |                       |
          v                       v
       BROWSER                  NODE.JS
          |                       |
          v                       v
   Browser Runtime          Node.js Runtime
          |                       |
    +-----+------+          +-----+------+
    |            |          |            |
    v            v          v            v
  window      document     global      process
    |            |          |            |
    v            v          v            v
   DOM          BOM        fs/http     OS APIs
    |                       |
    v                       v
 HTML Page               Server / OS


==========================================================
11. MAJOR DIFFERENCE
==========================================================


BROWSER:

    JavaScript
        |
        v
    Browser Engine
        |
        +---- window
        +---- document
        +---- DOM
        +---- BOM
        +---- navigator
        +---- screen
        +---- location
        +---- Web APIs
        |
        v
    Web Page / Browser


NODE.JS:

    JavaScript
        |
        v
    Node.js
        |
        +---- V8
        +---- global
        +---- process
        +---- fs
        +---- http
        +---- net
        +---- streams
        +---- OS APIs
        |
        v
    Operating System / Network


==========================================================
12. WHY ARE THESE FEATURES NOT AVAILABLE?
==========================================================

- Browser APIs are designed to interact with a web page
  and browser environment.

- Node.js is designed to run JavaScript as a standalone
  runtime outside the browser.

Therefore:

    Browser
       |
       +---- Web Page
       +---- DOM
       +---- Browser Window
       +---- Browser UI
       +---- Browser Security Model


    Node.js
       |
       +---- Server
       +---- File System
       +---- Network
       +---- Operating System
       +---- Processes


==========================================================
13. IMPORTANT TERMINOLOGY
==========================================================

Instead of saying:

    "These features were removed from Node.js."

Prefer:

    "These are browser-specific features that are not
     part of the Node.js runtime environment."


OR:

    "Node.js does not provide browser-specific APIs such
     as `window` and the DOM because Node.js runs outside
     the browser."


==========================================================
14. SHORT ANSWER
==========================================================

Q. What features are not available in Node.js?

Answer:

"Node.js runs outside the browser, so browser-specific
features such as `window`, `document`, DOM APIs, and
many BOM APIs such as browser-specific `navigator`,
`screen`, and `location` are not available as Node.js
core APIs.

Instead, Node.js provides server-side APIs such as
`fs`, `http`, `net`, `process`, streams, and OS-related
APIs.

Modern Node.js also supports several Web APIs, including
`fetch()`, so we should distinguish between browser-only
APIs and Web APIs that Node.js has implemented."


==========================================================
15. QUICK COMPARISON
==========================================================

+-------------------+----------------------+----------------------+
| Feature           | Browser              | Node.js              |
+-------------------+----------------------+----------------------+
| window            | Yes                  | No                   |
| document / DOM    | Yes                  | No                   |
| navigator         | Yes                  | Not browser version  |
| screen            | Yes                  | No browser object    |
| location          | Yes                  | No browser object    |
| localStorage      | Yes                  | Not typical backend  |
| sessionStorage    | Yes                  | Not typical backend  |
| fetch()            | Yes                  | Yes (modern Node.js) |
| file system       | Restricted           | Yes (`fs`)           |
| process object    | No browser equivalent| Yes                  |
| HTTP server       | No                   | Yes                  |
| TCP/UDP            | Restricted           | Yes                  |
+-------------------+----------------------+----------------------+


==========================================================
IN SHORT
==========================================================

Node.js is NOT a browser.

Therefore, browser-specific features such as:

    - window
    - document
    - DOM
    - Browser BOM
    - Browser UI APIs
    - Browser-specific navigator/screen/location APIs

are not provided as normal Node.js core APIs.

Instead, Node.js provides server-side capabilities such as:

    - File System
    - HTTP / HTTPS
    - TCP / UDP
    - Streams
    - Process management
    - OS interaction
    - Environment variables
    - Modules
    - Networking


==========================================================
INTERVIEW ONE-LINER
==========================================================

"Node.js runs outside the browser, so browser-specific
APIs such as `window` and the DOM are not available.
Instead, Node.js provides server-side APIs for file-system
access, networking, HTTP, processes, streams, and
operating-system interaction."


==========================================================
*/                           

/*


Q. Why doesn't Node.js have `window` or `document` objects?
==========================================================


- Node.js runs outside the browser.

- Therefore, Node.js does not have access to browser-specific
  objects such as:

      window
      document
      navigator
      screen
      location


- These objects are provided by the browser environment,
  not by the JavaScript language itself.


==========================================================
1. JAVASCRIPT LANGUAGE vs JAVASCRIPT ENVIRONMENT
==========================================================

IMPORTANT CONCEPT:

- JavaScript itself does NOT define objects such as:

      window
      document
      global
      process


- These are provided by the environment in which JavaScript
  is running.


Example:


    Browser Environment
           |
           +--> JavaScript Engine
           |
           +--> window
           +--> document
           +--> navigator
           +--> Web APIs


    Node.js Environment
           |
           +--> V8 JavaScript Engine
           |
           +--> global
           +--> process
           +--> fs
           +--> http
           +--> streams


Therefore:

    JavaScript Language
            +
    Environment APIs
            =
    Complete Runtime Environment


==========================================================
2. WHY DOES THE BROWSER HAVE `document`?
==========================================================

- The browser loads an HTML page.

Example:

    <html>
        <body>
            <h1>Hello</h1>
        </body>
    </html>


- The browser converts the HTML document into a DOM
  (Document Object Model).

- JavaScript can then access and manipulate that DOM.

Example:

    document.querySelector("h1");
    document.body;
    document.title;
- This makes sense in a browser because there is an actual
web page to manipulate.


==========================================================
3. WHY DOES NODE.JS NOT HAVE `document`?
==========================================================

- A normal Node.js process does not load an HTML webpage
  and does not create a browser DOM.

Therefore:

    document.querySelector("h1");


in normal Node.js results in an error because `document`
is not provided by the Node.js runtime.


Flow:


    Browser

    HTML
      |
      v
    DOM
      |
      v
    document
      |
      v
    JavaScript


    Node.js

    JavaScript
      |
      v
    Node.js Runtime
      |
      +--> File System
      +--> Network
      +--> Processes
      +--> Streams

    No browser DOM


==========================================================
4. WHY DOES THE BROWSER HAVE `window`?
==========================================================

- `window` represents the browser's global window/context.

It provides access to browser-related functionality.

Examples:

    window.location
    window.document
    window.navigator
    window.setTimeout()


Node.js does not represent a browser window.

Therefore:

    window


is not a normal Node.js global.


==========================================================
5. WHAT DOES NODE.JS PROVIDE INSTEAD?
==========================================================

Node.js provides its own runtime APIs.

Examples:

    global
    globalThis
    process
    fs
    http
    path
    os
    streams


Example:

    console.log(process.version);


    console.log(process.platform);


    console.log(globalThis);


These APIs are designed for server-side / general-purpose
JavaScript execution rather than browser page manipulation.


==========================================================
6. DIFFERENT PURPOSES
==========================================================


Browser:

    JavaScript
        |
        +--> DOM
        +--> HTML
        +--> CSS
        +--> User Events
        +--> Browser APIs
        +--> Web Storage
        +--> Network APIs


Node.js:

    JavaScript
        |
        +--> File System
        +--> HTTP
        +--> TCP / Networking
        +--> Processes
        +--> Streams
        +--> Environment Variables
        +--> Operating System APIs


The environments provide different capabilities because
they solve different problems.


==========================================================
7. IMPORTANT: `window` AND `document` ARE NOT REMOVED
   FROM JAVASCRIPT
==========================================================

This is an important wording correction.

Don't say:

    "Node.js removed window and document from JavaScript."


Better:

    "Node.js does not provide browser-specific APIs such
     as window and document because Node.js is not a browser
     environment."


The JavaScript language itself does not require these objects.


==========================================================
8. globalThis
==========================================================

- `globalThis` provides a standard way to access the global
  object across JavaScript environments.

Browser:

    globalThis === window

    // true


Node.js:

    globalThis === global

    // true


IMPORTANT:

- `globalThis` was standardized in ES2020
  (ECMAScript 2020 / ES11).

- It was NOT introduced in ES6.


Example:

    globalThis.myVar = 100;

    console.log(globalThis.myVar);


Output:

    100


==========================================================
9. SIMPLE COMPARISON
==========================================================


+----------------+-------------------------+
| Browser        | Node.js                 |
+----------------+-------------------------+
| window         | global                  |
| document       | No DOM by default       |
| navigator      | No browser navigator    |
| DOM            | No browser DOM          |
| Web APIs       | Node.js APIs            |
| Web page       | Server/application      |
+----------------+-------------------------+


==========================================================
10. INTERVIEW ANSWER
==========================================================

Q. Why doesn't Node.js have window or document?

Answer:

"Node.js runs outside the browser, so it does not provide
browser-specific objects such as `window` and `document`.

The `document` object belongs to the browser's DOM and is
used to interact with HTML pages, while `window` represents
the browser's global context.

Node.js has a different runtime environment and provides
server-side APIs such as `global`, `process`, `fs`, `http`,
and networking APIs instead."


==========================================================
11. ONE-LINE ANSWER
==========================================================

"Node.js doesn't have `window` or `document` because those
are browser-provided APIs for interacting with a web page,
while Node.js runs outside the browser and provides its own
server-side runtime APIs."


==========================================================
*/