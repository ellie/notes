---
tags:
  - tauri
title: Fixing drag events with Tauri
date: 2024-09-13
---
I've been working on a desktop app with Tauri, and had issues for a while with the "draggable" prop on some elements. Instead of them dragging as I expected, I'd just get a plus icon.

The fix was pretty easy

I added
```
app: {
	window:[{
		...snip,
		"dragDropEnabled": false
	}]
}
```

to my `tauri.config.json`.

This is mentioned in the Tauri docs: https://v2.tauri.app/reference/javascript/api/namespacewebview/#properties-1