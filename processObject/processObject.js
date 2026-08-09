/*
============================================================
@ PROCESS OBJECT IN NODE.JS
============================================================

* Q. What is process in Node.js?
- `process` is a global object provided by Node.js.
- It provides information about and control over the
  currently running Node.js process.
- Since `process` is a global object, we do not need to
  import it.
! Example:
console.log(process);
------------------------------------------------------------
# PROCESS OBJECT
------------------------------------------------------------
Node.js Application
        |
        ↓
   process object
        |
        +---- Process information
        |
        +---- Environment information
        |
        +---- Command-line arguments
        |
        +---- Memory information
        |
        +---- Process control
        |
        +---- Events
        |
        +---- Signals
===========================================================
# IMPORTANT PROCESS PROPERTIES
============================================================
1. process.pid
2. process.ppid
3. process.platform
4. process.arch
5. process.argv
6. process.argv0
7. process.execPath
8. process.execArgv
9. process.env
10. process.version
11. process.versions
12. process.cwd()
13. process.memoryUsage()
14. process.uptime()
===========================================================
# 1. process.pid
============================================================
* Q. What is process.pid?

- `process.pid` returns the Process ID (PID) of the
  currently running Node.js process.

! Example:

console.log(process.pid);
Output:
10952

- The exact number depends on the operating system and
currently running process.

! Example:
console.log("Process ID:", process.pid);
============================================================
# 2. process.ppid
============================================================
* Q. What is process.ppid?
- `process.ppid` returns the Process ID of the parent
  process that started the current Node.js process.
! Example:
console.log("Parent Process ID:", process.ppid);
Flow:
Parent Process
      |
      | starts
      ↓
Node.js Process
- Parent PID → process.ppid
- Current PID → process.pid

============================================================
# 3. process.platform
============================================================
* Q. What is process.platform?

- Returns the operating system platform on which the
  Node.js process is running.

? Common values:

win32  → Windows
linux  → Linux
darwin → macOS
freebsd → FreeBSD

! Example:
console.log(process.platform);
Possible output:
win32
------------------------------------------------------------
Useful for platform-specific code:

if (process.platform === "win32") {
    console.log("Running on Windows");
}

============================================================
# 4. process.arch
============================================================

* Q. What is process.arch?

- Returns the CPU architecture for which the Node.js
  process was compiled.

? Common values:

x64
arm64
arm
ia32

!Example:
console.log(process.arch);
Possible output:
x64
------------------------------------------------------------

! Example:
console.log(
    "CPU Architecture:",
    process.arch
);

============================================================
# 5. process.argv
============================================================

* Q. What is process.argv?

- `process.argv` is an array containing the
  command-line arguments passed to the Node.js process.

!Example:
console.log(process.argv);
When running:
node app.js hello 100
You may get:

[
    "path-to-node",
    "path-to-app.js",
    "hello",
    "100"
]
------------------------------------------------------------

!Important:
process.argv[0]
    → Node.js executable path
process.argv[1]
    → JavaScript file path
process.argv[2]
    → first user-provided argument
process.argv[3]
    → second user-provided argument
------------------------------------------------------------
!Example:
console.log(process.argv[2]);
If:
node app.js Vishal
Output:
Vishal

============================================================
# COMMAND-LINE ARGUMENT FLOW
============================================================
?Command:
node app.js hello 100

             |
             ↓
process.argv
             |
             +---- [0] Node.js path
             |
             +---- [1] app.js path
             |
             +---- [2] hello
             |
             +---- [3] 100

============================================================
# 6. process.argv0
============================================================

* Q. What is process.argv0?

- `process.argv0` contains the original value of
  `argv[0]` passed when the Node.js process started.

! Example:
console.log(process.argv0);
Usually this is related to the Node.js executable.
IMPORTANT:

- `process.argv0` and `process.argv[0]` can differ in some
situations, so they should not be treated as exactly the
same property.

============================================================
# 7. process.execPath
============================================================

* Q. What is process.execPath?

- Returns the absolute path of the executable that started
  the current Node.js process.

!Example:
console.log(process.execPath);
Possible output:
C:\Program Files\nodejs\node.exe
- On another operating system, the path will be different.

============================================================
# 8. process.execArgv
============================================================

* Q. What is process.execArgv?

- Contains the command-line arguments passed directly to
  the Node.js executable.

- It does NOT contain normal application arguments.

! Example:
node --inspect app.js hello
Conceptually:

process.execArgv
    ↓
["--inspect"]

process.argv
    ↓
[
    "node path",
    "app.js",
    "hello"
]

------------------------------------------------------------
? Important difference:

- process.execArgv
    → Node.js runtime arguments

- process.argv
    → Node.js path + script path + application arguments

============================================================
# 9. process.env
============================================================

* Q. What is process.env?

- `process.env` provides access to environment variables
  available to the current Node.js process.

! Example:
console.log(process.env);
------------------------------------------------------------
? Access a specific environment variable:
console.log(process.env.NODE_ENV);
Example:

if (process.env.NODE_ENV === "production") {
    console.log("Production environment");
}
------------------------------------------------------------
? Setting an environment variable for the current process:
process.env.APP_NAME = "MyApp";
console.log(process.env.APP_NAME);
Output:
    MyApp
------------------------------------------------------------
IMPORTANT:
Environment variables are commonly used for:
    - configuration
    - database URLs
    - API configuration
    - environment selection
    - feature flags
- Do not hard-code sensitive configuration directly into
source code.

============================================================
# 10. process.version
============================================================

* Q. What is process.version?

- Returns the version of the currently running Node.js
  process.

! Example:
console.log(process.version);
Possible output:
v24.x.x
- The exact version depends on the installed Node.js version.

============================================================
# 11. process.versions
============================================================

* Q. What is process.versions?

- Returns an object containing version information for
  Node.js and its important dependencies.

! Example:
console.log(process.versions);
It can contain information about:

- node
- v8
- openssl
- uv
- zlib
- etc.

! Example:
console.log(process.versions.node);
console.log(process.versions.v8);

============================================================
# 12. process.cwd()
============================================================

* Q. What is process.cwd()?

- `process.cwd()` returns the current working directory
  of the Node.js process.

!Example:
console.log(process.cwd());
Possible output:
C:\projects\node-app
------------------------------------------------------------
? IMPORTANT:
cwd = Current Working Directory
It tells us:
"From which directory is the Node.js process currently
running?"

============================================================
# process.cwd() vs __dirname
============================================================
-0 This is an important interview topic.

- process.cwd()
    ↓
    - Current working directory of the process

- __dirname
    ↓
    - Directory containing the current JavaScript file
(CommonJS)
? They can be different.
! Example:

project/
    |
    +---- app.js
    |
    +---- src/
          |
          +---- test.js

- If test.js is executed from another directory,
- `process.cwd()` depends on where the command was launched,
- while `__dirname` refers to the directory containing test.js.

============================================================
# 13. process.memoryUsage()
============================================================

* Q. What is process.memoryUsage()?

- Returns memory usage information for the current
  Node.js process.

! Example:
console.log(process.memoryUsage());
It returns values such as:
    - rss
    - heapTotal
    - heapUsed
    - external
    - arrayBuffers
------------------------------------------------------------
# rss
rss = Resident Set Size
- Represents the total amount of memory occupied by the
  process in RAM.
------------------------------------------------------------
# heapTotal
- Total memory allocated for the V8 JavaScript heap.
------------------------------------------------------------
# heapUsed
- Amount of V8 heap memory currently being used.
------------------------------------------------------------
# external
- Memory used by resources outside the V8 JavaScript heap
  that are associated with JavaScript objects.
Buffers are an important example.
------------------------------------------------------------
# arrayBuffers
- Memory allocated for ArrayBuffer and SharedArrayBuffer,
  including Buffer-related memory.

============================================================
# 14. process.uptime()
============================================================

* Q. What is process.uptime()?

- Returns the number of seconds the current Node.js process
  has been running.

! Example:
console.log(process.uptime());
Possible output:
- 12.452
Meaning:
- The process has been running for approximately
12.452 seconds.

============================================================
# PROCESS CONTROL
============================================================

- Node.js also provides APIs through `process` to control
the running process.

! Important methods:

    1. process.exit()
    2. process.exitCode()
    3. process.kill()
    4. process.abort()

============================================================
# process.exit()
============================================================

Q. What is process.exit()?

- Immediately terminates the Node.js process.

Example:

console.log("Start");

process.exit(0);

console.log("End");

Output:

Start

"End" will not execute because the process has already
terminated.

------------------------------------------------------------

Common exit codes:

0
↓
Successful termination

Non-zero value
↓
Indicates an error/failure

Example:

process.exit(1);

============================================================
# process.exitCode
============================================================

Q. What is process.exitCode?

- Specifies the exit code that Node.js will use when the
  process exits naturally.

Example:

process.exitCode = 1;

console.log("Application finished");

The process can continue executing normally, and when it
eventually exits, the exit code can be `1`.

IMPORTANT:

Prefer setting `process.exitCode` when you want to indicate
failure without immediately terminating the process.

============================================================
# process.kill()
============================================================

Q. What is process.kill()?

- Sends a signal to a process.

Syntax:

process.kill(pid, signal);

Example:

process.kill(1234, "SIGTERM");

Common signals include:

SIGTERM
SIGINT
SIGKILL
SIGUSR1
SIGUSR2

------------------------------------------------------------

IMPORTANT:

`process.kill()` does not necessarily mean "force kill".

It sends a signal to the specified process.

============================================================
# process.abort()
============================================================

Q. What is process.abort()?

- Immediately terminates the process and attempts to
  generate a core dump.

It is mainly useful for low-level debugging scenarios.

============================================================
# PROCESS EVENTS
============================================================

The `process` object is also an EventEmitter-like event
source and exposes important process-level events.

Important events:

1. exit
2. beforeExit
3. uncaughtException
4. unhandledRejection
5. warning
6. SIGINT
7. SIGTERM

============================================================
# 1. "exit" EVENT
============================================================

Q. What is the exit event?

- Emitted when the Node.js process is about to exit.

Example:

process.on("exit", (code) => {

    console.log(
        "Process exiting with code:",
        code
    );

});

------------------------------------------------------------

IMPORTANT:

The `exit` event is for synchronous cleanup only.

You should NOT depend on asynchronous operations completing
inside an `exit` event handler.

============================================================
# 2. "beforeExit" EVENT
============================================================

Q. What is beforeExit?

- Emitted when Node.js has no more work scheduled on the
  event loop and is about to exit.

Example:

process.on("beforeExit", (code) => {

    console.log(
        "Process is about to exit:",
        code
    );

});

------------------------------------------------------------

Difference:

beforeExit
    ↓
Can potentially schedule more asynchronous work.

exit
    ↓
Process is actually exiting.
Async work will not keep it alive.

============================================================
# 3. "uncaughtException"
============================================================

Q. What is uncaughtException?

- Emitted when an uncaught exception reaches the event loop.

Example:

process.on("uncaughtException", (error) => {

    console.error(
        "Uncaught exception:",
        error
    );

});

------------------------------------------------------------

IMPORTANT:

This should NOT normally be treated as a way to keep a
corrupted application running indefinitely.

In production applications, after an unexpected uncaught
exception, graceful cleanup and process restart are often
safer.

============================================================
# 4. "unhandledRejection"
============================================================

Q. What is unhandledRejection?

- Emitted when a Promise is rejected and there is no
  rejection handler attached within the relevant turn.

Example:

process.on(
    "unhandledRejection",
    (reason, promise) => {

        console.error(
            "Unhandled rejection:",
            reason
        );

    }
);

============================================================
# 5. SIGINT
============================================================

Q. What is SIGINT?

- `SIGINT` is commonly generated when the user presses:

Ctrl + C

Example:

process.on("SIGINT", () => {

    console.log(
        "Ctrl+C received"
    );

    process.exit(0);

});

============================================================
# 6. SIGTERM
============================================================

Q. What is SIGTERM?

- `SIGTERM` is a termination signal commonly used by
  operating systems, process managers, containers, and
  orchestration systems to request graceful shutdown.

Example:

process.on("SIGTERM", () => {

    console.log(
        "SIGTERM received"
    );

    // Close server
    // Close database
    // Stop accepting new requests
});

============================================================
# GRACEFUL SHUTDOWN
============================================================

Q. What is graceful shutdown?

- Graceful shutdown means properly closing resources before
  terminating the Node.js process.

For example:

Application
    |
    +---- Stop accepting new requests
    |
    +---- Finish active requests
    |
    +---- Close database connection
    |
    +---- Close Redis connection
    |
    +---- Close file resources
    |
    +---- Exit process

Example:

process.on("SIGTERM", async () => {

    console.log("Shutdown started");

    // await database.close();
    // await redis.quit();
    // await server.close();

    process.exit(0);
});

============================================================
# process.send()
============================================================

Q. What is process.send()?

- Used for communication between a Node.js child process
  and its parent when an IPC (Inter-Process Communication)
  channel is available.

Example:

if (process.send) {

    process.send({
        message: "Hello parent"
    });

}

Used with mechanisms such as:

- child_process.fork()
- IPC

============================================================
# process.connected
============================================================

Q. What is process.connected?

- Indicates whether the current child process still has an
  active IPC connection to its parent.

Example:

console.log(process.connected);

This is mainly relevant when using Node.js child processes
with IPC.

============================================================
# process.send() + IPC
============================================================

Parent Process
      |
      | IPC
      ↓
Child Process
      |
      | process.send()
      ↓
Parent Process

This allows processes to exchange messages.

============================================================
# process.nextTick()
============================================================

Q. What is process.nextTick()?

- Schedules a callback to run after the current operation
  completes, before the event loop continues to later phases.

Example:

console.log("1");

process.nextTick(() => {
    console.log("nextTick");
});

console.log("2");

Output:

1
2
nextTick

------------------------------------------------------------

IMPORTANT:

`process.nextTick()` is NOT the same as:

setTimeout(..., 0)

or:

setImmediate(...)

============================================================
# process.nextTick() FLOW
============================================================

Current JavaScript execution
        ↓
process.nextTick() callback
        ↓
Event loop continues

Important:

Overusing `process.nextTick()` recursively can starve the
event loop because the nextTick queue is processed before
the event loop moves on.

============================================================
# PERFORMANCE MEASUREMENT
============================================================

Q. How can we measure execution time in Node.js?

There are several approaches.

1. performance.now()
2. console.time()
3. process.hrtime()
4. process.hrtime.bigint()

============================================================
# performance.now()
============================================================

Q. What is performance.now()?

- `performance.now()` returns a high-resolution timestamp
  suitable for measuring elapsed time.

In modern Node.js, it is available through the
`node:perf_hooks` module.

Example:

const {
    performance
} = require("node:perf_hooks");

const start = performance.now();

for (let i = 0; i < 1000000; i++) {
    // work
}

const end = performance.now();

console.log(
    `Execution time: ${end - start} ms`
);

------------------------------------------------------------

Important:

performance.now()
    ↓
High-resolution timing
    ↓
Useful for measuring elapsed duration

It is NOT primarily used to get the current wall-clock
date/time.

============================================================
# performance.now() vs Date.now()
============================================================

performance.now()

- High-resolution timer
- Good for measuring elapsed time
- Uses a monotonic time source

Date.now()

- Returns current Unix timestamp in milliseconds
- Represents wall-clock time
- Can be affected by system clock adjustments

Example:

const start = performance.now();

doSomething();

const end = performance.now();

console.log(
    "Time:",
    end - start,
    "ms"
);

============================================================
# process.hrtime()
============================================================

Q. What is process.hrtime()?

- Provides high-resolution real-time measurement.

It is useful when measuring elapsed time with high precision.

Example:

const start = process.hrtime();

doSomething();

const diff = process.hrtime(start);

console.log(diff);

The result is:

[
    seconds,
    nanoseconds
]

============================================================
# process.hrtime.bigint()
============================================================

Q. What is process.hrtime.bigint()?

- Returns a high-resolution time value as a BigInt.

Example:

const start = process.hrtime.bigint();

doSomething();

const end = process.hrtime.bigint();

console.log(
    `Execution time: ${end - start} ns`
);

This is useful when very precise elapsed-time measurement
is required.

============================================================
# performance.now() vs process.hrtime.bigint()
============================================================

performance.now()

    ↓
milliseconds
    ↓
easy for general performance measurements

process.hrtime.bigint()

    ↓
nanoseconds
    ↓
very precise elapsed-time measurement

============================================================
# console.time()
============================================================

Another simple way to measure execution time:

console.time("operation");

doSomething();

console.timeEnd("operation");

Output:

operation: 10.123ms

This is convenient for debugging and quick measurements.

============================================================
# PROCESS OBJECT vs MODULE OBJECT
============================================================

Important interview difference:

process
    ↓
Information and control about the running Node.js process.

module
    ↓
Metadata and functionality related to the current
CommonJS module.

Example:

process.pid
    → current process ID

module.exports
    → exports from the current CommonJS module

============================================================
# PROCESS vs GLOBAL
============================================================

`process` is itself a global object.

Therefore:

console.log(process);

works without:

require("process");

Modern Node.js also provides the global object:

global

Example:

console.log(global);

`process` is available as a global property in Node.js.

============================================================
# PROCESS OBJECT — COMPLETE INTERVIEW MAP
============================================================

process
   |
   +-- INFORMATION
   |     |
   |     +-- pid
   |     +-- ppid
   |     +-- platform
   |     +-- arch
   |     +-- version
   |     +-- versions
   |     +-- execPath
   |     +-- execArgv
   |     +-- argv
   |     +-- argv0
   |
   +-- ENVIRONMENT
   |     |
   |     +-- env
   |     +-- cwd()
   |
   +-- MEMORY / TIME
   |     |
   |     +-- memoryUsage()
   |     +-- uptime()
   |
   +-- CONTROL
   |     |
   |     +-- exit()
   |     +-- exitCode
   |     +-- kill()
   |     +-- abort()
   |
   +-- EVENTS / SIGNALS
   |     |
   |     +-- exit
   |     +-- beforeExit
   |     +-- uncaughtException
   |     +-- unhandledRejection
   |     +-- SIGINT
   |     +-- SIGTERM
   |
   +-- IPC
   |     |
   |     +-- send()
   |     +-- connected
   |
   +-- SCHEDULING
   |     |
   |     +-- nextTick()

============================================================
# INTERVIEW-READY DEFINITION
============================================================

Q. What is the process object in Node.js?

Answer:

"`process` is a global Node.js object that represents the
currently running Node.js process. It provides information
such as the process ID, platform, architecture, environment
variables, command-line arguments, memory usage, and uptime.

It also provides APIs for controlling the process, handling
process-level events and signals, communicating with child
processes through IPC, and scheduling callbacks with
process.nextTick()."

============================================================
# MOST IMPORTANT INTERVIEW QUESTIONS
============================================================

Q1. What is process in Node.js?

Q2. Why is process called a global object?

Q3. What is process.pid?

Q4. What is process.ppid?

Q5. Difference between process.argv and process.execArgv?

Q6. What is process.env?

Q7. What is process.cwd()?

Q8. Difference between process.cwd() and __dirname?

Q9. What is process.platform?

Q10. What is process.arch?

Q11. What is process.memoryUsage()?

Q12. What is process.uptime()?

Q13. Difference between process.exit() and
    process.exitCode?

Q14. What is process.kill()?

Q15. What is graceful shutdown?

Q16. What is SIGINT?

Q17. What is SIGTERM?

Q18. What is the difference between beforeExit and exit?

Q19. What is uncaughtException?

Q20. What is unhandledRejection?

Q21. What is process.nextTick()?

Q22. What is process.send()?

Q23. What is IPC?

Q24. What is performance.now()?

Q25. Difference between performance.now() and Date.now()?

Q26. What is process.hrtime.bigint()?

============================================================
# ONE-LINE REVISION
============================================================

process.pid
→ Current process ID

process.ppid
→ Parent process ID

process.platform
→ Operating system

process.arch
→ CPU architecture

process.argv
→ Command-line arguments

process.execArgv
→ Node.js runtime arguments

process.env
→ Environment variables

process.cwd()
→ Current working directory

process.execPath
→ Node.js executable path

process.version
→ Node.js version

process.versions
→ Node.js + dependency versions

process.memoryUsage()
→ Process memory information

process.uptime()
→ Process running time

process.exit()
→ Immediately terminate process

process.exitCode
→ Set exit status for natural termination

process.kill()
→ Send signal to a process

process.nextTick()
→ Schedule callback before later event-loop phases

process.send()
→ Send IPC message to parent process

performance.now()
→ High-resolution elapsed-time measurement

process.hrtime.bigint()
→ High-resolution elapsed-time measurement in nanoseconds

============================================================
# INTERVIEW QUICK ANSWER
============================================================

"Node.js provides a global `process` object that gives us
information about and control over the currently running
process.

For example, `process.pid` gives the process ID,
`process.env` gives environment variables,
`process.argv` gives command-line arguments,
`process.cwd()` gives the current working directory,
and `process.memoryUsage()` gives memory statistics.

The process object also allows us to control and monitor the
application using APIs such as `process.exit()`,
`process.kill()`, process-level events and signals such as
SIGINT and SIGTERM, and `process.nextTick()` for scheduling
callbacks."

*/