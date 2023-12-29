---
title: Postgres HBA with a Tailscale network
tags:
  - postgresql
  - tailscale
date: 2023-11-03
---
Following on with my [[postgres on zfs]] setup, I needed to configure the auth so that my [[postgresql | PostgreSQL]] replica could securely connect to the primary.

The constraints here are that I'm not using a cloud private network, so need a VPN of some kind! I'm using [Tailscale](https://tailscale.com), which is pretty much just wireguard made easy.

## Firewall
First up, following Tailscale's [docs](https://tailscale.com/kb/1077/secure-server-ubuntu-18-04/). Make sure you don't lock yourself out! I'm also using tailscale SSH with 2fa.

```bash
ufw allow in on tailscale0
ufw default deny incoming
ufw default allow outgoing

ufw reload

systemctl restart sshd
```

## postgresql.conf
Next, we need to tell postgres to listen on all addresses. In your postgres config:

```
listen_addresses = '*'
```

I wish I could just provide `tailscale0`, the tailnet CIDR or... anything else. Alas. It's not that flexible, but at least we can lock things down with the firewall + hba. Don't skip the other steps!

# pg_hba

Next up we just need to setup pg_hba.conf to allow the login!

```
host    all             all             100.64.0.0/10           scram-sha-256
```

Where `100.64.0.0/10` is the CIDR range used by Tailscale. Read more [here](https://tailscale.com/kb/1015/100.x-addresses/).