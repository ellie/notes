---
permalink: notes/kube-state-metrics
date: 2023-09-01
title: Kube State Metrics
---

Kube state metrics exposes kubernetes metrics in a way that they can be scraped by prometheus. It uses the kubernetes API to create a snapshot of the state of your cluster, and then exposes that on `/metrics`, ready to be ingested by your monitoring.