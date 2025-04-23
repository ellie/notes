---
title: TypeScript import path aliases
date: 2024-04-09
tags:
  - tauri
  - typescript
---
I've been working on some more frontend code recently, and got quite tired of my import paths looking like this

```
../../foo/bar/etc
```

How horrible! If I ever change directory structure, things are liable to break. That won't do!

The internet suggested adding the following to my `tsconfig.json`

```json
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },

```

This resolved the squiggly lines in my editor, but my build was still failing. For some context - I'm using Tauri and Vite here.

It turns out, the issue was due to Vite. In order to support these aliases, we also need to add some config to `vite.config.ts`

First, install a plugin

```
npm install --save-dev vite-tsconfig-paths
```

Then, add it to your config

```typescript
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(async () => ({
  plugins: [tsconfigPaths()], // I imagine you have other plugins

  // you probably have a bunch more here too
});
```

All done! My import paths are nice now