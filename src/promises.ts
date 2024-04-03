/**
 * Debounce decorator
 * @param func - Function to debounce.
 * @param delay - Minimum delay in ms between calls.
 * @param lazy - If lazy then every new call to `func` resets the delay timer. Otherwise the function ensures there is at least `delay` ms between calls
 */
export function debounce<T, U>(
	func: (...args: T[]) => U,
	delay = 100,
	lazy = true,
) {
	let timeoutID: number | null;

	function debounced(...args: T[]) {
		if (timeoutID && lazy) {
			clearTimeout(timeoutID);
		}

		return new Promise<U>((resolve) => {
			timeoutID = setTimeout(() => {
				timeoutID = null;
				resolve(func(...args));
			}, delay);
		});
	}

	return debounced;
}
