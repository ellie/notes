---
permalink: infra/kubernetes
date: 2023-09-01
title: Kubernetes
---
# Kubernetes

## Operations

### Resizing a PVC for a StatefulSet

If you've ever tried to resize a statefulset PVC for a database deployment (or similar), you have probably seen this error

>  Internal server error
>
>  StatefulSet.apps "es-cluster" is invalid: spec: Forbidden: updates to statefulset > spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden.

1. Edit all the PVCs manually: `kubectl edit pvc -n <namespace> <name>`
2. Delete the StatefulSet, but leave the pods running: `kubectl delete -n <namesapce> statefulset --cascade=orphan <name>`
3. Recreate the StatefulSet with `helm upgrade`, `kubectl apply`, or however else you deploy stuff
4. Restart the StatefulSet to redeploy all the pods `kubectl rollout restart statefulset -n namespace <name>`

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

