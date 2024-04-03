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
 * Finds a value in an array given a predicate, and return the value and its index
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

/**
 * Returns an array of numbers between 0 and `stop` excluded in increments of 1
 */
export function range(stop: number): number[];
/**
 * Returns an array of numbers between `start` and `stop` excluded in increments of 1
 */
export function range(start: number, stop: number): number[];
/**
 * Returns an array of numbers with `start` included and `stop` excluded in increments of `step`
 */
export function range(start: number, stop: number, step: number): number[];
export function range(startOrStop: number, stop?: number, step?: number) {
	let start = startOrStop;
	if (stop !== undefined && step !== undefined) {
		return Array.from(
			{ length: (stop - start) / step },
			(_, i) => start + i * step,
		);
	} else if (stop !== undefined) {
		return Array.from({ length: stop - start }, (_, i) => start + i);
	} else {
		const stop = startOrStop;
		start = 0;
		return Array.from({ length: stop - start }, (_, i) => start + i);
	}
}
