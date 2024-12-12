import { type, type Prettify } from "./types.js";

/**
 * `Object.keys` with narrower types
 */
export const keys = Object.keys as <T>(
	o: T,
) => Extract<keyof T, string | number>[];

/**
 * Type predicate for narrowing a string to be used to index an object
 *
 * Example:
 * Object.keys(user).forEach((key) => {
		if (isKey(user, key)) {
			console.log(user[key]);
			}
 */
export function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
	return k in x;
}

/**
 * Recursively trim undefined values of an object
 */
export const trimUndefined = <T extends Record<string, unknown>>(obj?: T) => {
	if (!obj) return obj;

	for (const [key, val] of Object.entries(obj)) {
		if (val === undefined) {
			delete obj[key];
		} else if (type(val) === "object" && val) {
			trimUndefined(val as Record<string, unknown>);
		}
	}

	return obj;
};

type Merge<T1, T2> = Prettify<Omit<T1, keyof T2> & T2>;

type MergeArrayOfObjects<T extends readonly object[], T1 = {}> = T extends [
	infer T2 extends object,
	...infer Rest extends object[],
]
	? MergeArrayOfObjects<Rest, Merge<T1, T2>>
	: T1;

/**
 * Type-safe `Object.assign`
 */
export const merge = <T extends readonly object[]>(
	...objects: T
): MergeArrayOfObjects<T> => {
	return Object.assign({}, ...objects);
};
