---
title: Fixing ingress-nginx ConfigurationSnippet validations
date: 2025-01-03
tags:
  - kubernetes
  - nginx
---
Today I found myself needing to configure ingress-nginx. I needed to write a bit of nginx config to rewrite status codes for certain routes.

Something like

```yaml
nginx.ingress.kubernetes.io/configuration-snippet: |-
    location /metrics {
	    return 404;
    }

```

I've done this many times in the past, but today I received the following error

```
Error: UPGRADE FAILED: cannot patch "xyz" with kind Ingress: admission webhook "validate.nginx.ingress.kubernetes.io" denied the request: annotation group ConfigurationSnippet contains risky annotation based on ingress configuration
```

I already had 

```yaml
allowSnippetAnnotations: true
```

set, so this was confusing!

It turns out, in a recent release (controller 1.12), annotations are flagged by risk. There's a table [here](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations-risk/)

You now need to specify 

```yaml
annotations-risk-level: Critical
```

in the configmap. If you're using the helm chart, it can be added like so

```yaml
controller:
  config:
    annotations-risk-level: Critical
```

Note that this change is a reaction to a security issue. This is mostly an issue if you're using a multi-tenant cluster.

Issues: https://github.com/kubernetes/ingress-nginx/issues/12618, https://github.com/kubernetes/kubernetes/issues/126811