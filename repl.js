/*
==========================================================
@ NODE.JS REPL
==========================================================


Q. What is REPL?
==========================================================
- REPL stands for:

    R → Read
    E → Evaluate
    P → Print
    L → Loop


- Node.js REPL is an interactive environment that allows
  us to execute JavaScript and Node.js expressions
  interactively, one input at a time.

- also REPL Is palyground where we have to exeucte js and node code interactively.

- It is mainly useful for:

    - Quick testing
    - Experimenting with JavaScript
    - Testing Node.js APIs
    - Debugging small pieces of code
    - Learning and exploring Node.js


==========================================================
1. HOW TO START NODE.JS REPL
==========================================================
Open the terminal and type:
    node


Example:

    C:\project> node

    Welcome to Node.js
    Type ".help" for more information.
    >

- The `>` prompt indicates that Node.js REPL is ready
  to accept input.


==========================================================
2. SIMPLE EXAMPLE
==========================================================

Enter:

    > 10 + 20

Output:

    30


Another example:

    > "Hello" + " Node.js"

Output:

    'Hello Node.js'


Another example:

    > const x = 10

    undefined


    > x

    10


- The REPL immediately evaluates the code and displays
  the result.


==========================================================
3. R — READ
==========================================================

- REPL waits for the user to enter JavaScript code.

Example:

    > 10 + 20


- REPL reads:

    10 + 20


- It determines what code/expression was entered and
  prepares it for execution.


Flow:

    User Input
        |
        v
      READ


==========================================================
4. E — EVALUATE
==========================================================

- REPL evaluates / executes the code that was entered.

Example:

    > 10 + 20


Evaluation:

    10 + 20
       |
       v
      30


Flow:

    READ
      |
      v
    EVALUATE


==========================================================
5. P — PRINT
==========================================================

- REPL displays the result of the evaluation.

Example:

    > 10 + 20
    30


Flow:

    READ
      |
      v
    EVALUATE
      |
      v
    PRINT
      |
      v
      30


IMPORTANT:

- Not every statement produces a useful displayed value.

Example:

    > const name = "Vishal"
    undefined


The variable is created, but the declaration itself does
not produce the value `"Vishal"` as the REPL result.


==========================================================
6. L — LOOP
==========================================================

- After printing the result, REPL goes back to waiting
  for the next input.

Example:


    > 10 + 20
    30

    > 50 * 2
    100

    > "Hello"
    'Hello'

    >


This continues until the user exits the REPL.


==========================================================
7. COMPLETE REPL FLOW
==========================================================


             USER
              |
              | JavaScript code
              v
          +---------+
          |  READ   |
          +----+----+
               |
               v
          +---------+
          | EVALUATE|
          +----+----+
               |
               v
          +---------+
          |  PRINT  |
          +----+----+
               |
               v
          +---------+
          |  LOOP   |
          +----+----+
               |
               |
               +------------------+
                                  |
                                  v
                              Wait for
                            next input


Example:

    > 5 + 5
      |
      v
     READ
      |
      v
    EVALUATE
      |
      v
     10
      |
      v
    PRINT
      |
      v
    LOOP
      |
      v
    Wait for next input


==========================================================
8. REPL vs JAVASCRIPT FILE
==========================================================


REPL:

    Terminal
       |
       v
      node
       |
       v
      REPL
       |
       v
    Execute code interactively


JavaScript file:

    app.js
       |
       v
    node app.js
       |
       v
    Execute complete program


Example:

REPL:

    > console.log("Hello")
    Hello


File:

    // app.js

    console.log("Hello");


Run:

    node app.js


Output:

    Hello


==========================================================
9. QUICK TESTING
==========================================================

REPL is useful when you want to quickly test something
without creating a JavaScript file.


Example:

    > 5 * 5
    25


    > Math.max(10, 20, 30)
    30


    > [1, 2, 3].map(x => x * 2)
    [ 2, 4, 6 ]


This is useful for experimenting with JavaScript syntax
and behavior.


==========================================================
10. NODE.JS API EXPERIMENTATION
==========================================================

- Node.js REPL can also be used to experiment with
  Node.js APIs.


Example:

    > const os = require("os")


    > os.platform()
    'win32'


    > os.arch()
    'x64'


    > os.cpus()


- This allows developers to quickly explore Node.js APIs
  without creating a separate file.


==========================================================
11. MULTI-LINE INPUT
==========================================================

- REPL can also accept multi-line JavaScript code.

Example:

    > function add(a, b) {
    ... return a + b
    ... }


    > add(10, 20)
    30


- The `...` prompt indicates that REPL is waiting for
  additional input to complete the expression or block.


==========================================================
12. SPECIAL REPL COMMANDS
==========================================================

Node.js REPL provides special commands called
"dot commands".

These commands begin with:

    .


Important commands:


.help

    Shows available REPL commands.


.exit

    Exits the REPL.


.save

    Saves the current REPL session to a file.


.load

    Loads and executes JavaScript from a file.


.clear

    Clears the current REPL context.


.break

    Exits the current multi-line input.


==========================================================
13. EXITING REPL
==========================================================

You can exit using:

    .exit


Or:

    Press Ctrl + C twice


Example:

    > .exit


Then you return to the normal terminal.


==========================================================
14. SAVING A REPL SESSION
==========================================================

REPL provides `.save` to save the current session.

Example:

    > .save mySession.js


This saves the REPL session content into:

    mySession.js


==========================================================
15. LOADING A FILE
==========================================================

You can use:

    .load filename.js


Example:

    > .load app.js


REPL loads and executes the JavaScript code from the file.


==========================================================
16. NODE.JS VERSION
==========================================================

To check the Node.js version from the normal terminal:

    node -v


Example:

    C:\project> node -v

    v24.x.x


IMPORTANT:

- `node -v` is a terminal command.

- It is not a REPL expression.


You can enter REPL using:

    node


==========================================================
17. REPL IS NOT A DEBUGGER
==========================================================

- REPL is useful for experimentation and quick testing.

- It should not be confused with a full debugger.

REPL:

    - Execute expressions
    - Test APIs
    - Experiment with code
    - Inspect values


Debugger:

    - Set breakpoints
    - Step through code
    - Inspect call stack
    - Inspect variables
    - Debug program execution


==========================================================
18. IMPORTANT FEATURES
==========================================================

Node.js REPL provides:

    1. Interactive JavaScript execution
    2. Immediate evaluation of expressions
    3. Access to Node.js runtime APIs
    4. Multi-line input
    5. Session saving
    6. Session loading
    7. Special REPL commands
    8. Quick experimentation
    9. Basic history / command recall
   10. Customization through the Node.js REPL API


==========================================================
19. WHEN TO USE REPL?
==========================================================

Use REPL when you want to:

    - Quickly test JavaScript
    - Test a Node.js API
    - Check the result of an expression
    - Experiment with syntax
    - Inspect objects
    - Learn Node.js
    - Perform quick calculations
    - Test small code snippets


Example:

    > JSON.stringify({ name: "Vishal" })

    '{"name":"Vishal"}'


==========================================================
20. WHEN NOT TO USE REPL?
==========================================================

Do not use REPL as the main place for developing a
large application.

For larger programs, use:

    .js files
       +
    modules
       +
    package.json
       +
    proper project structure


Example:

    my-app/
    |
    +-- package.json
    |
    +-- src/
    |    |
    |    +-- app.js
    |    +-- server.js
    |
    +-- controllers/
    +-- services/
    +-- routes/


==========================================================
21. SHORT ANSWER
==========================================================

Q. What is REPL?

Answer:

"REPL stands for Read-Eval-Print-Loop. It is an interactive
environment provided by Node.js that allows developers to
enter JavaScript code, execute it immediately, see the
result, and continue entering new code.

It is mainly used for quick testing, experimentation,
learning, and exploring JavaScript and Node.js APIs."


==========================================================
22. INTERVIEW ONE-LINER
==========================================================

"Node.js REPL is an interactive command-line environment
where we can read, evaluate, print the result, and
repeatedly execute JavaScript code."


==========================================================
*/