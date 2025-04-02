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
	| "AsyncFunction"
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

/**
 * Prettifies types (intersections etc) by ensuring type expansion
 */
export type Prettify<T> =
	& {
		[K in keyof T]: T[K];
	}
	& {};

/**
 * Requires only certain keys of T
 */
export type Required<T, K extends keyof T> = Prettify<
	{
		[P in keyof T as P extends K ? P : never]-?: T[P];
	} & Omit<T, K>
>;

/**
 * Partial on specific keys of T
 */
export type Partial<T, K extends keyof T> = Prettify<
	{
		[P in keyof T as P extends K ? P : never]?: T[P];
	} & Omit<T, K>
>;

/**
 * `Omit` with constrained keys
 */
export type StrictOmit<T, K extends keyof T> = {
	[P in keyof T as Exclude<P, K>]: T[P];
};

/**
 * `Exclude` with constrained keys
 *
 * @example
 *
 * type Fruits =	"apple" | "banana"| "cherry";
 *
 * type A = StrictExclude<Fruits, "apple">;
 */
export type StrictExclude<T, K extends T> = T extends K ? never : T;

/**
 * `Extract` with constrained keys
 */
export type StrictExtract<T, U extends T> = T extends U ? T : never;

export type Timeout = ReturnType<typeof setTimeout>;

// https://github.com/Microsoft/TypeScript/issues/27024
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 0) extends
	<U>() => U extends Y ? 1 : 0 ? true : false;

export type ReadOnlyKeys<T> = {
	[K in keyof T]:
		Equals<{ [P in K]: T[K] }, { readonly [P in K]: T[K] }> extends true ? K
			: never;
}[keyof T];

export type IsReadOnlyObject<T> = keyof T extends ReadOnlyKeys<T> ? true
	: false;

export type StructuredCloneValue =
	// Primitive types except symbol
	| null
	| undefined
	| boolean
	| string
	| number
	| BigInt
	// Complex types
	| Date
	| RegExp
	| ArrayBuffer
	| DataView
	// Error types
	| Error
	| EvalError
	| RangeError
	| ReferenceError
	| SyntaxError
	| TypeError
	| URIError
	| AggregateError
	// Typed arrays
	| Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array
	| BigInt64Array
	| BigUint64Array
	// API types
	// | AudioData // Cannot find name 'AudioData'.?
	| Blob
	| CryptoKey
	| DOMException
	| DOMMatrix
	| DOMMatrixReadOnly
	| DOMPoint
	| DOMPointReadOnly
	| DOMQuad
	| DOMRect
	| DOMRectReadOnly
	| File
	| FileList
	| FileSystemDirectoryHandle
	| FileSystemFileHandle
	| FileSystemHandle
	| ImageBitmap
	| ImageData
	| RTCCertificate
	| VideoFrame
	// Generic types
	| Map<StructuredCloneValue, StructuredCloneValue>
	| Set<StructuredCloneValue>
	| StructuredCloneValue[]
	| { [key: string]: StructuredCloneValue };
