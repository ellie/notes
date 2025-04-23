---
title: Block AI crawlers
date: 2024-05-06
tags:
  - ai
---
I have very mixed opinions on LLMs, as they stand. This note won't be digging into my thoughts there - I don't want to have that discussion.

However, while I'm not exactly doing cutting-edge research here, I do put effort into publishing for _humans_. I like knowing that the 10 minutes I spent writing here might save a few people time in the future.

I don't do this so someone can build a model, and then sell it for a subscription.

My new [robots.txt](https://ellie.wtf/robots.txt) now excludes the user agents of a number of known LLM crawlers. Most of the crawlers I've listed are confirmed, and I've cited sources for each. The robots.txt of news publishers is also pretty handy, as they also block LLMs.

If you'd like to do the same, feel free to take mine!

```
# I know this can just be _totally_ ignored by crawlers
# But let's hope they behave well :)

# Code: https://github.com/ellie/notes
# Source: https://darkvisitors.com/

# OpenAI, ChatGPT
# https://platform.openai.com/docs/gptbot
User-agent: GPTBot
Disallow: /

# Google AI (Bard, etc)
# https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers
User-agent: Google-Extended
Disallow: /

# Block common crawl
# I have mixed feelings on this one, but many models are trained on this data
# It is also used to bootstrap new search indices though
# https://commoncrawl.org/ccbot
User-agent: CCBot
Disallow: /

# Facebook
# https://developers.facebook.com/docs/sharing/bot/
User-agent: FacebookBot
Disallow: /

# Cohere.ai
# https://darkvisitors.com/agents/cohere-ai
User-agent: cohere-ai
Disallow: /

# Perplexity
# https://docs.perplexity.ai/docs/perplexitybot
User-agent: PerplexityBot
Disallow: /

# Anthropic
# https://darkvisitors.com/agents/anthropic-ai
User-agent: anthropic-ai
Disallow: /

# ...also anthropic
# https://darkvisitors.com/agents/claudebot
User-agent: ClaudeBot
Disallow: /
```

