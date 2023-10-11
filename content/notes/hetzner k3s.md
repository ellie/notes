---
title: Setting up k3s on Hetzner Cloud
date: 2023-10-08
tags:
  - infra
  - kubernetes
cover: https://img.ellie.wtf/i/a9e030bb8d6d703c69f113f7ee1fd69096849a3d29d611334f7cd10e13c2a4d5.jpg
---

I setup a HA k3s cluster for [[atuin | Atuin]] recently! 

I'm using HA etcd, which means we need to run an odd number of "server" nodes, and obviously more than one of them. That makes 3 the minimum. 

The servers are all setup in a private network, in their own subnet, and are ARM instances. The firewall is setup to disallow almost all ingress, and most egress.

Honestly I'm shocked at how easy this was. I may have messed something up I'm unaware of, but my experience with `kubeadm` a few years back was _not_ as nice. Yay for k3s!
### Sources
I read a bunch of stuff.

This guide was a nice start: https://community.hetzner.com/tutorials/k3s-glusterfs-loadbalancer

But the k3s docs are really good, and I mostly just read those: https://docs.k3s.io/

I didn't use one of those (probably very good) automated hetzner k3s setup tools. I wanted to make sure I properly understood what was going on, and I've ran kubernetes on metal a few times in the past. Just with kubeadm, not k3s.
## Servers
The first server! Note that k3s calls nodes running the control plane a "server", and other nodes an "agent". By default it allows the master nodes to also schedule normal workloads, which is probably fine for my use case.

I've disabled the cloud controller as we're installing a special hetzner one, and also disabled local storage as I'm going to be using Longhorn. Be sure to pick a good token!

Otherwise, as I enabled private networking on my Hetzner + want my cluster to use that, I've pointed flannel towards the private network interface.

```bash
curl -sfL https://get.k3s.io | sh -s - server \
	--cluster-init \
    --disable-cloud-controller \
    --disable local-storage \
    --node-name="$(hostname -f)" \
    --flannel-iface=enp7s0 \
    --kubelet-arg="cloud-provider=external" \
    --secrets-encryption \
    --disable=traefik \
    --token=CHANGE ME
```

Subsequent machines run a very similar command

```bash
curl -sfL https://get.k3s.io | sh -s - server \
	--server SERVER ADDRESS \
    --disable-cloud-controller \
    --disable local-storage \
    --node-name="$(hostname -f)" \
    --flannel-iface=enp7s0 \
    --kubelet-arg="cloud-provider=external" \
    --secrets-encryption \
    --disable=traefik \
    --token=CHANGE ME
```

Please note:

1. Check that the network interface is correct
2. Generate a token securely
3. Check that cloud-provider=external is still required. In kubernetes v.1.29+ this may not be the case. 
4. Only the first server setup requires "cluster init". After that, you already have a cluster - no more init!

> [!info]
> The first time I got all the way to setting up Hetzner Cloud Controller until I saw that in their docs they require you to pass the `--kubelet-arg="cloud-provider=external"` flag to each node. 
> 
> For most flags, you can just re-run the installer and it adjusts the config and restarts the node. For this flag in particular, if you miss it, you'll need to setup your cluster again. HCCM will only label nodes that were setup correctly from the very beginning, and unlabelled nodes won't work correctly with your LB.
> 
   Some background on this. Kubernetes has a bunch of CCMs (cloud controller managers) that basically integrate k8s nicely with a cloud provider. In order to install an external CCM, we currently need to set the aforementioned flag. However, this has been deprecated for quite some time. It was originally intended to be removed in v1.24, though this has not yet happened. 
>   
> My understanding is that currently kubelet is bundled with some CCMs, so this flag allows you to use a non-bundled CCM. The future plans are to no longer bundle CCMs, making this argument redundant (hence deprecation)
>
> Issue if you're interested in learning more: https://github.com/kubernetes/kubernetes/issues/110018
> 
> According to the linked PR, this may be included in v1.29. SO if you're running v1.29+, you might not want the cloud provider flag!

At this point, you can run

```bash
kubectl get nodes
```

from any of the machines setup, and get something like this:

```
NAME       STATUS   ROLES                       AGE    VERSION
server-1   Ready    control-plane,etcd,master   4m4s   v1.27.6+k3s1
server-2   Ready    control-plane,etcd,master   47s    v1.27.6+k3s1
server-3   Ready    control-plane,etcd,master   19s    v1.27.6+k3s1
```

And also check on the [secret encryption](https://docs.k3s.io/security/secrets-encryption) status with

```bash
k3s secrets-encrypt status
```

```
Encryption Status: Enabled
Current Rotation Stage: start
Server Encryption Hashes: All hashes match

Active  Key Type  Name
------  --------  ----
 *      AES-CBC   aescbckey
```

Sweet!
## Access
Before doing more setup, I wanted to setup `kubectl` access from my laptop. Running commands directly from the nodes themselves felt gross.

Once setup is fully complete I'll be setting up Tailscale (or maybe innernet) for access, but for now I'll just ssh port forward. You can get the kubeconfig via

```
cat /etc/rancher/k3s/k3s.yaml
```

on one of the nodes.

A quick

```
ssh -L 6443:localhost:6443 root@a server ip
```

and you're good to use `kubectl` from your local device. Do setup something a little more robust though 😊
## Hetzner Cloud Controller Manager
Try saying that 3 times really fast. Anyway [hccm](https://github.com/hetznercloud/hcloud-cloud-controller-manager) integrates our cluster with the hetzner cloud API, which means we can (stolen from the README):

1. adds the server type to the `node.kubernetes.io/instance-type` label, sets the external ipv4 and ipv6 addresses and deletes nodes from Kubernetes that were deleted from the Hetzner Cloud.
2. makes Kubernetes aware of the failure domain of the server by setting the `topology.kubernetes.io/region` and `topology.kubernetes.io/zone` labels on the node.
3. allows to use Hetzner Cloud Private Networks for your pods traffic.
4. allows to use Hetzner Cloud Load Balancers with Kubernetes Services

The hetzner blog post recommended just applying a manifest, _but_ the hccm docs recommend a helm chart. I've set it up with private networking enabled (why you would run this on a public network idk, maybe don't?)

```bash
helm repo add hcloud https://charts.hetzner.cloud
helm repo update hcloud
```

You then need to set a k8s secret containing the hetzner cloud api token and network name (this is part of why I wanted to make sure secrets were encrypted at rest)

```
kubectl -n kube-system create secret generic hcloud --from-literal=token=SOME SECRET --from-literal=network=NETWORK NAME
```

```bash
helm install hccm hcloud/hcloud-cloud-controller-manager -n kube-system --set networking.enabled=true --set networking.clusterCIDR=10.42.0.0/16
```

Do note the setting of the clusterCIDR. If you haven't changed the [k3s defaults](https://docs.k3s.io/cli/server#networking), 10.42.0.0/16 is good.

```
kubectl logs -n kube-system deployment/hcloud-cloud-controller-manager
```

Should now show some output, and

```
kubectl describe node agent-1
```

should show some extra info annotations:

```
node.kubernetes.io/instance-type=cax21
topology.kubernetes.io/region=fsn1
topology.kubernetes.io/zone=fsn1-dc14
```

## Agents
The default k3s behaviour is to actually schedule all deployments on nodes, so you may not need many of these (if that behaviour is OK with you)

Setup is pretty similar to the servers! Just with less config. You'll need your token from before too

```bash
curl -sfL https://get.k3s.io | sh -s - agent \
	--server SERVER ADDRESS \
	--node-name="$(hostname -f)" \
	--flannel-iface=enp7s0 \
	--kubelet-arg="cloud-provider=external" \
	--token=CHANGE ME 
```

You can setup as many of these as you'd like

```
kubectl get nodes
```

```
NAME       STATUS   ROLES                       AGE    VERSION
agent-1    Ready    <none>                      9s     v1.27.6+k3s1
server-1   Ready    control-plane,etcd,master   100m   v1.27.6+k3s1
server-2   Ready    control-plane,etcd,master   96m    v1.27.6+k3s1
server-3   Ready    control-plane,etcd,master   96m    v1.27.6+k3s1
```

## Ingress with Traefik
Earlier, I setup the nodes so that traefik was disabled. But now I'm setting it up?

Basically, the default k3s Traefik will use its own load balancer. There's nothing wrong with this really, but I wanted to make sure hccm was managing my LB. This means I get a proper cloud LB, with all the targets automatically managed by my cluster.

It took a bit of messing to get working (I'd made some configuration errors detailed below)

```bash
helm repo add traefik https://traefik.github.io/charts
helm repo update
```

I then created `traefik.values.yaml`. I'm not going to paste the whole thing here - generally I get the default values, save them to file, and then edit as I see fit. It's also probably a good idea for you to set things up how you want!

I will say that these annotations are very important on your service:

```yaml
service:
  enabled: true
  ## -- Single service is using `MixedProtocolLBService` feature gate.
  ## -- When set to false, it will create two Service, one for TCP and one for UDP.
  single: true
  type: LoadBalancer
  # -- Additional annotations applied to both TCP and UDP services (e.g. for cloud provider specific config)
  annotations:
    load-balancer.hetzner.cloud/location: fsn1
    load-balancer.hetzner.cloud/name: lb
    load-balancer.hetzner.cloud/use-private-ip: "true"

```

First we set the location of the lb. Give it a name. And then _tell it to use private ips_. I did not have this option at first, and my load balancer didn't work! All the targets were unhealthy.

By default, hccm was only adding the public IP addresses to the LB. My firewall was blocking it (no public ingress straight to nodes), so nothing was routing ok. With this change, all was well 😇

I'm also using Cloudflare to terminate my SSL. I'll probably setup cert-manager at some point, but I am trying to keep my cluster as stateless as possible. Plus it's nice/easy to terminate SSL at the edge.

## Next steps

This is now at the point where I can deploy stateless services + point DNS at them with Cloudflare!

There's a bunch I'd like to do next, although things are working fairly well now

1. Setup storage with Longhorn, as right now we have no storage
2. Monitoring setup
3. Cloud init for automated agent setup
4. Easy VPN access
5. Extra Security hardening

