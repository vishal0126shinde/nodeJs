/*
============================================================
NETWORKING — INTERVIEW CHECKLIST
============================================================

1. PROTOCOL
------------------------------------------------------------
- What is a protocol?
- Why do we need protocols?
- Protocol = standardized rules for communication.
- Examples:
    HTTP / HTTPS
    TCP
    UDP
    IP
    DNS
    FTP
    SMTP

------------------------------------------------------------
2. TCP/IP
------------------------------------------------------------
- What is TCP?
- What is IP?
- What is TCP/IP?
- TCP/IP is a protocol suite.
- IP → addressing and routing.
- TCP → reliable, ordered byte-stream transport.

IMPORTANT:
- TCP and IP are NOT the same thing.
- TCP works at the transport layer.
- IP works at the network/internet layer.

------------------------------------------------------------
3. TCP
------------------------------------------------------------
- TCP = Transmission Control Protocol.
- Connection-oriented.
- Reliable.
- Ordered byte-stream.
- Provides retransmission.
- Provides flow control.
- Provides congestion control.

IMPORTANT:
- TCP is NOT message-oriented.
- TCP provides a byte stream.
- TCP does not preserve application message boundaries.

------------------------------------------------------------
4. TCP THREE-WAY HANDSHAKE
------------------------------------------------------------

Client                         Server
  |                              |
  | -------- SYN --------------> |
  |                              |
  | <------ SYN-ACK ------------ |
  |                              |
  | -------- ACK --------------> |
  |                              |
  |       Connection established |
  |                              |

SYN
→ Synchronize / connection initiation.

SYN-ACK
→ Server acknowledges SYN and sends its own SYN.

ACK
→ Client acknowledges server's SYN.

------------------------------------------------------------
5. TCP RELIABILITY
------------------------------------------------------------
TCP uses mechanisms such as:

- Sequence numbers
- Acknowledgements
- Retransmission
- Checksum/error detection
- Ordered delivery

TCP handles:
    Packet loss
    Packet reordering
    Duplicate data

------------------------------------------------------------
6. TCP FLOW CONTROL
------------------------------------------------------------

Purpose:
- Protect the receiver.

Fast sender
    ↓
Slow receiver
    ↓
Flow control

TCP uses the receiver's advertised window to control
how much unacknowledged data can be sent.

------------------------------------------------------------
7. TCP CONGESTION CONTROL
------------------------------------------------------------

Purpose:
- Protect/respond to network congestion.

Flow control:
    → Protects receiver.

Congestion control:
    → Responds to network congestion.

IMPORTANT INTERVIEW DIFFERENCE.

------------------------------------------------------------
8. TCP vs UDP
------------------------------------------------------------

TCP:
- Connection-oriented
- Reliable
- Ordered
- Byte stream
- Retransmission
- Flow control
- Congestion control

UDP:
- Connectionless
- Datagram/message oriented
- No built-in reliability
- No built-in ordering
- Lower protocol overhead

------------------------------------------------------------
9. IP ADDRESS
------------------------------------------------------------

- Identifies a network interface/address.
- IPv4 → 32-bit.
- IPv6 → 128-bit.

Example IPv4:
192.168.1.10

Example IPv6:
2001:db8::1

------------------------------------------------------------
10. PORT
------------------------------------------------------------

- Identifies a logical service/application endpoint
  on a host.

Example:

192.168.1.10:3000

Common ports:

HTTP  → 80
HTTPS → 443
DNS   → 53
SSH   → 22

------------------------------------------------------------
11. SOCKET
------------------------------------------------------------

- Communication endpoint used by an application.
- Used to send and receive network data.

Conceptually:

IP + Port + Transport Protocol

Example:

TCP socket
192.168.1.10:3000

------------------------------------------------------------
12. DNS
------------------------------------------------------------

DNS = Domain Name System.

- Resolves domain names to IP addresses.

Example:

www.example.com
        ↓
    IP address

Why DNS?
- Humans remember domain names.
- Computers communicate using IP addresses.

------------------------------------------------------------
13. DNS RESOLUTION
------------------------------------------------------------

Typical flow:

Browser cache
      ↓
OS cache
      ↓
Recursive DNS resolver
      ↓
Root DNS
      ↓
TLD DNS
      ↓
Authoritative DNS
      ↓
DNS record / IP
      ↓
Resolver cache
      ↓
Client

IMPORTANT:
- Client normally asks a recursive resolver.
- Resolver performs the lookup on behalf of the client.

------------------------------------------------------------
14. ROOT DNS
------------------------------------------------------------

- Top of DNS hierarchy.
- Does not normally provide the final IP.
- Directs resolver toward the appropriate TLD.

Examples:

.com
.org
.net
.in

IMPORTANT:
- 13 logical root server identities: A-M.
- They are served by many physical instances using
  techniques such as anycast.

------------------------------------------------------------
15. TLD DNS
------------------------------------------------------------

TLD = Top-Level Domain.

Examples:

.com
.org
.net
.in

TLD servers:
- Know which authoritative name servers are responsible
  for domains under that TLD.

Example:

example.com
    ↓
.com TLD
    ↓
authoritative nameserver

------------------------------------------------------------
16. AUTHORITATIVE DNS
------------------------------------------------------------

- Contains authoritative DNS records for a domain/zone.
- Provides the authoritative answer for that zone.

Example:

www.example.com
       ↓
A record
       ↓
93.184.216.34

------------------------------------------------------------
17. DNS CACHE
------------------------------------------------------------

DNS responses may be cached by:

Browser
    ↓
OS
    ↓
Recursive resolver

Purpose:
- Reduce lookup time.
- Reduce DNS traffic.
- Avoid repeating complete resolution.

------------------------------------------------------------
18. DNS TTL
------------------------------------------------------------

TTL = Time To Live.

- Determines how long a DNS record can generally be
  cached by a resolver.

Example:

TTL = 300 seconds

After TTL expires:
- Cached record is considered stale.
- Resolver may need to query again.

------------------------------------------------------------
19. IMPORTANT DNS RECORDS
------------------------------------------------------------

A:
    Domain → IPv4

AAAA:
    Domain → IPv6

CNAME:
    Alias → another domain name

MX:
    Mail server information

TXT:
    Text/domain verification/policies

NS:
    Authoritative name servers

PTR:
    Reverse DNS

------------------------------------------------------------
20. FORWARD vs REVERSE DNS
------------------------------------------------------------

Forward DNS:

Domain
  ↓
IP

Reverse DNS:

IP
  ↓
Hostname

Reverse DNS commonly uses:

PTR record.

------------------------------------------------------------
21. DNS PORT
------------------------------------------------------------

Traditional DNS commonly uses:

UDP → 53
TCP → 53

Modern DNS-related technologies:

DoH → DNS over HTTPS
DoT → DNS over TLS

------------------------------------------------------------
22. HTTP
------------------------------------------------------------

HTTP = HyperText Transfer Protocol.

- Application-layer protocol.
- Used for client/server communication.
- Uses request/response model.

Client
  ↓
HTTP Request
  ↓
Server
  ↓
HTTP Response
  ↓
Client

------------------------------------------------------------
23. HTTP REQUEST
------------------------------------------------------------

Contains:

- Method
- Target/path
- Headers
- Optional body

Example:

GET /users HTTP/1.1
Host: example.com
Accept: application/json

------------------------------------------------------------
24. HTTP RESPONSE
------------------------------------------------------------

Contains:

- Status code
- Headers
- Optional body

Example:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Success"
}

------------------------------------------------------------
25. HTTP METHODS
------------------------------------------------------------

GET
→ Retrieve data.

POST
→ Submit data / commonly create a resource.

PUT
→ Replace a resource representation.

PATCH
→ Partially update a resource.

DELETE
→ Delete a resource.

HEAD
→ Similar to GET but without response body.

OPTIONS
→ Discover supported communication options.
→ Commonly involved in CORS preflight.

------------------------------------------------------------
26. HTTP STATUS CODES
------------------------------------------------------------

1xx → Informational
2xx → Success
3xx → Redirection
4xx → Client error
5xx → Server error

Important:

200 → OK
201 → Created
204 → No Content

301 → Moved Permanently
302 → Found
304 → Not Modified

400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
405 → Method Not Allowed
409 → Conflict
429 → Too Many Requests

500 → Internal Server Error
502 → Bad Gateway
503 → Service Unavailable

------------------------------------------------------------
27. HTTP HEADERS
------------------------------------------------------------

Headers contain metadata.

Important examples:

Content-Type
Authorization
Accept
Cache-Control
Content-Length
User-Agent
Host
Cookie
Set-Cookie

------------------------------------------------------------
28. HTTP BODY
------------------------------------------------------------

Body contains transferred data.

Examples:

JSON
HTML
Image
PDF
Video
etc.

------------------------------------------------------------
29. IS HTTP STATEFUL?
------------------------------------------------------------

HTTP itself is stateless.

Each request is independent from HTTP's perspective.

Applications can maintain state using:

- Cookies
- Sessions
- Tokens
- Database
- Cache

------------------------------------------------------------
30. HTTPS
------------------------------------------------------------

HTTPS = HTTP over TLS.

Conceptually:

HTTP
 ↓
TLS
 ↓
TCP
 ↓
IP

For HTTP/3:

HTTP/3
 ↓
QUIC
 ↓
UDP
 ↓
IP

------------------------------------------------------------
31. TLS
------------------------------------------------------------

TLS = Transport Layer Security.

TLS provides:

- Confidentiality
- Integrity
- Authentication

Modern HTTPS uses TLS.

Do not say modern HTTPS uses SSL.

SSL is obsolete.

------------------------------------------------------------
32. WHY HTTPS IS SECURE
------------------------------------------------------------

HTTPS provides:

1. Confidentiality
   → Encrypts communication.

2. Integrity
   → Helps detect modification of data in transit.

3. Authentication
   → Certificates help authenticate the server.

------------------------------------------------------------
33. TLS HANDSHAKE — HIGH LEVEL
------------------------------------------------------------

Client
  ↓
ClientHello
  ↓
Server
  ↓
ServerHello + Certificate
  ↓
Client verifies certificate
  ↓
Key agreement
  ↓
Shared session keys established
  ↓
Encrypted application data

IMPORTANT:
- TLS handshake is NOT the same as TCP three-way handshake.

TCP handshake:
    Establishes TCP connection.

TLS handshake:
    Establishes secure TLS communication.

------------------------------------------------------------
34. HTTP vs HTTPS
------------------------------------------------------------

HTTP:

- Application-layer protocol.
- Usually port 80.
- No TLS encryption.
- Data is not protected by TLS.

HTTPS:

- HTTP over TLS.
- Usually port 443.
- Provides confidentiality.
- Provides integrity protection.
- Provides server authentication.

IMPORTANT CORRECTION:

Do NOT say:

"HTTPS guarantees data cannot be modified."

Better:

"TLS provides integrity protection that allows
tampering in transit to be detected."

------------------------------------------------------------
35. HTTP/1.1
------------------------------------------------------------

Commonly:

HTTP/1.1
   ↓
TCP

Features:
- Persistent connections.
- Text-based HTTP message representation.
- Requests/responses over TCP connection.

------------------------------------------------------------
36. HTTP/2
------------------------------------------------------------

Commonly:

HTTP/2
   ↓
TCP
   ↓
IP

Important features:

- Binary framing
- Multiplexing
- Header compression
- Multiple streams over one TCP connection

Conceptually:

One TCP connection
    |
    +--- Stream 1
    |
    +--- Stream 2
    |
    +--- Stream 3

------------------------------------------------------------
37. HTTP/3
------------------------------------------------------------

HTTP/3:

HTTP/3
  ↓
QUIC
  ↓
UDP
  ↓
IP

Important:

HTTP/3 does NOT run directly on TCP.

It uses QUIC over UDP.

QUIC provides:
- Reliable delivery
- Stream multiplexing
- Connection migration
- TLS 1.3 integration

------------------------------------------------------------
38. WHY HTTP/3 USES UDP
------------------------------------------------------------

Important interview answer:

"HTTP/3 uses QUIC, and QUIC is implemented over UDP.
UDP provides a simple datagram transport, while QUIC
implements reliability, encryption, multiplexing and
other transport features itself.

This allows QUIC to avoid some limitations of TCP,
such as TCP-level head-of-line blocking across streams."

------------------------------------------------------------
39. HTTP vs TCP
------------------------------------------------------------

HTTP:
- Application layer.
- Defines request/response communication.
- Methods, headers, status codes, body.

TCP:
- Transport layer.
- Provides reliable ordered byte-stream transport.
- Handles retransmission, flow control and congestion
  control.

Simple:

HTTP:
    "What data are we communicating?"

TCP:
    "How do we reliably transport the bytes?"

------------------------------------------------------------
40. NODE.JS DNS
------------------------------------------------------------

Node.js module:

node:dns

Important APIs:

dns.lookup()
dns.resolve()

------------------------------------------------------------
41. dns.lookup()
------------------------------------------------------------

- Uses the operating system's name-resolution facilities.
- It may use configured OS mechanisms and local sources.

Example:

dns.lookup(
    "example.com",
    (err, address, family) => {
        console.log(address);
        console.log(family);
    }
);

------------------------------------------------------------
42. dns.resolve()
------------------------------------------------------------

- Performs DNS resolution using DNS servers.
- Allows querying specific DNS record types.

Example:

dns.resolve(
    "example.com",
    "A",
    (err, addresses) => {
        console.log(addresses);
    }
);

IMPORTANT INTERVIEW DIFFERENCE:

dns.lookup()
→ OS name-resolution facilities.

dns.resolve()
→ DNS query using configured DNS servers.

------------------------------------------------------------
43. node:net
------------------------------------------------------------

Node.js TCP networking module.

Used for:
- TCP servers
- TCP clients
- Socket communication

Example:

const net = require("node:net");

const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        console.log(data.toString());
    });

});

server.listen(3000);

------------------------------------------------------------
44. node:http
------------------------------------------------------------

Node.js HTTP module.

Used to create:
- HTTP servers
- HTTP clients

Example:

const http = require("node:http");

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Hello Node.js");

});

server.listen(3000);

------------------------------------------------------------
45. node:https
------------------------------------------------------------

Node.js HTTPS module.

Used to create HTTPS servers and clients.

HTTPS:

HTTP
 ↓
TLS
 ↓
TCP

It requires TLS configuration/certificates for an HTTPS
server.

------------------------------------------------------------
46. node:net vs node:http
------------------------------------------------------------

node:net:

Low-level TCP communication.

You work with:

- socket
- data
- connection
- close

node:http:

Higher-level HTTP communication.

You work with:

- request
- response
- method
- URL
- headers
- status code

------------------------------------------------------------
47. COMPLETE HTTPS REQUEST FLOW
------------------------------------------------------------

User enters:

https://www.example.com

        ↓

1. URL parsing

        ↓

2. DNS resolution

www.example.com
        ↓
IP address

        ↓

3. TCP connection

SYN
 ↓
SYN-ACK
 ↓
ACK

        ↓

4. TLS handshake

        ↓

5. Secure connection established

        ↓

6. HTTP request

GET / HTTP/1.1
Host: www.example.com

        ↓

7. Server processes request

        ↓

8. HTTP response

HTTP/1.1 200 OK

        ↓

9. Browser receives response

        ↓

10. Browser processes/renders resources

HTML
CSS
JavaScript
Images

------------------------------------------------------------
48. COMPLETE PROTOCOL STACK
------------------------------------------------------------

Traditional HTTPS:

Application
    ↓
HTTP
    ↓
TLS
    ↓
TCP
    ↓
IP

HTTP/3:

Application
    ↓
HTTP/3
    ↓
QUIC
    ↓
UDP
    ↓
IP

------------------------------------------------------------
49. MOST IMPORTANT INTERVIEW FLOW
------------------------------------------------------------

DNS:
    "Where is the server?"

IP:
    "Which network endpoint?"

Port:
    "Which service on that host?"

TCP:
    "How do we reliably transport bytes?"

TLS:
    "How do we secure the communication?"

HTTP:
    "How does the application communicate?"

HTTPS:
    "HTTP protected by TLS."

------------------------------------------------------------
50. VERY IMPORTANT INTERVIEW QUESTIONS
------------------------------------------------------------

Q. What is DNS?

Q. Why do we need DNS?

Q. What is a recursive DNS resolver?

Q. What is Root DNS?

Q. What is TLD DNS?

Q. What is Authoritative DNS?

Q. What is DNS caching?

Q. What is DNS TTL?

Q. Difference between A and AAAA?

Q. What is CNAME?

Q. What is MX?

Q. What is reverse DNS?

Q. What is TCP?

Q. Explain three-way handshake.

Q. What is SYN?

Q. What is SYN-ACK?

Q. Why is TCP reliable?

Q. What is flow control?

Q. What is congestion control?

Q. Is TCP message-oriented?

Q. TCP vs UDP?

Q. What is IP address?

Q. What is port?

Q. What is socket?

Q. What is HTTP?

Q. HTTP methods?

Q. HTTP status codes?

Q. HTTP headers?

Q. Is HTTP stateful or stateless?

Q. What is HTTPS?

Q. What is TLS?

Q. Why HTTPS?

Q. Explain TLS handshake.

Q. HTTP vs HTTPS?

Q. HTTP/1.1 vs HTTP/2?

Q. What is HTTP/3?

Q. Why does HTTP/3 use UDP?

Q. HTTP vs TCP?

Q. How does Node.js perform DNS lookup?

Q. dns.lookup() vs dns.resolve()?

Q. What is node:net?

Q. What is node:http?

Q. What is node:https?

------------------------------------------------------------
51. FINAL ONE-LINE REVISION
------------------------------------------------------------

Protocol
→ Rules for communication.

DNS
→ Resolves domain names.

IP
→ Provides addressing/routing.

Port
→ Identifies a service endpoint.

Socket
→ Communication endpoint.

TCP
→ Reliable ordered byte-stream transport.

UDP
→ Connectionless datagram transport.

TLS
→ Security layer providing confidentiality,
   integrity and authentication.

HTTP
→ Application request/response protocol.

HTTPS
→ HTTP over TLS.

node:dns
→ DNS APIs.

node:net
→ TCP networking.

node:http
→ HTTP networking.

node:https
→ HTTPS/TLS networking.

------------------------------------------------------------
52. INTERVIEW-READY ANSWER:
    "WHAT HAPPENS WHEN YOU ENTER HTTPS URL?"
------------------------------------------------------------

"When a user enters an HTTPS URL, the browser first
resolves the domain name through DNS and obtains an
IP address.

It then establishes the appropriate transport connection.
For traditional HTTPS over TCP, this involves the TCP
three-way handshake.

Next, TLS negotiation establishes a secure connection,
authenticates the server using its certificate, and
establishes cryptographic session keys.

The browser then sends an HTTP request over the secure
connection.

The server processes the request and returns an HTTP
response containing a status code, headers and optionally
a body.

Finally, the browser processes the response and renders
the required content."

============================================================
*/