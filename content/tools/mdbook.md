---
permalink: tools/mdbook
date: 2023-09-01
tags:
  - tool
---
# mdbook

I was trying out mdbook for this, but no longer use it. I'll keep the notes just in case.

## Vercel deployments
I currently deploy static sites to vercel, because I'm lazy and don't want to spend _even more time_ doing infra.

To get mdbook to deploy successfully:

1. Set Framework Preset to "Other"
2. Set Output Directory to "book"
3. Set Build Command to: 
```
curl -Lo mdbook.tar.gz https://github.com/rust-lang/mdBook/releases/download/v0.4.32/mdbook-v0.4.32-x86_64-unknown-linux-musl.tar.gz; tar -xvzf mdbook.tar.gz; ./mdbook build
```

You'll probably want to update the version there. Downloading from the release page, we can deploy a wiki in 4s!

Alternatively, you could build from source - though this will take minutes, not seconds:
```
amazon-linux-extras install rust1; cargo install mdbook; mdbook build
```

The only upside I can see here is that it's automatically the newest version

## Analytics
I use [Plausible](https://plausible.io). mdbook supports custom javascript, but only with a script file in your repo. Something like this does nicely:

book.toml
```toml
[output.html]
additional-js = ["plausible.js"]
```

plausible.js
```javascript
const script = document.createElement('script');

script.src = "https://plausible.io/js/script.js";

script.defer = true;
script.setAttribute("data-domain", "YOUR DOMAIN HERE"); // you probs want to change this

document.body.appendChild(script);
```