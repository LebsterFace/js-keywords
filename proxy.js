module.exports = (keywords = {}, obj = globalThis) =>
	new Proxy(obj, {
		args: [],
		keywords,
		expectingArgument: false,
		currentWord: null,
		get(target, prop) {
			if (prop === "V" && this.expectingArgument) {
				return (value) => {
					this.args.push(value);
					if (this.args.length >= this.currentWord.maxArgs) {
						return this.__handleKeyword();
					} else {
						return true;
					}
				};
			}

			const foundWord = Object.keys(this.keywords).find(kw => prop === kw);

			if (foundWord) {
				if (this.expectingArgument) throw new TypeError("Expecting an argument, not a keyword!");

				this.currentWord = this.keywords[foundWord];
				this.args = [];

				if (this.currentWord.maxArgs > 0) {
					this.expectingArgument = true;
					return true;
				} else {
					return this.__handleKeyword();
				}
			} else {
				return Reflect.get(...arguments);
			}
		},

		__handleKeyword() {
			const v = this.currentWord.func(...this.args);
			this.currentWord = null;
			this.expectingArgument = false;
			this.args = [];
			return v;
		},

		set(target, prop, value) {
			if (prop === "V") {
				throw "Cannot change a keyword handler!";
			} else {
				return (target[prop] = value);
			}
		},

		has() {
			return true;
		}
	});
