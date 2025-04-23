---
title: Profiling zsh and fixing my slow shell
date: 2024-02-16
tags:
  - shell
  - zsh
cover: https://img.ellie.wtf/i/65f53ca525e5809faa419fcd628893d92a4d003b3aa1367eda9c3267cd462617.png
---
My zsh has been a _little_ slow to start for a while. Never enough to be a significant bother, but always something I've been meaning to get around to. Thorsten Ball had a great writeup about this [here](https://registerspill.thorstenball.com/p/how-fast-is-your-shell). Maybe I've had weights in my shoes for too long!

Recently I've been messing with the `atuin init` command - this is ran at shell startup. I want to ensure it's fast, and we don't cause slow shells for anyone. 

What I did:

1. Whack `zmodload zsh/zprof` at the top of my `.zshrc`
2. `zprof` at the bottom of the same file

Upon opening a new shell, I get a nice table showing where zsh is spending time

![](https://img.ellie.wtf/i/eeadd0c2efb5f70b219c7d6cfba2bad121ea7d17e3459e661a437369f7e68053.png)

It's pretty obvious that `nvm` is to blame here! With a bit of Googling, it seems like I'm among the last to figure this out. Oops.

## Fixing it

I do use nvm reasonably often, so let's fix it

### Lazy loading
[zsh-lazyload](https://github.com/qoomon/zsh-lazyload) allows you to lazy load commands! That way I only pay the slow nvm penalty when I'm actually using nvm. Not bad.

Install the plugin as per the readme (I used zplug), and then

```bash
lazyload nvm -- 'source ~/.nvm/nvm.sh'
```

in my .zshrc. Good to go!

### Replacements

There are a number of other options nowadays. I've been debating using [asdf](https://asdf-vm.com/) or [mise](https://mise.jdx.dev/), but haven't gotten around to figuring out which works best for me.