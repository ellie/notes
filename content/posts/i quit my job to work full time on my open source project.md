---
title: I quit my job to work full time on my open source project
description: Quitting my job to start a company
date: 2024-01-09
cover: https://img.ellie.wtf/i/a820191a338753e81cca394a72f23622f7465fb312f909e3224f8ba5d818348b.jpg
---

_Atuin supercharges your productivity by enabling you to rapidly retrieve any command you've ran, at any time, from anywhere. It stores your shell history in a database, recording additional command context and syncing it (e2e encrypted) across devices._

The 22nd of December was my last day leading the infrastructure team at [PostHog](https://posthog.com). Going forwards, I'm starting a company and working full time on [Atuin](https://atuin.sh).

> [!info]
> Atuin will continue to be open source and available for free in its current form as a self-hosted tool. By going full-time I hope I can focus on adding new premium hosted features for advanced users, and begin to support business usage.

### How did I get here?

I started Atuin a few years ago now, to scratch an itch I had. I always felt that the shell should be easier to use, and that the state of shell history was the #1 problem there. I'd be googling commands that I knew I'd ran several times at some point in the past, or booting up my other laptop just to retrieve an incantation from earlier that week.

It turns out, a whole bunch of people felt the same.

[![Star History Chart](https://api.star-history.com/svg?repos=atuinsh/atuin&type=Date)](https://star-history.com/#atuinsh/atuin&Date)
Some people even contributed - thank you so much to the more-than-150 people who've taken the time to make a PR, no matter how large or small. An extra special thank you to those of you who've stuck around a bit longer ❤️

At the beginning of 2023, I spoke at [FOSDEM](https://www.youtube.com/watch?v=uyRmV19qJ2o). I had a _tonne_ of fantastic feedback about the tool, both in person and online. This was great for my motivation - after a couple of years, I was starting to feel tired as an OSS maintainer. 

I started putting more time and energy into the project, which paid off very well. Our usage grew massively - more contributors, more signups, more active community members, more features in blogs/podcasts/etc. We also moved the GitHub repo from `ellie/atuin`, to `atuinsh/atuin`. 

I also had to make some improvements to the infrastructure, mostly because we store a lot of data (encrypted blobs don't compress well...). While it is possible to self host Atuin, many people use the hosted sync server. Some metrics:

#### User growth
![User growth chart](https://img.ellie.wtf/i/2b7564cc93397c096dcf0ce9f903c5ac06c337f16336b54ddffc4c82e58dd896.jpg)

#### History growth
![](https://img.ellie.wtf/i/84fb1e13d7fa2e667822803b36fa5d6ab71c0f7ead9e66237ac116a278778371.jpg)

We started 2023 with users uploading (in total) around 10,000 lines of history a day. We ended it with users uploading almost 200,000 lines a day. 

### A balancing act

It turns out, the more you put in, the more you get out. While it was great to see growth in the project, it started to get away from me towards the end of the year. I'd work on Atuin before work, but more often than not I wouldn't even get through the open PRs + issues. Let alone work on new features/fixes that were needed. Earlier in the year, my friend [Conrad](https://github.com/conradludgate) had also stepped back from helping out maintaining, which was totally understandable.

I felt like I was letting the project down, neglecting my social life, and was trying very hard not to be distracted at work.

In order to grow the project how I'd like to, I needed to be able to dedicate more time to it than is fair while having a full time job.

So, I'm starting a company and working on Atuin full-time. 

I've always wanted to run my own company, for pretty much my entire life. But I didn't want to start something just for the sake of it. I want to build something people love, and find useful.

### Money

I'd been paying out of pocket to run the Atuin servers the whole time. While not a huge amount, it also wasn't tiny - 10s of millions of lines of encrypted shell history add up to a reasonably large amount of storage. Especially when you account for backups and moderate redundancy.

Towards the end of 2022, a friend suggested I setup GitHub sponsors. I didn't think anything would come of it, but it did! After a few months I received enough sponsorship to cover the server bills, and to offset some of what I'd paid so far.

I really appreciate all of my sponsors for liking my work enough to contribute financially, when there's no paywall or requirement whatsoever.

One thing I did notice though - I only really gained sponsors when I regularly mentioned that my sponsors account existed. Otherwise, I lost more to attrition than I gained. This sat weirdly with me, as it felt like begging. 

Speaking privately with some other maintainers, this is not an uncommon experience. I definitely won't be paying my rent with sponsors any time soon.

I read an [interview with Mike Perham](https://codecodeship.com/blog/2023-04-14-mike-perham), the creator of Sidekiq, that sat with me. I encourage you to check it out, but these two quotes stuck in my mind

> “in the end, OSS burnout will kill any free project which gets traction”

I'd certainly felt this. I don't want the project to die, and I know just how great it can be with proper care and attention. But without change, I'd probably give up to spend more time on other projects or pursuits.

The second quote is one that I'd spend a good while thinking about

> “If you build something valuable, charge money for it”

### Looking forwards

My hope is that I can build valuable features that people wish to pay for, on top of what we already have. Partly advanced/power users, but especially for business use cases.

I'd love to grow Atuin to the point where I can pass it on, and sponsor the people and projects that we depend on. 

I'm going to wrap up there, but if you have any thoughts please do get in touch! I'd love to hear your thoughts on where Atuin should go next.

### Sponsors
If you or your company would like to provide support, please check out the [Atuin GitHub sponsors](https://github.com/sponsors/atuinsh)! 

Depending on the tier, I'll mail out stickers and t-shirts to supporters - there's also some tiers for companies that wish to show their support publicly, and receive a link back to their site.

### Stay in touch

Website: https://atuin.sh<br>
Forum: https://forum.atuin.sh<br>
Email: ellie@atuin.sh

Discord: https://discord.gg/jR3tfchVvW

GitHub: https://github.com/atuinsh/atuin

Mastodon: https://hachyderm.io/@atuin<br>
Twitter/X: https://twitter.com/atuinsh
