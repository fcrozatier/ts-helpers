/**
 * Returns the sum of an array of numbers
 */
export function sum(array: number[]) {
	return array.reduce((p, c) => p + c, 0);
}

/**
 * Finds a value in an array given a predicate, and return the value and its index
 */
export function findWithIndex<T>(
	arr: T[],
	predicate: (value: T, index: number, obj: T[]) => unknown,
) {
	let found: { value: T; index: number } | undefined;

	arr.some((value, index) => {
		if (predicate(value, index, arr)) {
			found = { value, index };
			return true;
		}
		return false;
	});

	return found;
}

/**
 * Type predicate for narrowing a 'string' to be used to index an object
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
