---
permalink: notes/trigger-alertmanager-manually
title: Trigger Alertmanager Manually
date: 2023-09-01
---
I was setting up Alertmanager and needed to manually trigger an alert to make sure it works

Something like this will do it, depending on your port:
 
```
curl -H 'Content-Type: application/json' -d '[{"labels":{"alertname":"test-alert"}}]' http://alertmanager:9093/api/v1/alerts

-> {"status": "success"}
```

