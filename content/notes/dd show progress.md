---
title: Show dd copy progress
date: 2024-06-23
tags:
  - shell
---

A super short note, but I forget this all the time. If you'd like to see progress while dd-ing something, add `status=progress`, like so

```bash
dd if=/input of=/output status=progress
```