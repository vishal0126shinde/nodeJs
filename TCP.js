/*
============================================================
Q. What is TCP?
============================================================

- TCP stands for Transmission Control Protocol.

- TCP is a connection-oriented transport-layer protocol
  that provides reliable and ordered delivery of a byte
  stream between two endpoints.

------------------------------------------------------------
1. CONNECTION-ORIENTED
------------------------------------------------------------

- Before normal data transfer begins, TCP establishes a
  connection between the client and server.

- TCP uses a three-way handshake:

1. SYN
   → Client sends a SYN segment to initiate a connection.

2. SYN-ACK
   → Server responds with SYN-ACK to acknowledge the request
     and indicate that it is willing to establish the
     connection.

3. ACK
   → Client sends an ACK to confirm the server's response.

After the three-way handshake:

Client
   ↓
TCP connection established
   ↓
Server

Data transfer can begin.

------------------------------------------------------------
2. RELIABLE DELIVERY
------------------------------------------------------------

TCP provides reliable delivery using mechanisms such as:

- Sequence numbers
- Acknowledgements
- Retransmission
- Error detection
- Ordered delivery

If TCP detects that data has been lost, it can retransmit
the missing data.

Therefore:

Sender
   ↓
TCP
   ↓
Network
   ↓
TCP
   ↓
Receiver

The receiver gets the byte stream in the correct order.

------------------------------------------------------------
3. TCP IS A BYTE STREAM
------------------------------------------------------------

Important interview point:

TCP provides a continuous ordered stream of bytes.

It does NOT preserve application-level message boundaries.

Example:

Application sends:

"Hello"
"World"

The receiver may receive:

"Hel"
"loWo"
"rld"

TCP guarantees the byte order, but it does not tell the
application where one message ends and another begins.

Applications must implement their own message framing when
message boundaries are required.

------------------------------------------------------------
4. SEGMENTATION AND REASSEMBLY
------------------------------------------------------------

TCP can divide the byte stream into TCP segments for
transmission.

Conceptually:

Application data
      ↓
TCP
      ↓
TCP segments
      ↓
Network
      ↓
TCP
      ↓
Reconstructed byte stream
      ↓
Application

TCP uses sequence numbers to keep track of the byte stream
and allows data to be delivered to the application in order.

------------------------------------------------------------
5. FLOW CONTROL
------------------------------------------------------------

TCP flow control prevents a fast sender from overwhelming
a slow receiver.

Fast sender
    ↓
   TCP
    ↓
Slow receiver

The receiver advertises how much data it can currently
accept.

------------------------------------------------------------
6. CONGESTION CONTROL
------------------------------------------------------------

TCP also uses congestion control to respond to network
congestion.

Important difference:

Flow control
→ Protects the receiver.

Congestion control
→ Responds to network congestion.

------------------------------------------------------------
7. TCP CONNECTION TERMINATION
------------------------------------------------------------

TCP connections are normally closed using FIN and ACK
messages.

Conceptually:

FIN
 ↓
ACK
 ↓
FIN
 ↓
ACK

------------------------------------------------------------
8. TCP AND OTHER PROTOCOLS
------------------------------------------------------------

Common protocols that can use TCP include:

HTTP/1.1
HTTP/2
FTP
SMTP

HTTP/3 is different:

HTTP/3
  ↓
QUIC
  ↓
UDP

------------------------------------------------------------
SIMPLE DEFINITION
------------------------------------------------------------

"TCP is a connection-oriented transport-layer protocol that
provides reliable and ordered delivery of a byte stream between
two endpoints."

------------------------------------------------------------
ONE-LINE INTERVIEW ANSWER
------------------------------------------------------------

"TCP is a reliable, connection-oriented transport protocol
that provides ordered delivery of a byte stream using
mechanisms such as sequence numbers, acknowledgements,
retransmission, flow control, and congestion control."

============================================================
*/