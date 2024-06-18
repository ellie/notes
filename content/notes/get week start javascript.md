---
title: Get the first day of the week with JavaScript
tags:
  - javascript
  - web
---
I'm currently building a calendar data display for [Atuin](https://atuin.sh), and wanted to ensure that the week started with the correct day.

While I'm a big fan of things being configurable and flexible, I don't want to introduce a new config option unless it's required!

Luckily browser localisation exposes plenty of options.

## Get a Locale object

First we need a Locale! They're created like so

```javascript
new Intl.Locale('CODE')

// eg

new Intl.Locale('en-GB')
```

We can get the code as follows

```javascript
new Intl.Locale(navigator.language)
```

This is a set by the user in their browser

## Get the weekinfo

Once we have the Locale, it's simple

```javascript
let locale = new Intl.Locale(navigator.language);
let weekinfo = locale.getWeekInfo();
console.log(weekinfo.firstDay); // prints 1 for me, in the UK
```

Docs here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo