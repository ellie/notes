---
title: Custom keybinding with react-codemirror
date: 2024-07-17
---

I'm currently using uiwjs/react-codemirror for a project, and needed to add a custom binding to cmd+enter

The documentation didn't quite show what I needed, but with the following you can bind custom keys

```js
import React from 'react'; 
import CodeMirror from '@uiw/react-codemirror'; 
import { keymap } from '@codemirror/view'; 
import { defaultKeymap } from '@codemirror/commands'; 

const MyCodeEditor = () => { 
	const handleCmdEnter = React.useCallback((view) => { 
		console.log('Cmd+Enter pressed!'); 
		return true; 
	}, []); 
	
	const customKeymap = keymap.of([ 
		{ 
			key: 'Mod-Enter', 
			run: handleCmdEnter, 
		}, 
	]); 
	
	return ( 
		<CodeMirror 
			value="code and stuff" 
			extensions={[customKeymap]} 
		/> 
	); 
}; 

export default MyCodeEditor;
```

Note that you may need to ensure your keymap extension is listed _before_ other extensions, otherwise it may be handled too soon.---
