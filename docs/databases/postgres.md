# PostgreSQL

## Snippets

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
