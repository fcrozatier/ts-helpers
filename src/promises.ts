import type { Timeout } from "./types.js";

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
	let promise: Promise<U>;

	function debounced(...args: T) {
		if (timeoutID && !throttle) {
			clearTimeout(timeoutID);
		} else if (timeoutID && throttle) {
			return promise;
		}

		promise = new Promise<U>((resolve) => {
			timeoutID = setTimeout(() => {
				timeoutID = null;
				resolve(func(...args));
			}, delay);
		});

		return promise;
	}

	return debounced;
}

export class Debounce<T extends unknown[], U> {
	delay: number;
	throttle: boolean;
	fn: (...args: T) => U;

	timeoutID!: Timeout | null;
	#promise!: Promise<U>;

	#debounced: (...args: T) => Promise<U>;

	constructor(options: {
		fn: (...args: T) => U;
		delay?: number;
		throttle?: boolean;
	}) {
		this.fn = options.fn;
		this.delay = options.delay ?? 100;
		this.throttle = options.throttle ?? false;

		this.#debounced = this.makeDebounced();
	}

	makeDebounced = () => {
		return (...args: T) => {
			if (this.timeoutID && this.throttle) {
				return this.#promise;
			}

			if (this.timeoutID && !this.throttle) {
				clearTimeout(this.timeoutID);
				this.timeoutID = null;
			}

			this.#promise = new Promise<U>((resolve) => {
				this.timeoutID = setTimeout(() => {
					this.timeoutID = null;
					resolve(this.fn(...args));
				}, this.delay);
			});

			return this.#promise;
		};
	};

	get debounced() {
		return this.#debounced;
	}

	flush = () => {
		if (this.timeoutID) {
			clearTimeout(this.timeoutID);
		}
		this.#debounced = this.makeDebounced();
	};
}

/**
 * Waits `ms` milliseconds
 */
export function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
