/*
============================================================
# STREAMS
============================================================

Q. What are Streams in Node.js?

- A stream is a mechanism for processing data piece by piece
  instead of loading the entire data into memory at once.

- Streams are especially useful for:
  - large files
  - video/audio
  - network data
  - continuous data

Example:

Suppose a file is:

  5 GB

Without a stream:

  5 GB file
      ↓
  load entire file
      ↓
    RAM

This can consume a lot of memory.

With a stream:

  5 GB file
      ↓
  Chunk 1
  Chunk 2
  Chunk 3
  Chunk 4
      ↓
  Process each chunk

Only a portion of the file is handled at a time.

------------------------------------------------------------
# Why Streams?
------------------------------------------------------------

Streams provide:

1. Lower memory usage
2. Efficient processing of large files
3. Better performance for continuous data
4. Ability to process data while it is still arriving

============================================================
# fs.createReadStream()
============================================================

Q. What is fs.createReadStream()?

Syntax:

fs.createReadStream(path, options);

- Creates a Readable Stream for a file.

- Instead of reading the entire file at once, it reads the file
  in chunks.

Example:

const fs = require("fs");

const readStream =
  fs.createReadStream("largefile.txt", "utf8");

readStream.on("data", (chunk) => {
  console.log("Chunk:", chunk);
});

readStream.on("end", () => {
  console.log("Read complete.");
});

------------------------------------------------------------
# How createReadStream() works
------------------------------------------------------------

largefile.txt

       ↓

createReadStream()

       ↓

+---------+
| Chunk 1 |
+---------+
       ↓
+---------+
| Chunk 2 |
+---------+
       ↓
+---------+
| Chunk 3 |
+---------+
       ↓
+---------+
| Chunk 4 |
+---------+

Each chunk triggers:

  "data"

When everything is finished:

  "end"

------------------------------------------------------------
# Important Events

"data"
------

- Fired whenever a chunk of data is available.

"end"
-----

- Fired when the entire file has been read.

"error"
-------

- Fired when an error occurs.

Example:

readStream.on("error", (err) => {
  console.error(err);
});


============================================================
# fs.createWriteStream()
============================================================

Q. What is fs.createWriteStream()?

- Creates a Writable Stream.

- It allows data to be written incrementally.

Example:

const writeStream =
  fs.createWriteStream("streamOutput.txt");

writeStream.write("Streaming data...\n");

writeStream.write("Another chunk...\n");

writeStream.end("Done!");

------------------------------------------------------------
# How it works
------------------------------------------------------------

Application
     ↓
writeStream.write()
     ↓
Chunk 1
     ↓
File

Then:

writeStream.write()
     ↓
Chunk 2
     ↓
File

Finally:

writeStream.end()
     ↓
Finish writing

------------------------------------------------------------
# Read Stream vs Write Stream
------------------------------------------------------------

createReadStream()
------------------

Purpose:

  Read data in chunks.

Direction:

  File → Application


createWriteStream()
-------------------

Purpose:

  Write data in chunks.

Direction:

  Application → File


============================================================
# WATCHING FILE CHANGES
============================================================

Q. What is fs.watch()?

- `fs.watch()` monitors a file or directory for changes.

- It can notify your application when something happens.

Example:

fs.watch("example.txt", (eventType, filename) => {

  console.log(
    `File ${filename} has a ${eventType} event`
  );

});

------------------------------------------------------------
# eventType

Common values include:

"rename"

or

"change"

- `change` generally indicates that the file contents or metadata
  changed.

- `rename` can indicate creation, deletion, or renaming depending
  on the platform and situation.

------------------------------------------------------------
# Important

fs.watch()

- Uses the operating system's file watching facilities where
  available.

- It is generally more efficient than polling.

============================================================
# fs.watchFile()
============================================================

Q. What is fs.watchFile()?

- `fs.watchFile()` monitors a file by polling its metadata
  periodically.

Example:

fs.watchFile("example.txt", (curr, prev) => {

  console.log(
    "Previous:",
    prev.mtime
  );

  console.log(
    "Current:",
    curr.mtime
  );

});

- `curr` → current Stats object
- `prev` → previous Stats object

- It can be useful when polling is specifically required, but it
  generally has more overhead than OS-level event watching.

============================================================
# fs.unwatchFile()
============================================================

- Stops monitoring a file that was previously registered with
  `fs.watchFile()`.

Example:

fs.unwatchFile("example.txt");

IMPORTANT:

  fs.unwatchFile()
       ↓
  Stops fs.watchFile()

It is not used to stop an `fs.watch()` watcher.

For `fs.watch()`, keep the returned watcher and call:

  watcher.close();

Example:

const watcher = fs.watch("example.txt", () => {
  console.log("Changed");
});

watcher.close();

*/

/*
============================================================
# pipe()
============================================================

Q. What is pipe() in Node.js Streams?

- pipe() is a method used to connect a Readable Stream
  to a Writable Stream.

- It takes data automatically from the Readable Stream
  and sends that data to the Writable Stream.

- Instead of manually listening for "data" events and
  calling write(), pipe() handles the data transfer for us.

Syntax:

    readableStream.pipe(writableStream);


Example:

const fs = require("fs");

const readStream =
    fs.createReadStream("largefile.txt");

const writeStream =
    fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);


Meaning:

    largefile.txt
          ↓
    Readable Stream
          ↓
        pipe()
          ↓
    Writable Stream
          ↓
       copy.txt


- The file is read in chunks.
- Each chunk is automatically passed to the writable stream.
- We don't need to manually call write() for every chunk.


============================================================
# Why use pipe()?
============================================================

Without pipe():

const readStream =
    fs.createReadStream("largefile.txt");

const writeStream =
    fs.createWriteStream("copy.txt");

readStream.on("data", (chunk) => {

    writeStream.write(chunk);

});

readStream.on("end", () => {

    writeStream.end();

});


With pipe():

const readStream =
    fs.createReadStream("largefile.txt");

const writeStream =
    fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);


- pipe() simplifies the code.
- It automatically transfers chunks from the readable
  stream to the writable stream.


============================================================
# How pipe() works internally
============================================================

Suppose:

largefile.txt
       ↓
createReadStream()
       ↓
Readable Stream
       ↓
     pipe()
       ↓
Writable Stream
       ↓
copy.txt


Step 1:

The Readable Stream produces a chunk.

        Chunk 1
           ↓
        pipe()
           ↓
    Writable Stream


Step 2:

Another chunk is produced.

        Chunk 2
           ↓
        pipe()
           ↓
    Writable Stream


Step 3:

This continues until the entire file has been transferred.


        Chunk 1 ──┐
        Chunk 2 ──┤
        Chunk 3 ──┤──→ Writable Stream
        Chunk 4 ──┤
        Chunk 5 ──┘


Step 4:

When the source stream ends, the destination stream
can be ended automatically by pipe().


============================================================
# pipe() and Backpressure
============================================================

Q. What is Backpressure?

- Backpressure occurs when the Writable Stream cannot
  consume data as quickly as the Readable Stream produces it.

Example:

Readable Stream
     ↓
Produces data very fast
     ↓
Writable Stream
     ↓
Consumes data slowly


Without proper flow control:

Fast producer
     ↓↓↓↓↓↓↓
Slow consumer
     ↓
Data can build up in memory.


- pipe() helps manage this flow automatically.

- It monitors the Writable Stream's ability to accept data
  and regulates the flow between the Readable and Writable
  streams.

Concept:

Fast Readable
      ↓
    pipe()
      ↓
Flow controlled
      ↓
Slow Writable


- This flow control is one of the important reasons why
  pipe() is useful for large amounts of data.


============================================================
# pipe() Return Value
============================================================

- pipe() returns the destination Writable Stream.

Example:

const result =
    readStream.pipe(writeStream);

console.log(result);


Conceptually:

readStream
    |
    | pipe()
    ↓
writeStream
    |
    ↓
returned destination stream


This also allows chaining in some stream scenarios.


============================================================
# pipe() Error Handling
============================================================

Important:

- pipe() handles the data flow between streams.
- However, you should still handle stream errors explicitly.

Example:

const readStream =
    fs.createReadStream("largefile.txt");

const writeStream =
    fs.createWriteStream("copy.txt");

readStream.on("error", (err) => {

    console.error("Read error:", err);

});

writeStream.on("error", (err) => {

    console.error("Write error:", err);

});

readStream.pipe(writeStream);


============================================================
# pipe() Example: Copy Large File
============================================================

const fs = require("fs");

const source =
    fs.createReadStream("largefile.txt");

const destination =
    fs.createWriteStream("copy.txt");

source.pipe(destination);

destination.on("finish", () => {

    console.log("File copied successfully");

});


Flow:

largefile.txt
      ↓
createReadStream()
      ↓
Readable Stream
      ↓
pipe()
      ↓
Writable Stream
      ↓
createWriteStream()
      ↓
copy.txt


- The entire 5 GB file does NOT need to be loaded into
  memory at once.

- Data is transferred chunk by chunk.


============================================================
# pipe() vs Manual data Event
============================================================

Manual approach:

readStream.on("data", (chunk) => {

    writeStream.write(chunk);

});


pipe() approach:

readStream.pipe(writeStream);


Difference:

Manual:

- Developer manually handles chunks.
- Developer manually calls write().
- Developer manually manages when writing ends.

pipe():

- Stream connection is handled automatically.
- Data is transferred automatically.
- Flow control/backpressure is handled for the pipe.


============================================================
# Types of Streams in Node.js
============================================================

Node.js has four fundamental types of streams:

1. Readable Stream
2. Writable Stream
3. Duplex Stream
4. Transform Stream


============================================================
# 1. Readable Stream
============================================================

Q. What is a Readable Stream?

- A Readable Stream is a stream from which data can be read.

Direction:

    Source
      ↓
    Readable Stream
      ↓
    Application


Examples:

    fs.createReadStream()

Other examples include:

    process.stdin

- It produces data that can be consumed by the application.


Example:

const readStream =
    fs.createReadStream("file.txt");

readStream.on("data", (chunk) => {

    console.log(chunk);

});


============================================================
# 2. Writable Stream
============================================================

Q. What is a Writable Stream?

- A Writable Stream is a stream to which data can be written.

Direction:

    Application
         ↓
    Writable Stream
         ↓
      Destination


Example:

    fs.createWriteStream()

Other example:

    process.stdout


Example:

const writeStream =
    fs.createWriteStream("output.txt");

writeStream.write("Hello Node.js");

writeStream.end();


============================================================
# 3. Duplex Stream
============================================================

Q. What is a Duplex Stream?

- A Duplex Stream can both read and write data.

It has two independent sides:

    Read
     ↑
     |
    Duplex
     |
     ↓
    Write


So:

    Application ←→ Duplex Stream


Examples:

- TCP sockets
- network sockets


For example:

const net = require("net");

const socket = net.createConnection({
    port: 3000
});

socket.write("Hello Server");

socket.on("data", (data) => {

    console.log(data.toString());

});


- The socket can:

  1. Receive data → Read
  2. Send data → Write

Therefore, it is a Duplex Stream.


============================================================
# 4. Transform Stream
============================================================

Q. What is a Transform Stream?

- A Transform Stream is a special type of Duplex Stream
  where the data written to the stream is transformed
  before being read from the stream.

Flow:

    Input
      ↓
    Transform
      ↓
    Output


Example:

    Input:
    "hello"

       ↓

    Transform

       ↓

    Output:
    "HELLO"


Example:

const { Transform } = require("stream");

const upperCase =
    new Transform({

        transform(chunk, encoding, callback) {

            const result =
                chunk.toString().toUpperCase();

            callback(null, result);

        }

    });


upperCase.on("data", (chunk) => {

    console.log(chunk.toString());

});

upperCase.write("hello");
upperCase.write("node js");
upperCase.end();


Output:

HELLO
NODE JS


============================================================
# Duplex vs Transform
============================================================

Duplex Stream:

    Read + Write

    Input  → Duplex → Output

- It can read and write.
- The input and output do not necessarily have to
  be related or transformed.


Transform Stream:

    Write → Transform → Read

- It can read and write.
- The output is generally produced from the input
  after some transformation.


Important:

    Every Transform Stream is a Duplex Stream.

But:

    Not every Duplex Stream is a Transform Stream.


============================================================
# Stream Types - Quick Comparison
============================================================

1. Readable

    Purpose:
    Read/produce data

    Example:
    fs.createReadStream()


2. Writable

    Purpose:
    Write/consume data

    Example:
    fs.createWriteStream()


3. Duplex

    Purpose:
    Both read and write

    Example:
    TCP socket


4. Transform

    Purpose:
    Read + write while transforming data

    Example:
    compression/encryption/transformation streams


============================================================
# Stream Relationship
============================================================

                    STREAMS
                       |
        +--------------+--------------+
        |              |              |
    Readable        Writable       Duplex
                                      |
                                      |
                                  Transform
                                      |
                           special type of
                             Duplex Stream


============================================================
# pipe() with Transform Stream
============================================================

- pipe() can connect multiple streams together.

Example:

Readable
    ↓
Transform
    ↓
Writable


Example:

const fs = require("fs");
const { Transform } = require("stream");

const upperCase =
    new Transform({

        transform(chunk, encoding, callback) {

            callback(
                null,
                chunk.toString().toUpperCase()
            );

        }

    });

const readStream =
    fs.createReadStream("input.txt");

const writeStream =
    fs.createWriteStream("output.txt");


readStream
    .pipe(upperCase)
    .pipe(writeStream);


Flow:

input.txt
    ↓
Readable Stream
    ↓
Transform Stream
    ↓
Writable Stream
    ↓
output.txt


This is one of the most important uses of pipe().


============================================================
# Common Real-World Uses of Streams
============================================================

1. Large file processing

    Large File
       ↓
    Read Stream
       ↓
    Process chunks


2. File copying

    Read Stream
         ↓
       pipe()
         ↓
    Write Stream


3. Video streaming

    Video File
         ↓
    Read Stream
         ↓
    Network
         ↓
      Client


4. HTTP request/response

    Client
      ↓
    Request Stream
      ↓
    Server

    Server
      ↓
    Response Stream
      ↓
    Client


5. Compression

    File
      ↓
    Readable
      ↓
    Compression / Transform
      ↓
    Writable


============================================================
# IMPORTANT INTERVIEW POINTS
============================================================

Q. What are Streams in Node.js?

- Streams allow data to be processed incrementally,
  in chunks, instead of loading the entire data into
  memory at once.


Q. What are the four types of streams?

1. Readable
2. Writable
3. Duplex
4. Transform


Q. What is pipe()?

- pipe() connects a Readable Stream to a Writable Stream
  and automatically transfers data between them.


Q. What is Backpressure?

- Backpressure occurs when the destination stream cannot
  consume data as quickly as the source produces it.
- Node.js stream mechanisms, including pipe(), help control
  this flow so that data does not overwhelm the destination.


Q. Difference between Duplex and Transform?

- Duplex can both read and write.
- Transform can both read and write while transforming
  the data.


Q. Is Transform a Duplex Stream?

- Yes.
- Transform is a specialized type of Duplex Stream.


Q. Why are streams useful?

- Lower memory usage
- Efficient processing of large data
- Better handling of continuous data
- Support for backpressure
- Useful for files, HTTP, network, video, audio,
  compression, and other data-processing tasks.


============================================================
# FINAL STREAM FLOW
============================================================

                    STREAMS
                       |
        +--------------+--------------+
        |              |              |
    Readable        Writable       Duplex
                                      |
                                      ↓
                                  Transform


Example:

    File
     ↓
    Readable
     ↓
    pipe()
     ↓
    Transform
     ↓
    pipe()
     ↓
    Writable
     ↓
    File


This is the basic stream architecture you should remember
for Node.js interviews.
*/




/*
# ============================================================
# STREAMS IN NODE.JS
# ============================================================


Q. What are Streams in Node.js?

- A Stream is a mechanism for processing data piece by piece
  instead of loading the entire data into memory at once.

- A stream allows data to be processed as it is being read,
  written, received, or generated.

- Streams are especially useful when working with:

  - Large files
  - Video/audio
  - HTTP requests/responses
  - Network data
  - Database data
  - Compression
  - Continuous data


Example:

Suppose a file is:

5 GB

Without Stream:

5 GB file
    ↓
Read entire file
    ↓
Store entire file in RAM
    ↓
Process data


This can consume a large amount of memory.


With Stream:

5 GB file
    ↓
Chunk 1
    ↓
Process
    ↓
Chunk 2
    ↓
Process
    ↓
Chunk 3
    ↓
Process
    ↓
...


Only a portion of the data is handled at a time.


------------------------------------------------------------

Q. What is a Chunk?

- A chunk is a small piece of data being processed by a stream.

Example:

Large file

      100 MB
        ↓
  ┌───────────┐
  │  Chunk 1  │
  ├───────────┤
  │  Chunk 2  │
  ├───────────┤
  │  Chunk 3  │
  ├───────────┤
  │    ...    │
  ├───────────┤
  │  Chunk N  │
  └───────────┘


- Instead of loading the complete 100 MB into memory,
  the stream processes smaller chunks.


IMPORTANT:

- A chunk is not necessarily a fixed application-level size.
- The actual chunk size depends on the stream implementation,
  buffering, source, and configuration such as highWaterMark.


============================================================
# WHY DO WE NEED STREAMS?
============================================================


Without Streams:

Large Data
    ↓
Load everything
    ↓
Memory
    ↓
Process


Problems:

- High memory usage
- More waiting before processing starts
- Not efficient for continuous data


With Streams:

Data
 ↓
Chunk
 ↓
Process
 ↓
Chunk
 ↓
Process


Advantages:

1. Lower memory usage
2. Efficient processing of large data
3. Data can be processed while it is arriving
4. Better performance for continuous data
5. Useful for network communication
6. Useful for file processing
7. Useful for compression/decompression


============================================================
# TYPES OF STREAMS
============================================================


Node.js has four main types of streams:

1. Readable Stream
2. Writable Stream
3. Duplex Stream
4. Transform Stream


------------------------------------------------------------
# 1. READABLE STREAM
------------------------------------------------------------


Q. What is a Readable Stream?

- A Readable Stream is used to READ data.

Direction:

Source
  ↓
Readable Stream
  ↓
Application


Example:

File
  ↓
createReadStream()
  ↓
Application


Example:

const fs = require("fs");

const readStream =
  fs.createReadStream("largefile.txt");


- It reads the file in chunks.


Common examples:

- fs.createReadStream()
- HTTP request
- process.stdin
- TCP socket readable side


------------------------------------------------------------
# 2. WRITABLE STREAM
------------------------------------------------------------


Q. What is a Writable Stream?

- A Writable Stream is used to WRITE data.

Direction:

Application
    ↓
Writable Stream
    ↓
Destination


Example:

Application
    ↓
createWriteStream()
    ↓
File


Example:

const writeStream =
  fs.createWriteStream("output.txt");


writeStream.write("Hello");

writeStream.end();


Common examples:

- fs.createWriteStream()
- process.stdout
- HTTP response
- TCP socket writable side


------------------------------------------------------------
# 3. DUPLEX STREAM
------------------------------------------------------------


Q. What is a Duplex Stream?

- A Duplex Stream can both READ and WRITE data.

It has:

Readable side
+
Writable side


Diagram:

        READ
Source ───────→ Application


        WRITE
Application ───→ Destination


Both operations can happen independently.


Example:

TCP socket


A TCP socket can:

- Receive data
- Send data


Therefore, a TCP socket is a common example of
a Duplex Stream.


------------------------------------------------------------
# 4. TRANSFORM STREAM
------------------------------------------------------------


Q. What is a Transform Stream?

- A Transform Stream is a special type of Duplex Stream.

- It can READ data, transform it, and WRITE the transformed data.

Flow:

Input
  ↓
Transform
  ↓
Output


Example:

Original data

Hello Node.js

        ↓
Transform

HELLO NODE.JS

        ↓
Output


Common examples:

- Compression
- Decompression
- Encryption
- Data modification
- CSV processing


Node.js example:

const { Transform } = require("stream");


============================================================
# READABLE STREAM
============================================================


Q. What is fs.createReadStream()?

Syntax:

fs.createReadStream(path, options);


- Creates a Readable Stream for a file.

- Instead of reading the entire file at once,
  it reads the file in chunks.


Example:

const fs = require("fs");

const readStream =
  fs.createReadStream("largefile.txt", "utf8");


readStream.on("data", (chunk) => {

  console.log("Chunk:", chunk);

});


readStream.on("end", () => {

  console.log("Read complete.");

});


readStream.on("error", (err) => {

  console.error(err);

});


------------------------------------------------------------
# HOW createReadStream() WORKS
------------------------------------------------------------


largefile.txt
      ↓
createReadStream()
      ↓
┌───────────┐
│  Chunk 1  │
└───────────┘
      ↓
┌───────────┐
│  Chunk 2  │
└───────────┘
      ↓
┌───────────┐
│  Chunk 3  │
└───────────┘
      ↓
┌───────────┐
│  Chunk N  │
└───────────┘
      ↓
     end


Every available chunk can trigger:

"data"


When all data has been consumed:

"end"


============================================================
# IMPORTANT READABLE STREAM EVENTS
============================================================


1. "data"

- Fired when a chunk of data is available
  in flowing mode.


2. "end"

- Fired when there is no more data to consume.


3. "error"

- Fired when an error occurs.


4. "close"

- Fired when the stream/resource has been closed.


5. "readable"

- Indicates that data can be read from the stream
  using read().


Example:

readStream.on("data", (chunk) => {

  console.log(chunk);

});


readStream.on("end", () => {

  console.log("Finished");

});


readStream.on("error", (err) => {

  console.error(err);

});


============================================================
# WRITABLE STREAM
============================================================


Q. What is fs.createWriteStream()?


- Creates a Writable Stream.

- It allows data to be written incrementally.


Example:

const writeStream =
  fs.createWriteStream("output.txt");


writeStream.write("First chunk\n");

writeStream.write("Second chunk\n");

writeStream.write("Third chunk\n");


writeStream.end("Final chunk");


------------------------------------------------------------
# HOW createWriteStream() WORKS
------------------------------------------------------------


Application
     ↓
write()
     ↓
Chunk 1
     ↓
Writable Stream
     ↓
File


Application
     ↓
write()
     ↓
Chunk 2
     ↓
Writable Stream
     ↓
File


Finally:

end()
 ↓
Finish


============================================================
# IMPORTANT WRITABLE STREAM METHODS
============================================================


1. write()

- Writes data to the stream.


writeStream.write("Hello");


2. end()

- Indicates that no more data will be written.


writeStream.end("Done");


3. cork()

- Temporarily buffers written data.


4. uncork()

- Flushes the buffered data.


============================================================
# IMPORTANT WRITABLE STREAM EVENTS
============================================================


1. "drain"

- Fired when the stream's internal buffer has enough
  space to continue accepting data after write()
  returned false.


2. "finish"

- Fired after end() has been called and all data has
  been flushed to the underlying system.


3. "error"

- Fired when an error occurs.


4. "close"

- Fired when the stream/resource is closed.


============================================================
# READABLE VS WRITABLE STREAM
============================================================


Readable:

Purpose:
Read data


Direction:

Source
 ↓
Readable
 ↓
Application


Writable:

Purpose:
Write data


Direction:

Application
 ↓
Writable
 ↓
Destination


============================================================
# pipe()
============================================================


Q. What is pipe()?


- pipe() connects a Readable Stream to a Writable Stream.

- It automatically transfers data from the readable stream
  to the writable stream.

Instead of manually doing:

read data
 ↓
receive chunk
 ↓
write chunk
 ↓
receive chunk
 ↓
write chunk


pipe() does this connection for us.


Syntax:

readableStream.pipe(writableStream);


------------------------------------------------------------
# BASIC pipe() EXAMPLE
------------------------------------------------------------


const fs = require("fs");


const readStream =
  fs.createReadStream("input.txt");


const writeStream =
  fs.createWriteStream("output.txt");


readStream.pipe(writeStream);


Flow:

input.txt
   ↓
Readable Stream
   ↓
pipe()
   ↓
Writable Stream
   ↓
output.txt


This is a very common way to copy large files
using streams.


------------------------------------------------------------
# WHY USE pipe()?
------------------------------------------------------------


Without pipe():

readStream.on("data", (chunk) => {

  writeStream.write(chunk);

});


With pipe():

readStream.pipe(writeStream);


Advantages:

- Less code
- Automatically connects streams
- Handles data flow
- Helps manage backpressure
- Efficient for stream-to-stream transfer


============================================================
# pipe() WITH TRANSFORM STREAM
============================================================


Input File
    ↓
Read Stream
    ↓
Transform Stream
    ↓
Write Stream
    ↓
Output File


Example:

readStream
  .pipe(transformStream)
  .pipe(writeStream);


This is called:

STREAM PIPELINE / STREAM CHAIN


============================================================
# pipeline()
============================================================


Q. What is pipeline()?


- pipeline() connects multiple streams together
  and provides better error handling and cleanup.


Example:

const { pipeline } = require("stream");


pipeline(
  readStream,
  transformStream,
  writeStream,
  (err) => {

    if (err) {

      console.error("Pipeline failed:", err);

    } else {

      console.log("Pipeline completed");

    }

  }
);


------------------------------------------------------------
# pipe() vs pipeline()
------------------------------------------------------------


pipe():

- Connects streams
- Simple
- Good for basic stream connections


pipeline():

- Connects multiple streams
- Provides better error propagation
- Helps clean up streams when errors occur
- Generally preferred for more complex/production
  stream pipelines


Interview:

"pipe() is useful for simple stream connections,
while pipeline() provides more robust error handling
and cleanup for stream pipelines."


============================================================
# BACKPRESSURE
============================================================


Q. What is Backpressure?


- Backpressure occurs when the Writable Stream cannot
  consume data as quickly as the Readable Stream produces it.


Example:


Readable Stream:

Produces data very fast
        ↓
        ↓
        ↓


Writable Stream:

Consumes data slowly


Problem:

Producer
   ↓
   ↓
   ↓
Buffer
   ↓
Slow Consumer


The buffer can grow too much and consume memory.


Backpressure is the mechanism that prevents a fast producer
from overwhelming a slow consumer.


============================================================
# HOW write() HANDLES BACKPRESSURE
============================================================


Example:

const canContinue =
  writeStream.write(chunk);


write() returns:

true
or
false


------------------------------------------------------------
# write() returns true
------------------------------------------------------------


- The Writable Stream can currently accept more data.


write(chunk)
    ↓
  true
    ↓
Continue writing


------------------------------------------------------------
# write() returns false
------------------------------------------------------------


- The internal buffer is full/high-water condition reached.

write(chunk)
    ↓
  false
    ↓
STOP writing temporarily
    ↓
Wait for "drain"
    ↓
Continue writing


Example:

if (!writeStream.write(chunk)) {

  readStream.pause();

}


writeStream.once("drain", () => {

  readStream.resume();

});


This is manual backpressure handling.


IMPORTANT:

- pipe() automatically manages this flow control for
  normal stream usage.


============================================================
# highWaterMark
============================================================


Q. What is highWaterMark?


- highWaterMark defines the buffering threshold used by
  a stream.

- It does NOT necessarily mean:

  "Every chunk will be exactly this size."


It is better understood as a threshold for buffering.


Example:

const readStream =
  fs.createReadStream("largefile.txt", {

    highWaterMark: 64 * 1024

  });


64 KB is the configured buffering threshold for this
Readable stream.


For Writable streams, highWaterMark is also related to
how much data can be buffered before write() starts
returning false.


============================================================
# BUFFER
============================================================


Q. What is Buffer in Node.js?


- Buffer is a Node.js object used to work with raw binary data.


Streams often process data as:

Buffer
Buffer
Buffer
Buffer


Example:

readStream.on("data", (chunk) => {

  console.log(Buffer.isBuffer(chunk));

});


Without specifying an encoding:

chunk
↓
Buffer


With:

"utf8"


the chunk is typically delivered as a string.


============================================================
# FLOWING MODE
============================================================


Q. What is Flowing Mode?


- In flowing mode, data automatically flows through
  the Readable Stream and is delivered to the consumer.


Example:

readStream.on("data", (chunk) => {

  console.log(chunk);

});


Adding a "data" listener causes the stream to operate
in flowing mode.


Flow:

File
 ↓
Readable Stream
 ↓
data event
 ↓
Application


============================================================
# PAUSED MODE
============================================================


Q. What is Paused Mode?


- In paused mode, the Readable Stream does not automatically
  emit chunks to the consumer.

- Data can be explicitly requested using read().


Example:

readStream.on("readable", () => {

  let chunk;

  while ((chunk = readStream.read()) !== null) {

    console.log(chunk);

  }

});


A Readable stream can also be controlled with:

pause()

and

resume()


Example:

readStream.pause();


readStream.resume();


============================================================
# objectMode
============================================================


Q. What is Object Mode?


- Normally, Node.js streams work with strings or Buffers.

- Object mode allows a stream to work with JavaScript
  objects instead.


Example:

const { Transform } = require("stream");


const transform =
  new Transform({

    objectMode: true,

    transform(obj, encoding, callback) {

      obj.name =
        obj.name.toUpperCase();

      callback(null, obj);

    }

  });


Input:

{
  name: "vishal"
}


Output:

{
  name: "VISHAL"
}


Object mode is useful when processing:

- JavaScript objects
- Parsed data
- Database records
- JSON-like data


============================================================
# TRANSFORM STREAM
============================================================


Q. What is Transform Stream?


- Transform Stream receives data, modifies it,
  and produces new data.


Input
 ↓
Transform
 ↓
Output


Example:

const { Transform } = require("stream");


const upperCase =
  new Transform({

    transform(chunk, encoding, callback) {

      const result =
        chunk.toString().toUpperCase();

      callback(null, result);

    }

  });


upperCase.on("data", (chunk) => {

  console.log(chunk.toString());

});


============================================================
# transform() METHOD
============================================================


A Transform Stream generally implements:

transform(chunk, encoding, callback)


Parameters:

1. chunk
   - Incoming data

2. encoding
   - Encoding information when relevant

3. callback
   - Used to indicate completion and provide
     transformed output or an error


Success:

callback(null, transformedData);


Error:

callback(error);


============================================================
# DUPLEX STREAM
============================================================


Q. What is Duplex Stream?


- Duplex Stream supports both reading and writing.


Example:

TCP socket


Concept:

        READ
        ↑
        │
    Socket
        │
        ↓
       WRITE


A Duplex Stream has independent readable and writable sides.


============================================================
# TRANSFORM VS DUPLEX
============================================================


Duplex:

- Can read and write
- Read and write sides are generally independent


Transform:

- Can read and write
- Output is generally derived from/transformed from input


Therefore:

Transform Stream
      ↓
Special type of Duplex Stream


============================================================
# STREAM CHAIN
============================================================


Q. What is Stream Chaining?


- Stream chaining means connecting multiple streams
  together.


Example:

Read
 ↓
Transform
 ↓
Write


Example:

readStream
  .pipe(transformStream)
  .pipe(writeStream);


Real-world example:

File
 ↓
Read Stream
 ↓
Gzip Compression
 ↓
Write Stream
 ↓
.gz file


============================================================
# COMPRESSION WITH STREAMS
============================================================


Node.js provides the zlib module for compression.


Example:

const fs = require("fs");

const zlib = require("zlib");


const readStream =
  fs.createReadStream("input.txt");


const gzip =
  zlib.createGzip();


const writeStream =
  fs.createWriteStream("input.txt.gz");


readStream
  .pipe(gzip)
  .pipe(writeStream);


Flow:

input.txt
   ↓
Read Stream
   ↓
Gzip Transform
   ↓
Write Stream
   ↓
input.txt.gz


Here:

createReadStream()
    ↓
Readable


createGzip()
    ↓
Transform


createWriteStream()
    ↓
Writable


============================================================
# DECOMPRESSION
============================================================


Example:

const gunzip =
  zlib.createGunzip();


fs.createReadStream("input.txt.gz")
  .pipe(gunzip)
  .pipe(
    fs.createWriteStream("output.txt")
  );


Flow:

.gz file
 ↓
Read Stream
 ↓
Gunzip Transform
 ↓
Write Stream
 ↓
output.txt


============================================================
# STREAM EVENTS - COMPLETE OVERVIEW
============================================================


Readable commonly uses:

1. data
2. end
3. readable
4. error
5. close


Writable commonly uses:

1. drain
2. finish
3. error
4. close


Transform:

- Has readable side
- Has writable side
- Also commonly uses transform-related behavior/events


============================================================
# "finish" vs "end"
============================================================


IMPORTANT INTERVIEW QUESTION:


Readable:

"end"

↓

No more data can be read.


Writable:

"finish"

↓

All data has been flushed after end().


Therefore:

Readable  → end

Writable  → finish


============================================================
# "close" vs "finish"
============================================================


"finish"

- Writable side has finished writing.


"close"

- Underlying resource has been closed.


They are not the same event.


============================================================
# ERROR HANDLING
============================================================


Streams can generate errors.


Example:

readStream.on("error", (err) => {

  console.error(err);

});


writeStream.on("error", (err) => {

  console.error(err);

});


For multiple connected streams:

pipeline() is generally preferred because
it provides centralized error handling and cleanup.


============================================================
# COMPLETE pipe() EXAMPLE
============================================================


const fs = require("fs");


const source =
  fs.createReadStream("input.txt");


const destination =
  fs.createWriteStream("output.txt");


source.pipe(destination);


destination.on("finish", () => {

  console.log("File copied successfully");

});


source.on("error", (err) => {

  console.error("Read error:", err);

});


destination.on("error", (err) => {

  console.error("Write error:", err);

});


============================================================
# COMPLETE pipeline() EXAMPLE
============================================================


const fs = require("fs");

const { pipeline } =
  require("stream");


pipeline(

  fs.createReadStream("input.txt"),

  fs.createWriteStream("output.txt"),

  (err) => {

    if (err) {

      console.error(
        "Pipeline failed:",
        err
      );

    } else {

      console.log(
        "Pipeline completed successfully"
      );

    }

  }

);


============================================================
# pipe() vs MANUAL DATA HANDLING
============================================================


Without pipe():

readStream.on("data", (chunk) => {

  writeStream.write(chunk);

});


With pipe():

readStream.pipe(writeStream);


pipe() provides a higher-level way to connect streams
and handle data flow/backpressure.


============================================================
# pipe() vs pipeline()
============================================================


pipe():

- Simple stream connection
- Easy to use
- Suitable for basic cases


pipeline():

- Connects multiple streams
- Better error propagation
- Better cleanup
- Preferred for more robust pipelines


Interview answer:

"pipe() connects streams and handles normal data flow,
while pipeline() provides a more robust mechanism for
connecting streams with better error handling and cleanup."


============================================================
# STREAMS + MEMORY
============================================================


Without Stream:

Large File
   ↓
Entire File
   ↓
RAM


With Stream:

Large File
   ↓
Chunk
   ↓
Process
   ↓
Chunk
   ↓
Process


Therefore:

Streams help avoid loading the entire data source into
memory at once.


IMPORTANT:

- Streams reduce memory usage.
- Streams do NOT mean that no memory is used.
- Streams still use buffers internally.


============================================================
# STREAMS + BACKPRESSURE
============================================================


Fast Producer
      ↓
      ↓
      ↓
Readable Stream
      ↓
Buffer
      ↓
Writable Stream
      ↓
Slow Consumer


If producer is faster:

write()
 ↓
false
 ↓
Pause / wait
 ↓
drain
 ↓
Resume


This mechanism is called:

BACKPRESSURE


============================================================
# STREAMS IN HTTP
============================================================


Streams are heavily used in Node.js HTTP.


Example:

HTTP Request
     ↓
Readable Stream


HTTP Response
     ↑
Writable Stream


For example:

req

is a Readable Stream.


res

is a Writable Stream.


This is one reason Node.js is efficient for
network and HTTP workloads.


============================================================
# STREAMS AND FILES
============================================================


Large File Reading:

fs.createReadStream()


Large File Writing:

fs.createWriteStream()


File Copy:

readStream.pipe(writeStream)


Compression:

readStream
  .pipe(gzip)
  .pipe(writeStream)


============================================================
# FILE COPY USING STREAM
============================================================


const fs = require("fs");


const readStream =
  fs.createReadStream("source.txt");


const writeStream =
  fs.createWriteStream("destination.txt");


readStream.pipe(writeStream);


This is better suited to large files than manually
loading the entire file with readFile() and then
writing the entire result.


============================================================
# STREAM vs readFile()
============================================================


readFile():

- Reads the complete file
- Callback/Promise receives the complete content
- Simple for small/normal files


createReadStream():

- Reads data incrementally
- Processes chunks
- Better suited for large files


Example:


readFile():

File
 ↓
Entire content
 ↓
Memory


createReadStream():

File
 ↓
Chunk
 ↓
Chunk
 ↓
Chunk


Interview:

"For small files, readFile() can be simpler.
For large files or continuous data, streams are
more memory-efficient because data is processed
incrementally."


============================================================
# STREAM vs BUFFER
============================================================


Buffer:

- Represents a block of binary data in memory.


Stream:

- Provides a mechanism to process data over time,
  often chunk by chunk.


Relationship:

File
 ↓
Stream
 ↓
Chunk
 ↓
Buffer


A stream can deliver chunks as Buffers.


============================================================
# STREAM OBJECTS
============================================================


Node.js provides stream classes such as:

Readable
Writable
Duplex
Transform


They are available from:

require("stream")


Example:

const {
  Readable,
  Writable,
  Duplex,
  Transform
} = require("stream");


============================================================
# CUSTOM READABLE STREAM
============================================================


You can create your own Readable Stream.


Example:

const {
  Readable
} = require("stream");


const readable =
  new Readable({

    read() {

      this.push("Hello ");

      this.push("Node.js");

      this.push(null);

    }

  });


readable.on("data", (chunk) => {

  console.log(
    chunk.toString()
  );

});


readable.on("end", () => {

  console.log("Done");

});


IMPORTANT:

this.push(null)

↓

Indicates that no more data is available.


============================================================
# CUSTOM WRITABLE STREAM
============================================================


const {
  Writable
} = require("stream");


const writable =
  new Writable({

    write(chunk, encoding, callback) {

      console.log(
        chunk.toString()
      );

      callback();

    }

  });


writable.write("Hello");

writable.end();


============================================================
# CUSTOM TRANSFORM STREAM
============================================================


const {
  Transform
} = require("stream");


const upperCase =
  new Transform({

    transform(
      chunk,
      encoding,
      callback
    ) {

      callback(
        null,
        chunk.toString().toUpperCase()
      );

    }

  });


upperCase.on("data", (chunk) => {

  console.log(
    chunk.toString()
  );

});


upperCase.write("hello node.js");

upperCase.end();


============================================================
# CUSTOM DUPLEX STREAM
============================================================


const {
  Duplex
} = require("stream");


const duplex =
  new Duplex({

    read() {

      this.push("Readable data");

      this.push(null);

    },

    write(
      chunk,
      encoding,
      callback
    ) {

      console.log(
        "Received:",
        chunk.toString()
      );

      callback();

    }

  });


============================================================
# STREAM WATCHING FILE CHANGES
============================================================


Q. What is fs.watch()?


- fs.watch() monitors a file or directory for changes.

Example:

const watcher =
  fs.watch(
    "example.txt",
    (eventType, filename) => {

      console.log(
        eventType,
        filename
      );

    }
  );


Common event types:

"rename"

"change"


------------------------------------------------------------
# fs.watchFile()
------------------------------------------------------------


- fs.watchFile() monitors a file using polling.

Example:

fs.watchFile(
  "example.txt",
  (curr, prev) => {

    console.log(
      "Previous:",
      prev.mtime
    );

    console.log(
      "Current:",
      curr.mtime
    );

  }
);


------------------------------------------------------------
# fs.unwatchFile()
------------------------------------------------------------


- Stops monitoring a file registered with
  fs.watchFile().


fs.unwatchFile("example.txt");


IMPORTANT:

fs.unwatchFile()
        ↓
stops fs.watchFile()


For fs.watch():

const watcher =
  fs.watch(
    "example.txt",
    () => {}
  );


watcher.close();


============================================================
# STREAMS COMPLETE FLOW
============================================================


                 STREAMS
                    │
        ┌───────────┼───────────┐
        │           │           │
     Readable    Writable     Duplex
        │                       │
        │                    Read + Write
        │
        └──────────────┐
                       │
                   Transform
                       │
                 Read + Write
                 + transforms data


============================================================
# COMPLETE REAL-WORLD PIPELINE
============================================================


Large File
    ↓
Readable Stream
    ↓
Transform Stream
    ↓
Writable Stream
    ↓
Destination


Example:

input.txt
    ↓
createReadStream()
    ↓
createGzip()
    ↓
createWriteStream()
    ↓
input.txt.gz


Code:

const fs = require("fs");

const zlib = require("zlib");

const { pipeline } =
  require("stream");


pipeline(

  fs.createReadStream("input.txt"),

  zlib.createGzip(),

  fs.createWriteStream(
    "input.txt.gz"
  ),

  (err) => {

    if (err) {

      console.error(
        "Pipeline failed:",
        err
      );

    } else {

      console.log(
        "Compression completed"
      );

    }

  }

);


============================================================
# STREAMS - COMPLETE INTERVIEW SUMMARY
============================================================


Q. What are Streams in Node.js?


Interview-ready answer:

- Streams are a mechanism for processing data incrementally,
  usually in chunks, instead of loading the entire data into
  memory at once.

- They are useful for large files, HTTP/network communication,
  video/audio, compression, and continuous data.

- Node.js provides four main stream types:

  1. Readable
  2. Writable
  3. Duplex
  4. Transform


Readable:

- Reads data.


Writable:

- Writes data.


Duplex:

- Reads and writes data.


Transform:

- Reads, transforms, and writes data.


pipe():

- Connects a Readable Stream to a Writable Stream.


pipeline():

- Connects streams with more robust error handling
  and cleanup.


Backpressure:

- Handles situations where the producer is faster
  than the consumer.


highWaterMark:

- Defines a buffering threshold used by streams.


Buffer:

- Represents binary data in memory.


Flowing mode:

- Data automatically flows through the stream.


Paused mode:

- Data is consumed explicitly.


Object mode:

- Allows streams to process JavaScript objects instead
  of only strings/Buffers.


============================================================
# MOST IMPORTANT STREAM INTERVIEW QUESTIONS
============================================================


1. What is a Stream in Node.js?

2. Why are Streams used?

3. What is a chunk?

4. What are the four types of Streams?

5. What is a Readable Stream?

6. What is a Writable Stream?

7. What is a Duplex Stream?

8. What is a Transform Stream?

9. What is fs.createReadStream()?

10. What is fs.createWriteStream()?

11. What is pipe()?

12. How does pipe() work?

13. What is pipeline()?

14. pipe() vs pipeline()?

15. What is backpressure?

16. How does Node.js handle backpressure?

17. What does write() returning false mean?

18. What is the drain event?

19. What is highWaterMark?

20. Is highWaterMark the exact chunk size?

21. What is Buffer?

22. What is flowing mode?

23. What is paused mode?

24. What is objectMode?

25. What is the difference between Duplex and Transform?

26. What is the difference between end and finish?

27. What is the difference between readFile() and
    createReadStream()?

28. How can you copy a large file using Streams?

29. How can you compress a file using Streams?

30. How are Streams used in HTTP?

31. What is stream chaining?

32. How do you handle stream errors?

33. What is fs.watch()?

34. What is fs.watchFile()?

35. What is the difference between fs.watch() and
    fs.watchFile()?

36. How do you stop fs.watch()?

37. How do you stop fs.watchFile()?


============================================================
# ONE-LINE MEMORY TRICK
============================================================


Readable
    ↓
READ


Writable
    ↓
WRITE


Duplex
    ↓
READ + WRITE


Transform
    ↓
READ + TRANSFORM + WRITE


pipe()
    ↓
CONNECT STREAMS


pipeline()
    ↓
CONNECT + ERROR HANDLING + CLEANUP


Backpressure
    ↓
SLOW CONSUMER CONTROLS FAST PRODUCER


highWaterMark
    ↓
BUFFERING THRESHOLD


Buffer
    ↓
BINARY DATA


Chunk
    ↓
SMALL PIECE OF DATA


Stream
    ↓
PROCESS DATA INCREMENTALLY


============================================================
# FINAL INTERVIEW ANSWER
============================================================


Q. Explain Streams in Node.js.


- Streams in Node.js are used to process data incrementally
  rather than loading the complete data into memory at once.

- A stream processes data in chunks, which makes it useful
  for large files, HTTP requests/responses, network data,
  video/audio, and continuous data.

- Node.js provides four main types of streams:

  1. Readable
  2. Writable
  3. Duplex
  4. Transform

- Readable streams read data, Writable streams write data,
  Duplex streams can both read and write, and Transform
  streams can read, transform, and write data.

- The pipe() method connects streams and automatically
  transfers data between them.

- The pipeline() API is useful when building more robust
  stream pipelines because it provides better error
  propagation and cleanup.

- Streams also support backpressure, which prevents a fast
  producer from overwhelming a slower consumer.

- highWaterMark controls the stream's buffering threshold,
  while Buffer represents binary data held in memory.

- Streams therefore provide an efficient and scalable way
  to process large or continuous data in Node.js.


============================================================
# END OF STREAMS
============================================================
*/




/*
============================================================
# pipe()
============================================================

Q. What is pipe() in Node.js?

- pipe() is a method used to connect a Readable Stream
  to a Writable Stream.

- It automatically transfers data from the readable stream
  to the writable stream.

Syntax:

readableStream.pipe(writableStream);

Example:

const fs = require("fs");

const readStream =
  fs.createReadStream("input.txt");

const writeStream =
  fs.createWriteStream("output.txt");

readStream.pipe(writeStream);


Flow:

input.txt
    ↓
Readable Stream
    ↓
.pipe()
    ↓
Writable Stream
    ↓
output.txt


Therefore:

Readable
   ↓
  pipe()
   ↓
Writable


Q. Why use pipe()?

- It avoids manually handling every chunk.
- It efficiently transfers data between streams.
- It helps manage data flow automatically.
- It works with backpressure.
- It is especially useful for large files and continuous data.

Without pipe():

readStream.on("data", (chunk) => {

    writeStream.write(chunk);

});

readStream.on("end", () => {

    writeStream.end();

});


With pipe():

readStream.pipe(writeStream);


So pipe() makes stream-to-stream data transfer
simpler and safer.


============================================================
# pipe() AND BACKPRESSURE
============================================================

Q. What is backpressure?

- Backpressure occurs when the Writable Stream cannot process
  incoming data as quickly as the Readable Stream produces it.

Example:

Readable Stream
    ↓
produces data quickly
    ↓
Writable Stream
    ↓
processes data slowly

The writable side can become overloaded.

pipe() helps manage this flow automatically by controlling
how much data is being passed between streams.

Therefore:

Readable → pipe() → Writable
                 ↓
          manages data flow
                 ↓
            backpressure


============================================================
# pipe() CHAINING
============================================================

Multiple streams can be connected together.

Example:

Readable
   ↓
Transform
   ↓
Transform
   ↓
Writable


Example:

readStream
    .pipe(transformStream)
    .pipe(writeStream);


This is called stream piping/chaining.


============================================================
# Example: Copy Large File Using pipe()
============================================================

const fs = require("fs");

const readStream =
  fs.createReadStream("largefile.txt");

const writeStream =
  fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);


Flow:

largefile.txt
      ↓
createReadStream()
      ↓
    pipe()
      ↓
createWriteStream()
      ↓
   copy.txt


Advantages:

- Does not load the entire file into memory.
- Processes data in chunks.
- Efficient for large files.
- Handles backpressure.


============================================================
# TYPES OF STREAMS
============================================================

Node.js mainly has four types of streams:

1. Readable Stream

- Used to read data.

Example:

fs.createReadStream();


2. Writable Stream

- Used to write data.

Example:

fs.createWriteStream();


3. Duplex Stream

- Can both read and write data.

Example:

TCP socket.


4. Transform Stream

- A special type of Duplex Stream.
- It can modify/transform data while it passes through.

Example:

compression or encryption stream.


Flow:

Readable
   ↓
Transform
   ↓
Writable


Example:

input
 ↓
gzip/compression
 ↓
output


============================================================
# IMPORTANT STREAM EVENTS
============================================================

Readable Stream:

"data"
    → chunk is available

"end"
    → no more data

"error"
    → error occurred

"close"
    → stream/resource closed


Writable Stream:

"drain"
    → writable stream can accept more data

"finish"
    → all data has been flushed

"error"
    → error occurred

"close"
    → stream/resource closed


============================================================
# FINAL INTERVIEW ANSWER
============================================================

Q. What are Streams in Node.js?

- Streams are a mechanism for processing data incrementally
  in chunks instead of loading the entire data into memory.

- They are useful for large files, video/audio, network
  communication, and continuous data.

- Node.js provides four major types of streams:

  1. Readable
  2. Writable
  3. Duplex
  4. Transform

- fs.createReadStream() creates a Readable Stream.
- fs.createWriteStream() creates a Writable Stream.
- pipe() connects a Readable Stream to a Writable Stream
  and helps manage data flow and backpressure.

Example:
readStream.pipe(writeStream);


============================================================
*/



/*
# STREAMS — ADDITIONAL INTERVIEW CONCEPTS

============================================================
1. unpipe()
============================================================

Q. What is unpipe()?

- unpipe() is used to stop piping data from a Readable Stream
  to a Writable Stream.

Example:

const fs = require("fs");

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(writeStream);

// Later, stop the connection
readStream.unpipe(writeStream);

Important:

pipe()
    ↓
Connect Readable → Writable

unpipe()
    ↓
Disconnect Readable → Writable


============================================================
2. pipeline()
============================================================

Q. What is pipeline()?

- pipeline() is used to connect multiple streams together and
  handle errors and cleanup more safely.

Example:

const fs = require("fs");
const { pipeline } = require("stream");

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

pipeline(
    readStream,
    writeStream,
    (err) => {
        if (err) {
            console.error("Pipeline failed:", err);
        } else {
            console.log("Pipeline completed.");
        }
    }
);

Flow:

Readable
   ↓
Transform
   ↓
Writable


Why pipeline() instead of only pipe()?

- pipe() connects streams.
- pipeline() connects streams AND provides centralized error
  handling and cleanup.

Interview point:

- pipeline() is generally preferred when building reliable
  multi-stream pipelines.


============================================================
3. finished()
============================================================

Q. What is finished()?

- finished() is used to know when a stream has finished or
  closed, or when an error has occurred.

Example:

const fs = require("fs");
const { finished } = require("stream");

const readStream = fs.createReadStream("input.txt");

finished(readStream, (err) => {

    if (err) {
        console.error("Stream ended with error:", err);
    } else {
        console.log("Stream finished.");
    }

});

Purpose:

finished()
    ↓
Monitor the lifecycle of a stream


Difference:

pipeline()
    → Connect multiple streams and handle the whole pipeline.

finished()
    → Monitor the completion/termination of one stream.


============================================================
4. STREAM BUFFER
============================================================

Q. What is a stream buffer?

- A stream buffer is temporary memory used to hold data while
  it is waiting to be processed, read, or written.

Example:

Readable Stream
      ↓
   Buffer
      ↓
Writable Stream


Why is a buffer needed?

Suppose the producer generates data faster than the consumer
can process it.

Producer
   ↓
Fast
   ↓
Buffer
   ↓
Slow
   ↓
Consumer

The buffer temporarily holds the data.

Important:

- Buffer is temporary storage.
- It helps streams handle differences in reading and writing
  speed.
- Streams use buffering to manage data efficiently.


============================================================
5. write() → false → drain
============================================================

Q. What happens when writableStream.write() returns false?

Example:

const fs = require("fs");

const writeStream =
    fs.createWriteStream("output.txt");

const canContinue =
    writeStream.write("Some large data...");

console.log(canContinue);


write()
   ↓
Returns true
   ↓
Stream can currently accept more data


OR


write()
   ↓
Returns false
   ↓
Internal buffer is full / reached its
highWaterMark
   ↓
STOP writing temporarily
   ↓
Wait for "drain"
   ↓
Continue writing


Example:

function writeData() {

    let canContinue = true;

    while (canContinue) {

        canContinue =
            writeStream.write("Some data\n");
    }

    writeStream.once("drain", () => {

        console.log("Buffer drained");

        writeData();

    });
}

Important:

write() returning false does NOT mean:

"Writing failed."

It means:

"Stop writing for now because the internal buffer is full."

When enough buffered data has been processed:

"drain"

event is emitted.

Then the application can continue writing.


============================================================
6. FLOWING MODE vs PAUSED MODE
============================================================

Readable streams can operate in two important modes:

1. Flowing mode
2. Paused mode


-------------------------
FLOWING MODE
-------------------------

- In flowing mode, data is automatically read from the stream
  and delivered through "data" events.

Example:

const readStream =
    fs.createReadStream("input.txt");

readStream.on("data", (chunk) => {

    console.log(chunk);

});


Flowing mode:

Stream
   ↓
Automatically reads data
   ↓
"data" event
   ↓
Application


Important:

- Adding a "data" listener generally causes a Readable stream
  to enter flowing mode.


-------------------------
PAUSED MODE
-------------------------

- In paused mode, data is not automatically flowing to the
  application.

- The application controls when data is read.

Example:

const readStream =
    fs.createReadStream("input.txt");

readStream.pause();

readStream.on("data", (chunk) => {

    console.log(chunk);

});

readStream.resume();


Important correction:

- Paused mode does NOT mean the stream can never receive data.
- It means data is not automatically flowing to the consumer.
- The application can control reading using methods such as
  read(), pause(), and resume().


Simple comparison:

Flowing mode:

Readable
   ↓
Automatic data flow
   ↓
"data"


Paused mode:

Readable
   ↓
Wait / controlled reading
   ↓
read()


============================================================
7. pipe() COMPLETE CONCEPT
============================================================

Q. What is pipe()?

- pipe() connects a Readable Stream to a Writable Stream.

Example:

const readStream =
    fs.createReadStream("input.txt");

const writeStream =
    fs.createWriteStream("output.txt");

readStream.pipe(writeStream);


Flow:

Input File
   ↓
Readable Stream
   ↓
pipe()
   ↓
Writable Stream
   ↓
Output File


Why pipe() is useful?

- Automatically transfers data in chunks.
- Helps avoid loading the entire file into memory.
- Works with backpressure.
- Makes stream connections simple.


============================================================
8. BACKPRESSURE
============================================================

Q. What is backpressure?

- Backpressure occurs when the Writable Stream cannot process
  incoming data as quickly as the Readable Stream produces it.

Example:

Readable
   ↓
Fast producer
   ↓
Writable
   ↓
Slow consumer


The Writable Stream's internal buffer starts filling.

When:

write() → false

the producer should temporarily stop writing.

Then:

buffer processes data
       ↓
"drain"
       ↓
producer continues


Therefore:

Backpressure
    ↓
Prevents a fast producer from overwhelming a slow consumer.


============================================================
9. pipe() AND BACKPRESSURE
============================================================

- pipe() automatically helps manage backpressure between the
  Readable and Writable streams.

Example:

readStream.pipe(writeStream);


Conceptually:

Readable
    ↓
pipe()
    ↓
Writable

If Writable becomes overloaded:

write()
    ↓
false
    ↓
Readable is slowed/paused as needed
    ↓
Writable processes buffered data
    ↓
"drain"
    ↓
Data flow continues


============================================================
10. pipe() vs pipeline()
============================================================

pipe():

- Connects streams.
- Simple and convenient.
- Handles backpressure.
- Error handling across multiple streams is less convenient.

pipeline():

- Connects multiple streams.
- Handles errors more reliably.
- Performs cleanup when the pipeline fails.
- Better suited for production stream pipelines.


Simple interview answer:

"pipe() connects streams, while pipeline() connects streams
with more robust error handling and cleanup."


============================================================
11. COMPLETE STREAM FLOW
============================================================

For a typical file-processing operation:

File
 ↓
Readable Stream
 ↓
Buffer
 ↓
pipe()
 ↓
Transform Stream
 ↓
Buffer
 ↓
Writable Stream
 ↓
File


If Writable becomes slow:

write()
 ↓
false
 ↓
Backpressure
 ↓
wait
 ↓
drain
 ↓
continue


If the pipeline fails:

pipeline()
 ↓
error handling
 ↓
cleanup


============================================================
12. IMPORTANT STREAM METHODS / CONCEPTS
============================================================

Readable:

- read()
- pause()
- resume()
- pipe()
- unpipe()

Writable:

- write()
- end()

Stream lifecycle / utilities:

- pipeline()
- finished()

Events:

Readable:

- data
- end
- error
- readable
- close

Writable:

- drain
- finish
- error
- close

Important concepts:

- Buffer
- highWaterMark
- Backpressure
- Flowing mode
- Paused mode


============================================================
13. INTERVIEW-READY SUMMARY
============================================================

Q. Explain Streams in Node.js.

- A Stream in Node.js is a mechanism for processing data
  incrementally instead of loading the entire data into memory.

- Node.js provides four main types of streams:

  1. Readable
  2. Writable
  3. Duplex
  4. Transform

- Readable streams read data.

- Writable streams write data.

- Duplex streams can both read and write.

- Transform streams are Duplex streams that transform data
  while it passes through them.

Example:

Readable
   ↓
Transform
   ↓
Writable


Important stream concepts:

- pipe()
    → connects streams.

- unpipe()
    → disconnects a previously piped destination.

- pipeline()
    → connects streams with robust error handling and cleanup.

- finished()
    → monitors stream completion/termination.

- Buffer
    → temporary memory used to hold stream data.

- Backpressure
    → prevents a fast producer from overwhelming a slow
      consumer.

- write() === false
    → stop/slow down writing temporarily.

- "drain"
    → indicates that the Writable stream can accept more data.

- Flowing mode
    → data automatically flows through "data" events.

- Paused mode
    → application controls when data is consumed.

============================================================
*/