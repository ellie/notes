---
date: 2024-01-05
title: Automatically load zfs keys at boot
description: Creating a systemd service to automatically load zfs keys
tags:
  - zfs
---
I recently setup a new encrypted dataset. Ubuntu/openzfs came with a systemd service to handle mounting it at boot, but not loading the keys - therefore, on reboot, it would fail to mount

I did some googling and found this: https://github.com/openzfs/zfs/issues/8750#issuecomment-497500144

```bash
cat << 'EOF' > /etc/systemd/system/zfs-load-key@.service
[Unit]
Description=Load ZFS keys
DefaultDependencies=no
Before=zfs-mount.service
After=zfs-import.target
Requires=zfs-import.target
[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/sbin/zfs load-key %I
[Install]
WantedBy=zfs-mount.service
EOF
```

Use like so:
```bash
systemctl enable zfs-load-key@tank-enc
```

to, for example, enable key loading for the volume `tank/enc`. It will automatically replace / with -