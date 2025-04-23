---
permalink: projects/yeet
draft: true
---
- Written in [[rust | Rust]]
- TLS failed when the S3 bucket had a `.` in the name. I forgot that this breaks SSL certificates!
- couldn't find a nice library for reading _and_ writing exif metadata. Currently requires gexiv2