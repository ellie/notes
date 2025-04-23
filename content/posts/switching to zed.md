---
title: My experience switching to Zed from NeoVim
date: 2024-04-16
description: Experimenting with Zed, a new text editor
---
I've been using Vim/NeoVim for the past decade, at least. I converted from Sublime Text after my workflow became more terminal-heavy.

In the years since, I've tried a great many editors - and always fell back to Vim. VSCode was cool, but the Vim emulation just wasn't quite right. I kept tripping up over myself, and the experience was very jarring. I also felt that the editor was a bit overcrowded - I'd like it to leave me alone to edit text, please!

I also tried emacs (well, evil), helix, and others.

But so far, Zed has been the closest to tempting me away. I tried it sometime last year, but it felt a little too unpolished - plus, at the time it was not [open source](https://zed.dev/blog/zed-is-now-open-source). 

I started with [Atuin](https://atuin.sh), a Rust project. The tooling was all setup automatically, with no configuration needed on my part. Nice!

## Settings

Zed is pretty nice out of the box, but there were a few things I wanted to change.

Here's my entire config:

```json
{
  "theme": "Gruvbox Dark Soft",
  "vim_mode": true,
  "buffer_font_size": 12,
  "ui_font_size": 14,
  "buffer_font_family": "FiraCode Nerd Font",
  "relative_line_numbers": true,
  "terminal": {
    "line_height": "standard"
  },
  "lsp": {
    // Specify the LSP name as a key here.
    "rust-analyzer": {
      //These initialization options are merged into Zed's defaults
      "initialization_options": {
        "checkOnSave": {
          "command": "clippy"
        }
      }
    }
  }
}

```

Other than the obvious theme/font settings, I found the terminal line height a little weird out of the box. It seemed to be a bit higher than it should be, which made some TUIs look odd. Setting it to "standard" resolved this.

I also made some adjustments to the lsp config for Rust.
## Key bindings

The next changes I made were to the Vim bindings. They're pretty standard out of the box, but I have a few core customisations that I really need in order to be productive.

- `jj` - I remap jj -> esc, to keep my fingers on the home row
- `<leader>w` - to save the current buffer
- `<leader>s t` - grep the entire workspace
- `<leader>f` - search for files

As far as I am aware, Zed does not have the concept of a leader. That's ok! I can hardcode the bindings.

Here's what I have:

```json
[
  {
    "context": "Editor && vim_mode == insert && !menu",
    "bindings": {
      "j j": "vim::NormalBefore"
    }
  },
  {
    "context": "Editor && vim_mode == normal && !menu",
    "bindings": {
      "space w": "workspace::Save",
      "space s t": "workspace::NewSearch",
      "space f": "file_finder::Toggle"
    }
  }
]

```

I thought it was pretty cool how the keymap allows me to specify a context as an expression. It's far easier to read than something like `inoremap`.

You can find other actions in the default keybindings (cmd-shift-p, search default keybindings)

## Editing experience

I've found Zed to be very pleasing to use. Everything is buttery smooth, and you can really feel that they've put [lots of work into performance](https://zed.dev/blog/120fps). The UI is minimal, and it does remind me a bit of Sublime.

Their [UI framework](https://www.gpui.rs/) is written in Rust, and hopefully we will see more applications using it soon!

## Will it stick?

Not yet. But it was close! I've used it for longer than any other editor I've tried, but I still feel strange using an editor with a terminal in it - rather than a terminal with an editor. That is absolutely a me problem though, and nothing to do with Zed.

Otherwise there's still a couple of gaps with the vim emulation. I use [marks](https://vim.fandom.com/wiki/Using_marks) pretty heavily, and they aren't there yet - which is something I kept tripped over. From time to time, my jj binding didn't seem to trigger - perhaps I've pressed it too fast. I couldn't easily replicate this though, it just happened from time to time.

I think I'll keep checking in with Zed, and perhaps it will fully convert me soon.