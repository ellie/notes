---
title: Using SQLite extensions on macOS
date: 2024-01-22
tags:
  - macos
  - sqlite
---

I was playing with [sqlite-zstd](https://github.com/phiresky/sqlite-zstd), and upon trying to load the extension...

```
.load libsqlite_zstd
Error: unknown command or invalid arguments:  "load". Enter ".help" for help
```

Sorry?

Turns out, the sqlite install on macOS is built without the ability to load extensions.

Luckily, Homebrew has a version that's much more useful

```
brew install sqlite
```

Note that this is not linked by default. You'll either need to link it

```
brew link sqlite --force
```

Or, specify the path.