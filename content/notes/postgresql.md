---
permalink: notes/postgresql
date: 2023-09-01
title: PostgreSQL
tags:
  - postgresql
  - infra
updated: 03/01/2024
---
Some postgres snippets! Just a reference page for the things I forget a lot.

- `pg_ctl init -D path` - init new database + config at `path`
- `pg_hba.conf` - configure host based auth
- `pg_ident.conf` - map system users to database users
- `postgresql.conf` - all the other config changes

## Learnings
- It's faster to create a table with no index, copy data in, then add indices

## Snippets

### Commands

- `\l` list databases
- `\c dbname` connect to database as current user

### Create table as copy of another
```sql
create table new_table as table old_table;
```
Note: this will copy all data, but no indices or constraints

For no data

```sql
create table new_table as table old_table with no data;
```

If you'd like to query/filter it:

```sql
create table new_table as (select * from old_table where some_condition);
```

### Check for waiting locks
```sql
select relation::regclass, * from pg_locks where not granted;
```

### Get database size

```sql
SELECT pg_size_pretty(pg_database_size('database name'));
```

### Get table size
```sql
SELECT pg_size_pretty(pg_relation_size('records'));
```
### Monitoring replication slots
```
SELECT * FROM pg_replication_slots;
```

### Monitoring replication lag
```sql
SELECT extract(epoch from now() - pg_last_xact_replay_timestamp()) AS replica_lag
```

### Dump database schema only
```bash
pg_dump --schema-only databasename
```
## Useful tools
- [WAL streaming and backup via object storage](https://github.com/wal-g/wal-g)