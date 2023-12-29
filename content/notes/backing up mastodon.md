---
title: Backing up mastodon
slug: mastodon-postgres-backup
date: 2023-12-29
description: Automated mastodon postgres backups to an object store
tags:
  - infra
  - mastodon
---
I'm the administrator of https://bikers.social, a mastodon instance for bikers 🏍️

My old mastodon backup policy consisted of regular `pg_dumps`, and `scp` to another machine. This was totally good enough, as that machine was _also_ backed up to my local NAS. I did have to semi-regularly manually clean up old backups though, and now that the instance has been going a while it would be great to have something better.

I've recently revamped it a bit to use Cloudflare R2.

Postgres is the most important part of an instance backup. If you lose your db, it's game over. My secrets are also backed up.
## R2

I use R2 for all of the instance's assets. It's much cheaper than S3 for storage, and also has no egress fees! I'd be a bit too concerned about surprise bandwidth bills with S3.

As of May 2023, R2 also supports [lifecycle policies](https://developers.cloudflare.com/r2/buckets/object-lifecycles/)

## Setup

First up, make a new R2 bucket. This will be used for storage. Ensure it is not publicly accessible!

Then we want to setup the local aws cli. I created an API token scoped to the bucket, with object read/write, and limited only to the IP address of my mastodon server. Run `aws configure`, and paste in your new account ID and secret.

> [!note]
> The AWS cli will, by default, assume that the endpoint you wish to use is Amazon. Newer versions of the CLI can be configured in config, but chances are your package repository is out of date. For all subsequent commands, I set
> 
> `alias aws='aws --endpoint-url https://<account ID>.r2.cloudflarestorage.com'`

We can then setup the lifecycle policy. 

Go to your bucket settings, then lifecycle policy

![](https://img.ellie.wtf/i/ada76f57ae8dc3a95b7f3b9f3ef966b1e712e3f530b4f4820088ff1ba82574c5.png)

I setup a lifecycle rule to keep daily backups for a week, weekly backups for 6 weeks, and monthly backups for 6 months.

## Script

My backup script is super simple. When run, it creates a file for the current day, and then uploads it to r2 with the specified prefix.

```bash
#! /bin/bash

prefix=${1:-daily}
date=$(date '+%Y-%m-%d')

pg_dump -Fc -Z 0 -U mastodon mastodon_production | xz -T4 > $date.sql.xz

aws --endpoint-url https://<account id>.r2.cloudflarestorage.com s3 cp ./$date.sql.xz s3://<bucket name>/$prefix/$date.sql.xz
```

If no prefix is specified, we assume daily backups.

I've chosen `xz` for my backups. It produces some of the best compression, at cost of being very slow. My mastodon instance is pretty overkill in terms of spec, due to it being a hetzner box and my instance not being too high traffic. 

`pg_dump -Fc -Z 0` - using the custom format, but disabling compression as we're doing that with xz

`xz -T4` will use xz compression, and no more than 4 threads. I tried `-T0` and it absolutely pegged all 16 threads, which was a bit excessive. 4 still completes fast enough.

## Crontab
After testing it manually with

```
./backup.sh daily
./backup.sh weekly
./backup.sh monthly
```

and ensuring all files were created OK, I setup my crontab

```
0 12 * * * /home/mastodon/backup.sh daily
0 13 * * 0 /home/mastodon/backup.sh weekly
0 14 1 * * /home/mastodon/backup.sh monthly
```

There's some duplicate work, but that's not a huge concern here. I've scheduled them during "awake" hours for me, as I also set it up to ping me on Telegram when the backup completes.

## Improvements

In the future, I may change this to use [wal-g](https://github.com/wal-g/wal-g). I think this would be pretty overkill for what we have now, and the backup/restore process with `pg_dump` is super simple. If the database size gets to be too large, or if it makes sense to have point-in-time recovery, I'll revisit this.