/*
==========================================================
@ NPM vs YARN
==========================================================

Q. What is the difference between npm and Yarn?
==========================================================

- Both npm and Yarn are JavaScript package managers.

- They are used to:

    - Install packages
    - Remove packages
    - Update packages
    - Manage project dependencies
    - Run project scripts
    - Manage dependency versions
    - Manage workspaces / monorepos
    - Maintain lock files
    - Publish packages


                    PACKAGE MANAGERS
                           |
                 +---------+---------+
                 |                   |
                 v                   v
                npm                 Yarn
                 |                   |
          package-lock.json       yarn.lock


==========================================================
1. WHAT IS npm?
==========================================================

- npm stands for:

      Node Package Manager

- npm is the default package manager commonly used with
  Node.js.

- npm is distributed with Node.js, so when Node.js is
  installed, npm is normally installed as well.

- npm is used to manage:

    - Node.js projects
    - Dependencies
    - Packages
    - Scripts
    - Package versions
    - Workspaces


Example:

    npm install express


This command installs the Express package into the project.


==========================================================
2. INITIALIZING A PROJECT USING npm
==========================================================

- npm can be used to create a package.json file.

Command:

    npm init


- It asks several questions and creates:

    package.json


- You can also use:

    npm init -y


- `-y` accepts the default answers and creates the
  package.json quickly.


Example:

    npm init -y


Project:

    my-project/
    |
    +-- package.json


==========================================================
3. WHAT IS package.json?
==========================================================

- package.json is the main configuration/metadata file
  of a Node.js project.

- It can contain:

    - Project name
    - Version
    - Description
    - Main entry point
    - Dependencies
    - Dev dependencies
    - Scripts
    - Module type
    - Other package metadata


Example:

    {
      "name": "my-app",
      "version": "1.0.0",
      "scripts": {
        "start": "node app.js"
      },
      "dependencies": {
        "express": "^5.0.0"
      }
    }


==========================================================
4. npm INSTALL COMMAND
==========================================================

Install a package:

    npm install express


Short form:

    npm i express


After installation, npm generally updates:

    package.json

and:

    package-lock.json


and installs the package under:

    node_modules/


Flow:


    npm install express
            |
            v
       package manager
            |
       +----+----+
       |         |
       v         v
 package.json  package-lock.json
       |
       v
   node_modules
       |
       v
    express


==========================================================
5. npm DEPENDENCIES
==========================================================

When we install:

    npm install express


Express is normally added to:

    "dependencies"


Example:

    {
      "dependencies": {
        "express": "^5.0.0"
      }
    }


Dependencies are packages required by the application
at runtime.


==========================================================
6. npm DEV DEPENDENCIES
==========================================================

Packages required mainly during development can be installed
using:

    npm install --save-dev nodemon


Short form:

    npm i -D nodemon


This is added to:

    "devDependencies"


Example:

    {
      "devDependencies": {
        "nodemon": "^3.0.0"
      }
    }


Examples of development dependencies:

    - Testing tools
    - Linters
    - Formatters
    - Development servers
    - Build tools


==========================================================
7. npm SCRIPTS
==========================================================

- npm allows us to define commands inside package.json.

Example:

    {
      "scripts": {
        "start": "node app.js",
        "dev": "node --watch app.js"
      }
    }


Now instead of typing:

    node app.js


we can run:

    npm start


And:

    npm run dev


So npm scripts provide convenient shortcuts for project
commands.


Flow:


    package.json
         |
         v
      scripts
         |
         +----> start
         |
         +----> dev
         |
         +----> test
         |
         +----> build


==========================================================
8. npm LOCK FILE
==========================================================

- npm uses:

    package-lock.json


- The lock file records the resolved dependency tree and
  specific package versions/resolution information.

- It helps make installations more consistent across
  different environments.


Example:


    package.json
         |
         | dependency requirements
         v
    npm install
         |
         v
    package-lock.json
         |
         v
    resolved dependency tree


IMPORTANT:

- `package.json` describes the dependency requirements.

- `package-lock.json` records the resolved dependency tree.


==========================================================
9. npm CACHING
==========================================================

- npm maintains a cache for downloaded package data.

- The cache can improve subsequent installations and
  reduce unnecessary downloads when cached content can
  be reused.


Conceptually:


    npm install
         |
         v
       Cache
         |
         +---- package already available
         |          |
         |          v
         |       reuse data
         |
         +---- package not available
                    |
                    v
                 download


IMPORTANT:

- Having a cache does NOT mean every npm installation can
  automatically work completely offline.

- Offline behavior depends on whether all required package
  data is available in the cache and the package manager
  can resolve the dependency tree from it.


==========================================================
10. npm SECURITY AUDIT
==========================================================

npm provides:

    npm audit


- It checks the project's dependency tree for known
  security vulnerabilities reported in the npm ecosystem.


Example:

    npm audit


You can also request automatic fixes where npm determines
that a compatible fix is available:

    npm audit fix


IMPORTANT:

- `npm audit` does not guarantee that an application is
  completely secure.

- It is one security tool for checking known dependency
  vulnerabilities.


==========================================================
11. npm WORKSPACES
==========================================================

- Modern npm supports workspaces.

- Workspaces are useful for managing multiple related
  packages in one repository.

Example:


                Monorepo
                   |
        +----------+----------+
        |          |          |
        v          v          v
      api        frontend    shared
        |          |          |
        +----------+----------+
                   |
                npm workspaces


Example structure:


    my-project/
    |
    +-- package.json
    |
    +-- packages/
         |
         +-- api/
         |
         +-- frontend/
         |
         +-- shared/


This is commonly called a:

    Monorepo


==========================================================
12. npm INSTALLATION SPEED
==========================================================

- Older versions of npm were often considered slower
  compared with Yarn.

- Modern npm has significantly improved its installation
  performance and caching.

- Modern npm and Yarn can have comparable performance,
  depending on:

    - Project size
    - Dependency tree
    - Network speed
    - Cache state
    - Package manager version
    - Configuration


IMPORTANT INTERVIEW POINT:

Do NOT say:

    "Yarn is always faster than npm."


Better:

    "Yarn originally became popular partly because of
     faster installations and aggressive caching, but
     modern npm has significantly improved its performance."


==========================================================
13. WHAT IS YARN?
==========================================================

- Yarn is another JavaScript package manager.

- It was created as an alternative to npm.

- Yarn can be used to:

    - Install packages
    - Remove packages
    - Update packages
    - Manage dependencies
    - Run scripts
    - Manage workspaces
    - Maintain a lock file


Example:

    yarn add express


==========================================================
14. IS YARN BUNDLED WITH NODE.JS?
==========================================================

- npm is distributed with Node.js.

- Yarn is not the default package manager bundled with
  Node.js in the same way npm is.

- Yarn generally needs to be installed/configured
  separately before using it, depending on the setup.


Conceptually:


    Install Node.js
         |
         +----> npm available


    Install/configure Yarn
         |
         +----> yarn available


==========================================================
15. yarn add
==========================================================

To install a package using Yarn:

    yarn add express


This is roughly comparable to:

    npm install express


Comparison:


    npm:
        npm install express


    Yarn:
        yarn add express


==========================================================
16. YARN LOCK FILE
==========================================================

- Yarn uses:

    yarn.lock


- It records the resolved dependency versions and
  resolution information for the project.

- It helps make dependency installation deterministic
  and consistent.


Comparison:


    npm
      |
      v
    package-lock.json


    Yarn
      |
      v
    yarn.lock


==========================================================
17. YARN CACHING
==========================================================

- Yarn has strong caching capabilities.

- Cached package data can improve repeated installations
  and can support offline workflows when the required
  dependencies are already available locally.


Example concept:


    First installation
          |
          v
       Download
          |
          v
        Cache
          |
          v
    Later installation
          |
          v
    Reuse cached data


IMPORTANT:

- Do not simply say:

      "Yarn always works offline."


Better:

      "Yarn can support offline installation when the
       required packages are already available in its
       cache and the project can be resolved from that
       cached data."


==========================================================
18. YARN WORKSPACES
==========================================================

- Yarn provides workspace functionality for managing
  multiple packages in a single repository.

Example:


    Company Project
          |
    +-----+-----+-----+
    |           |     |
    v           v     v
   API       Frontend Shared
    |           |     |
    +-----------+-----+
                |
             Workspace


This is useful for:

    - Monorepos
    - Shared packages
    - Large applications
    - Multiple related projects


==========================================================
19. npm vs Yarn — BASIC COMMANDS
==========================================================


INSTALL PACKAGE
---------------

npm:

    npm install express


Yarn:

    yarn add express



REMOVE PACKAGE
--------------

npm:

    npm uninstall express


Yarn:

    yarn remove express



INSTALL ALL DEPENDENCIES
------------------------

npm:

    npm install


Yarn:

    yarn install


or commonly:

    yarn



RUN SCRIPT
----------

npm:

    npm run dev


Yarn:

    yarn dev


INITIALIZE PROJECT
------------------

npm:

    npm init


Yarn:

    yarn init


==========================================================
20. npm vs Yarn — LOCK FILE
==========================================================


        Dependency requirements
                  |
             package.json
                  |
          +-------+-------+
          |               |
          v               v
         npm             Yarn
          |               |
          v               v
 package-lock.json     yarn.lock


npm:

    package-lock.json


Yarn:

    yarn.lock


Both are used to record resolved dependency information
so installations can be reproduced more consistently.


==========================================================
21. npm vs Yarn — COMPLETE COMPARISON
==========================================================

+----------------------+------------------------+
| Feature              | npm                    |
+----------------------+------------------------+
| Full name            | Node Package Manager   |
| Comes with Node.js   | Yes                    |
| Package manager      | Yes                    |
| Install package      | npm install package    |
| Remove package       | npm uninstall package  |
| Lock file            | package-lock.json      |
| Security audit       | npm audit              |
| Workspaces           | Supported              |
| Cache                | Yes                    |
| Scripts              | npm run                |
+----------------------+------------------------+


+----------------------+------------------------+
| Feature              | Yarn                   |
+----------------------+------------------------+
| Package manager      | Yes                    |
| Comes with Node.js   | No                     |
| Install package      | yarn add package       |
| Remove package       | yarn remove package    |
| Lock file            | yarn.lock              |
| Security tooling     | Available              |
| Workspaces           | Supported              |
| Cache                | Yes                    |
| Scripts              | yarn <script>          |
+----------------------+------------------------+


==========================================================
22. npm vs Yarn — MAIN DIFFERENCES
==========================================================

1. AVAILABILITY
---------------

npm:

    Comes with Node.js.

Yarn:

    Usually installed/configured separately.


2. LOCK FILE
------------

npm:

    package-lock.json


Yarn:

    yarn.lock


3. COMMANDS
-----------

npm:

    npm install express


Yarn:

    yarn add express


4. ECOSYSTEM
------------

- Both have access to the npm package ecosystem.

- Yarn can install packages published to npm-compatible
  registries.


5. WORKSPACES
-------------

- Both support workspaces and monorepo development.


6. CACHING
----------

- Both use caching mechanisms.

- Yarn became known for aggressive caching and offline
  capabilities.

- Modern npm also has a mature cache.


7. PERFORMANCE
--------------

- Yarn was historically known for faster installation
  performance.

- Modern npm has improved significantly.

- Performance depends on the project and environment.


==========================================================
23. npm vs Yarn — VISUAL COMPARISON
==========================================================


                     PACKAGE MANAGEMENT
                            |
                +-----------+-----------+
                |                       |
                v                       v
               npm                     Yarn
                |                       |
        +-------+-------+       +-------+-------+
        |       |       |       |       |       |
        v       v       v       v       v       v
      Install  Audit  Script  Install Cache  Workspace
        |                       |
        v                       v
 package-lock.json            yarn.lock


==========================================================
24. WHICH ONE SHOULD I USE?
==========================================================

Use npm when:

    - You want the default package manager that comes
      with Node.js.
    - You want a widely supported package manager.
    - The existing project uses npm.
    - You want a simple and standard Node.js workflow.


Use Yarn when:

    - The existing project already uses Yarn.
    - Your team standardizes on Yarn.
    - You prefer Yarn's workflow/features.
    - You need Yarn workspace functionality or other
      Yarn-specific capabilities.


IMPORTANT:

- Do not choose only because someone says:

      "Yarn is always faster."


- Modern npm is also highly capable.


==========================================================
25. IMPORTANT: DON'T MIX npm AND YARN RANDOMLY
==========================================================

Suppose a project uses npm:

    package-lock.json


Don't casually switch between npm and Yarn because you
can end up maintaining different lock files:


    package-lock.json
    yarn.lock


A team should generally agree on one package manager and
use its corresponding lock file consistently.


Example:


    Team chooses npm
          |
          v
    package-lock.json
          |
          v
    Everyone uses npm


OR


    Team chooses Yarn
          |
          v
      yarn.lock
          |
          v
    Everyone uses Yarn


==========================================================
26. IMPORTANT: package.json vs LOCK FILE
==========================================================

package.json:

    "What dependencies does my project require?"


Lock file:

    "What exact dependency resolution was selected?"


npm:

    package.json
         +
    package-lock.json


Yarn:

    package.json
         +
    yarn.lock


==========================================================
27. INTERVIEW ANSWER
==========================================================

Q. What is the difference between npm and Yarn?

Answer:

"npm and Yarn are both JavaScript package managers used
to install and manage dependencies, run project scripts,
and manage Node.js projects.

npm comes with Node.js and uses package-lock.json, while
Yarn is an alternative package manager that uses yarn.lock.

Both support dependency management, caching, workspaces,
and modern project workflows. Yarn was historically known
for faster installation and strong caching, but modern npm
has significantly improved its performance.

In practice, the choice often depends on the project's
existing tooling and the team's preference."


==========================================================
28. SHORT INTERVIEW ANSWER
==========================================================

npm:

    - Comes with Node.js
    - Uses package-lock.json
    - npm install
    - npm audit
    - npm workspaces


Yarn:

    - Alternative package manager
    - Usually installed/configured separately
    - Uses yarn.lock
    - yarn add
    - Strong caching/workspace support


==========================================================
29. ONE-LINE DIFFERENCE
==========================================================

"npm and Yarn are both JavaScript package managers;
npm comes with Node.js and uses package-lock.json,
while Yarn is an alternative package manager that
uses yarn.lock."


==========================================================
30. FINAL MEMORY DIAGRAM
==========================================================


                    Node.js Project
                           |
                           v
                      package.json
                           |
                +----------+----------+
                |                     |
                v                     v
               npm                   Yarn
                |                     |
                v                     v
        package-lock.json          yarn.lock
                |                     |
                v                     v
          Dependencies            Dependencies
                |                     |
                v                     v
          node_modules            node_modules
                |                     |
                +----------+----------+
                           |
                           v
                     Application


==========================================================
31. KEY POINTS TO REMEMBER
==========================================================

1. npm = Node Package Manager.

2. npm comes with Node.js.

3. Yarn is another JavaScript package manager.

4. npm uses:

       package-lock.json


5. Yarn uses:

       yarn.lock


6. npm installs packages using:

       npm install package


7. Yarn installs packages using:

       yarn add package


8. npm provides:

       npm audit


9. Both support workspaces / monorepos.

10. Both use caching.

11. Yarn was historically known for faster installs and
    aggressive caching.

12. Modern npm has significantly improved its performance.

13. Don't say Yarn is always faster.

14. Don't randomly mix npm and Yarn in the same project.

15. Usually follow the package manager already used by
    the project/team.


==========================================================
*/