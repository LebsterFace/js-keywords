module.exports = keywords => new Proxy({
		keywords,
		state: {
			args: [],
			argsRemaining: -1,
			keyword: null
		}
	}, {
	get(obj, prop) {
		if (prop === "V") {
			return value => this.addToArgs(obj, value);
		} else if (typeof prop !== "symbol") {
			this.handleKeyword(obj, prop);
		}

		return null;
	},

	has(obj, prop) {
		return prop === "V" || prop in obj.keywords;
	},

	addToArgs(obj, value) {
		if (obj.state.argsRemaining <= 0) throw new SyntaxError("Was not expecting an argument at this time!");
		obj.state.args.push(value);
		obj.state.argsRemaining--;
		if (obj.state.argsRemaining === 0) this.execKeyword(obj);
	},
	
	handleKeyword(obj, newKeyword) {
		if (obj.state.keyword !== null) throw new SyntaxError("Expecting an argument, not a keyword!");
		obj.state.keyword = obj.keywords[newKeyword];
		obj.state.args = [];
		obj.state.argsRemaining = obj.keywords[newKeyword].args;
		if (obj.state.argsRemaining === 0) this.execKeyword(obj);
	},

	execKeyword(obj) {
		obj.state.keyword.func(...obj.state.args);
		obj.state.args = [];
		obj.state.argsRemaining = -1;
		obj.state.keyword = null;
	}
});