I've recently started using haproxy after a lifetime of nginx, and I actually really like it! I needed to setup some metrics, when I discovered that haproxy supports prometheus out of the box - no exporter needed! 🥳

The documentation shows binding on whatever frontend you're already using, but I wanted to make sure my metrics and stats were not visible to anyone outside of my network

```
listen stats
	bind :9000
	mode http
	stats enable
	stats uri /
	http-request use-service prometheus-exporter if { path /metrics }
```

Pretty simple - we're adding a combined frontend/backend, bound on http 9000. The root shows the HAProxy metrics page, and if we hit `/metrics` then we show some prometheus metrics. So easy!