---
title: Debugging slow PostgreSQL queries
date: 2024-05-14
tags:
  - postgresql
---

Earlier today I was trying to figure out why I was getting the occasional latency spike. I suspected I had some slow queries that needed optimising, but in order to check I needed to enable slow query logging.

If you wish to log all statements that take longer than 100ms with postgres, add this to your config file

```
log_min_duration_statement = 100
```

Then reload the postgres config with 

```
select pg_reload_conf();
```

No restart of the server required!

Otherwise, the following options can be helpful

```ini
# Log all statements, not just the slow ones
# This may be very chatty, so make sure your log partition doesn't fill up
log_statement = all/ddl/none
```

```ini
# Log durations alongside statements
log_duration = on
```