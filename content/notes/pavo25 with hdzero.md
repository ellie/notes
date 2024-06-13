---
title: HDZero Freestyle V2 VTX with my Pavo25 V2
date: 2024-06-13
description: Setting up the HDZero Freestyle V2 with my Pavo25 V2
---
Recently I've been playing around with FPV drones - I now have a Pavo25 V2. I had an old set of DJI goggles lying around, but the latency/buffering just didn't work for me. I was set on HDZero.

Putting the Freestyle V2 in place of the O3 wasn't too difficult, though a bit fiddly. Sharing this in case it can help anyone else.

The main issue I had was with the connector. Naively, I assumed I'd just be able to plug it in and "it would just work". Nopeee.

The pins are different! Here are the two pinouts

### Freestyle VTX

![](https://img.ellie.wtf/i/2a238f5deed4a871b08ca2de7be8de2b40cfc0eb6be7e1e305f75264fb7088e7.jpg)
### FC pins

![](https://img.ellie.wtf/i/d54941df0ac9431ffdd24619e56db454d779b079664ac7d7e6eec2bf7e0a9697.jpg)

So yep. They're the other way around

If you look at the top of the JST plug for the VTX, you'll see some little legs. Lift them with a knife/tweezers/something, and you can remove the wires. Put them in the correct order! Make sure TX is connected to RX, and vice versa. 

Here's mine

![](https://img.ellie.wtf/i/c27bda5248244375162b31a144e41810c084bddefe44725313ec31bc779ba405.JPG)

But yeah, otherwise HDZero is working great with my pavo. OSD fully functions, all good.