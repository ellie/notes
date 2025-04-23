---
permalink: notes/helmfile
date: 2023-09-01
tags:
  - infra
  - kubernetes
title: Helmfile
---
## Helmfile

Helm is totally adequate (I'm uncomfortable calling it good) for deploying an
app, and potentially a small number of dependencies. It can quickly spiral out
of control when there are many services that need deploying, with varying
levels of dependency.

Helmfile is great for describing a large set of charts to deploy, and their
values. It's nice to be able to set values per environment, and to be able to
deploy charts from a variety of sources - git repos, official repos, and the
local filesystem.

### write-values

Ensuring you get the correct YAML and Go template encantation can be annoying,
and testing it out by deploying is not ideal. In lieu of proper testing,
`helmfile write-values` is great as it runs all the templating and dumps files
on disk for inspection
