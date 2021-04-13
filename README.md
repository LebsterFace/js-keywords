# JS Keywords
Custom keywords in JavaScript!

*(this is not a serious repository, PLEASE don't use it in production code)*

## Create your keywords:
Just define a handler function and a maximum number of arguments:
```js
const keywords = {
  "print": {
    func: msg => console.log("PRINT: " + msg),
    maxArgs: 1
  }
}
```

## Then, use them in a `with` block:
```js
const useKeywords = require("./proxy");
with (useKeywords(keywords)) {
  print, V("Hello world");
}
```
This code outputs `PRINT: Hello world` to the console.

**Note:** To supply arguments, you need to use the `V` function. Multiple arguments can be passed like so:
```js
with (proxy) {
  someKeyword, V("One"), V("Two"), V("Three");
}
```