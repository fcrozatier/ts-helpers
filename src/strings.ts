import { regexEscape } from "./regex.js";

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
// Turns out this is (much) faster than using Uint8Array.
// [Ref] Benchmark in tests/benchmark/nano.js
// node tests/benchmark/nano.js
export const nanoId = randomString;

/**
 * Turns the first letter of a string to uppercase
 *
 * Note: can be achieved in CSS with `text-transform: capitalize`
 */
export const capitalize = (str: string) => {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const trim = (str: string, char: string) => {
  const escaped = regexEscape(char);
  const regex = new RegExp(`^${escaped}+|${escaped}+$`, "g");
  return str.replace(regex, "");
};
export const trimEnd = (str: string, char: string) => {
  const escaped = regexEscape(char);
  const regex = new RegExp(`${escaped}+$`, "g");
  return str.replace(regex, "");
};
export const trimStart = (str: string, char: string) => {
  const escaped = regexEscape(char);
  const regex = new RegExp(`^${escaped}+`, "g");
  return str.replace(regex, "");
};
