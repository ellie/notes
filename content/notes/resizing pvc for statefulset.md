---
permalink: notes/resizing-pvc-for-statefulset
date: 2023-09-01
tags:
  - infra
  - kubernetes
title: Resizing PVC for a Kubernetes Statefulset
---
If you've ever tried to resize a kubernetes statefulset PVC for a database deployment (or similar), you have probably seen this error

>  Internal server error
>
>  StatefulSet.apps "es-cluster" is invalid: spec: Forbidden: updates to statefulset > spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden.

1. Edit all the PVCs manually: `kubectl edit pvc -n <namespace> <name>`
2. Delete the StatefulSet, but leave the pods running: `kubectl delete -n <namesapce> statefulset --cascade=orphan <name>`
3. Recreate the StatefulSet with `helm upgrade`, `kubectl apply`, or however else you deploy stuff
4. Restart the StatefulSet to redeploy all the pods `kubectl rollout restart statefulset -n namespace <name>`
