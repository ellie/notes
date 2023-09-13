---
permalink: infra/filesystems
date: 2023-09-01
title: Linux Filesystems
---

Just some Linux-y notes

### Filesystem types
```
fd00 - Linux RAID
```

### Creating software RAID device
```
mdadm --create --verbose /dev/md<NUMBER> --level=<RAID LEVEL> --raid-devices=<DEVICES> /dev/one /dev/two ...
```

### Get device UUID

```
blkid
```