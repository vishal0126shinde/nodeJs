/*
============================================================
# BUFFER
============================================================


Q. What is a Buffer in Node.js?

- A Buffer is a Node.js class used to work with raw binary data.

- A Buffer represents a sequence of bytes.

- Each byte contains a value from:

    0 → 255

- Buffers are especially useful when working with:

    - files
    - streams
    - TCP/UDP network data
    - sockets
    - images
    - audio
    - video
    - encrypted/compressed data
    - other binary data

Example:

    const buffer = Buffer.from("Hello");

    console.log(buffer);

Output:

    <Buffer 48 65 6c 6c 6f>


The values:

    48 65 6c 6c 6f

are hexadecimal representations of the bytes.


============================================================
# SIMPLE DEFINITION
============================================================

Q. What is a Buffer?

- A Buffer is a fixed-size sequence of bytes used by Node.js
  to store and manipulate binary data in memory.

Interview answer:

"Buffer is a Node.js class used to handle raw binary data.
It represents data as a sequence of bytes and is commonly
used with files, streams, sockets, and network operations."


============================================================
# WHY DO WE NEED BUFFER?
============================================================

JavaScript mainly works with:

    strings
    objects
    arrays
    numbers

But Node.js frequently works with binary data.

Examples:

    image
    video
    audio
    PDF
    TCP packet
    compressed data
    encrypted data

These are not simply JavaScript strings.

Therefore:

Binary data
    ↓
Buffer
    ↓
JavaScript application


Example:

File
 ↓
Operating System
 ↓
Buffer
 ↓
Node.js application


============================================================
# BUFFER IS A SEQUENCE OF BYTES
============================================================

A Buffer stores bytes.

One byte:

    8 bits

One byte can represent:

    0 → 255

Example:

    const buf = Buffer.from([65, 66, 67]);

    console.log(buf);

Output:

    <Buffer 41 42 43>


65 → A
66 → B
67 → C


============================================================
# BUFFER IS FIXED-SIZE
============================================================

Once a Buffer is created, its size cannot be changed.

Example:

    const buf = Buffer.alloc(10);

This creates:

    10 bytes

You cannot resize the same Buffer to:

    20 bytes

Instead, you create another Buffer.

Important:

- Buffer size is fixed.
- Buffer contents can be modified.
- Buffer length cannot be changed.


============================================================
# BUFFER IS MUTABLE
============================================================

Important interview correction:

A Buffer is NOT immutable.

Its size is fixed, but its contents are mutable.

Example:

    const buf = Buffer.from("ABC");

    buf[0] = 88;

    console.log(buf.toString());

Output:

    XBC


So:

    Buffer size     → fixed
    Buffer contents → mutable


============================================================
# IS BUFFER AN ARRAY?
============================================================

A Buffer behaves somewhat like an array of bytes, but it is
not a normal JavaScript Array.

Example:

    const buf = Buffer.from([10, 20, 30]);

    console.log(buf[0]);

Output:

    10


You can access bytes using indexes:

    buf[0]
    buf[1]
    buf[2]


But:

    Buffer !== Array


Buffer is a subclass of Uint8Array.


============================================================
# BUFFER AND UINT8ARRAY
============================================================

Important interview point:

- Buffer is built on top of Uint8Array.

Conceptually:

    Uint8Array
        ↑
      Buffer


Uint8Array represents unsigned 8-bit integers.

Therefore:

    Buffer
    ↓
    sequence of 8-bit unsigned values
    ↓
    0 - 255


Buffer provides additional Node.js-specific functionality
for handling binary data.


============================================================
# WHERE DOES BUFFER MEMORY LIVE?
============================================================

Buffers use memory outside the normal V8 JavaScript heap
for their byte storage.

This is often described as:

    external memory

The Buffer object itself is managed by JavaScript/V8, while
its underlying byte storage is allocated outside the normal
V8 heap.

Important:

Do not simply say:

    "Buffer is completely outside V8."

More accurate:

    "The Buffer's underlying byte storage is external to the
     normal V8 heap."


============================================================
# HOW TO CREATE A BUFFER
============================================================


There are several common ways.


------------------------------------------------------------
1. Buffer.from(string)
------------------------------------------------------------

Creates a Buffer from a string.

Example:

    const buf = Buffer.from("Hello");

    console.log(buf);

    console.log(buf.toString());


Output:

    <Buffer 48 65 6c 6c 6f>

    Hello


Default encoding:

    utf8


You can explicitly specify encoding:

    const buf = Buffer.from("Hello", "utf8");


------------------------------------------------------------
2. Buffer.from(array)
------------------------------------------------------------

Creates a Buffer from byte values.

Example:

    const buf = Buffer.from([65, 66, 67]);

    console.log(buf.toString());

Output:

    ABC


Each value represents one byte.


------------------------------------------------------------
3. Buffer.from(existingBuffer)
------------------------------------------------------------

Creates a new Buffer containing a copy of the existing
Buffer's data.

Example:

    const original = Buffer.from("Hello");

    const copy = Buffer.from(original);


Important:

This creates a separate Buffer containing copied data.


------------------------------------------------------------
4. Buffer.alloc(size)
------------------------------------------------------------

Creates a Buffer of the specified size.

Example:

    const buf = Buffer.alloc(10);

This creates:

    10 bytes

All bytes are initialized to:

    0


Example:

    console.log(buf);

Output conceptually:

    <Buffer 00 00 00 00 00 00 00 00 00 00>


------------------------------------------------------------
5. Buffer.alloc(size, fill)
------------------------------------------------------------

You can initialize the Buffer with a value.

Example:

    const buf = Buffer.alloc(5, "A");

Result:

    AAAAA


Another example:

    const buf = Buffer.alloc(5, 255);


============================================================
# Buffer.alloc() vs Buffer.allocUnsafe()
============================================================

Q. Difference between Buffer.alloc() and
   Buffer.allocUnsafe()?


Buffer.alloc():

    const buf = Buffer.alloc(10);

- Allocates 10 bytes.
- Initializes the memory to zero.
- Safer when you need initialized memory.

Buffer.allocUnsafe():

    const buf = Buffer.allocUnsafe(10);

- Allocates 10 bytes.
- Does NOT initialize the contents.
- It may contain old memory values.
- Can be faster because initialization is skipped.
- You MUST completely overwrite the buffer before exposing
  its contents.

Important security point:

Never send or expose uninitialized Buffer contents if they
have not been overwritten.


Interview answer:

"Buffer.alloc() creates a zero-filled Buffer, while
Buffer.allocUnsafe() creates an uninitialized Buffer that
can be faster but must be handled carefully."


============================================================
# BUFFER LENGTH
============================================================

Q. How do you get the size of a Buffer?

Use:

    buffer.length


Example:

    const buf = Buffer.from("Hello");

    console.log(buf.length);

Output:

    5


Important:

buffer.length represents the number of BYTES,
not necessarily the number of characters.


Example:

    const buf = Buffer.from("😀");

    console.log(buf.length);

The result is:

    4

because UTF-8 represents that character using 4 bytes.


============================================================
# Buffer.byteLength()
============================================================

Q. What is Buffer.byteLength()?

- Returns the number of bytes required to represent a string
  using the specified encoding.

Example:

    const size =
        Buffer.byteLength("Hello", "utf8");

    console.log(size);

Output:

    5


For Unicode:

    console.log(
        Buffer.byteLength("😀", "utf8")
    );

Output:

    4


Important difference:

    string.length
        → number of JavaScript characters/code units

    Buffer.byteLength()
        → number of bytes required for encoding


============================================================
# BUFFER INDEXING
============================================================

You can access individual bytes.

Example:

    const buf = Buffer.from("ABC");

    console.log(buf[0]);
    console.log(buf[1]);
    console.log(buf[2]);


Output:

    65
    66
    67


You can also modify bytes:

    buf[0] = 90;

    console.log(buf.toString());

Output:

    ZBC


============================================================
# CONVERT BUFFER TO STRING
============================================================

Use:

    buffer.toString()


Example:

    const buf = Buffer.from("Hello");

    console.log(buf.toString());

Output:

    Hello


You can specify encoding:

    buf.toString("utf8");

    buf.toString("hex");

    buf.toString("base64");


============================================================
# ENCODING
============================================================

Common Buffer encodings:

1. utf8
2. utf16le
3. latin1
4. ascii
5. base64
6. base64url
7. hex


------------------------------------------------------------
UTF-8
------------------------------------------------------------

Used for normal text and Unicode.

Example:

    const buf = Buffer.from("Hello 😀");

    console.log(buf.toString("utf8"));


------------------------------------------------------------
HEX
------------------------------------------------------------

Represents bytes using hexadecimal characters.

Example:

    const buf = Buffer.from("ABC");

    console.log(buf.toString("hex"));

Output:

    414243


------------------------------------------------------------
BASE64
------------------------------------------------------------

Represents binary data as Base64 text.

Example:

    const buf = Buffer.from("Hello");

    console.log(buf.toString("base64"));

Base64 is commonly used when binary data needs to be
represented as text.


============================================================
# BUFFER → BASE64
============================================================

Example:

    const fs = require("fs");

    const imageBuffer =
        fs.readFileSync("logo.png");

    const base64 =
        imageBuffer.toString("base64");


Flow:

Image
 ↓
Buffer
 ↓
Base64 string


Important:

Base64 does NOT make binary data smaller.

It converts binary data into a text representation.


============================================================
# BASE64 → BUFFER
============================================================

You can convert Base64 back to a Buffer.

Example:

    const base64 = "SGVsbG8=";

    const buf =
        Buffer.from(base64, "base64");

    console.log(buf.toString());

Output:

    Hello


============================================================
# BUFFER → HEX
============================================================

Example:

    const buf = Buffer.from("ABC");

    console.log(buf.toString("hex"));

Output:

    414243


============================================================
# HEX → BUFFER
============================================================

Example:

    const buf =
        Buffer.from("414243", "hex");

    console.log(buf.toString());

Output:

    ABC


============================================================
# Buffer.isBuffer()
============================================================

Q. How do you check whether a value is a Buffer?

Use:

    Buffer.isBuffer(value)


Example:

    const buf = Buffer.from("Hello");

    console.log(Buffer.isBuffer(buf));

Output:

    true


Example:

    console.log(Buffer.isBuffer("Hello"));

Output:

    false


============================================================
# Buffer.concat()
============================================================

Q. How do you combine multiple Buffers?

Use:

    Buffer.concat()


Example:

    const buf1 = Buffer.from("Hello ");
    const buf2 = Buffer.from("Node.js");

    const result =
        Buffer.concat([buf1, buf2]);

    console.log(result.toString());

Output:

    Hello Node.js


You can also specify the total length:

    Buffer.concat([buf1, buf2], totalLength)


============================================================
# buffer.copy()
============================================================

Q. How do you copy Buffer data into another Buffer?

Use:

    source.copy(target)


Example:

    const source =
        Buffer.from("Hello");

    const target =
        Buffer.alloc(5);

    source.copy(target);

    console.log(target.toString());

Output:

    Hello


General form:

    source.copy(
        target,
        targetStart,
        sourceStart,
        sourceEnd
    );


============================================================
# buffer.slice() vs buffer.subarray()
============================================================

Important interview topic.

Both can create a view over an existing Buffer's memory.

Example:

    const buf =
        Buffer.from("Hello");

    const part =
        buf.subarray(0, 2);

    console.log(part.toString());

Output:

    He


Important:

The returned Buffer shares memory with the original Buffer.

Example:

    const buf =
        Buffer.from("Hello");

    const part =
        buf.subarray(0, 2);

    part[0] = 88;

    console.log(buf.toString());


The original Buffer can also be affected because the memory
is shared.

For an independent copy:

    const copy =
        Buffer.from(buf.subarray(0, 2));


Interview point:

    subarray()
        → creates a view
        → shares underlying memory

    Buffer.from(...)
        → creates a copy


NOTE:

Buffer.slice() historically behaves as a view for Buffers,
rather than making an independent copy.

Therefore, do not assume:

    slice() = copy

For an independent copy, explicitly use:

    Buffer.from(buffer.slice(...))

or

    Buffer.from(buffer.subarray(...))


============================================================
# buffer.equals()
============================================================

Q. How do you check whether two Buffers contain
   the same bytes?

Use:

    buffer.equals(otherBuffer)


Example:

    const buf1 = Buffer.from("ABC");
    const buf2 = Buffer.from("ABC");

    console.log(buf1.equals(buf2));

Output:

    true


============================================================
# Buffer.compare()
============================================================

Q. What is Buffer.compare()?

- Compares two Buffers.

Example:

    const buf1 = Buffer.from("ABC");
    const buf2 = Buffer.from("ABD");

    console.log(
        Buffer.compare(buf1, buf2)
    );


Possible result:

    -1


Meaning:

    buf1 < buf2


Possible results:

    -1 → first Buffer is less
     0 → both are equal
     1 → first Buffer is greater


============================================================
# buffer.compare()
============================================================

A Buffer instance also provides:

    buf.compare(target)


Example:

    const buf1 = Buffer.from("ABC");
    const buf2 = Buffer.from("ABD");

    console.log(buf1.compare(buf2));


============================================================
# BUFFER AND FILE SYSTEM
============================================================

When you read a file without specifying an encoding:

    const fs = require("fs");

    const data =
        fs.readFileSync("file.txt");

The result is a Buffer.

Example:

    console.log(data);


If you specify:

    fs.readFileSync(
        "file.txt",
        "utf8"
    );


the result is a string.


Therefore:

Without encoding:

    File
      ↓
    Buffer


With encoding:

    File
      ↓
    String


============================================================
# BUFFER AND STREAMS
============================================================

Buffers and Streams are related, but they are NOT the same
thing.


Buffer:

- Represents data in memory.
- Holds bytes.
- Fixed-size.


Stream:

- Represents a mechanism for processing/transferring data
  incrementally.
- Data can arrive in chunks.


Example:

Large file
    ↓
Readable Stream
    ↓
Buffer / chunk
    ↓
Process
    ↓
Next chunk
    ↓
Buffer / chunk
    ↓
Process


Important:

A stream can deliver data in chunks, and those chunks may
be represented as Buffers.


============================================================
# BUFFER vs STREAM
============================================================

Buffer:

    Data storage
    ↓
    Holds bytes in memory


Stream:

    Data processing mechanism
    ↓
    Processes data incrementally


Simple example:

Buffer:

    "Here is the data currently in memory."


Stream:

    "Here is a mechanism for receiving/sending the data
     piece by piece."


============================================================
# BUFFER AND BACKPRESSURE
============================================================

Buffers are also involved in stream buffering.

Example:

Fast producer
    ↓
Writable Stream
    ↓
Internal Buffer
    ↓
Slow consumer


If the internal buffer becomes full:

    write()
       ↓
    false
       ↓
    Stop/slow writing
       ↓
    wait for "drain"
       ↓
    continue


This mechanism is called:

    Backpressure


Important:

The Buffer itself is NOT backpressure.

Buffer:

    temporary memory for data


Backpressure:

    mechanism that controls data flow when producer is faster
    than consumer.


============================================================
# BUFFER AND NETWORKING
============================================================

Buffers are heavily used in network programming.

Example:

TCP data
   ↓
Buffer
   ↓
Node.js application


Network data arrives as bytes.

Buffers allow Node.js to process those bytes efficiently.


============================================================
# BUFFER AND BINARY FILES
============================================================

Buffers are useful for:

    images
    PDFs
    videos
    audio
    ZIP files
    encrypted files
    compressed files


Example:

    const fs = require("fs");

    const image =
        fs.readFileSync("image.png");

    console.log(
        Buffer.isBuffer(image)
    );

Output:

    true


============================================================
# JSON AND BUFFER
============================================================

Q. Can a Buffer be converted to JSON?

Yes.

Buffer provides:

    toJSON()


Example:

    const buf =
        Buffer.from("ABC");

    console.log(
        JSON.stringify(buf)
    );


Node.js can represent the Buffer as an object containing
the Buffer type and byte data.

Conceptually:

    {
        type: "Buffer",
        data: [65, 66, 67]
    }


You can also call:

    buf.toJSON()


============================================================
# BUFFER AND JSON
============================================================

Important:

JSON is text-based.

Buffer contains binary bytes.

Therefore, when sending Buffer data through JSON, it usually
needs to be represented in a JSON-compatible form.

Common approaches:

    Buffer → Base64 string

or Node.js Buffer's JSON representation.


============================================================
# BUFFER MEMORY
============================================================

A Buffer stores raw byte data in memory.

Example:

    const buf =
        Buffer.alloc(1024);


This allocates:

    1024 bytes


1 KB approximately:

    1024 bytes


Important:

Creating very large Buffers consumes memory.

Therefore:

- Avoid unnecessarily loading huge files into a single Buffer.
- Prefer streams for large files.
- Process data incrementally when appropriate.


============================================================
# BUFFER POOL
============================================================

Node.js can use an internal memory pool for some small Buffer
allocations.

The purpose is to reduce the overhead of repeatedly allocating
small chunks of memory.

Conceptually:

Small allocations
      ↓
Buffer pool
      ↓
Reuse allocated memory


This is an internal optimization.

Interview answer:

"Node.js uses internal pooling for some small Buffer allocations
to reduce allocation overhead and improve performance."


============================================================
# BUFFER SECURITY
============================================================

Important:

Be careful with:

    Buffer.allocUnsafe()


Because the memory is not initialized.

Example:

    const buf =
        Buffer.allocUnsafe(100);


Do NOT assume the Buffer contains zeros.

You should overwrite the entire region before exposing it.

Safer default:

    Buffer.alloc(100)


============================================================
# BUFFER VS STRING
============================================================

Buffer:

- Binary data
- Sequence of bytes
- Mutable
- Fixed size
- Useful for I/O
- Useful for files and networking


String:

- Text data
- Unicode text representation
- Immutable
- Used primarily for textual data


Example:

Binary:

    Buffer.from([65, 66, 67])


Text:

    "ABC"


============================================================
# BUFFER VS ARRAY
============================================================

Array:

- General-purpose JavaScript collection.
- Can contain different data types.
- Dynamic size.


Buffer:

- Specialized binary-data structure.
- Contains bytes.
- Fixed size.
- Optimized for I/O and binary operations.


Example:

Array:

    [10, "Hello", true]


Buffer:

    <Buffer 0a ...>


============================================================
# BUFFER VS UINT8ARRAY
============================================================

Uint8Array:

- Standard JavaScript typed array.
- Stores unsigned 8-bit integers.


Buffer:

- Node.js-specific binary data abstraction.
- Built on Uint8Array.
- Provides additional methods useful for Node.js I/O.


Interview answer:

"Buffer is a Node.js binary-data abstraction built on top of
Uint8Array, with additional APIs for Node.js I/O operations."


============================================================
# COMMON BUFFER METHODS
============================================================

Creation:

    Buffer.from()
    Buffer.alloc()
    Buffer.allocUnsafe()


Inspection:

    Buffer.isBuffer()
    Buffer.byteLength()


Conversion:

    buffer.toString()


Combination:

    Buffer.concat()


Comparison:

    Buffer.compare()
    buffer.compare()
    buffer.equals()


Copying:

    buffer.copy()


Memory views:

    buffer.slice()
    buffer.subarray()


Properties:

    buffer.length


JSON:

    buffer.toJSON()


============================================================
# IMPORTANT BUFFER ENCODINGS
============================================================

1. utf8

- Most common text encoding.
- Supports Unicode.

2. utf16le

- UTF-16 little-endian encoding.

3. latin1

- One-byte encoding.

4. ascii

- ASCII-compatible encoding behavior.

5. hex

- Converts bytes to hexadecimal text.

6. base64

- Converts binary data to Base64 text.

7. base64url

- URL-safe Base64 representation.


============================================================
# COMMON INTERVIEW TRAPS
============================================================

Q. Is Buffer mutable?

YES.

Buffer contents can be modified.

But:

Buffer size is fixed.


------------------------------------------------------------

Q. Is Buffer an Array?

NO.

It behaves similarly in some ways, but Buffer is not a normal
JavaScript Array.

Buffer is based on Uint8Array.


------------------------------------------------------------

Q. Is Buffer only used for files?

NO.

Buffers are used for:

    files
    streams
    sockets
    network data
    images
    audio
    video
    binary protocols


------------------------------------------------------------

Q. Is Buffer permanent storage?

NO.

Buffer is an in-memory data structure.

For permanent storage, data must be written to:

    file
    database
    object storage
    etc.


------------------------------------------------------------

Q. Does Buffer always contain text?

NO.

A Buffer contains bytes.

Those bytes may represent:

    text
    image
    audio
    video
    encrypted data
    compressed data
    protocol data


------------------------------------------------------------

Q. Does Buffer.allocUnsafe() mean the Buffer is unsafe
   to use?

Not necessarily.

It means the memory is uninitialized.

It can be used safely if you completely overwrite the relevant
memory before exposing it.


------------------------------------------------------------

Q. Does buffer.length return character count?

NO.

It returns byte count.


Example:

    const buf =
        Buffer.from("😀");

    buf.length

returns:

    4


because UTF-8 uses 4 bytes for that character.


============================================================
# BUFFER COMPLETE FLOW
============================================================

Example: Reading a large file


Large File
    ↓
Readable Stream
    ↓
Chunks
    ↓
Buffers
    ↓
Application processing
    ↓
Writable Stream
    ↓
Output File


If the Writable side is slower:

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


============================================================
# BUFFER vs STREAM — INTERVIEW ANSWER
============================================================

Q. What is the difference between Buffer and Stream?

Answer:

"A Buffer is an in-memory data structure used to store a fixed
sequence of bytes, while a Stream is a mechanism for processing
data incrementally over time.

Buffers hold data, whereas streams handle the flow of data.

Streams commonly use Buffers or other chunk representations
when processing binary data."


============================================================
# INTERVIEW-READY FINAL ANSWER
============================================================

Q. What is Buffer in Node.js?

Answer:

"Buffer is a built-in Node.js class used to handle raw binary
data. It represents a fixed-size sequence of bytes and is
commonly used for file I/O, streams, sockets, and network
operations.

Unlike a normal JavaScript string, a Buffer allows Node.js to
work directly with binary data. Buffers are mutable in content
but fixed in size.

Node.js provides methods such as Buffer.from(), Buffer.alloc(),
Buffer.allocUnsafe(), Buffer.concat(), Buffer.byteLength(), and
Buffer.isBuffer() for creating and working with Buffers.

Buffers are especially important with Streams because stream
data is often processed in chunks, allowing Node.js to handle
large amounts of data efficiently without loading everything
into memory at once."


============================================================
# MOST IMPORTANT POINTS TO REMEMBER
============================================================

Buffer:

    ↓
Binary data
    ↓
Sequence of bytes
    ↓
0 - 255 per byte
    ↓
Fixed size
    ↓
Mutable contents
    ↓
Used for I/O
    ↓
Files / Streams / Network
    ↓
Built on Uint8Array


Creation:

    Buffer.from()
    Buffer.alloc()
    Buffer.allocUnsafe()


Important methods:

    Buffer.byteLength()
    Buffer.isBuffer()
    Buffer.concat()
    Buffer.compare()

    buffer.toString()
    buffer.copy()
    buffer.equals()
    buffer.compare()

    buffer.slice()
    buffer.subarray()


Important concepts:

    Buffer
    Stream
    Chunk
    Backpressure
    highWaterMark
    drain
    Binary data
    Encoding
    Uint8Array


============================================================
# ONE-LINE INTERVIEW DEFINITION
============================================================

"Buffer is Node.js's built-in byte-oriented data structure for
efficiently handling raw binary data in memory, especially during
file, stream, and network I/O."

*/