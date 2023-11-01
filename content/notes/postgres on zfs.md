---
date: 2023-10-31
tags:
  - postgresql
  - zfs
title: Running bare metal PostgreSQL on ZFS
cover: https://img.ellie.wtf/i/74b97825c93824bf34b2fac6982d43a51ea62914ce9c8f8f7e3459b2ba78cd4b.png
---

I'm setting up new postgres servers for [[atuin | Atuin]]! We're going with a hot replica this time, and making things _much_ more reliable. Atuin has had no outages or database issues in a couple of years, but I don't want to push my luck.

You might also be interested in the [[hetzner k3s]] setup I did for the Atuin api images

I'm going to be doing a fairly minimal setup to begin with, and tune things later. I'm not sure which options will best suit my workload, so will keep things simple.

Note that the Atuin queries are not complicated. We mostly just store a pretty high volume of data, and read sequentially (ish). There are minimal joins, and minimal complex queries.

We will often have bursts where 10s/100s of thousands of rows need to be written or read as quickly as possible - however this is also pretty sequential and not at all "complex".

Ideally, we will compress the data as much as possible. While Atuin mostly stores encrypted data (which does not compress well), there is a decent amount of unencrypted data in the form of JSON padding + timestamps etc. Compress them! This will nicely reduce disk usage, but also IO - at the cost of some CPU.

As our queries are simple, the CPU cost is fine.

## Setting up
I'm running this on a couple of hetzner machines I bought in an auction. They have Ryzen CPUs, and 4x 1tb nvme SSD.

Two of the SSDs will be running a simple RAID mirror, and will store the OS and logs. The other two will have my ZFS filesystem + postgres on them. 

This costs me 50% of my storage in mirroring, however as this is bare metal hardware there's a chance that a disk could fail. I'd like to ensure my database can continue running until I failover to the replica + a technician can replace the disk.

```bash
# Install zfs
apt install zfsutils-linux

# check version
zfs version
```

Check your disk layout with `lsblk`

```
NAME        MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINTS
nvme1n1     259:0    0 953.9G  0 disk
├─nvme1n1p1 259:1    0    32G  0 part
│ └─md0       9:0    0    32G  0 raid1 [SWAP]
├─nvme1n1p2 259:2    0     1G  0 part
│ └─md1       9:1    0  1022M  0 raid1 /boot
├─nvme1n1p3 259:3    0   128G  0 part
│ └─md2       9:2    0 127.9G  0 raid1 /var
├─nvme1n1p4 259:4    0     1K  0 part
└─nvme1n1p5 259:5    0 792.9G  0 part
  └─md3       9:3    0 792.7G  0 raid1 /
nvme0n1     259:6    0 953.9G  0 disk
nvme3n1     259:7    0 953.9G  0 disk
nvme2n1     259:8    0 953.9G  0 disk
├─nvme2n1p1 259:9    0    32G  0 part
│ └─md0       9:0    0    32G  0 raid1 [SWAP]
├─nvme2n1p2 259:10   0     1G  0 part
│ └─md1       9:1    0  1022M  0 raid1 /boot
├─nvme2n1p3 259:11   0   128G  0 part
│ └─md2       9:2    0 127.9G  0 raid1 /var
├─nvme2n1p4 259:12   0     1K  0 part
└─nvme2n1p5 259:13   0 792.9G  0 part
  └─md3       9:3    0 792.7G  0 raid1 /
```

`/dev/nvme1n1` and `/dev/nvme2n1` are both in use for my OS, but `/dev/nvme0n1` and `/dev/nvme3n1` are leftover for my zfs mirror.

Create the mirror

```bash
zpool create postgres mirror -o ashift=12 /dev/nvme0n1 /dev/nvme3n1
```

It returned nice and fast!

Checking again with `lsblk` shows some usage

```
nvme0n1     259:6    0 953.9G  0 disk
├─nvme0n1p1 259:14   0 953.9G  0 part
└─nvme0n1p9 259:15   0     8M  0 part
nvme3n1     259:7    0 953.9G  0 disk
├─nvme3n1p1 259:18   0 953.9G  0 part
└─nvme3n1p9 259:19   0     8M  0 part
```

Confirmed with `zpool status`

```
  pool: postgres
 state: ONLINE
config:

	NAME         STATE     READ WRITE CKSUM
	postgres     ONLINE       0     0     0
	  mirror-0   ONLINE       0     0     0
	    nvme0n1  ONLINE       0     0     0
	    nvme3n1  ONLINE       0     0     0

errors: No known data errors
```

The pool is mounted by default at `/postgres`. Nice!

## Postgres

Before we can setup datasets, we need to setup postgres. Postgres needs to run its init _before_ we move it to zfs. Annoying, but ok.

Ubuntu 22.04 has a pretty old version in its repos, so install the postgres one

```bash
sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

apt update
```


```bash
apt install postgresql-16 postgresql-contrib-16
systemctl enable postgresql
systemctl start postgresql
```

Then, stop postgres. Move its data to a temp location, create the datasets, and move things back again. Could probably rsync instead of mv/cp to keep permissions.

```bash
systemctl stop postgresql

# move postgres data to temp
mv /var/lib/postgresql/16/main/pg_wal /tmp/pg_wal
mv /var/lib/postgresql /tmp/postgresql

# create the datasets
zfs create postgres/data -o mountpoint=/var/lib/postgresql
zfs create postgres/wal -o mountpoint=/var/lib/postgresql/16/main/pg_wal

# switcharoo the data back
cp -r /tmp/postgresql/* /var/lib/postgresql
cp -r /tmp/pg_wal/* /var/lib/postgresql/16/main/pg_wal

# sort perms
chmod -R 0700 /var/lib/postgresql
chmod -R 0700 /var/lib/postgresql/16/main/pg_wal
chown -R postgres: /var/lib/postgresql

# start postgres once more
systemctl start postgresql
```

Check all is ok:

```bash
zfs list

NAME                 USED  AVAIL     REFER  MOUNTPOINT
postgres             600K   922G       24K  /postgres
postgres/db           72K   922G       24K  /postgres/db
postgres/db/base      24K   922G       24K  /postgres/db/base
postgres/db/pg_wal    24K   922G       24K  /postgres/db/pg_wal
```

## Configuring ZFS

I've read a bunch, including:

- https://vadosware.io/post/everything-ive-seen-on-optimizing-postgres-on-zfs-on-linux/
- https://bun.uptrace.dev/postgres/tuning-zfs-aws-ebs.html

One of the above articles had issues where some nvme hardware was reporting a successful write when using `fdatasync`, but not actually writing ok. Many drives will report a successful write once the data has been stored in the volatile write cache, but not actually stored. Disable this with:

```
apt install nvme-cli
nvme set-feature -f 6 -v 0 /dev/nvme0n1
nvme set-feature -f 6 -v 0 /dev/nvme3n1
```

I spend a while thinking about the optimal `recordsize`. While I'd get a higher tps running recordsize = postgres block size = 8kb, Atuin is largely sequential + reads/writes large amounts of data. I could change the postgres block size (it's a compilation option), but I'll consider trying that in the future.

To begin with, I'll try the default of 128k and see how it goes. Lower numbers are potentially faster, but higher numbers tend to get better compression. It depends on a lot of factors though, so I'll measure things and see.

```bash
# enable compression
zfs set compression=zstd-3 postgres

# disable access time (so, so many writes...)
zfs set atime=off postgres

# enable improved extended attributes
zfs set xattr=sa postgres

# zfs set recordsize=16k postgres
```

I then set `full_page_writes = off` on the postgres side - zfs cannot write partial pages so it's pretty redundant.

Next up, we'll give the ARC (ZFS page cache) 75% of the system memory. The remainder will be used by postgres shared_buffers.

```
echo 51539607552 >> /sys/module/zfs/parameters/zfs_arc_max
```

To persist across reboots, set this in  `/etc/modprobe.d/zfs.conf`

```
options zfs zfs_arc_max=51539607552
```

## Postgres config

Not specific to ZFS, but some general postgres tuning

```
# 25% of 64GB
shared_buffers = 16GB

work_mem = 8MB

# make vaccuums/etc faster
maintenance_work_mem = 1GB

# tell the planner how much the ZFS ARC will likely cache
effective_cache_size = 48GB
```

There's a bunch more tuning we can do, but realistically this will help the most. Postgres has a pretty tiny amount of memory configured by default!

At this point, I rebooted to ensure everything was OK + persisted properly.

## Chuck load at it

I'd like to ensure my system performs at least mostly ok, so I ran pgbench and got

```
scaling factor: 50
query mode: simple number of clients: 20 
number of threads: 4 
maximum number of tries: 1 
number of transactions per client: 100000 
number of transactions actually processed: 2000000/2000000 
number of failed transactions: 0 (0.000%) 
latency average = 2.863 ms 
initial connection time = 10.287 ms 
tps = 6984.804317 (without initial connection time)
```

Not bad! Not that representative of my workload, but at least an indication it's not totally broken. I'll tune this some more in the future.

## Next

Next I'll be configuring backups with pgbackrest, and setting up a hot standby we can failover to should things go wrong!

Then copying the dataset across, and making this new database production 🚀

