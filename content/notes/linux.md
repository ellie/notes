---
permalink: notes/linux
date: 2023-09-01
title: Linux
---

Just a reference page for all the linux things I forget
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

## Networking

### Interfaces
- Interface names must be <16 chars

### Create bridge
```
ip link add br0 type bridge
```

### Add IP to bridge
```
ip addr add 172.16.0.1/16 dev br0
```