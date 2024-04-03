/**
 * Returns the sum of an array of numbers
 */
export function sum(array: number[]) {
	return array.reduce((p, c) => p + c, 0);
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
