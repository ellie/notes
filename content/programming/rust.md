---
permalink: programming/rust
tags:
  - rust
  - evergreen
title: Rust
date: 2023-09-01
---
## Projects
- [[atuin | Atuin]]
## Cargo
### Run just integration tests
```
cargo test --test '*' 
```

### Run just unit tests

```
cargo test --lib --bins
```

## Code
## git sha as string in code
Useful for distribution, to report what revision was built. In `build.rs`:
```rust
use std::process::Command;
fn main() {
    let output = Command::new("git").args(["rev-parse", "HEAD"]).output();

    let sha = match output {
        Ok(sha) => String::from_utf8(sha.stdout).unwrap(),
        Err(_) => String::from("NO_GIT"),
    };

    println!("cargo:rustc-env=GIT_HASH={}", sha);
}
```

Usage:
```rust
const SHA: &str = env!("GIT_HASH");
```
