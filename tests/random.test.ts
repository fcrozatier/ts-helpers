import { expect, test } from "vitest";
import { randint } from "../src/random";

test.each([
	[0, 1],
	[0, 0],
])("random int is in range [min; max]", (min, max) => {
	const r = randint(min, max);

	expect(r).toBeGreaterThanOrEqual(min);
	expect(r).toBeLessThanOrEqual(max);
});

test.each([[1, 0, "min must be less than max"]])(
	"randint throws on invalid input",
	(min, max, msg) => {
		expect(() => randint(min, max)).toThrowError(msg);
	},
);
