import { type } from "./type.js";

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
export const trimUndefined = <T extends Record<string, unknown>>(
	obj?: T,
): T => {
	if (!obj) return {} as T;

	const newObj = {} as Record<string, unknown>;

	for (const [key, val] of Object.entries(obj)) {
		if (val === undefined) continue;

		if (type(val) === "object") {
			newObj[key] = trimUndefined(val as Record<string, unknown>);
		} else {
			newObj[key] = val;
		}
	}

	return newObj as T;
};

/**
 * Recursively merges all non undefined properties of target into source and overrides the others
 *
 * Useful for merging defaults with user options
 *
 * @example
 * const defaults = {a:1, b: {c: true, d: false}} satisfies Options;
 * const options: Options = {a: undefined, b: {c: false}};
 * merge(defaults, options) // {a:1, b: {c:false, d: false}}
 */
export const merge = <U extends Record<string, unknown>, T extends U>(
	target: T,
	source?: U,
) => {
	if (!source) return target as T & U;

	for (const [key, val] of Object.entries(source)) {
		if (val === undefined) continue;

		const targetVal = target[key];

		if (
			key in target &&
			type(val) === "object" &&
			type(targetVal) === "object"
		) {
			// @ts-ignore
			target[key] = merge(targetVal, val);
		} else {
			// @ts-ignore
			target[key] = val;
		}
	}
	return target as T & U;
};
