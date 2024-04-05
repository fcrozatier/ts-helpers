/**
 * Decorator to make `fn` only callable once
 */
// The use of T extends unknown[] instead of ...args: T[] doesn't force all attributes to be of the same type
export function once<T extends unknown[], U>(fn: (...args: T) => U) {
	let called = false;

	return function (...args: T) {
		if (!called) {
			called = true;
			return fn(...args);
		}
	};
}
