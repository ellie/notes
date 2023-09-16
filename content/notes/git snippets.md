---
permalink: notes/git-snippets
date: 2023-09-01
tags:
  - tools
title: Git snippets
---
## Remove untracked files
```
git clean -fdx
```

- `-f` force
- `-d` include directories
- `-x` also remove ignored files

## Disable push to master/main
It's pretty easy to accidentally push to main/master (if for some reason you cannot enable branch protection), so putting

```
[branch.main]
	pushRemote =
[branch.master]
	pushRemote =
```

in your git config sorts this out! If you would like to intentionally push to an important branch, `git push origin main` will sort you out.