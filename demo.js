const proxyGen = require("./proxy");
const proxy = proxyGen({
    print: {
        func: msg => console.log("PRINT: " + msg),
        maxArgs: 1
    }
});

with (proxy) {
	print, V("Hello world");
}