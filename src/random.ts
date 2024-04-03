/**
 * Random integer in [a;b]
 * @param min lower bound
 * @param max upper bound
 */
export function randint(min: number, max: number) {
	if (min > max) {
		throw new Error("min must be less than max");
	}
	return min + Math.floor((max - min + 1) * Math.random());
}
