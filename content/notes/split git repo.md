---
title: How to split a Git subdirectory into a new repo
description: Splitting a git repo into two, while retaining all history
date: 2024-07-29
---
First, install [`git-filter-repo`](https://github.com/newren/git-filter-repo). This is a python script - the required functionality is not built-in to Git.

It's easy to install. Just drop the script somewhere in your PATH. For me:

```bash
curl "https://raw.githubusercontent.com/newren/git-filter-repo/main/git-filter-repo" -o ~/.local/bin/git-filter-path
```


An important thing to note is that `git-filter-repo` will replace all other files in the repo with those in the subdir. It will not split the subdir into it's own directory. You should operate on a fresh copy of your repo to avoid losing data.

Let's image our repo looks like the following

```bash
🦄 ls -l
.rw-r--r-- ellie staff  0 B Mon Jul 29 14:13:39 2024 LICENSE
.rw-r--r-- ellie staff  0 B Mon Jul 29 14:13:34 2024 README.md
drwxr-xr-x ellie staff 64 B Mon Jul 29 14:13:35 2024 src/
drwxr-xr-x ellie staff 64 B Mon Jul 29 14:13:43 2024 subdir/
```

And we'd like to turn the contents `subdir` into its own repository.

We would run

```
git filter-repo --subdirectory-filter subdir
```

## Rewriting commit messages

I generally follow conventional commits, so I had a bunch of scoped commits like this

```
feat(subdir): do a thing
```

Now that subdir is its own repo, those commits felt a bit weird. Let's tidy them up!

```
git filter-repo --message-callback '
      return re.sub(b"\(subdir\)\n", b"", message, flags=re.MULTILINE)
      '
```