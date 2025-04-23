---
title: Search for a string across all git branches
date: 2024-05-28
tags:
  - git
  - shell
---
I've been working across a few branches lately, and couldn't remember the name of a git branch containing some work I'd done. I did, however, remember the name of an interface I'd defined.

Seach all git branches for a specific string, with this

```bash
 git rev-list --all | xargs git grep 'SEARCH STRING'
```

If a result is found, you'll be given the git SHA

Get info for the sha

```bash
git show <THE SHA>
```

And you'll see something like this

```
commit 68f9ecc4d46716f572de943ee90bf236c3065ef4 (HEAD -> ellie/ui-me)
Author: Ellie Huxtable <ellie@elliehuxtable.com>
Date:   Sat May 25 09:51:56 2024 +0100

    wip

```

> [!question] 
> I thought it might also be cool to have [Atuin](https://atuin.sh) track git branches, alongside everything else. Maybe a custom data column?
