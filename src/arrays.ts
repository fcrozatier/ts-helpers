/**
 * Returns the sum of an array of numbers
 * By default the result is 0 on an empty array
 */
export function sum(array: number[]) {
	return array.reduce((p, c) => p + c, 0);
}

/**
 * Returns the mean of an array of number.
 * By default the mean of an empty array is 0
 */
export function mean(array: number[]) {
	if (array.length === 0) return 0;
	return sum(array) / array.length;
}

/**
 * Find a value in an array given a predicate, and return the value and its index
 */
export function findIndexAndValue<T>(
	arr: T[],
	predicate: (value: T, index: number, obj: NoInfer<T>[]) => unknown,
) {
	let found: { value?: T; index: number } = { index: -1 };

	arr.some((value, index) => {
		if (predicate(value, index, arr)) {
			found = { value, index };
			return true;
		}
		return false;
	});

	return found;
}
