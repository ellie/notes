---
permalink: infra/alertmanager
date: 2023-09-01
---
# Alertmanager

## Trigger alert manually
Useful to test that you've actually set it all up properly!

```
curl -H 'Content-Type: application/json' -d '[{"labels":{"alertname":"test-alert"}}]' http://alertmanager:9093/api/v1/alerts

-> {"status": "success"}
```