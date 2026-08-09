/*
============================================================
# DNS, TCP, HTTP & HTTPS
============================================================


============================================================
# 1. DNS
============================================================

Q. What is DNS?

- DNS stands for Domain Name System.

- DNS is a distributed naming system that translates
  human-readable domain names into IP addresses.

Example:

www.google.com
      ↓
142.x.x.x

Humans remember:

www.google.com

Computers communicate using:

IP address

------------------------------------------------------------

Simple definition:

"DNS is the system that resolves domain names into IP
addresses so clients can locate servers on a network."

============================================================
# WHY DO WE NEED DNS?
============================================================

Without DNS:

User would need to remember:

142.250.x.x

Instead of:

www.google.com

DNS provides:

Domain Name
     ↓
IP Address

============================================================
# DNS IS NOT JUST DOMAIN → IP
============================================================

DNS can store different types of records.

Important records:

A
AAAA
CNAME
MX
TXT
NS
PTR
SOA

------------------------------------------------------------
# A RECORD
------------------------------------------------------------

- Maps a domain name to an IPv4 address.

Example:

example.com
    ↓
93.184.216.34

------------------------------------------------------------
# AAAA RECORD
------------------------------------------------------------

- Maps a domain name to an IPv6 address.

Example:

example.com
    ↓
IPv6 address

------------------------------------------------------------
# CNAME RECORD
------------------------------------------------------------

- Creates an alias from one domain name to another
  domain name.

Example:

www.example.com
      ↓
example.com

------------------------------------------------------------
# MX RECORD
------------------------------------------------------------

- Specifies mail servers responsible for receiving email
  for a domain.

Example:

example.com
      ↓
mail.example.com

------------------------------------------------------------
# TXT RECORD
------------------------------------------------------------

- Stores text information associated with a domain.

Commonly used for:

- domain verification
- SPF
- DKIM-related configuration
- other domain policies

------------------------------------------------------------
# NS RECORD
------------------------------------------------------------

- Specifies the authoritative name servers for a domain.

------------------------------------------------------------
# PTR RECORD
------------------------------------------------------------

- Used for reverse DNS.

IP address
    ↓
hostname

This is the opposite direction of normal:

hostname
    ↓
IP address

============================================================
# DNS RESOLUTION
============================================================

Q. How does DNS resolution work?

Suppose the user enters:

https://www.example.com

The browser needs the IP address of:

www.example.com

------------------------------------------------------------

Step 1:

Browser checks its DNS-related cache.

        ↓

Step 2:

Operating system may have cached information.

        ↓

Step 3:

If not available, the system sends the query to a
recursive DNS resolver.

Examples:

ISP resolver
Google Public DNS
Cloudflare DNS

        ↓

Step 4:

Recursive resolver looks for the answer.

        ↓

Step 5:

It may query the Root DNS server.

        ↓

Step 6:

Root DNS directs the resolver toward the appropriate
TLD server.

Example:

.com

        ↓

Step 7:

TLD server directs the resolver to the authoritative
name server for the domain.

        ↓

Step 8:

Authoritative DNS server returns the DNS record.

Example:

www.example.com
       ↓
93.184.216.34

        ↓

Step 9:

Recursive resolver caches the result according to
the record's TTL.

        ↓

Step 10:

The client receives the IP address.

============================================================
# DNS HIERARCHY
============================================================

                    Root DNS
                       |
                       ↓
                  TLD DNS
                 (.com/.org)
                       |
                       ↓
             Authoritative DNS
                       |
                       ↓
                 DNS Record
                       |
                       ↓
                  IP Address

============================================================
# ROOT DNS SERVER
============================================================

- Root DNS servers are at the top of the DNS hierarchy.

- They do not normally provide the final IP address for
  every domain.

- They direct queries toward the appropriate TLD servers.

Examples:

.com
.org
.net
.in

------------------------------------------------------------

Important:

There are 13 logical root server identities:

A through M

These are served by many physical instances around
the world using anycast.

So:

13 logical identities

does NOT mean:

13 physical machines.

============================================================
# TLD DNS SERVER
============================================================

TLD = Top-Level Domain

Examples:

.com
.org
.net
.in
.io

The TLD server knows which authoritative name servers
are responsible for domains under that TLD.

Example:

example.com

.com TLD
    ↓
authoritative nameserver for example.com

============================================================
# AUTHORITATIVE DNS SERVER
============================================================

- The authoritative DNS server contains the DNS records
  for the domain.

Example:

www.example.com
       ↓
A record
       ↓
93.184.216.34

It is the authoritative source for the DNS information
for that zone.

============================================================
# RECURSIVE DNS RESOLVER
============================================================

This is an important missing concept.

The client normally asks a recursive resolver.

Example:

Browser
   ↓
Recursive Resolver
   ↓
Root
   ↓
TLD
   ↓
Authoritative DNS

The recursive resolver performs the DNS lookup work
on behalf of the client.

It can also cache responses.

============================================================
# DNS CACHE
============================================================

DNS results are cached to avoid repeatedly performing
the complete lookup.

Possible caching locations include:

Browser
   ↓
Operating System
   ↓
DNS Resolver

If a valid cached result exists:

Domain
   ↓
Cached IP
   ↓
No complete DNS lookup required

============================================================
# DNS TTL
============================================================

TTL = Time To Live

- DNS records have a TTL that determines how long a
  resolver may cache the record.

Example:

TTL = 300 seconds

The resolver can generally cache the answer for that
period.

After the cached value expires:

Another DNS lookup may be required.

============================================================
# FORWARD DNS vs REVERSE DNS
============================================================

Forward DNS:

Domain
   ↓
IP address

Example:

example.com
   ↓
93.184.216.34

Reverse DNS:

IP address
   ↓
Domain/hostname

Reverse DNS commonly uses:

PTR record

============================================================
# DNS PORT
============================================================

DNS commonly uses:

UDP port 53

TCP port 53

UDP is commonly used for normal DNS queries because
it has lower overhead.

TCP can be used when required, such as for larger
responses or DNS operations that require TCP.

Modern DNS-related technologies can also use DNS over
HTTPS (DoH) or DNS over TLS (DoT).

============================================================
# DNS OVER HTTPS (DoH)
============================================================

DoH = DNS over HTTPS

DNS queries are transported using HTTPS.

Conceptually:

Application
    ↓
HTTPS
    ↓
DNS Resolver

============================================================
# DNS OVER TLS (DoT)
============================================================

DoT = DNS over TLS

DNS queries are transported over a TLS-protected
connection.

Commonly:

TCP
 ↓
TLS
 ↓
DNS

============================================================
# DNS SUMMARY
============================================================

DNS:

Domain
 ↓
Recursive Resolver
 ↓
Root
 ↓
TLD
 ↓
Authoritative DNS
 ↓
IP Address

============================================================
# 2. IP ADDRESS
============================================================

Q. What is an IP address?

- IP stands for Internet Protocol.

- An IP address identifies a network interface/address
  used for communication over an IP network.

Two major versions:

IPv4
IPv6

------------------------------------------------------------
# IPv4
------------------------------------------------------------

Example:

192.168.1.10

IPv4 uses:

32 bits

------------------------------------------------------------
# IPv6
------------------------------------------------------------

Example:

2001:db8::1

IPv6 uses:

128 bits

============================================================
# 3. PORT
============================================================

Q. What is a port?

- A port identifies a logical communication endpoint
  associated with a process/service on a host.

Example:

IP:

192.168.1.10

Port:

3000

Together:

192.168.1.10:3000

This tells the network:

Host → 192.168.1.10
Service endpoint → port 3000

------------------------------------------------------------

Common ports:

HTTP
→ 80

HTTPS
→ 443

DNS
→ 53

SSH
→ 22

============================================================
# 4. SOCKET
============================================================

Q. What is a socket?

A socket is a communication endpoint used by applications
to send and receive data over a network.

Conceptually:

IP + Port + Transport Protocol

Example:

TCP socket:

192.168.1.10:3000

A Node.js TCP server can listen on a port and accept
connections from clients.

============================================================
# 5. TCP
============================================================

Q. What is TCP?

TCP stands for:

Transmission Control Protocol.

TCP is a connection-oriented transport-layer protocol
that provides reliable, ordered delivery of a byte stream.

Simple definition:

"TCP establishes a connection between two endpoints and
provides reliable, ordered delivery of data."

============================================================
# WHY TCP?
============================================================

Networks can experience:

- packet loss
- duplication
- reordering
- congestion

TCP provides mechanisms for:

- reliable delivery
- ordering
- retransmission
- flow control
- congestion control

============================================================
# TCP CONNECTION
============================================================

Before normal TCP data transfer:

Client
   |
   | SYN
   ↓
Server
   |
   | SYN-ACK
   ↓
Client
   |
   | ACK
   ↓
Connection established

This is called:

TCP three-way handshake.

============================================================
# TCP THREE-WAY HANDSHAKE
============================================================

1. SYN

Client asks:

"Can we establish a connection?"

        ↓

2. SYN-ACK

Server responds:

"Yes, I received your request and I'm ready."

        ↓

3. ACK

Client confirms:

"Confirmed."

        ↓

TCP connection established.

============================================================
# TCP DATA FLOW
============================================================

Application
    ↓
TCP
    ↓
IP
    ↓
Network
    ↓
TCP
    ↓
Application

============================================================
# TCP IS A BYTE STREAM
============================================================

Important interview point:

TCP does NOT preserve application-level message boundaries.

If an application sends:

"Hello"
"World"

The receiver might observe bytes in a different grouping,
such as:

"Hel"
"loWo"
"rld"

The TCP stream preserves byte order, not message boundaries.

Applications need their own framing/protocol if they need
message boundaries.

============================================================
# TCP RELIABILITY
============================================================

TCP uses mechanisms such as:

Sequence numbers
    ↓
Acknowledgements
    ↓
Retransmission
    ↓
Ordered byte stream

If data is lost:

TCP can retransmit it.

============================================================
# TCP FLOW CONTROL
============================================================

Flow control prevents a fast sender from overwhelming
a receiver.

Sender
  ↓
TCP
  ↓
Receiver

Receiver advertises how much data it can currently accept.

============================================================
# TCP CONGESTION CONTROL
============================================================

Congestion control helps TCP avoid overwhelming the network.

It adjusts transmission behavior based on network
conditions.

Important distinction:

Flow control
→ protects the receiver.

Congestion control
→ responds to network congestion.

============================================================
# TCP CONNECTION TERMINATION
============================================================

A TCP connection is normally closed using a termination
exchange involving FIN and ACK messages.

Conceptually:

Client
   |
   | FIN
   ↓
Server
   |
   | ACK
   ↓
Server
   |
   | FIN
   ↓
Client
   |
   | ACK
   ↓
Connection closed

============================================================
# TCP vs UDP
============================================================

TCP:

- Connection-oriented
- Reliable
- Ordered byte stream
- Retransmission
- Flow control
- Congestion control

UDP:

- Connectionless
- No built-in delivery guarantee
- No ordering guarantee
- Message/datagram oriented
- Lower protocol overhead

============================================================
# NODE.JS TCP
============================================================

Node.js provides TCP networking through:

node:net

Example:

const net = require("node:net");

const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        console.log(data.toString());
    });

});

server.listen(3000, () => {
    console.log("TCP server running");
});

------------------------------------------------------------

Important:

`net.Socket` represents a TCP socket.

============================================================
# TCP SERVER FLOW IN NODE.JS
============================================================

Client
   ↓
TCP connection
   ↓
net.Server
   ↓
socket
   ↓
"data" event
   ↓
Application

============================================================
# 6. HTTP
============================================================

Q. What is HTTP?

HTTP stands for:

HyperText Transfer Protocol.

HTTP is an application-layer protocol used for
communication between clients and servers.

Example:

Browser
   ↓
HTTP Request
   ↓
Server
   ↓
HTTP Response
   ↓
Browser

============================================================
# HTTP REQUEST
============================================================

An HTTP request contains:

1. Method
2. Target/URL/path
3. Headers
4. Optional body

Example:

GET /users HTTP/1.1
Host: example.com
Accept: application/json

============================================================
# HTTP RESPONSE
============================================================

An HTTP response contains:

1. Status code
2. Headers
3. Optional body

Example:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Success"
}

============================================================
# HTTP METHODS
============================================================

Common methods:

GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS

------------------------------------------------------------
# GET
------------------------------------------------------------

Used to retrieve data.

Example:

GET /users

------------------------------------------------------------
# POST
------------------------------------------------------------

Used commonly to submit data or create a resource.

Example:

POST /users

Body:

{
    "name": "Vishal"
}

------------------------------------------------------------
# PUT
------------------------------------------------------------

Used commonly to replace a resource representation.

Example:

PUT /users/10

------------------------------------------------------------
# PATCH
------------------------------------------------------------

Used commonly to partially update a resource.

Example:

PATCH /users/10

------------------------------------------------------------
# DELETE
------------------------------------------------------------

Used to delete a resource.

Example:

DELETE /users/10

------------------------------------------------------------
# HEAD
------------------------------------------------------------

Similar to GET but asks for response headers without
the response body.

------------------------------------------------------------
# OPTIONS
------------------------------------------------------------

Used to discover communication options supported by a
resource/server.

It is commonly involved in CORS preflight requests.

============================================================
# HTTP STATUS CODES
============================================================

1xx
→ Informational

2xx
→ Success

3xx
→ Redirection

4xx
→ Client error

5xx
→ Server error

------------------------------------------------------------

Common:

200
→ OK

201
→ Created

204
→ No Content

301
→ Moved Permanently

302
→ Found

304
→ Not Modified

400
→ Bad Request

401
→ Unauthorized

403
→ Forbidden

404
→ Not Found

405
→ Method Not Allowed

409
→ Conflict

429
→ Too Many Requests

500
→ Internal Server Error

502
→ Bad Gateway

503
→ Service Unavailable

============================================================
# HTTP HEADERS
============================================================

Headers provide metadata about the request or response.

Examples:

Content-Type
Authorization
Accept
Cache-Control
Content-Length
User-Agent
Host
Cookie
Set-Cookie

============================================================
# HTTP BODY
============================================================

The body contains the actual data being transferred.

Examples:

JSON

{
    "name": "Vishal"
}

HTML

<html>
    ...
</html>

Binary data:

image
PDF
video
etc.

============================================================
# HTTP REQUEST-RESPONSE FLOW
============================================================

Client
  |
  | HTTP Request
  ↓
Server
  |
  | Process request
  ↓
Database / Business Logic
  |
  ↓
HTTP Response
  |
  ↓
Client

============================================================
# HTTP IS STATELESS
============================================================

HTTP itself is stateless.

This means each request is independent from the protocol's
perspective.

The server does not automatically remember previous
requests.

Applications can maintain state using mechanisms such as:

- cookies
- sessions
- tokens
- databases
- caches

============================================================
# HTTP CONNECTION
============================================================

HTTP is an application-layer protocol.

It commonly runs over:

HTTP/1.1:
TCP

HTTPS:
TCP + TLS + HTTP

HTTP/3:
QUIC over UDP

This distinction is very important.

============================================================
# HTTP/1.1
============================================================

HTTP/1.1 commonly uses TCP.

It supports persistent connections, allowing multiple
requests/responses to use a connection.

HTTP/1.1 messages are text-based at the protocol
representation level.

============================================================
# HTTP/2
============================================================

HTTP/2 commonly uses:

TCP + TLS

Important features include:

- binary framing
- multiplexing
- header compression
- multiple concurrent streams over one connection

Conceptually:

One TCP connection
        |
        +---- Stream 1
        |
        +---- Stream 2
        |
        +---- Stream 3

============================================================
# HTTP/3
============================================================

HTTP/3 uses:

QUIC
   ↓
UDP

instead of TCP.

QUIC provides transport features such as:

- reliable delivery
- stream multiplexing
- connection migration
- integrated TLS 1.3

Conceptually:

HTTP/3
   ↓
QUIC
   ↓
UDP
   ↓
IP

============================================================
# HTTP VERSIONS
============================================================

HTTP/1.1:

HTTP
 ↓
TCP
 ↓
IP

HTTP/2:

HTTP/2
 ↓
TCP
 ↓
IP

HTTP/3:

HTTP/3
 ↓
QUIC
 ↓
UDP
 ↓
IP

============================================================
# 7. HTTPS
============================================================

Q. What is HTTPS?

HTTPS stands for:

HyperText Transfer Protocol Secure.

HTTPS is HTTP sent over a secure TLS connection.

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

============================================================
# WHY HTTPS?
============================================================

HTTPS provides:

1. Confidentiality
2. Integrity
3. Authentication

------------------------------------------------------------
# CONFIDENTIALITY
------------------------------------------------------------

Encrypts data so intermediaries cannot simply read it.

Example:

Password
   ↓
Encrypted
   ↓
Network
   ↓
Server

------------------------------------------------------------
# INTEGRITY
------------------------------------------------------------

Helps detect whether data was modified in transit.

------------------------------------------------------------
# AUTHENTICATION
------------------------------------------------------------

TLS certificates help the client verify the identity
of the server.

============================================================
# TLS
============================================================

TLS stands for:

Transport Layer Security.

TLS provides the security layer used by HTTPS.

Older documentation may mention:

SSL

But modern HTTPS uses:

TLS

not obsolete SSL versions.

============================================================
# HTTPS FLOW
============================================================

Client
  |
  | TCP connection
  ↓
Server
  |
  | TLS handshake
  ↓
Secure TLS connection
  |
  | HTTP request
  ↓
Server
  |
  | HTTP response
  ↓
Client

============================================================
# TLS HANDSHAKE — HIGH LEVEL
============================================================

Client
   |
   | ClientHello
   ↓
Server
   |
   | ServerHello + certificate
   ↓
Client verifies certificate
   |
   | Key agreement
   ↓
Secure session established
   |
   ↓
Encrypted application data

Modern TLS uses a key-agreement mechanism to establish
shared session keys.

============================================================
# HTTP vs HTTPS
============================================================

HTTP:

- Not encrypted by TLS
- Usually port 80
- Data can be observed or modified by attackers on an
  untrusted network

HTTPS:

- HTTP over TLS
- Usually port 443
- Provides encryption, integrity protection and
  server authentication

============================================================
# 8. DNS vs TCP vs HTTP vs HTTPS
============================================================

DNS:

Purpose:
Find the server's IP address.

Example:

example.com
    ↓
IP address

TCP:

Purpose:
Provides a reliable ordered byte-stream transport.

HTTP:

Purpose:
Defines application-level request/response communication.

HTTPS:

Purpose:
HTTP communication protected using TLS.

============================================================
# COMPLETE WEB FLOW
============================================================

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

8. Server sends HTTP response

HTTP/1.1 200 OK

        ↓

9. Browser receives response

        ↓

10. Browser parses/render resources

HTML
CSS
JavaScript
Images
etc.

============================================================
# COMPLETE NETWORK STACK
============================================================

For a typical HTTPS request over HTTP/1.1 or HTTP/2:

Application Layer
        |
        ↓
HTTP
        |
        ↓
TLS
        |
        ↓
TCP
        |
        ↓
IP
        |
        ↓
Network / Link

------------------------------------------------------------

For HTTP/3:

Application
    ↓
HTTP/3
    ↓
QUIC
    ↓
UDP
    ↓
IP

============================================================
# DNS → TCP → TLS → HTTP
============================================================

This is one of the most important interview flows.

DNS:

"Where is the server?"

        ↓

IP address

        ↓

TCP:

"Let's establish reliable transport."

        ↓

TCP connection

        ↓

TLS:

"Let's secure the connection."

        ↓

Secure connection

        ↓

HTTP:

"Let's exchange application data."

        ↓

Request / Response

============================================================
# NODE.JS DNS MODULE
============================================================

Node.js provides DNS APIs through:

node:dns

Example:

const dns = require("node:dns");

dns.lookup(
    "example.com",
    (err, address, family) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(address);
        console.log(family);
    }
);

------------------------------------------------------------

`dns.lookup()` uses the operating system's name-resolution
facilities.

============================================================
# dns.resolve()
============================================================

Node.js also provides DNS resolution APIs such as:

dns.resolve()

Example:

dns.resolve(
    "example.com",
    "A",
    (err, addresses) => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(addresses);
    }
);

`dns.resolve()` performs DNS resolution using DNS servers
rather than the OS's general hostname lookup mechanism.

============================================================
# NODE.JS HTTP MODULE
============================================================

Node.js provides:

node:http

Example:

const http = require("node:http");

const server = http.createServer(
    (req, res) => {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Hello Node.js");
    }
);

server.listen(3000, () => {
    console.log(
        "HTTP server running on port 3000"
    );
});

============================================================
# NODE.JS HTTPS MODULE
============================================================

Node.js provides:

node:https

It can create an HTTPS server using TLS certificates.

Conceptually:

HTTPS Server
    ↓
TLS
    ↓
HTTP
    ↓
Application

============================================================
# NODE.JS TCP MODULE
============================================================

Node.js provides:

node:net
Used for TCP servers and clients.

!Example:

const net = require("node:net");
const server = net.createServer(
    (socket) => {
        socket.write(
            "Hello from TCP server"
        );
        socket.on("data", (data) => {
            console.log(
                data.toString()
            );
        });
    }
);
server.listen(3000);

============================================================
# HTTP vs TCP IN NODE.JS
============================================================

node:net

    ↓

Low-level TCP communication

You work directly with:

socket
data
connection
close

------------------------------------------------------------

node:http

    ↓

Higher-level HTTP protocol

You work with:

request
response
headers
method
URL
status code

============================================================
# HTTP OVER TCP
============================================================

Application:

HTTP

        ↓

Transport:

TCP

        ↓

Network:

IP

This means:

HTTP does not itself provide TCP's reliable byte transport.

TCP provides the transport.

HTTP defines how the application communicates.

============================================================
# IMPORTANT INTERVIEW DISTINCTION
============================================================

DNS is NOT a transport protocol.

DNS:

Application-level naming/resolution system.

TCP:

Transport-layer protocol.

HTTP:

Application-layer protocol.

HTTPS:

HTTP secured using TLS.

IP:

Network-layer protocol.

============================================================
# INTERVIEW QUESTIONS
============================================================

Q1. What is DNS?

Q2. Why do we need DNS?

Q3. What is a recursive DNS resolver?

Q4. What is Root DNS?

Q5. What is TLD DNS?

Q6. What is Authoritative DNS?

Q7. What is DNS caching?

Q8. What is DNS TTL?

Q9. Difference between A and AAAA records?

Q10. What is CNAME?

Q11. What is MX record?

Q12. What is reverse DNS?

Q13. What is TCP?

Q14. Explain TCP three-way handshake.

Q15. What does SYN mean?

Q16. What does SYN-ACK mean?

Q17. Why does TCP provide reliable delivery?

Q18. What is TCP flow control?

Q19. What is TCP congestion control?

Q20. Is TCP message-oriented?

Q21. Difference between TCP and UDP?

Q22. What is an IP address?

Q23. What is a port?

Q24. What is a socket?

Q25. What is HTTP?

Q26. What are HTTP methods?

Q27. What are HTTP status codes?

Q28. What are HTTP headers?

Q29. Is HTTP stateful or stateless?

Q30. What is HTTPS?

Q31. What is TLS?

Q32. Why is HTTPS secure?

Q33. Explain TLS handshake at a high level.

Q34. Difference between HTTP and HTTPS?

Q35. Difference between HTTP/1.1 and HTTP/2?

Q36. What is HTTP/3?

Q37. Why does HTTP/3 use UDP?

Q38. Difference between HTTP and TCP?

Q39. How does Node.js perform DNS lookup?

Q40. Difference between dns.lookup() and dns.resolve()?

Q41. What is node:net?

Q42. What is node:http?

Q43. What is node:https?

============================================================
# FINAL INTERVIEW ANSWER
============================================================

Q. What happens when you enter an HTTPS URL in a browser?

Answer:

"When a user enters an HTTPS URL, the browser first resolves
the domain name using DNS to obtain an IP address. DNS
resolution may involve cached information, a recursive
resolver, root servers, TLD servers, and the authoritative
DNS server.

After obtaining the IP address, the client establishes the
appropriate transport connection. For traditional HTTPS over
TCP, this starts with a TCP three-way handshake.

Then TLS negotiation establishes a secure connection and
allows the client to authenticate the server and establish
encryption keys.

After that, the browser sends an HTTP request over the secure
connection. The server processes the request and sends an
HTTP response containing a status code, headers, and
optionally a body.

The browser then processes the response and renders the
result."

============================================================
# ONE-LINE REVISION
============================================================

DNS
→ Finds the IP address.

IP
→ Identifies the network endpoint.

Port
→ Identifies the service endpoint on a host.

Socket
→ Communication endpoint used by an application.

TCP
→ Reliable, ordered byte-stream transport.

TLS
→ Secures communication.

HTTP
→ Application request/response protocol.

HTTPS
→ HTTP over TLS.

============================================================
# MOST IMPORTANT FLOW TO REMEMBER
============================================================

        URL
         |
         ↓
        DNS
         |
         ↓
     IP Address
         |
         ↓
        TCP
         |
         ↓
        TLS
         |
         ↓
       HTTPS
         |
         ↓
 HTTP Request
         |
         ↓
      Server
         |
         ↓
 HTTP Response
         |
         ↓
      Browser

============================================================
*/