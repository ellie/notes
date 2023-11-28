---
title: Upgrading to macOS 14 Sonoma broke my network connection
date: 2023-11-27
---
I upgraded my mac to macOS 14, Sonoma earlier today. Upon first using it, my internet wouldn't connect!

Wifi or ethernet, nothing I tried work

Even

```
ping 8.8.8.8
```

I did some searching, and it turns out the version of [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) I had installed wasn't supported.

The issue here is that without internet, I couldn't update it

The fix wasn't too difficult. Go to System Settings -> Network -> VPNs and Filters. Disable little snitch. 