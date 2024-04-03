/**
 * Random integer in [a;b[
 * @param min lower bound
 * @param max upper bound
 */
export function randint(a: number, b: number) {
	return a + Math.floor((b - a) * Math.random());
}
