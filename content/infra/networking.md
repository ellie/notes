---
permalink: infra/networking
date: 2023-09-01
title: Networking
---
# Networking

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
