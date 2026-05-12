/**
 * Returns a random integer in [a;b]
 * @param min lower bound
 * @param max upper bound
 */
export function randint(min: number, max: number) {
	if (min > max) {
		throw new Error("min must be less than max");
	}
	return min + Math.floor((max - min + 1) * Math.random());
}

/**
 * Returns a random item from a list of items, or `undefined` if the list is empty
 */
export function randomItem<T>(items: T[]) {
	if (items.length === 0) {
		return undefined;
	}

	return items[randint(0, items.length - 1)];
}
