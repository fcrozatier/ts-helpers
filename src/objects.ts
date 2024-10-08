import { type, type StructuredCloneValue } from "./types.js";

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

/**
 * Recursively merges all non undefined properties of source into target and overrides the others, but preserves the getters / setters of the source
 *
 * The target must be a partial subtype of the source type for this deep merge to make sense on the type level.
 *
 * Useful for merging defaults with user options
 *
 * @example
 * const defaults = {a:1, b: {c: true, d: false}} satisfies Options;
 * const options: Options = {a: undefined, b: {c: false}};
 * merge(defaults, options) // {a:1, b: {c:false, d: false}}
 */
export const merge = <U extends Record<string, unknown>, T extends Partial<U>>(
	target: T & StructuredCloneValue & Record<string, unknown>,
	source?: U,
) => {
	const newTarget = structuredClone(target) as T & U;

	if (!source) return newTarget;

	for (const [key, val] of Object.entries(source)) {
		if (val === undefined) continue;

		const targetVal = target[key];

		if (
			key in target &&
			type(val) === "object" &&
			type(targetVal) === "object"
		) {
			// @ts-ignore
			newTarget[key] = merge(targetVal, val);
		} else {
			Object.defineProperty(
				newTarget,
				key,
				Object.getOwnPropertyDescriptor(source, key)!,
			);
		}
	}
	return newTarget;
};
