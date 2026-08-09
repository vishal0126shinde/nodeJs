console.log(process); // Global object provide information about and contorl over the current node js porces 

console.log(process.pid) // return the process id of the currently running node js process 

console.log(process.ppid) // return the process ID of the parent process

console.log(process.platform);  // return platform where the current node js process are running.

console.log(process.arch) // return cpu architecture for the node js process was completed.

console.log(process.argv)
console.log(process.argv[0]) // node js execution path 
console.log(process.argv[1]) // javascript file path
console.log(process.argv[2]) // first user porvided argument
console.log(process.argv[3])


console.log(process.argv0) // contain the origional value of argv[0] pass when the porcess start

console.log(process.execPath) // return the absolute path of the executable that the current node js porecess

console.log(process.execArgv) // Node.js runtime arguments


console.log(process.env) // create environumet variable that are currently avialable in current node js process

console.log(process.version);
console.log(process.versions)
console.log(process.versions.node)
console.log(process.versions.v8)

console.log(process.cwd())
console.log(__dirname)