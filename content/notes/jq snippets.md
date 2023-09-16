---
permalink: notes/jq-snippets
date: 2023-09-01
title: jq snippets
---
# jq

Just a collection of jq things I've found useful

## Arrays

### Get an array element by index
```
echo '[1, 2, 3, 4, 5]' | jq '.[0]' # => 1
```

### Get the length of an array

```
echo '[1, 2, 3, 4, 5]' | jq 'length' # => 5
```