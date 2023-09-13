---
permalink: projects/ipod
cover: https://img.ellie.wtf/i/61809d8afda86035bc05e3b8b97c34fc7ad7b5d3f41978d1a1f38d0b1d2aa45f.jpg
title: An iPod for 2022
date: 2022-02-14
---
![](https://img.ellie.wtf/i/61809d8afda86035bc05e3b8b97c34fc7ad7b5d3f41978d1a1f38d0b1d2aa45f.jpg)

> [!info] Press
> This also ended up getting picked up by [Vice](https://www.vice.com/en/article/qjbexd/a-software-engineer-upgraded-an-old-ipod-for-2022?ref=ellie.wtf), [Hackaday](https://hackaday.com/2022/02/16/classic-ipods-are-super-upgradeable-in-2022/?ref=ellie.wtf), [Techspot](https://www.techspot.com/community/topics/breathing-new-life-into-an-old-ipod-with-a-few-thoughtful-upgrades.273895/?ref=ellie.wtf), as well as a whole  bunch of other publications! Thank you so much for your interest in my work 💖

I shared this on Twitter recently, and have had a bunch of people ask me for more details - so here they are!

![](https://twitter.com/ellie_huxtable/status/1492989732002877443)

Just a heads up that this is pretty image-heavy, in case you're on a limited data plan.

I've always been the sort of person who struggles to do anything without some sort of music going on in the background. A long time ago this was with a little mp3 player, then an iPod, and eventually on to a phone with Spotify.

I realised something not so long ago - I was being very lazy. I'd often just play my weekly/daily mix, or some playlist I made up a long time ago. I'd never really think about what music I liked + what music I wanted to listen to. I think this is in part due to the fact that almost any music was available - which made choosing even more difficult.
Anyway. Over the weekend I took apart a 5.5th gen iPod Classic (or iPod Video) and made it suit 2022 a little better :D

I won't be detailing precisely how I did it. I mostly followed [iFixit](https://www.ifixit.com/Device/iPod_5th_Generation_%28Video%29?ref=ellie.wtf), and fumbled my way through the rest. Almost all of the cables can be removed by lifting a little black lever, and are equally as easy to replace. I'd recommend ordering some iPod tools :)

![](https://img.ellie.wtf/i/7132cb66d39602d2741da6ade98d86c01a16c8e6dcc33c26387145da711afeef.jpg)

# The iPod

I went with a 5.5 for a few reasons. Firstly, the front is plastic. I was going to be replacing the front anyway, so it might as well be easy to open!

Secondly, and most importantly - the DAC. This generation of iPod was the last to feature the "wolfson DAC", which is very well known for being [of fantastic quality](https://www.macintoshhowto.com/ipod/which-ipod-has-the-best-audio-quality.html/2?ref=ellie.wtf).

Something else to be aware of is that different models of this iPod had different amounts of memory. The 80GB has 64mb of memory, while smaller capacities have only 32mb. I went with the 80GB :)

# The components

I ordered a bunch of components for this, as I knew pretty much exactly what I wanted. The vast majority of them were found on eBay, where there is a LOT of choice. If there's anything specific, I'll link it

## Opening

Opening the iPod was made fairly simple with the iPod tools. After working my way around the casing, it just popped open. iFixit had good instructions there!

![](https://img.ellie.wtf/i/172fbb1d32d2f1d61f483813e01d11105bb78aa293487dd841a68e604b822cdd.jpg)
## Storage

First and foremost, storage. 80GB is definitely not enough for what I want. The original iPod also used a HDD - ideally I'd be swapping this out for something solid state.

![](https://img.ellie.wtf/i/fafb72c71690e71291140105db0fb7ae5c7e56c1c270874f758386766b53ce91.jpg)

There's a lot of choice here, but I went with an [iFlash Quad](https://www.iflash.xyz/store/iflash-quad/?ref=ellie.wtf). This lets you use up to four SD cards! There's no real performance difference here compared to other storage options, as it's pretty limited regardless. In addition, SD cards use less power + put out less heat than the comparable SSDs.

![](https://img.ellie.wtf/i/c458772fca92497b4d10740748a36abc645066a2c7b629a45ed015615d67a346.jpg)

This is also thinner than the HDD, allowing you to fit a larger battery or other mods into the chassis.

Something to be aware of is that the original iPod firmware can struggle with the larger capacity drives, so you will probably need something like [Rockbox](https://www.rockbox.org/?ref=ellie.wtf). Bear in mind that Rockbox can have issues with the iFlash hardware, so you may need to run a daily build (or transfer your music while [booted into the original firmware](https://www.rockbox.org/wiki/Main/IpodFAQ?ref=ellie.wtf#How_do_I_start_the_original_Apple_Firmware_63))

## Battery

You can find a LOT of batteries on eBay and other places online, so I won't really say much about that here. I went with a 3000mah :)

![](https://img.ellie.wtf/i/84deb9a76972e7ed15e62bb68e1fc5a1abe97772cc4ac0df8ec1af0b93ec5b68.jpg)

The battery is one of the first things you need to unplug, as otherwise you can't fully open the iPod. Attemping to open without unplugging will result in broken cables!

![](https://img.ellie.wtf/i/ee10948f7ed2584413cab577d197714348f863788c64563d76dc7868911de399.jpg)
## Front casing

I bought a clear front casing for mine, as I like seeing the guts of my gadgets! Installing this was more fiddly than I expected. Once taken apart, there were six super tiny screws along the edge of the chassis that needed removing. From there, the front comes off - the iPod scroll wheel is actually just resting in place. So if you're not careful, it kinda flops about! As does the display

![](https://img.ellie.wtf/i/6c11cb0c1adf8ec0e92c8156e8be54590ac41f94a53acc87c4a642c2625d8532.jpg)

![](https://img.ellie.wtf/i/ceeaee98f04689b6fca27e2604b98663ddc8e37ffff7e4026757fbcb41e6d7b5.jpg)
## Rear casing
A small detail I wanted to change was the capacity written on the back. After all, it's not 80GB any more. Also found on eBay, I bought a new rear casing

![](https://img.ellie.wtf/i/5d07e9739788d56cb152f76c3c9b8783c05fe78373c956a144e85e1d3dbd9372.jpg)


The issue with this is that the headphone jack and hold switch also needed transferring across. This wasn't too difficult in the end, though a little fiddly + I had to be very careful with the cables as they are fragile

![](https://img.ellie.wtf/i/13f82968923a66a81656f04e8c15ef4cc7301faecf87a0d1c14662b5c49db6d8.jpg)

# Moment of truth
After I'd put everything back together, I was worried it'd not boot. Or that it would boot, but input/sound wouldn't work.

Switching it on resulted in this screen:

![](https://img.ellie.wtf/i/4f791d0ca385899285662c639fb68d20d04ee4e7a4f3c835e9ff06f183081fd9.jpg)


So, I restored it on iTunes, and it worked! I followed up by installing [Rockbox](https://rockbox.org/?ref=ellie.wtf), and then the theme called "[FreshOS](https://forums.rockbox.org/index.php?topic=53574.0&ref=ellie.wtf)" which gives it a nice clean look (in my opinion). Rockbox has a nice installer which makes this super easy.

In addition, I no longer need to use iTunes! The iPod mounts as external storage, and the files can just be copied across. Easy.

Rockbox also means I can [play doom](https://twitter.com/ellie_huxtable/status/1493172771790245890?s=20&t=C9L2RYcRdfT7aPmvmQqJmw&ref=ellie.wtf), or [control my Macbooks volume from the iPod](https://twitter.com/ellie_huxtable/status/1492989855101509634?s=20&t=C9L2RYcRdfT7aPmvmQqJmw&ref=ellie.wtf) (you know, a very useful thing to do...)

Anyway, if you have any questions please do feel free to get in touch on [Twitter](https://twitter.com/ellie_huxtable?ref=ellie.wtf)!

![](https://img.ellie.wtf/i/16f835dd148da5bc8b43df6eded00dcd58aa1f5437d4397dc6999b8dfd1507b7.jpg)

![](https://img.ellie.wtf/i/108be2390b667272528efd7a917886ab99d309d10ee33ebdf2eeb6ecd039b4be.jpg)