/**
 * Rounds `value` to a precision of `decimalPlaces`
 * By default returns `value` rounded to the nearest integer
 */
export function round(value: number, decimalPlaces = 0) {
	const multiplier = Math.pow(10, decimalPlaces);
	return Math.round(value * multiplier) / multiplier;
}
