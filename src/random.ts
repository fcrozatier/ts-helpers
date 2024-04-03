/**
 * Random integer in [a;b]
 * @param a lower bound
 * @param b upper bound
 */
export function randint(a: number, b: number) {
	if (a > b) {
		throw new Error("min must be less than max");
	}
	return a + Math.floor((b - a + 1) * Math.random());
}
