---
permalink: infra/systemd
date: 2023-09-01
title: Systemd
---

# Systemd

Just some issues I have had with it

## /dev/shm clearing

This can also be seen by logs such as `could not open shared memory segment "/PostgreSQL.271741757"`.

For non-system (UID < 1000) users, `logind` will by default clear shared mem files upon logout. For things like databases, this is not at all desireable.

Setting `RemoveIPC=no` in `/etc/systemd/logind.conf` should resolve this.

Man page

```
RemoveIPC=
           Controls whether System V and POSIX IPC objects belonging to
           the user shall be removed when the user fully logs out. Takes
           a boolean argument. If enabled, the user may not consume IPC
           resources after the last of the user's sessions terminated.
           This covers System V semaphores, shared memory and message
           queues, as well as POSIX shared memory and message queues.
           Note that IPC objects of the root user and other system users
           are excluded from the effect of this setting. Defaults to
           "yes".
```

Once changed, a full reboot will ensure the config is loaded. Alternatively, a restart of `logind` should also resolve this: `systemctl restart systemd-logind.service`

Useful links: 

- https://github.com/systemd/systemd/issues/4532
- https://github.com/systemd/systemd/issues/2039
- https://stackoverflow.com/questions/49065733/redhat-or-centos7-systemd-may-remove-user-ipc-resources-unexpectedly
- https://stackoverflow.com/questions/73368759/why-systemd-remove-my-shm-file-but-not-postgresqls