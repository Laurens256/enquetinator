export default {
	toUpperCase: (str: string) => {
		if(str) {
			return str.toUpperCase();
		}
	},

	spreadAttributes: (attributes: string[]) => {
		if(attributes) {
			return attributes.join(' ');
		}
	},

	eq: function() { return reduceOp(arguments, (a: any, b: any) => a === b); },
	ne: function() { return reduceOp(arguments, (a: any, b: any) => a !== b); },
	lt: function() { return reduceOp(arguments, (a: number, b: number) => a  <  b); },
	gt: function() { return reduceOp(arguments, (a: number, b: number) => a  >  b); },
	lte: function() { return reduceOp(arguments, (a: number, b: number) => a  <= b); },
	gte: function() { return reduceOp(arguments, (a: number, b: number) => a  >= b); },
	and: function() { return reduceOp(arguments, (a: any, b: any) => a  && b); },
	or: function() { return reduceOp(arguments, (a: any, b: any) => a  || b); },
};

// bron: https://gist.github.com/servel333/21e1eedbd70db5a7cfff327526c72bc5
// geen idee hoe dit werkt lol
const reduceOp = (args: any, reducer: any) => {
	args = Array.from(args);
	args.pop(); // => options
	const first = args.shift();
	return args.reduce(reducer, first);
};