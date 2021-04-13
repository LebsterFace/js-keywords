# JS Keywords
Custom keywords in JavaScript!

*(this is not a serious repository, PLEASE don't use it in production code)*

## Create your own keywords and then use them
Just define a handler function and a maximum number of arguments:
```js
const keywords = {
    "print": {
        func: msg => console.log("PRINT: " + msg),
        maxArgs: 1
    }
}
```

## Then, create the `Proxy` for your keywords:
```js
const proxyGen = require("./proxy"),
      proxy = proxyGen(keywords);
```

## Finally, use your keywords inside a `with` block:
```js
with (proxy) {
	print, V("Hello world");
}
```
**Note:** To supply arguments, you need to use the `V` function. Multiple arguments can be seperated like so:
```js
with (proxy) {
	print, V("One"), V("Two"), V("Three");
}
```