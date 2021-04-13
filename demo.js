const useKeywords = require("./proxy");

const keywords = {
	print: {
		func: msg => console.log("PRINT: " + msg),
		maxArgs: 1
	},
	addAndPrint: {
		func: (a, b) => console.log(`${a} + ${b} = ${a + b}`),
		maxArgs: 2
	}
};

with (useKeywords(keywords)) {
	print, V("Hello world");
	addAndPrint, V(50), V(25);
}
