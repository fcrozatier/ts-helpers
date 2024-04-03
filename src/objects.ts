/**
 * `Object.keys` with narrower types
 */
export const keys = Object.keys as <T>(
	o: T,
) => Extract<keyof T, string | number>[];
