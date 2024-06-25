/**
 * Rounds `value` to a precision of `decimalPlaces`
 * By default returns `value` rounded to the nearest integer
 */
export function round(value: number, decimalPlaces = 0) {
	const multiplier = Math.pow(10, decimalPlaces);
	return Math.round(value * multiplier) / multiplier;
}

/**
 * Returns `n` modulo `d`
 *
 * The modulo operator has the same sign as the divisor `d` whereas the remainder n % d has
 * the same sign as the dividend `n`
 *
 * @example
 * ```ts
 * modulo(-1,3); //2
 * -1 % 3;  //-1
 * ```
 */
export function modulo(n: number, d: number) {
	return ((n % d) + d) % d;
}
