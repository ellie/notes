---
permalink: infra/kube-state-metrics
date: 2023-09-01
---
# Kube State Metrics

Kube state metrics exposes kubernetes metrics in a way that they can be scraped by prometheus. It uses the kubernetes API to create a snapshot of the state of your cluster, and then exposes that on `/metrics`, ready to be ingested by your monitoring.

### Scaling

With larger clusters, you might find that scrapes begin to take time - ksm might be exposing millions of samples, depending on how many nodes/pods/etc you have!

KSM supports sharding, both [automatically](https://github.com/kubernetes/kube-state-metrics#automated-sharding) and manually. Unfortunately the autosharding is still very much in development

> Automatic sharding allows each shard to discover its nominal position when deployed in a StatefulSet which is useful for automatically configuring sharding. **This is an experimental feature and may be broken or removed without notice.**

So, we could manually shard! This still isn't amazing though, as even if we have a bunch of pods scraping the same resource, they still each need to pull all the data. So we would go from having one pod pulling x data, to having n pods pulling x data. Or, `n * x` total network transfer, rather than `n * x/n` data transferred if we were only transferring what's required for that shard. Still not ideal.

> Each shard decides whether the object is handled by the respective instance of kube-state-metrics or not. Note that this means all instances of kube-state-metrics, even if sharded, will have the network traffic and the resource consumption for unmarshaling objects for all objects, not just the ones they are responsible for.

The conclusion I've come to thus far, is to shard by data type. Pods tend to expose the most samples, so it makes sense to break those out first. So we have one deployment exposing pod metrics, and then one for everything else. 

It seems like this is what [has been done elsewhere](https://www.datadoghq.com/blog/engineering/our-journey-taking-kubernetes-state-metrics-to-the-next-level/), and works for now