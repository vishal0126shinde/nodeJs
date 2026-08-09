/*
==========================================================
@ JAVASCRIPT IN BROWSER
==========================================================

* Q. How does JavaScript run internally in a browser?
==========================================================
When we open a web page:
    HTML
      |
      v
    Browser
      |
      v
    HTML Parsing
      |
      v
    <script> detected
      |
      v
    JavaScript Code
      |
      v
    JavaScript Engine
      |
      v
    Parse + Compile + Execute
      |
      v
    Result


# 1. HTML PARSING & SCRIPT TAG DETECTION
=======================================

- When we open a web page, the browser receives resources
  such as:
    - HTML
    - CSS
    - JavaScript
    - Images
    - Fonts
    - Other resources

- The browser parses the HTML and builds the DOM
  (Document Object Model).

- When the HTML parser encounters a <script> element,
  the browser needs to process the JavaScript associated
  with that script.

!Example:
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Hello</h1>
        <script>
          console.log("Hello JavaScript");
        </script>
      </body>
    </html>

- When the browser encounters the <script> element,
  it processes the JavaScript code according to the
  script's loading/execution behavior.

# 2. JAVASCRIPT ENGINE
====================

- Every major browser has a JavaScript engine that
  executes JavaScript.

!Examples:
    Chrome / Chromium  -> V8
    Firefox            -> SpiderMonkey
    Safari             -> JavaScriptCore

- The JavaScript engine is responsible for:

    - Parsing JavaScript
    - Compiling / interpreting JavaScript
    - Optimizing code
    - Executing JavaScript
    - Memory management
    - Garbage collection

? Basic flow:
    JavaScript Code
          |
          v
    JavaScript Engine
          |
          v
        Parse
          |
          v
    Compile / Interpret
          |
          v
        Execute
          |
          v
        Result



# 3. PARSING
============

- The JavaScript engine first parses the JavaScript code.

- Parsing means analyzing the source code according to
  JavaScript's syntax and creating internal structures
  such as an Abstract Syntax Tree (AST).

! Example:
  const x = 10;
The engine analyzes:
    const
      |
      v
      x
      |
      v
     = 10

- If there is a syntax error, execution may fail.
Example:
    const = 10;
Output:
    SyntaxError

# 4. COMPILATION / JIT
=====================

- Modern JavaScript engines use a combination of
  interpretation and compilation techniques.

- They may initially execute code through an interpreter
  or bytecode representation and then use JIT
  (Just-In-Time) compilation to generate optimized
  machine code for code that benefits from optimization.

? Simplified view:
    JavaScript
        |
        v
      Parse
        |
        v
    Internal Representation /
      Bytecode
        |
        v
     Execute
        |
        v
    Frequently executed code
        |
        v
    JIT Optimization
        |
        v
    Optimized Machine Code
        |
        v
       CPU


@ IMPORTANT:

- Do not say that every JavaScript statement is simply
  converted directly into machine code before execution.

- Modern engines use multiple execution and optimization
  techniques.



# 5. EXECUTION
================

- After the code is prepared for execution, the
  JavaScript engine executes it.
! Example:
    const a = 10;
    const b = 20;
    console.log(a + b);
Execution:
    a = 10
    b = 20
       |
       v
    a + b
       |
       v
      30
       |
       v
    console.log()
       |
       v
    Output: 30



# 6. MEMORY MANAGEMENT
=====================

- The JavaScript engine automatically manages memory.
- Memory is required for:
    - Variables
    - Objects
    - Arrays
    - Functions
    - Strings
    - Other runtime data
! Example:
    const user = {
        name: "Vishal",
        age: 25
    };

Memory is allocated for the object and its data.


# 7. GARBAGE COLLECTION
========================

- JavaScript automatically performs garbage collection.

- Garbage collection identifies objects that are no longer
  reachable or needed by the program and reclaims their
  memory.

! Example:
    let user = {
        name: "Vishal"
    };
    user = null;
- If the original object is no longer reachable from the
  program, it can eventually be reclaimed by the garbage
  collector.

? Basic idea:
    Object
       |
       v
    Reachable
       |
       v
    Keep in memory


    Object
       |
       v
    Not reachable
       |
       v
    Garbage Collector
       |
       v
    Memory reclaimed


==========================================================
8. BROWSER WEB APIs
==========================================================

IMPORTANT:

- JavaScript language itself does NOT provide APIs such as
  the DOM, timers, or browser storage.

- The browser provides additional functionality through
  Web APIs.

Examples:

    - DOM API
    - setTimeout()
    - setInterval()
    - fetch()
    - localStorage
    - Geolocation API
    - WebSockets
    - Web APIs for browser interaction


For example:

    document.getElementById("title");


- `document` is provided by the browser's DOM environment,
  not by the core JavaScript language.


Another example:

    setTimeout(() => {
        console.log("Hello");
    }, 2000);


- The timer functionality is provided by the browser
  environment.


==========================================================
9. DOM
==========================================================

- DOM stands for Document Object Model.

- The browser converts the HTML document into a DOM tree.

Example HTML:

    <html>
      <body>
        <h1>Hello</h1>
      </body>
    </html>


DOM:

                Document
                    |
                  html
                    |
                  body
                    |
                   h1
                    |
                  Hello


JavaScript can interact with this DOM:

    document.querySelector("h1");


    document.querySelector("h1").textContent =
      "Hello JavaScript";


- This allows JavaScript to dynamically change the
  web page.


==========================================================
10. EVENT LOOP
==========================================================

- JavaScript's main execution model is single-threaded.

- This means JavaScript code in the main execution context
  is executed one piece of work at a time.

- But browsers need to handle asynchronous operations such
  as:

    - Timers
    - Network requests
    - User interactions
    - Other browser tasks

- The browser provides an event loop and task/microtask
  scheduling mechanisms to coordinate this work.


Simplified flow:

    JavaScript
        |
        v
    Call Stack
        |
        v
    Browser Web APIs
        |
        +------ Timer
        |
        +------ Network Request
        |
        +------ DOM Event
        |
        v
    Task Queue
        |
        v
    Event Loop
        |
        | if Call Stack is empty
        v
    Call Stack
        |
        v
    JavaScript executes


==========================================================
11. CALL STACK
==========================================================

- The Call Stack keeps track of the currently executing
  JavaScript functions.

Example:

    function first() {
        second();
    }

    function second() {
        console.log("Hello");
    }

    first();


Call Stack:

    +----------------+
    | console.log()  |
    +----------------+
    | second()       |
    +----------------+
    | first()        |
    +----------------+
    | global code    |
    +----------------+


- Functions are pushed onto the stack when they start
  executing.

- They are removed when execution is completed.


==========================================================
12. CALLBACK / TASK QUEUE
==========================================================

Example:

    setTimeout(() => {
        console.log("Hello");
    }, 2000);


Simplified flow:

    setTimeout()
        |
        v
    Browser Timer
        |
        | after 2 seconds
        v
    Task Queue
        |
        v
    Event Loop
        |
        | Call Stack empty?
        |
        v
    Call Stack
        |
        v
    Callback executes


IMPORTANT:

- The callback does NOT immediately execute when the timer
  finishes.

- It must wait until the event loop can schedule it and
  the call stack is available.


==========================================================
13. MICROTASK QUEUE
==========================================================

- Browsers also have a microtask queue.

- Promise callbacks are commonly scheduled as microtasks.

Example:

    Promise.resolve().then(() => {
        console.log("Promise");
    });


Simplified:

    JavaScript
        |
        v
    Call Stack
        |
        +---- Task Queue
        |
        +---- Microtask Queue
                   |
                   v
              Event Loop


- Microtasks are generally processed before the browser
  moves on to the next task.


==========================================================
14. COMPLETE BROWSER JAVASCRIPT FLOW
==========================================================


                  Web Page Request
                         |
                         v
                    HTML Response
                         |
                         v
                  HTML Parser
                         |
              +----------+----------+
              |                     |
              v                     v
             HTML                 <script>
              |                     |
              v                     v
             DOM              JavaScript Code
                                    |
                                    v
                           JavaScript Engine
                                    |
                              +-----+-----+
                              |           |
                              v           v
                            Parse      Compile /
                                      Interpret
                              |           |
                              +-----+-----+
                                    |
                                    v
                                Execute
                                    |
                                    v
                               Call Stack
                                    |
                  +-----------------+----------------+
                  |                 |                |
                  v                 v                v
              DOM APIs          Timers          Network APIs
                  |                 |                |
                  +-----------------+----------------+
                                    |
                                    v
                               Event Loop
                                    |
                         +----------+----------+
                         |                     |
                         v                     v
                    Task Queue          Microtask Queue
                         |                     |
                         +----------+----------+
                                    |
                                    v
                               Call Stack
                                    |
                                    v
                              JavaScript Runs
                                    |
                                    v
                             Page Updated


==========================================================
15. IMPORTANT: JAVASCRIPT vs BROWSER
==========================================================

JavaScript Language:

    - Variables
    - Functions
    - Objects
    - Arrays
    - Classes
    - Promises
    - async / await
    - Map / Set
    - etc.


Browser Environment:

    - DOM
    - BOM
    - fetch()
    - setTimeout()
    - localStorage
    - Web APIs
    - Event Loop
    - Rendering
    - User interaction


So:

    JavaScript
        +
    Browser Environment
        =
    JavaScript running in Browser


==========================================================
16. JAVASCRIPT ON THE CLIENT SIDE
==========================================================

Q. What does JavaScript do on the client side?
==========================================================


1. DISPLAY WEB PAGE
----------------------------------------------------------

- The browser requests resources from a server.

Example:

    Browser
       |
       | HTTP Request
       v
    Server
       |
       | HTML + CSS + JS + Images
       v
    Browser


- The browser parses HTML and builds the DOM.

- CSS is processed for styling.

- JavaScript can interact with the page.


==========================================================
2. USER INTERACTION
==========================================================

- JavaScript allows users to interact with web pages.

Examples:

    - Button clicks
    - Mouse events
    - Keyboard events
    - Form submission
    - Scroll events


Example:

    button.addEventListener(
        "click",
        () => {
            console.log("Button clicked");
        }
    );


==========================================================
3. UPDATE CONTENT
==========================================================

- JavaScript can dynamically change page content
  without requiring a complete page reload.

Example:

    document.querySelector("#title")
      .textContent = "New Title";


JavaScript can change:

    - Text
    - HTML elements
    - CSS classes
    - Styles
    - Attributes
    - DOM structure


==========================================================
4. LOAD DATA / RESOURCES
==========================================================

- JavaScript can request data from servers and APIs.

Example:

    const response = await fetch(
        "/api/users"
    );

    const users = await response.json();


Flow:

    Browser
       |
       | API Request
       v
    Server
       |
       | JSON Response
       v
    Browser
       |
       v
    JavaScript
       |
       v
    Update DOM


JavaScript can also work with resources such as:

    - Images
    - JSON data
    - API responses
    - Other web resources


==========================================================
17. IN SHORT
==========================================================

Q. How does JavaScript run internally in a browser?

Answer:

"When a browser loads a web page, it parses the HTML and
builds the DOM. When it encounters JavaScript, the browser
provides the code to its JavaScript engine, such as V8 in
Chrome.

The JavaScript engine parses, compiles/interprets, optimizes,
and executes the code.

The browser also provides Web APIs such as the DOM, timers,
and networking APIs. For asynchronous operations, the browser
uses task queues, the microtask queue, and the event loop to
schedule JavaScript callbacks.

JavaScript executes primarily on a single main thread, while
the browser itself uses multiple internal threads/processes
to perform various tasks."


==========================================================
ONE-LINE FLOW
==========================================================

HTML
  |
  v
HTML Parser
  |
  +----> DOM
  |
  +----> <script>
              |
              v
      JavaScript Engine
              |
       +------+------+
       |             |
      Parse       Compile /
                  Interpret
       |             |
       +------+------+
              |
              v
          Call Stack
              |
              v
          JavaScript
          Execution
              |
      +-------+-------+
      |               |
      v               v
   Web APIs       Synchronous
      |             Code
      |
      v
 Task / Microtask Queues
      |
      v
 Event Loop
      |
      v
 Call Stack
      |
      v
 Execute Callback



! note  : The JavaScript engine executes JavaScript; the browser provides the surrounding environment, including DOM, Web APIs, event-loop scheduling, and rendering.

==========================================================
*/


/*
==========================================================
@ SERVER-SIDE-WORK-OF-JAVASCRIPT
==========================================================


Q. What type of work is done by JavaScript on the
   server-side?
==========================================================

- On the server side, JavaScript runs using a runtime
  such as Node.js.

- Server-side JavaScript is mainly used to perform
  backend operations such as:

    - Application / business logic
    - Database operations
    - Authentication
    - Authorization
    - Input validation
    - Session management
    - API development
    - Error handling
    - Security
    - Data processing
    - Encryption / hashing
    - Logging and monitoring


==========================================================
1. DATABASE MANAGEMENT
==========================================================

- Server-side JavaScript can communicate with databases
  to store, retrieve, update, and delete application data.

- These operations are commonly called CRUD operations.

CRUD:

    C -> Create
    R -> Read
    U -> Update
    D -> Delete


Examples of databases:

    - MySQL
    - PostgreSQL
    - MongoDB
    - Redis
    - SQL Server


Example:

    const user = await User.findOne({
        email: "user@example.com"
    });


Typical flow:

    Client
       |
       | Request
       v
    Node.js
       |
       | Database Query
       v
    Database
       |
       | Result
       v
    Node.js
       |
       | Response
       v
    Client


IMPORTANT:

- Node.js itself is not a database.

- Database connectivity is usually provided through
  database drivers, ORMs, or ODMs.

Examples:

    MongoDB    -> mongodb / mongoose
    PostgreSQL -> pg
    MySQL      -> mysql2


==========================================================
2. AUTHENTICATION
==========================================================

- Authentication means verifying the identity of a user.

- It answers:

    "Who are you?"


Example:

    User
      |
      | Email + Password
      v
    Node.js
      |
      | Verify credentials
      v
    Database
      |
      | User found
      v
    Authentication successful


Common authentication mechanisms:

    - Username / Password
    - Session-based authentication
    - JWT
    - OAuth
    - Passkeys


Example:

    POST /login

    {
        "email": "user@example.com",
        "password": "123456"
    }


- The server verifies the credentials and establishes
  an authenticated session or issues an appropriate token.


==========================================================
3. AUTHORIZATION
==========================================================

- Authorization determines what an authenticated user
  is allowed to do.

- It answers:

    "What are you allowed to do?"


Example:

    Admin
      |
      +---- Create User
      +---- Delete User
      +---- View Reports


    Normal User
      |
      +---- View Profile
      +---- Update Profile
      +---- View Own Data


Typical flow:

    Authentication
          |
          v
    Who is the user?
          |
          v
    Authorization
          |
          v
    What can the user do?
          |
          v
    Allow / Deny


==========================================================
4. INPUT VALIDATION
==========================================================

- Server-side JavaScript validates incoming data before
  processing or storing it.

- Validation can check:

    - Required fields
    - Data type
    - Format
    - Length
    - Range
    - Allowed values
    - Business rules


Example:

    {
        "name": "Vishal",
        "age": 25,
        "email": "vishal@example.com"
    }


Validation:

    name  -> required
    age   -> number
    email -> valid email format


- Validation helps prevent:

    - Invalid data
    - Application errors
    - Unexpected input
    - Certain security problems


IMPORTANT:

- Input validation is normally implemented using
  application code or validation libraries.

Examples:

    - Zod
    - Joi
    - express-validator


==========================================================
5. SESSION MANAGEMENT
==========================================================

- HTTP is stateless by default.

- Session management allows a server to maintain
  information about a user's session across multiple
  requests.

Example:

    User Login
        |
        v
    Server creates session
        |
        v
    Session ID
        |
        v
    Browser stores session identifier
        |
        v
    Future requests
        |
        v
    Server identifies the session


Sessions can be stored using:

    - Memory
    - Database
    - Redis
    - Other session stores


Session management can be used to maintain:

    - Login state
    - User preferences
    - Shopping cart
    - Temporary application state


==========================================================
6. API DEVELOPMENT / API MANAGEMENT
==========================================================

- Server-side JavaScript can create APIs that allow
  clients and other applications to communicate with
  the backend.

Example:

    GET /users

    POST /users

    PUT /users/:id

    DELETE /users/:id


Typical API flow:

    Client
       |
       | HTTP Request
       v
    Node.js API
       |
       +---- Validation
       |
       +---- Authentication
       |
       +---- Authorization
       |
       +---- Business Logic
       |
       +---- Database
       |
       v
    HTTP Response
       |
       v
    Client


APIs can exchange data using formats such as:

    - JSON
    - XML
    - Other structured formats


==========================================================
7. BUSINESS LOGIC
==========================================================

- One of the most important responsibilities of backend
  JavaScript is implementing business logic.

- Business logic contains the actual rules of the
  application.

Examples:

    - Calculate shopping cart total
    - Apply discount
    - Calculate tax
    - Check product availability
    - Process an order
    - Check account balance
    - Calculate delivery charges


Example:

    if (cartTotal >= 5000) {
        discount = 10;
    }


Flow:

    Request
       |
       v
    Business Logic
       |
       +---- Validate
       +---- Calculate
       +---- Apply Rules
       +---- Process Data
       |
       v
    Response


==========================================================
8. ERROR HANDLING
==========================================================

- Server-side JavaScript detects and handles errors
  so that the application can respond properly.

Examples:

    - Invalid request
    - Database failure
    - Authentication failure
    - Resource not found
    - Network failure
    - Unexpected application error


Example:

    try {
        const user = await getUser();
    } catch (error) {
        console.error(error);
    }


API response:

    {
        "success": false,
        "message": "Something went wrong"
    }


Good error handling helps:

    - Maintain application stability
    - Provide useful responses
    - Debug problems
    - Prevent sensitive information from leaking


==========================================================
9. SECURITY
==========================================================

- Server-side JavaScript is responsible for implementing
  appropriate security controls.

Common security concerns include:

    - SQL Injection
    - XSS
    - CSRF
    - Authentication attacks
    - Authorization problems
    - Brute-force attacks
    - Injection attacks
    - Sensitive data exposure


Examples of security measures:

    - Input validation
    - Parameterized queries
    - Authentication
    - Authorization
    - Rate limiting
    - Secure headers
    - Password hashing
    - Access control


IMPORTANT:

- XSS is primarily a browser-side security issue, but
  backend applications can contribute to or mitigate
  XSS risks through proper output handling and security
  controls.

- Server-side security is a broad topic and requires
  multiple layers of protection.


==========================================================
10. PASSWORD HASHING / DATA PROTECTION
==========================================================

- Sensitive data such as passwords should not be stored
  as plain text.

BAD:

    password = "mypassword123"


Instead, passwords should be securely hashed using an
appropriate password-hashing algorithm.

Examples:

    - Argon2
    - bcrypt
    - scrypt


Flow:

    Plain Password
          |
          v
    Password Hashing
          |
          v
    Password Hash
          |
          v
    Database


IMPORTANT:

- Passwords should generally be HASHED, not encrypted.

- Hashing is one-way, while encryption is designed to
  be reversible using the appropriate key.


==========================================================
11. DATA ENCRYPTION
==========================================================

- Encryption protects data so that unauthorized parties
  cannot easily read it.

Encryption can be used for:

    - Data in transit
    - Data at rest


Example:

    Client
       |
       | HTTPS / TLS
       v
    Node.js Server
       |
       v
    Database


- HTTPS uses TLS to protect data transmitted between
  the client and server.

- Sensitive data stored in databases or other storage
  may also require encryption depending on the application
  and threat model.


IMPORTANT:

    Passwords -> Hashing
    Reversible sensitive data -> Encryption
    Data transmitted over network -> TLS / HTTPS


==========================================================
12. DATA PROCESSING
==========================================================

- Server-side JavaScript can process and transform data.

Examples:

    - Parse JSON
    - Transform objects
    - Filter data
    - Sort data
    - Aggregate data
    - Generate reports
    - Process uploaded files
    - Format responses


Example:

    const activeUsers = users.filter(
        user => user.active
    );


==========================================================
13. FILE HANDLING
==========================================================

- Node.js can work with files using its file-system APIs.

Examples:

    - Upload files
    - Read files
    - Write files
    - Delete files
    - Rename files
    - Process files


Example:

    const fs = require("fs");

    const data = fs.readFileSync(
        "data.txt",
        "utf8"
    );


==========================================================
14. EXTERNAL API COMMUNICATION
==========================================================

- Backend JavaScript can communicate with external
  services and APIs.

Examples:

    Node.js
       |
       +---- Payment API
       |
       +---- Email API
       |
       +---- SMS API
       |
       +---- Authentication Provider
       |
       +---- Maps API


Example:

    const response = await fetch(
        "https://api.example.com/users"
    );


This is commonly used for:

    - Payment processing
    - Sending emails
    - Sending SMS
    - Maps
    - Third-party authentication
    - Microservice communication


==========================================================
15. LOGGING AND MONITORING
==========================================================

- Server-side applications generate logs to record
  important system activity.

Logs can contain information about:

    - Incoming requests
    - Errors
    - Database operations
    - Authentication events
    - Performance
    - System events


Example:

    console.log("Server started");

    console.error("Database connection failed");


Logging helps with:

    - Debugging
    - Troubleshooting
    - Performance monitoring
    - Security auditing
    - Production monitoring


Production applications commonly use logging tools
such as:

    - Winston
    - Pino


==========================================================
16. BACKGROUND / ASYNCHRONOUS WORK
==========================================================

- Backend applications often need to perform work that
  does not need to block the user's request.

Examples:

    - Sending emails
    - Processing files
    - Generating reports
    - Processing jobs
    - Sending notifications


Typical architecture:

    Client
       |
       v
    Node.js API
       |
       +---- Save Job
       |
       v
    Queue
       |
       v
    Worker
       |
       +---- Process Job
       |
       +---- Send Email
       |
       +---- Generate Report


Tools such as Redis-backed queues can be used for
background job processing.


==========================================================
17. SERVER-SIDE JAVASCRIPT COMPLETE FLOW
==========================================================


                    CLIENT
                       |
                       | HTTP Request
                       v
                +--------------+
                |   NODE.JS    |
                |    SERVER    |
                +------+-------+
                       |
          +------------+------------+
          |            |            |
          v            v            v
      Validation   Authentication  Authorization
          |            |            |
          +------------+------------+
                       |
                       v
                Business Logic
                       |
          +------------+------------+
          |            |            |
          v            v            v
      Database     External API   File System
          |            |            |
          +------------+------------+
                       |
                       v
                Error Handling
                       |
                       v
                    Logging
                       |
                       v
                 HTTP Response
                       |
                       v
                    CLIENT


==========================================================
18. BACKEND RESPONSIBILITIES
==========================================================

Think of server-side JavaScript as handling:

    REQUEST
       |
       v
    Validate
       |
       v
    Authenticate
       |
       v
    Authorize
       |
       v
    Business Logic
       |
       v
    Database / External Services
       |
       v
    Process Result
       |
       v
    Handle Errors
       |
       v
    Log Activity
       |
       v
    Send Response


==========================================================
19. SHORT ANSWER
==========================================================

Q. What type of work is done by JavaScript on the
   server-side?

Answer:

"On the server side, JavaScript using Node.js is used
to build backend applications and APIs.

It handles business logic, database operations,
authentication, authorization, input validation,
session management, API communication, error handling,
security, file processing, data processing, and logging.

Node.js can also communicate with external services,
handle network requests, and process asynchronous
I/O operations efficiently."


==========================================================
20. INTERVIEW ONE-LINER
==========================================================

"Server-side JavaScript is mainly used to implement
backend logic, process requests, communicate with
databases and external services, authenticate and
authorize users, validate data, handle errors, and
return responses to clients."


==========================================================
*/


/*
==========================================================
@ CLIENT-SIDE vs SERVER-SIDE
==========================================================


Q. What is the difference between Client-Side and
   Server-Side?
==========================================================


                    CLIENT
                       |
                       | HTTP Request
                       v
              +------------------+
              |  SERVER / BACKEND|
              |    Node.js       |
              +--------+---------+
                       |
                Database / Files
                       |
                       v
              HTTP Response
                       |
                       v
                    CLIENT


- Client-side code mainly runs in the user's browser.

- Server-side code mainly runs on the server.

- Both sides work together to build a complete
  web application.


==========================================================
1. CLIENT-SIDE
==========================================================

- Client-side means code that runs on the user's device,
  usually inside a web browser.

Examples of browsers:

    - Google Chrome
    - Mozilla Firefox
    - Microsoft Edge
    - Safari


----------------------------------------------------------
A. ENVIRONMENT
----------------------------------------------------------

- Client-side JavaScript runs inside the browser.

Example:

    Chrome
       |
       v
    JavaScript Engine
       |
       v
    JavaScript Code


- Chrome uses V8.
- Firefox uses SpiderMonkey.
- Safari uses JavaScriptCore.


----------------------------------------------------------
B. LANGUAGES
----------------------------------------------------------

Client-side web applications mainly use:

    - HTML
    - CSS
    - JavaScript


HTML:

    Defines the structure of the page.


CSS:

    Defines the appearance and styling.


JavaScript:

    Adds behavior and interactivity.


----------------------------------------------------------
C. AVAILABLE OBJECTS / APIs
----------------------------------------------------------

Browser JavaScript can access browser-specific APIs
such as:

    - window
    - document
    - DOM
    - navigator
    - location
    - screen
    - browser events
    - Web APIs


Example:

    document.getElementById("title");


    window.alert("Hello");


    navigator.language;


- These APIs are provided by the browser environment.


----------------------------------------------------------
D. REQUEST / RESPONSE HANDLING
----------------------------------------------------------

- Client-side JavaScript can SEND HTTP requests to
  servers.

Example:

    const response = await fetch("/api/users");


Flow:

    Browser
       |
       | HTTP Request
       v
    Server
       |
       | HTTP Response
       v
    Browser
       |
       v
    JavaScript
       |
       v
    Update UI


IMPORTANT:

- Client-side JavaScript can make HTTP requests.

- But it does NOT normally act as the server that
  listens for incoming HTTP connections.


----------------------------------------------------------
E. RESPONSIBILITIES
----------------------------------------------------------

Client-side code is mainly responsible for:

    - User interface
    - User interactions
    - DOM manipulation
    - Form handling
    - Client-side validation
    - Animations
    - Browser-side state
    - Calling APIs
    - Updating page content


Example:

    button.addEventListener("click", () => {
        console.log("Button clicked");
    });


----------------------------------------------------------
F. ACCESS TO BACKEND
----------------------------------------------------------

- Client-side code cannot directly access backend code.

- If the client needs data or functionality from the
  backend, it sends a request to an API.

Example:

    Browser
       |
       | GET /api/users
       v
    Node.js Server
       |
       v
    Database
       |
       v
    Response
       |
       v
    Browser


- The client receives the response but does not get
  direct access to the server's internal code.


----------------------------------------------------------
G. WHAT CLIENT-SIDE CAN DO
----------------------------------------------------------

Client-side JavaScript can:

    - Manipulate HTML
    - Manipulate CSS through the DOM
    - Handle button clicks
    - Handle browser events
    - Validate forms
    - Call APIs
    - Use fetch()
    - Store appropriate client-side data
    - Update UI dynamically


Examples:

    document.querySelector("#title");

    fetch("/api/users");

    localStorage.setItem(
        "theme",
        "dark"
    );


----------------------------------------------------------
H. WHAT CLIENT-SIDE SHOULD NOT DO
----------------------------------------------------------

Client-side code should NOT be trusted with secrets.

Examples:

    - Database passwords
    - Private API keys
    - Server credentials
    - Secret encryption keys
    - Internal server credentials


IMPORTANT:

- Client-side JavaScript is visible to the user.

- Therefore, anything placed in frontend JavaScript
  should be considered potentially accessible to the user.


----------------------------------------------------------
I. DATABASE ACCESS
----------------------------------------------------------

- Client-side JavaScript should not directly connect to
  a private production database.

Instead:

    Browser
       |
       | API Request
       v
    Backend
       |
       | Database Query
       v
    Database


- The backend controls database access and permissions.


----------------------------------------------------------
J. PERFORMANCE
----------------------------------------------------------

- Client-side JavaScript consumes the user's device
  resources.

- Very heavy computation can make the UI slow or
  unresponsive.

Examples:

    - Large data processing
    - Complex calculations
    - CPU-intensive operations


- Heavy work can sometimes be moved to:

    - Server
    - Web Workers
    - Background processing


==========================================================
2. SERVER-SIDE
==========================================================

- Server-side means code that runs on a server.

- With JavaScript, Node.js is commonly used as the
  server-side runtime.

Other server-side technologies include:

    - Python
    - Java
    - C#
    - PHP
    - Go
    - Ruby


----------------------------------------------------------
A. ENVIRONMENT
----------------------------------------------------------

- Server-side JavaScript runs in a runtime such as Node.js.

Example:

    Client
       |
       | HTTP Request
       v
    Node.js Server
       |
       v
    Backend Logic


----------------------------------------------------------
B. LANGUAGES
----------------------------------------------------------

Server-side applications can be built using:

    JavaScript / Node.js
    Python
    Java
    C#
    PHP
    Go
    Ruby
    etc.


----------------------------------------------------------
C. AVAILABLE OBJECTS / APIs
----------------------------------------------------------

Node.js provides server-side APIs such as:

    - fs
    - http
    - https
    - net
    - process
    - streams
    - timers
    - OS-related APIs


Example:

    const fs = require("fs");

    fs.writeFileSync(
        "data.txt",
        "Hello"
    );


- Node.js does NOT provide the browser DOM by default.

Therefore:

    document
    window
    DOM

are not Node.js core browser APIs.


----------------------------------------------------------
D. REQUEST / RESPONSE HANDLING
----------------------------------------------------------

- Server-side applications can listen for incoming
  network requests and send responses.

Example:

    Client
       |
       | GET /users
       v
    Node.js Server
       |
       | Query Database
       v
    Database
       |
       | Data
       v
    Node.js Server
       |
       | HTTP Response
       v
    Client


----------------------------------------------------------
E. RESPONSIBILITIES
----------------------------------------------------------

Server-side code is mainly responsible for:

    - Business logic
    - Database operations
    - Authentication
    - Authorization
    - API development
    - Input validation
    - Session management
    - File operations
    - Security
    - Data processing
    - Error handling
    - Logging
    - Communication with external services


----------------------------------------------------------
F. ENVIRONMENT / SYSTEM ACCESS
----------------------------------------------------------

Server-side Node.js can access controlled operating
system capabilities through Node.js APIs.

Examples:

    - File system
    - Processes
    - Environment variables
    - Network
    - Streams


Example:

    console.log(process.env.PORT);


    const fs = require("fs");

    fs.readFileSync("data.txt");


----------------------------------------------------------
G. DATABASE ACCESS
----------------------------------------------------------

- Server-side applications can communicate with databases
  through database drivers, ORMs, or ODMs.

Examples:

    - MySQL
    - PostgreSQL
    - MongoDB
    - Redis
    - SQL Server


Flow:

    Client
       |
       v
    Node.js
       |
       v
    Database
       |
       v
    Node.js
       |
       v
    Client


----------------------------------------------------------
H. SECURITY
----------------------------------------------------------

- Server-side code can protect sensitive operations
  because the server environment is not directly exposed
  in the same way as frontend JavaScript.

Examples:

    - Database credentials
    - API secrets
    - Authentication logic
    - Authorization rules
    - Private keys
    - Server configuration


IMPORTANT:

- Server-side code is not automatically secure.

- Proper security practices are still required.


----------------------------------------------------------
I. PERFORMANCE
----------------------------------------------------------

- Servers generally have more predictable and controlled
  computing resources than individual client devices.

- Server-side processing can be useful for operations
  that should not be performed on the client.

IMPORTANT:

- Do not say "all heavy computations should be done on
  the server."

- The correct choice depends on the application.

- CPU-heavy work can also block Node.js's main JavaScript
  thread if not handled appropriately.

- CPU-intensive work may need:

    - Worker Threads
    - Child Processes
    - Separate services
    - Job queues
    - Other architectures


----------------------------------------------------------
J. NON-BLOCKING I/O
----------------------------------------------------------

- Node.js uses an event-driven, non-blocking I/O model.

- This allows it to efficiently handle many concurrent
  I/O operations.

Examples:

    - Database operations
    - File operations
    - Network requests
    - API calls


Example:

    Request
       |
       v
    Node.js
       |
       v
    Database Request
       |
       |-----> Node.js can handle other work
       |
       v
    Database Response
       |
       v
    Continue processing


----------------------------------------------------------
K. SESSION MANAGEMENT
----------------------------------------------------------

- Server-side applications can manage user sessions.

Examples:

    - Login sessions
    - Shopping carts
    - User-specific state
    - Authentication state


Session data may be stored using:

    - Database
    - Redis
    - Other session stores


==========================================================
3. CLIENT-SIDE vs SERVER-SIDE
==========================================================


+----------------------+-----------------------------+
| CLIENT-SIDE          | SERVER-SIDE                 |
+----------------------+-----------------------------+
| Runs in browser     | Runs on server             |
|                      |                             |
| HTML/CSS/JS         | Node.js, Python, Java, etc.|
|                      |                             |
| Accesses DOM        | No browser DOM by default  |
|                      |                             |
| Accesses BOM        | No browser BOM             |
|                      |                             |
| Handles UI           | Handles business logic     |
|                      |                             |
| Handles user events | Handles requests           |
|                      |                             |
| Calls APIs           | Provides APIs              |
|                      |                             |
| Client validation    | Server validation          |
|                      |                             |
| Browser storage      | Database / server storage  |
|                      |                             |
| Cannot trust secrets | Can protect server secrets|
|                      |                             |
| Uses user resources  | Uses server resources      |
|                      |                             |
| Limited OS access    | Server OS access via APIs  |
+----------------------+-----------------------------+


==========================================================
4. CLIENT-SIDE vs SERVER-SIDE FLOW
==========================================================


                     USER
                      |
                      v
                 WEB BROWSER
                      |
                      |
              CLIENT-SIDE JS
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
       DOM         User Events    API Call
                                    |
                                    | HTTP Request
                                    v
                              NODE.JS SERVER
                                    |
                         +----------+----------+
                         |          |          |
                         v          v          v
                    Validation   Business   Authentication
                                  Logic
                                    |
                         +----------+----------+
                         |          |          |
                         v          v          v
                     Database    Files    External API
                         |          |          |
                         +----------+----------+
                                    |
                                    v
                              HTTP Response
                                    |
                                    v
                                BROWSER
                                    |
                                    v
                              Update DOM


==========================================================
5. SECURITY DIFFERENCE
==========================================================

CLIENT-SIDE:

    - Code is delivered to the browser.
    - Users can inspect frontend code.
    - Never put secrets in frontend code.
    - Client-side validation can be bypassed.
    - Server must validate important input again.


SERVER-SIDE:

    - Server code remains on the server.
    - Database credentials can remain server-side.
    - Business rules can remain server-side.
    - Authentication and authorization can be enforced
      on the server.


IMPORTANT:

    Client-side validation
            +
    Server-side validation
            =
    Better application validation


Never rely only on client-side validation.


==========================================================
6. EXAMPLE
==========================================================

Suppose we have a shopping application.

CLIENT-SIDE:

    - Display products
    - Show shopping cart
    - Handle button clicks
    - Update quantity
    - Validate basic form input
    - Call API
    - Display response


SERVER-SIDE:

    - Verify user
    - Check product availability
    - Calculate final price
    - Apply discount rules
    - Process order
    - Store order in database
    - Process payment
    - Return response


Flow:

    User clicks "Buy"
          |
          v
    Client-side JavaScript
          |
          | POST /api/orders
          v
    Node.js Server
          |
          +---- Authentication
          |
          +---- Authorization
          |
          +---- Validation
          |
          +---- Business Logic
          |
          +---- Database
          |
          +---- Payment Service
          |
          v
       Response
          |
          v
    Client-side JavaScript
          |
          v
       Update UI


==========================================================
7. WHAT CLIENT-SIDE CAN DO
==========================================================

    - Manipulate DOM
    - Handle UI
    - Handle browser events
    - Call APIs
    - Perform client-side validation
    - Use browser Web APIs
    - Store appropriate client-side data
    - Update page dynamically


==========================================================
8. WHAT SERVER-SIDE CAN DO
==========================================================

    - Handle HTTP requests
    - Execute business logic
    - Access databases
    - Read/write server files
    - Access environment variables
    - Authenticate users
    - Authorize users
    - Manage sessions
    - Communicate with external services
    - Perform server-side validation
    - Generate responses


==========================================================
9. WHAT CLIENT-SIDE CANNOT DIRECTLY DO
==========================================================

Client-side JavaScript cannot normally:

    - Directly access a private backend database
    - Directly execute server-side code
    - Directly access the server's file system
    - Keep server secrets securely
    - Be trusted as the final authority for validation


==========================================================
10. WHAT SERVER-SIDE CANNOT DIRECTLY DO
==========================================================

Server-side Node.js cannot directly manipulate the
browser's DOM because it runs outside the browser.

For example:

    document.getElementById("title");


does not work in normal Node.js because `document`
is a browser DOM API.


Instead:

    Server
       |
       | HTTP Response
       v
    Browser
       |
       v
    JavaScript
       |
       v
    DOM Update


==========================================================
11. SCALABILITY
==========================================================

CLIENT-SIDE:

- Usually serves one user's browser session.
- Performance depends partly on the user's device,
  browser, network, and workload.

SERVER-SIDE:

- One server/application can serve many clients.
- Node.js's event-driven and non-blocking I/O model
  is well suited for handling many concurrent I/O
  operations.

Example:

    Client 1 ----\
    Client 2 -----\
    Client 3 ------> Node.js Server
    Client 4 -----/
    Client 5 ----/


==========================================================
12. RESOURCE UTILIZATION
==========================================================

CLIENT:

    - Uses CPU, memory, battery, and network of the
      user's device.


SERVER:

    - Uses server-side CPU, memory, storage, and network
      resources.

- Server resources are typically managed centrally,
  while client resources vary between users' devices.


==========================================================
13. FINAL DIFFERENCE
==========================================================


CLIENT-SIDE
----------------------------------------------------------

Runs:
    Browser

Main purpose:
    UI + User Interaction

Can access:
    DOM + Browser APIs

Main responsibility:
    Display and interact with the application

Cannot safely store:
    Server secrets

Example:
    JavaScript in Chrome


SERVER-SIDE
----------------------------------------------------------

Runs:
    Server / Node.js

Main purpose:
    Backend Processing

Can access:
    Database + Files + Network + Server APIs

Main responsibility:
    Business Logic + Data + Security

Can protect:
    Server-side secrets

Example:
    Node.js application


==========================================================
IN SHORT
==========================================================

CLIENT-SIDE:

"Focuses on what the user sees and interacts with."

SERVER-SIDE:

"Focuses on processing requests, implementing business
logic, accessing data and services, enforcing security,
and generating responses."


==========================================================
INTERVIEW ANSWER
==========================================================

Q. What is the difference between client-side and
   server-side?

Answer:

"Client-side code runs in the user's browser and is mainly
responsible for the user interface, DOM manipulation,
user interactions, and calling backend APIs.

Server-side code runs on the server and is responsible for
business logic, database operations, authentication,
authorization, validation, security, and handling HTTP
requests and responses.

Client-side code can communicate with the backend through
APIs, but it should not directly access private databases,
server files, or sensitive server-side secrets."


==========================================================
ONE-LINE SUMMARY
==========================================================

Client-Side
    =
    UI + User Interaction + Browser APIs
    + API Calls


Server-Side
    =
    Business Logic + Database + Security
    + APIs + Server Resources


CLIENT
   |
   | HTTP Request
   v
SERVER
   |
   | Database / Business Logic
   v
SERVER
   |
   | HTTP Response
   v
CLIENT
   |
   v
UPDATE UI


                 WEB APPLICATION
                       |
          +------------+------------+
          |                         |
          v                         v
     CLIENT-SIDE              SERVER-SIDE
      (Browser)                (Node.js)
          |                         |
          v                         v
        HTML                      API
        CSS                       Logic
        JS                        Auth
        DOM                       Database
        Events                    Security
        UI                        Files
          |                         |
          +-----------+-------------+
                      |
                   HTTP / HTTPS

==========================================================
*/

/*
==========================================================
@ EHRN YO UDRF NODE.JS
==========================================================


Q. When to use Node.js?
==========================================================

- Node.js is a good choice for applications that require:

    1. High scalability
    2. Real-time communication
    3. High concurrency
    4. Non-blocking I/O
    5. Fast request/response handling
    6. Network-intensive operations

- Node.js uses an event-driven, non-blocking I/O model,
  which allows it to efficiently handle many concurrent
  I/O operations.


==========================================================
1. REAL-TIME APPLICATIONS
==========================================================

- Node.js is well suited for applications where the
  server needs to communicate with clients in real time.

Examples:

    - Chat applications
    - Live notifications
    - Online collaboration 
    - Multiplayer games
    - Live dashboards
    - Real-time tracking


Example:

    User A
       |
       | Message
       v
    Node.js Server
       |
       +----------+
       |          |
       v          v
    User B      User C


- Technologies such as WebSockets can be used with
  Node.js for real-time communication.


==========================================================
2. REST APIs
==========================================================

- Node.js is commonly used to build REST APIs.

- Its non-blocking I/O model is useful when an API needs
  to handle many concurrent requests involving:

    - Database operations
    - Network requests
    - External APIs
    - File operations


Example:

    Client
       |
       | GET /users
       v
    Node.js API
       |
       v
    Database
       |
       v
    JSON Response
       |
       v
    Client


Common API use cases:

    - User APIs
    - Product APIs
    - Order APIs
    - Payment APIs
    - Authentication APIs
    - Microservice APIs


==========================================================
3. STREAMING APPLICATIONS
==========================================================

- Node.js provides Streams, which are useful for
  processing data progressively instead of loading
  the entire data into memory at once.

Examples:

    - Video streaming
    - Audio streaming
    - Large file transfer
    - Log processing
    - Data streaming


Simplified:

    Large File
        |
        v
      Stream
        |
        +---- Chunk 1
        +---- Chunk 2
        +---- Chunk 3
        +---- Chunk 4
        |
        v
      Client


- This can reduce memory usage and allow data to be
  processed as it becomes available.


==========================================================
4. MICROSERVICES
==========================================================

- Node.js is suitable for building small, independent
  backend services.

Example:

              APPLICATION
                   |
       +-----------+-----------+
       |           |           |
       v           v           v
    User        Order       Payment
   Service     Service      Service
       |           |           |
       v           v           v
    Database    Database    Database


- Each service can:

    - Have its own responsibility
    - Be developed independently
    - Be deployed independently
    - Communicate with other services through APIs
      or messaging systems


==========================================================
5. IoT APPLICATIONS
==========================================================

- Node.js can be used in IoT systems where applications
  need to communicate with many devices and process
  network data.

Examples:

    - Sensors
    - Smart devices
    - Industrial devices
    - Monitoring systems
    - Real-time device dashboards


Example:

    Sensor
       |
       | Data
       v
    Node.js
       |
       +---- Process data
       |
       +---- Store data
       |
       +---- Send notification
       |
       v
    Dashboard


==========================================================
6. WEB APPLICATIONS
==========================================================

- Node.js can be used to build complete web application
  backends.

Examples:

    - E-commerce applications
    - Social media platforms
    - Booking systems
    - Education platforms
    - SaaS applications


Typical architecture:

    Browser
       |
       v
    Node.js
       |
       +---- Authentication
       +---- Business Logic
       +---- Database
       +---- External APIs
       |
       v
    Response


==========================================================
7. REAL-TIME NOTIFICATION SYSTEMS
==========================================================

- Node.js is useful when users need immediate updates.

Examples:

    - New message notification
    - Order status
    - Delivery tracking
    - Stock updates
    - System alerts


Example:

    Order Status
         |
         v
    Node.js Server
         |
         v
    Real-time Notification
         |
         v
    User Browser


==========================================================
8. NETWORK APPLICATIONS
==========================================================

- Node.js provides APIs for network programming.

Examples:

    - HTTP servers
    - TCP servers
    - Network services
    - WebSocket servers
    - Proxy services


- This makes Node.js suitable for applications that
  perform a lot of network communication.


==========================================================
9. COMMAND-LINE TOOLS
==========================================================

- Node.js can also be used to build command-line
  applications.

Examples:

    - Development tools
    - Build tools
    - Automation scripts
    - File-processing tools
    - CLI utilities


Example:

    $ node app.js


==========================================================
10. SERVERLESS / BACKEND FUNCTIONS
==========================================================

- Node.js can be used for backend functions that execute
  in response to events or requests.

Examples:

    - API functions
    - File upload processing
    - Scheduled jobs
    - Event processing
    - Webhooks


==========================================================
WHY NODE.JS IS SUITABLE
==========================================================

Node.js uses:

    Event-driven architecture
              +
    Non-blocking I/O
              +
    Asynchronous programming
              +
    Efficient network handling
              |
              v
    Good concurrency for I/O-heavy workloads


Example:

    Request 1 ----\
    Request 2 -----\
    Request 3 ------> Node.js
    Request 4 -----/
    Request 5 ----/


- Node.js does not need to create a dedicated JavaScript
  thread for every request.

- While an I/O operation is waiting, Node.js can continue
  processing other work.


==========================================================
WHEN NODE.JS IS A GOOD CHOICE
==========================================================

Use Node.js when the application has a lot of:

    - HTTP requests
    - Database I/O
    - Network I/O
    - External API calls
    - Real-time communication
    - Concurrent connections
    - Streaming
    - Event-driven operations


==========================================================
WHEN NODE.JS MAY NOT BE THE BEST CHOICE
==========================================================

- Node.js can handle many I/O-heavy workloads efficiently,
  but CPU-intensive work can block the main JavaScript
  execution thread if it is performed directly there.

Examples:

    - Heavy mathematical calculations
    - Large CPU-intensive data processing
    - Complex image/video processing
    - Certain scientific computations
    - Large CPU-bound algorithms


For such workloads, consider:

    - Worker Threads
    - Child Processes
    - Background job workers
    - Separate services
    - Specialized computing systems


IMPORTANT:

- This does NOT mean Node.js cannot perform CPU-intensive
  work.

- It means CPU-heavy work should be designed carefully so
  that it does not block the main event loop.


==========================================================
BEST USE CASES
==========================================================

1. Real-time applications
   -> Chat
   -> Notifications
   -> Collaboration
   -> Gaming

2. REST APIs
   -> Web APIs
   -> Mobile APIs
   -> Backend services

3. Streaming
   -> Audio
   -> Video
   -> Large file processing

4. Microservices
   -> Small independent services
   -> API-based communication

5. IoT
   -> Sensors
   -> Devices
   -> Real-time monitoring

6. Network applications
   -> HTTP
   -> WebSockets
   -> TCP/network services

7. Web applications
   -> E-commerce
   -> SaaS
   -> Social applications

8. CLI tools
   -> Automation
   -> Developer tools
   -> Build tools


==========================================================
SHORT ANSWER
==========================================================

Q. When should we use Node.js?

Answer:

"Node.js is a good choice for applications that require
high concurrency, real-time communication, and
non-blocking I/O.

It is particularly suitable for REST APIs, real-time
applications, streaming applications, microservices,
IoT systems, and network-intensive applications.

Node.js is especially effective for I/O-bound workloads,
where the application spends significant time waiting for
network, database, or file-system operations."


==========================================================
INTERVIEW ONE-LINER
==========================================================

"Use Node.js when your application is I/O-heavy,
network-intensive, highly concurrent, or requires
real-time communication."


==========================================================
REMEMBER
==========================================================

             NODE.JS
                |
      +---------+---------+
      |         |         |
      v         v         v
    REST      REAL-TIME  STREAMING
    APIs      APPS       APPS
      |         |         |
      +---------+---------+
                |
                v
           MICROSERVICES
                |
                v
               IoT
                |
                v
        NETWORK APPLICATIONS


Main strength:

    Non-blocking I/O
          +
    Event-driven architecture
          +
    High concurrency
          |
          v
    Excellent for I/O-heavy applications

# EASY FORMAUL WHERE WE HAVE TO USED NODE JS .

    Node.js
   |
   +--> I/O Heavy
   |
   +--> Many Concurrent Requests
   |
   +--> Real-Time
   |
   +--> Network Intensive
   |
   +--> Streaming
   |
   +--> APIs
   |
   +--> Microservices
   |
   +--> IoT

==========================================================
*/

/*
Q. When to Avoid Node.js?
==========================================================

- Node.js is not a bad choice for CPU-intensive applications,
  but CPU-heavy work needs special handling because long-running
  JavaScript execution can block the event loop.

- Therefore, be careful when the application's main workload
  is CPU-bound rather than I/O-bound.


1. CPU-BOUND WORKLOADS
----------------------------------------------------------

Examples:

    - Large mathematical calculations
    - CPU-heavy data processing
    - Complex image processing
    - Complex video processing
    - Large scientific computations
    - AI model training


- If CPU-heavy code runs for a long time on the main
  JavaScript thread, it can block the event loop.

Example:

    Request 1
       |
       v
    CPU-heavy task
       |
       | blocks
       v
    Event Loop
       X
    Other requests wait

- For CPU-heavy workloads, consider:

    - Worker Threads
    - Child Processes
    - Background workers
    - Separate services


IMPORTANT:

- Do NOT say:

    "Node.js cannot do CPU-intensive work."

- Better:

    "CPU-intensive work should not block Node.js's
     main event loop."


==========================================================
2. APPLICATIONS WHERE CPU PARALLELISM IS THE PRIMARY NEED
==========================================================

- If the application depends heavily on parallel CPU
  computation, a runtime or architecture designed around
  CPU parallelism may be a better fit.

Examples:

    - Large scientific computations
    - Complex simulations
    - CPU-heavy data processing
    - Large-scale mathematical workloads


- Technologies such as Java, C++, C#, Go, Python, or
  specialized computing systems may be considered depending
  on the workload.

IMPORTANT:

- This is NOT because Node.js is incapable of using
  multiple threads.

- Node.js supports Worker Threads and other mechanisms
  for parallel work.

- The important issue is whether the application's
  architecture is primarily CPU-bound.


==========================================================
3. LONG-RUNNING SYNCHRONOUS OPERATIONS
==========================================================

- Long-running synchronous operations can block the
  Node.js event loop.

Example:

    while (true) {
        // long-running synchronous work
    }


Flow:

    Request
       |
       v
    Long synchronous task
       |
       v
    Event Loop blocked
       |
       X
    Other requests delayed


- Therefore, avoid performing expensive synchronous
  operations on the main event-loop thread in
  request-handling code.


==========================================================
4. "LARGE ENTERPRISE APPLICATION" IS NOT A REASON
   BY ITSELF TO AVOID NODE.JS
==========================================================

IMPORTANT CORRECTION:

- Do NOT say:

    "Node.js should be avoided for large enterprise
     applications."

- Large enterprise applications can absolutely be built
  using Node.js.

Examples of suitable enterprise workloads include:

    - REST APIs
    - Microservices
    - Real-time systems
    - Backend services
    - Event-driven systems


- The decision should be based on:

    - Workload
    - Team expertise
    - Architecture
    - Performance requirements
    - Ecosystem
    - Operational requirements
    - Existing infrastructure


==========================================================
5. SECURITY IS NOT A REASON TO AVOID NODE.JS
==========================================================

IMPORTANT CORRECTION:

- Do NOT say:

    "Avoid Node.js for banking applications because
     Node.js is not secure."


- Node.js can be used to build secure financial and
  enterprise applications.

- Security depends on:

    - Application architecture
    - Authentication
    - Authorization
    - Encryption
    - Secure coding
    - Dependency management
    - Infrastructure
    - Monitoring
    - Compliance requirements


- A banking application may use Node.js if it fits
  its architecture and requirements.


==========================================================
6. WHEN SHOULD YOU ACTUALLY CONSIDER AVOIDING NODE.JS?
==========================================================

Consider another architecture when:

    1. The core workload is heavily CPU-bound.

    2. Long-running synchronous computation is central
       to the application.

    3. The application requires extensive CPU parallelism
       and another technology provides a better fit.

    4. Existing infrastructure or team expertise strongly
       favors another technology.

    5. A specialized ecosystem or runtime is significantly
       better suited to the required workload.


==========================================================
SHORT ANSWER
==========================================================

Q. When should we avoid Node.js?

Answer:

"Node.js should be used carefully when the application's
main workload is CPU-bound or requires long-running
synchronous computation, because such work can block the
event loop.

For CPU-intensive workloads, Worker Threads, background
workers, separate services, or another runtime may be
more appropriate."


==========================================================
*/


/*
==========================================================
@ NODE.JS — MAIN WORK
==========================================================

Q. What is the main work of Node.js?
==========================================================

- Node.js provides the runtime environment required to
  execute JavaScript outside the browser.

- It provides runtime APIs that allow JavaScript programs
  to interact with:

    - Operating system
    - File system
    - Network
    - Processes
    - Streams
    - HTTP
    - Environment variables


==========================================================
IMPORTANT DISTINCTION
==========================================================

Node.js itself is NOT simply:

    "A web server."

Instead:

    Node.js
       =
    JavaScript Runtime Environment


- Node.js provides APIs that allow developers to BUILD
  servers and backend applications.

Example:

    Node.js
       |
       +---- HTTP Server
       |
       +---- REST API
       |
       +---- WebSocket Server
       |
       +---- CLI Application
       |
       +---- Backend Service


- Frameworks such as Express can make building web
  applications and APIs easier.


==========================================================
SHORT ANSWER
==========================================================

"The main role of Node.js is to provide a runtime in which
JavaScript can execute outside the browser, along with APIs
for networking, file systems, processes, streams, and other
server-side operations.

Using these capabilities, developers can build HTTP servers,
APIs, backend services, and other applications."


==========================================================
*/


/*
==========================================================
@ WHY IS NODE.JS SPECIAL AS A RUNTIME?
==========================================================



1. JAVASCRIPT OUTSIDE THE BROWSER
----------------------------------------------------------

- Before Node.js, JavaScript was primarily associated
  with browser environments.

- Node.js made it possible to use JavaScript for
  server-side and general-purpose applications.


JavaScript
    |
    +------> Browser
    |
    +------> Node.js
                 |
                 +--> Backend
                 +--> CLI
                 +--> Network applications
                 +--> Automation


==========================================================
2. SAME LANGUAGE ACROSS THE STACK
----------------------------------------------------------

- Developers can use JavaScript on both sides:

    Frontend
        |
        | JavaScript
        v
    Backend
        |
        | JavaScript
        v
    Node.js


- This can reduce context switching between frontend
  and backend development.


==========================================================
3. NPM ECOSYSTEM
----------------------------------------------------------

- Node.js has access to the npm ecosystem.

- Developers can reuse existing packages instead of
  implementing common functionality from scratch.

Examples:

    - Web frameworks
    - Database drivers
    - Validation libraries
    - Authentication libraries
    - Testing tools
    - CLI tools


Flow:

    Node.js
       |
       v
      npm
       |
       v
    Packages
       |
       v
    Application


==========================================================
4. SAME RUNTIME FOR MANY TYPES OF APPLICATIONS
----------------------------------------------------------

Node.js is not limited to web servers.

It can also be used for:

    - CLI tools
    - Automation scripts
    - Build tools
    - Backend services
    - Network applications
    - Real-time applications


==========================================================
SHORT ANSWER
==========================================================

"Node.js is special because it brings JavaScript outside
the browser and provides a runtime with networking,
file-system, process, stream, and other system APIs.

Its event-driven architecture, large npm ecosystem, and
ability to use JavaScript across the stack make it useful
for many types of applications."


==========================================================
*/


/*


1. JAVASCRIPT NEEDED OUTSIDE THE BROWSER
----------------------------------------------------------

- JavaScript by itself is a programming language.

- To execute JavaScript, we need a JavaScript runtime.

Browser:

    JavaScript
        |
        v
    Browser Runtime
        |
        v
    Web Application


Node.js:

    JavaScript
        |
        v
    Node.js Runtime
        |
        v
    Backend / Server / CLI / Network Application


- Node.js provides the runtime environment and APIs
  needed to execute JavaScript outside the browser.


==========================================================
2. SYSTEM-LEVEL CAPABILITIES
----------------------------------------------------------

- Node.js allows JavaScript applications to interact
  with the operating system through runtime APIs.

Examples:

    - File system
    - Processes
    - Network
    - Environment variables
    - Streams


This allows JavaScript to be used for more than
browser UI development.


==========================================================
3. JAVASCRIPT FULL-STACK ECOSYSTEM
----------------------------------------------------------

Without Node.js:

    Frontend
       |
    JavaScript

    Backend
       |
    Another language


With Node.js:

    Frontend
       |
    JavaScript
       |
    Backend
       |
    JavaScript / Node.js


- This allows organizations and developers to use
  JavaScript across different layers of an application.


==========================================================
SHORT ANSWER
==========================================================

Q. Why do we need Node.js?

Answer:

"We need Node.js when we want to execute JavaScript
outside the browser and build server-side or other
general-purpose applications.

Node.js provides the runtime and system-level APIs needed
for networking, file handling, processes, streams, and
backend development."


==========================================================
*/