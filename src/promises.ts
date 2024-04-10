/**
 * Debounce decorator
 * @param func The function to debounce.
 * @param delay (default: 100) Minimum delay in ms between calls.
 * @param throttle (default: `false`) When debouncing every new call to `func` resets the delay timer. When throttling the function ensures there is at least `delay` ms between calls
 */
export function debounce<T extends unknown[], U>(
	func: (...args: T) => U,
	delay = 100,
	throttle = false,
) {
	let timeoutID: number | null;

	function debounced(...args: T) {
		if (timeoutID && !throttle) {
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

/**
 * Waits `ms` milliseconds
 */
export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
