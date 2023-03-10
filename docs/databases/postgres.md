# PostgreSQL

- `pg_ctl init -D path` - init new database + config at `path`
- `pg_hba.conf` - configure host based auth
- `pg_ident.conf` - map system users to database users
- `postgresql.conf` - all the other config changes

## Snippets

### Commands

- `\l` list databases
- `\c dbname` connect to database as current user

### Check for waiting locks
```
select relation::regclass, * from pg_locks where not granted;
```

### Get database size

```
SELECT pg_size_pretty(pg_database_size('database name'));
```

### Monitoring replication slots
```
SELECT * FROM pg_replication_slots;
```

### Monitoring replication lag
```
SELECT extract(epoch from now() - pg_last_xact_replay_timestamp()) AS replica_lag
```


## Useful tools
- [WAL streaming and backup via object storage](https://github.com/wal-g/wal-g)
