---
title: Ignore a folder with ripgrep
date: 2024-02-26
---
Recently I've had the need to ignore a folder while searching with ripgrep. Normally `rg` will ignore anything specified by `.gitignore`, but I couldn't set that in this case.

You can specify files or directories to exclude with the `-g` flag, quoting the docs:

> ```
> -g, --glob GLOB ...
> ```
> 
> Include or exclude files and directories for searching that match the given glob. This always overrides any other ignore logic. Multiple glob flags may be used. Globbing rules match .gitignore globs. Precede a glob with a ! to exclude it.

So in my case

`rg -g '!junk-dir/' search-term`

