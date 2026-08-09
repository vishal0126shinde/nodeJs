/*
# Encoding in Node.js

Q. What is Encoding in Node.js?

- Encoding is the way data is represented or converted between:
  - human-readable text
  - binary data (bytes)

- Node.js commonly uses encoding options when working with:
  - fs.readFile()
  - fs.writeFile()
  - fs.appendFile()
  - Buffer
  - streams
  - strings and binary data

- Example:

  const fs = require("fs");

  const data = fs.readFileSync("demo.txt", "utf8");

- Here:
    "utf8" is the encoding.

- If you don't provide an encoding to many fs methods such as
  fs.readFileSync(), Node.js returns a Buffer instead of a string.

  const data = fs.readFileSync("demo.txt");

  console.log(data);

  // Output:
  // <Buffer 48 65 6c 6c 6f ...>

- If you provide "utf8":

  const data = fs.readFileSync("demo.txt", "utf8");

  console.log(data);

  // Output:
  // Hello Node.js

------------------------------------------------------------
1. UTF-8
------------------------------------------------------------

- UTF-8 stands for:
  "8-bit Unicode Transformation Format"

- It is the most commonly used text encoding in Node.js.

- UTF-8 can represent characters from almost all writing systems,
  including:
  - English
  - Marathi
  - Hindi
  - Chinese
  - Arabic
  - emojis
  - symbols

- Example:

  const fs = require("fs");

  fs.writeFileSync(
    "demo.txt",
    "Hello Vishal 😊",
    "utf8"
  );

  const data = fs.readFileSync("demo.txt", "utf8");

  console.log(data);

  // Hello Vishal 😊

- UTF-8 uses a variable number of bytes for characters.

  English character:
  A → 1 byte

  Many other Unicode characters:
  → multiple bytes

- UTF-8 is generally the recommended encoding for text files.

------------------------------------------------------------
2. ASCII
------------------------------------------------------------

- ASCII stands for:
  "American Standard Code for Information Interchange"

- It represents a limited set of characters.

- Traditional ASCII uses 7 bits and represents 128 characters.

- It includes:
  - A-Z
  - a-z
  - 0-9
  - punctuation
  - control characters

- Example:

  const buffer = Buffer.from("Hello", "ascii");

  console.log(buffer);

- ASCII is mainly useful when working with basic English characters.

- Important:

  ASCII cannot represent all Unicode characters such as:

  😊
  नमस्कार
  मराठी

- Therefore, UTF-8 is normally preferred for modern text.

------------------------------------------------------------
3. BASE64
------------------------------------------------------------

- Base64 is an encoding used to represent binary data as text.

- It is commonly used when binary data needs to be transferred
  through systems that expect text.

- Examples:
  - images
  - files
  - tokens
  - binary data
  - data URLs

- Example:

  const buffer = Buffer.from("Hello");

  const encoded = buffer.toString("base64");

  console.log(encoded);

  // SGVsbG8=

- To convert Base64 back:

  const decoded = Buffer.from(encoded, "base64");

  console.log(decoded.toString("utf8"));

  // Hello

- Important:

  Base64 is NOT encryption.

  It only converts binary data into a text representation.

------------------------------------------------------------
4. HEX
------------------------------------------------------------

- Hex stands for hexadecimal.

- It represents binary data using hexadecimal characters:

  0-9
  a-f

- Each byte is represented using two hexadecimal characters.

- Example:

  const buffer = Buffer.from("Hello");

  console.log(buffer.toString("hex"));

  // 48656c6c6f

- Decode it:

  const decoded = Buffer.from("48656c6c6f", "hex");

  console.log(decoded.toString("utf8"));

  // Hello

- Hex is commonly useful for:
  - debugging binary data
  - hashes
  - cryptographic data representation
  - byte-level operations

- Important:

  Hex is an encoding/representation, NOT encryption.

------------------------------------------------------------
5. LATIN1
------------------------------------------------------------

- latin1 is also known as ISO-8859-1.

- It represents characters using one byte per character.

- It can represent values from 0 to 255.

- Example:

  const buffer = Buffer.from("Hello", "latin1");

  console.log(buffer.toString("latin1"));

  // Hello

- latin1 is useful when working with data that is specifically
  encoded using a single-byte character encoding.

- It should not be confused with UTF-8.

- UTF-8 can represent a very large range of Unicode characters,
  while latin1 is limited to a single-byte character set.

------------------------------------------------------------
6. UCS2
------------------------------------------------------------

- UCS-2 is a character encoding based on 16-bit code units.

- In Node.js Buffer APIs, "ucs2" and "ucs-2" are aliases for
  "utf16le".

- Example:

  const buffer = Buffer.from("Hello", "ucs2");

  console.log(buffer.toString("ucs2"));

  // Hello

- It is useful when dealing with data represented using
  UTF-16-style code units.

- Important:

  In modern Node.js, when you see:

  "ucs2"

  you can generally think of it as:

  "utf16le"

------------------------------------------------------------
7. UTF-16LE
------------------------------------------------------------

- UTF-16LE means:
  "UTF-16 Little Endian"

- It represents text using UTF-16 code units stored in
  little-endian byte order.

- Node.js supports:

  "utf16le"

- Example:

  const buffer = Buffer.from("Hello", "utf16le");

  console.log(buffer.toString("utf16le"));

  // Hello

- "ucs2" is an alias for "utf16le" in Node.js Buffer APIs.

- UTF-16LE can represent Unicode text, although UTF-8 is usually
  preferred for general text files and web data.

------------------------------------------------------------
8. BINARY
------------------------------------------------------------

- "binary" in Node.js is an alias for "latin1" in Buffer/string
  encoding APIs.

- Example:

  const buffer = Buffer.from("Hello", "binary");

  console.log(buffer.toString("binary"));

  // Hello

- Important:

  "binary" does NOT mean that the data is encrypted or specially
  protected.

- In Node.js Buffer encoding terminology:

  "binary" → "latin1"

- Therefore, when you see:

  buffer.toString("binary")

  it is effectively using latin1-style interpretation.

------------------------------------------------------------
# IMPORTANT DIFFERENCE

                Encoding       Main Purpose

  UTF-8       → General Unicode text
  ASCII       → Basic English characters
  Base64      → Binary data represented as text
  Hex         → Bytes represented as hexadecimal text
  Latin1      → Single-byte character representation
  UCS2        → UTF-16LE-style encoding
  UTF-16LE    → UTF-16 text in little-endian format
  Binary      → Alias for latin1 in Node.js Buffer APIs


------------------------------------------------------------
# Text Encoding vs Binary Representation
------------------------------------------------------------

- It is important to understand that not every encoding above
  serves exactly the same purpose.

- UTF-8, ASCII, Latin1, UCS2 and UTF-16LE are character encodings.

- Base64 and Hex are representations of binary data as text.

- Example:

  "Hello"

      ↓ UTF-8

  bytes

      ↓ Base64

  "SGVsbG8="

      ↓ Hex

  "48656c6c6f"


------------------------------------------------------------
# Encoding with fs.readFile()
------------------------------------------------------------

- Without encoding:

  const data = fs.readFileSync("demo.txt");

  console.log(data);

- Node.js returns a Buffer.

- With UTF-8:

  const data = fs.readFileSync("demo.txt", "utf8");

  console.log(data);

- Node.js returns a string.

------------------------------------------------------------
# Encoding with fs.writeFile()
------------------------------------------------------------

- You can specify the encoding while writing text.

  fs.writeFileSync(
    "demo.txt",
    "Hello Node.js",
    "utf8"
  );

- Here:

  "Hello Node.js"
        ↓
      UTF-8
        ↓
      bytes
        ↓
    demo.txt

------------------------------------------------------------
# Buffer and Encoding
------------------------------------------------------------

- Node.js uses Buffer heavily when working with binary data.

- A Buffer stores raw bytes.

- Encoding tells Node.js how those bytes should be interpreted
  as text.

- Example:

  const buffer = Buffer.from("Hello", "utf8");

  console.log(buffer);

  // <Buffer 48 65 6c 6c 6f>

- Convert Buffer back into text:

  console.log(buffer.toString("utf8"));

  // Hello


------------------------------------------------------------
# Important Interview Point
------------------------------------------------------------

- Buffer = stores bytes.

- Encoding = tells Node.js how to convert/interpret those bytes
  as characters or text.

- Example:

  Buffer
    ↓
  toString("utf8")
    ↓
  String


------------------------------------------------------------
# Most Commonly Used Encoding

- In real Node.js applications, UTF-8 is the most common encoding
  when working with normal text.

- Example:

  fs.readFile("file.txt", "utf8", callback);

  fs.writeFile("file.txt", "Hello", "utf8", callback);

  fs.appendFile("file.txt", "Hello", "utf8", callback);

- For binary files such as images, PDFs, videos, etc., you
  generally work with Buffer/streams rather than converting the
  entire file to UTF-8 text.


------------------------------------------------------------
# Interview-Ready Answer

Q. What are the common encodings available in Node.js?

- Node.js supports several encodings for converting between
  strings and binary data.

- Common encodings include:

  1. UTF-8   → Unicode text
  2. ASCII   → Basic ASCII characters
  3. Base64  → Binary data represented as text
  4. Hex     → Bytes represented in hexadecimal
  5. Latin1  → Single-byte character encoding
  6. UCS2    → Alias for UTF-16LE in Node.js Buffer APIs
  7. UTF-16LE → UTF-16 little-endian encoding
  8. Binary  → Alias for latin1 in Node.js Buffer APIs

- UTF-8 is generally the most commonly used encoding for normal
  text, while Buffer and streams are preferred for handling
  binary files.

------------------------------------------------------------
# VERY IMPORTANT NOTES

1. Base64 is NOT encryption.
2. Hex is NOT encryption.
3. Binary is NOT encryption.
4. Buffer stores raw bytes.
5. Encoding tells Node.js how to interpret or convert those bytes.
6. "binary" is an alias for "latin1" in Node.js Buffer APIs.
7. "ucs2" is an alias for "utf16le" in Node.js Buffer APIs.
8. UTF-8 is generally preferred for normal text.
*/