---
title: "Byte-Range Requests: Enabling Video Seeking"
date: 2025-01-15
excerpt: "How HTTP byte-range requests enable efficient video seeking and partial content delivery."
tags:
  - HTTP
  - Streaming
  - Implementation
---

When you drag the progress bar on a video player, something elegant happens behind the scenes. The player doesn't download the entire file—it requests just the bytes it needs. This is made possible by HTTP byte-range requests.

## The Problem

Video files are large. A 1080p movie might be several gigabytes. Without byte-range support, users would need to:

1. Download the entire file before playback
2. Re-download everything if they want to skip ahead
3. Waste bandwidth on content they never watch

## How Byte-Range Requests Work

The HTTP/1.1 specification (RFC 7233) defines a mechanism for requesting partial content:

### Client Request

```http
GET /video.mp4 HTTP/1.1
Host: example.com
Range: bytes=1000000-1999999
```

### Server Response

```http
HTTP/1.1 206 Partial Content
Content-Range: bytes 1000000-1999999/50000000
Content-Length: 1000000
Content-Type: video/mp4

[binary data]
```
