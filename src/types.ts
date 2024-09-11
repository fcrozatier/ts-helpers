// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#custom_method_that_gets_a_more_specific_type

export type LooseAutocomplete<T extends string> = T | Omit<string, T>;

type Types = LooseAutocomplete<
	| "null"
	| "undefined"
	| "boolean"
	| "number"
	| "bigint"
	| "string"
	| "symbol"
	| "function"
	| "class"
	| "array"
	| "date"
	| "error"
	| "regexp"
	| "object"
>;

/**
 * A more reliable `type` function
 */
export function type(value: unknown): Types {
	if (value === null) {
		return "null";
	}

	if (value === undefined) {
		return "undefined";
	}

	const baseType = typeof value;
	// Primitive types
	if (!["object", "function"].includes(baseType)) {
		return baseType;
	}

	// Symbol.toStringTag often specifies the "display name" of the
	// object's class. It's used in Object.prototype.toString().
	// @ts-expect-error
	const tag = value[Symbol.toStringTag];
	if (typeof tag === "string") {
		return tag;
	}

	// If it's a function whose source code starts with the "class" keyword
	if (
		baseType === "function" &&
		Function.prototype.toString.call(value).startsWith("class")
	) {
		return "class";
	}

	// The name of the constructor; for example `Array`, `GeneratorFunction`,
	// `Number`, `String`, `Boolean` or `MyCustomClass`
	const className = value.constructor.name;
	if (typeof className === "string" && className !== "") {
		return className.toLowerCase();
	}

	// At this point there's no robust way to get the type of value,
	// so we use the base implementation.
	return baseType;
}

export type StrictOmit<T, K extends keyof T> = {
	[P in keyof T as Exclude<P, K>]: T[P];
};

export type StrictExtract<T, U extends T> = T extends U ? T : never;
