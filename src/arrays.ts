/**
 * Calculates the sum of an array of numbers.
 * Returns 0 if the array is empty
 */
export function sum(array: number[]) {
	return array.reduce((p, c) => p + c, 0);
}

/**
 * Computes the mean of an array of number.
 * Returns 0 if the array is empty
 */
export function mean(array: number[]) {
	if (array.length === 0) return 0;
	return sum(array) / array.length;
}

/**
 * Finds a value in an array given a predicate, and returns the value and its index
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

type RangeOptions =
	| [stop: number]
	| [start: number, stop: number]
	| [start: number, stop: number, step: number];

/**
 * Makes an array of numbers between `start` (defaults to 0) and `stop` (excluded) in increments of `step` (defaults to 1)
 */
export function range(...args: RangeOptions) {
	switch (args.length) {
		case 1: {
			const [stop] = args;
			return Array.from({ length: stop }, (_, i) => i);
		}
		case 2: {
			const [start, stop] = args;
			return Array.from({ length: stop - start }, (_, i) => start + i);
		}
		case 3: {
			const [start, stop, step] = args;
			return Array.from(
				{ length: (stop - start) / step },
				(_, i) => start + i * step,
			);
		}
	}
}

/**
 * Checks whether two arrays have the same elements
 */
export const areArraysEquivalent = (arr1: unknown[], arr2: unknown[]) => {
	return arr1.length === arr2.length && arr1.every((el) => arr2.includes(el));
};

/**
 * Zips arrays of the same length
 *
 * @example let zipped = zip([1,2], ['a','b']);
 * zipped; // [[1, 'a'], [2, 'b']]
 */
export const zip = <T, U>(array1: T[], array2: U[]): [T, U][] => {
	if (array1.length !== array2.length) {
		throw new Error("zip: arrays must have the same size");
	}

	return array1.map((a, i) => {
		return [a, array2[i]!];
	});
};
