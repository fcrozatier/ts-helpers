const alphabet =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz0123456789-";

/**
 * Creates a random string of a given length in the alphabet [a-zA-Z0-9_-] (64 characters)
 */
export const randomString = (length = 8) => {
	let str = "";

	while (str.length < length) {
		str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	}

	return str;
};

/**
 * Creates a nanoid of a given length in the alphabet [a-zA-Z0-9_-] (64 characters)
 *
 * Default length = 8
 */
// Turns out this is 30x faster than using Uint8Array.
// [Ref] Benchmark in tests/benchmark/nano.js
// node tests/benchmark/nano.js
export const nanoId = randomString;
