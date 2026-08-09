/*
===========================================================
# OS MODULE IN NODE.JS
===========================================================

Q1. What is the OS module in Node.js?

- `os` stands for Operating System.

- The `os` module is a built-in Node.js module that provides
  utilities for interacting with and getting information about
  the operating system on which the Node.js application is running.

- It allows us to get information about:

  - Operating system
  - CPU
  - Memory
  - Hostname
  - Network interfaces
  - User information
  - System uptime
  - Temporary directory
  - CPU architecture
  - Process priority
  - OS version

- Because `os` is a built-in/core Node.js module:

    ✔ No installation is required
    ✔ No npm package is required
    ✔ We can directly import/require it


-----------------------------------------------------------
# How to import the OS module
-----------------------------------------------------------

# CommonJS:

const os = require("os");


# ES Module:

import os from "node:os";


# Recommended modern Node.js style:

const os = require("node:os");


- `node:os` clearly tells Node.js that we are loading
  the built-in OS module.

-----------------------------------------------------------
# Example
-----------------------------------------------------------

const os = require("node:os");

console.log(os.platform());
console.log(os.arch());
console.log(os.totalmem());
console.log(os.freemem());

- These methods allow our Node.js application to get
  information about the machine/operating system.

===========================================================
# OS MODULE METHODS
===========================================================


1. os.arch()
-----------------------------------------------------------

- Returns the CPU architecture on which the Node.js process
  is running.

Example:

const os = require("node:os");

console.log(os.arch());


Possible output:

x64

Other possible values can include:

arm
arm64
x32

- `x64` generally means a 64-bit x86 architecture.

-----------------------------------------------------------


2. os.constants
-----------------------------------------------------------

- `os.constants` provides operating-system-specific constants.

- These constants can include:

  - Error codes
  - Signals
  - Priority values
  - Other OS-level constants

Example:

const os = require("node:os");

console.log(os.constants);


- It returns an object containing many constants.

-----------------------------------------------------------


3. os.cpus()
-----------------------------------------------------------

- Returns information about the logical CPU cores available
  to the operating system.

Example:

const os = require("node:os");

console.log(os.cpus());


Example structure:

[
  {
    model: "...",
    speed: 3200,
    times: {
      user: 100,
      nice: 0,
      sys: 50,
      idle: 500,
      irq: 0
    }
  },

  {
    model: "...",
    speed: 3200,
    times: {
      user: 120,
      nice: 0,
      sys: 40,
      idle: 480,
      irq: 0
    }
  }
]


- Each object represents information about one logical CPU.

-----------------------------------------------------------

# How to find number of CPU cores?

console.log(os.cpus().length);


Example:

8

- This means the system exposes 8 logical CPU cores.

-----------------------------------------------------------


4. os.endianness()
-----------------------------------------------------------

- Returns the CPU byte order (endianness).

Example:

console.log(os.endianness());


Possible output:

LE

or

BE


- `LE` → Little Endian
- `BE` → Big Endian

- Most modern desktop/server systems use Little Endian.

-----------------------------------------------------------


5. os.freemem()
-----------------------------------------------------------

- Returns the amount of currently available/free system memory
  in bytes.

Example:

console.log(os.freemem());


Possible output:

8589934592


- The value is returned in BYTES.

-----------------------------------------------------------

# Convert bytes into GB:

const freeMemory = os.freemem();

console.log(freeMemory / 1024 / 1024 / 1024);


-----------------------------------------------------------


6. os.totalmem()
-----------------------------------------------------------

- Returns the total amount of system memory (RAM)
  in bytes.

Example:

console.log(os.totalmem());


Possible output:

17179869184


- The value is returned in bytes.

-----------------------------------------------------------

# Total RAM in GB:

const totalMemory = os.totalmem();

console.log(totalMemory / 1024 / 1024 / 1024);


-----------------------------------------------------------


7. os.homedir()
-----------------------------------------------------------

- Returns the home directory of the current user.

Example:

console.log(os.homedir());


Example output on Windows:

C:\Users\Vishal


Example output on Linux:

/home/vishal


- This is useful when an application needs to work with
  the current user's home directory.

-----------------------------------------------------------


8. os.hostname()
-----------------------------------------------------------

- Returns the hostname of the machine.

Example:

console.log(os.hostname());


Example output:

DESKTOP-ABC123


- It identifies the computer on the network/system.

-----------------------------------------------------------


9. os.loadavg()
-----------------------------------------------------------

- Returns the system load average.

Example:

console.log(os.loadavg());


Example:

[1.25, 1.10, 0.95]


- The values represent approximately:

  1st value  → 1-minute load average
  2nd value  → 5-minute load average
  3rd value  → 15-minute load average

IMPORTANT:

- This method is meaningful on Unix-like systems such as
  Linux and macOS.

- On Windows, it returns `[0, 0, 0]`.

-----------------------------------------------------------


10. os.networkInterfaces()
-----------------------------------------------------------

- Returns information about the network interfaces
  available on the machine.

Example:

const interfaces = os.networkInterfaces();

console.log(interfaces);


It can provide information such as:

- Interface name
- IP address
- Family (IPv4/IPv6)
- MAC address
- Internal/external status

Example conceptually:

{
  Ethernet: [
    {
      address: "192.168.1.10",
      family: "IPv4",
      mac: "..."
    }
  ]
}

-----------------------------------------------------------


11. os.platform()
-----------------------------------------------------------

- Returns the operating-system platform.

Example:

console.log(os.platform());


Possible outputs:

win32
linux
darwin
freebsd


Common values:

win32  → Windows
linux  → Linux
darwin → macOS

-----------------------------------------------------------


12. os.release()
-----------------------------------------------------------

- Returns the operating system release/version information.

Example:

console.log(os.release());


Example:

10.0.26100

-----------------------------------------------------------


13. os.setPriority()
-----------------------------------------------------------

- Changes the scheduling priority of a process.

Syntax:

os.setPriority([pid], priority);


Example:

os.setPriority(process.pid, 10);


- `pid` → Process ID
- `priority` → Priority value

IMPORTANT:

- This is an OS-level operation.
- Supported priority values and behavior can differ
  between operating systems.

-----------------------------------------------------------


14. os.getPriority()
-----------------------------------------------------------

- Returns the scheduling priority of a process.

Syntax:

os.getPriority([pid]);


Example:

console.log(os.getPriority(process.pid));


- If `pid` is omitted, the current process is used.

-----------------------------------------------------------


15. os.tmpdir()
-----------------------------------------------------------

- Returns the default directory used for temporary files.

Example:

console.log(os.tmpdir());


Example on Windows:

C:\Users\...\AppData\Local\Temp


Example on Linux:

/tmp


- Useful when an application needs temporary storage.

-----------------------------------------------------------


16. os.type()
-----------------------------------------------------------

- Returns the operating system name.

Example:

console.log(os.type());


Possible outputs:

Windows_NT
Linux
Darwin


Difference:

os.platform()
→ gives platform identifier

os.type()
→ gives operating system name

For example:

os.platform() → "win32"

os.type()     → "Windows_NT"

-----------------------------------------------------------


17. os.uptime()
-----------------------------------------------------------

- Returns the amount of time the system has been running
  since it was last started/rebooted.

- The value is returned in seconds.

Example:

console.log(os.uptime());


Possible output:

86400


- `86400` seconds = approximately 24 hours.

-----------------------------------------------------------


18. os.userInfo()
-----------------------------------------------------------

- Returns information about the current operating-system user.

Example:

console.log(os.userInfo());


It can contain information such as:

- username
- uid
- gid
- shell
- homedir

Example structure:

{
  uid: 1000,
  gid: 1000,
  username: "vishal",
  homedir: "/home/vishal",
  shell: "/bin/bash"
}

- Exact fields/values can vary by operating system.

-----------------------------------------------------------


19. os.version()
-----------------------------------------------------------

- Returns a more detailed operating-system version string.

Example:

console.log(os.version());


Example:

#1 SMP PREEMPT_DYNAMIC ...

- The exact output depends on the operating system.

-----------------------------------------------------------


===========================================================
# IMPORTANT METHODS TO REMEMBER FOR INTERVIEW
===========================================================

1. os.arch()
   → CPU architecture

2. os.cpus()
   → CPU information

3. os.platform()
   → Platform identifier

4. os.type()
   → Operating system name

5. os.release()
   → OS release

6. os.version()
   → Detailed OS version

7. os.totalmem()
   → Total RAM

8. os.freemem()
   → Available/free RAM

9. os.homedir()
   → User home directory

10. os.hostname()
    → Computer hostname

11. os.networkInterfaces()
    → Network interface information

12. os.tmpdir()
    → Temporary directory

13. os.uptime()
    → System uptime

14. os.userInfo()
    → Current user information

15. os.loadavg()
    → System load average

16. os.endianness()
    → CPU byte order


===========================================================
# PRACTICAL EXAMPLE
===========================================================

const os = require("node:os");

console.log("Platform:", os.platform());

console.log("OS Type:", os.type());

console.log("OS Release:", os.release());

console.log("OS Version:", os.version());

console.log("CPU Architecture:", os.arch());

console.log("CPU Cores:", os.cpus().length);

console.log("Total Memory:",
  os.totalmem() / 1024 / 1024 / 1024,
  "GB"
);

console.log("Free Memory:",
  os.freemem() / 1024 / 1024 / 1024,
  "GB"
);

console.log("Hostname:", os.hostname());

console.log("Home Directory:", os.homedir());

console.log("Temporary Directory:", os.tmpdir());

console.log("System Uptime:",
  os.uptime(),
  "seconds"
);

console.log("User Information:", os.userInfo());


===========================================================
# WHY DO WE USE THE OS MODULE?
===========================================================

- The OS module is useful when a Node.js application needs
  information about the machine on which it is running.

For example:

1. Checking available memory
2. Checking CPU information
3. Detecting the operating system
4. Getting the current user's home directory
5. Getting network interface information
6. Getting system uptime
7. Getting temporary directory
8. Monitoring system resources
9. Making platform-specific decisions


===========================================================
# SIMPLE REAL-WORLD EXAMPLE
===========================================================

- Suppose we have a monitoring application.

- We want to display:

    CPU cores
    Total RAM
    Free RAM
    OS platform
    Hostname
    System uptime

- We can use the `os` module for all of this.

const os = require("node:os");

const systemInfo = {
  platform: os.platform(),
  architecture: os.arch(),
  cpuCores: os.cpus().length,
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
  hostname: os.hostname(),
  uptime: os.uptime()
};

console.log(systemInfo);


===========================================================
# INTERVIEW-READY ANSWER
===========================================================

Q. What is the OS module in Node.js?

- The `os` module is a built-in Node.js module that provides
  operating-system-related utilities.

- It allows us to retrieve information about the system on
  which our Node.js application is running, such as CPU,
  memory, platform, hostname, network interfaces, user
  information, uptime, and OS version.

- Since it is a core module, we do not need to install it
  separately.

Example:

const os = require("node:os");

console.log(os.platform());
console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem());


===========================================================
# ONE-LINE INTERVIEW ANSWER
===========================================================

- The Node.js `os` module is a built-in module that provides
  utilities for retrieving information about the operating
  system, CPU, memory, network interfaces, users, and other
  system-level details.
*/