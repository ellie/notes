---
title: Amending the author of a Git commit
date: 2024-07-30
tags:
  - git
  - shell
---
It's pretty common that I'll accidentally use the wrong email for a commit. I have a few emails that I like to use for different purposes, so getting it correct is important :)

### Amend author of last commit

This one is nice and easy!

```bash
git commit --amend --author="Example Name <name@example.com>"
```

### Using interactive rebase

1. `git rebase -i` on whatever base you want
2. Mark the commits you'd like to change with `edit`, instead of `pick`
3. `git commit --amend --author="Example Name <name@example.com>"`, then  `git rebase --continue`

### Using filter branch

Filter the whole thing! Be careful though, filter-branch can break things if you're not careful

```bash
git filter-branch -f --commit-filter '
      if [ "$GIT_AUTHOR_EMAIL" = "old@email.com" ];
      then
              GIT_AUTHOR_NAME="New Name";
              GIT_AUTHOR_EMAIL="new@email.com";
              git commit-tree "$@";
      else
              git commit-tree "$@";
      fi' HEAD
```

### Using filter repo
I first mentioned `git-filter-repo` in [[split git repo]], but it's useful here too. Preferable to filter-branch, but not included in the base git install.

Install with

```bash
curl "https://raw.githubusercontent.com/newren/git-filter-repo/main/git-filter-repo" -o ~/.local/bin/git-filter-path
```

Then do either of the following

#### With mailmap

If you setup your mailmap to map old -> new, you can run

```bash
git filter-repo --use-mailmap
```

#### Without mailmap
Otherwise, the following works well

```bash
git filter-repo --email-callback '
    return email if email != b"old@email.com" else b"new@email.com"
    '
```