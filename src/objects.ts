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
export const trimUndefined = (obj?: Record<string, unknown>) => {
	if (!obj) return undefined;

	const newObj = {} as Record<string, unknown>;

	for (const [key, val] of Object.entries(obj)) {
		if (val === undefined) continue;

		if (type(val) === "object") {
			newObj[key] = trimUndefined(val as Record<string, unknown>);
		} else {
			newObj[key] = val;
		}
	}

	return newObj;
};
