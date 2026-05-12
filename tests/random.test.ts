import { describe, expect, it, test } from "vitest";
import { randint, randomItem } from "../src/random";

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
		expect(() => randint(min, max)).toThrow(msg);
	},
);

describe("randomItem", () => {
	it("returns an item from the collection", () => {
		const nonEmpty = ["a", "b", "c"];
		const item = randomItem(nonEmpty);

		expect(item !== undefined).toBe(true);
		expect(nonEmpty.includes(item!)).toBe(true);
	});

	it("returns undefined on empty arrays", () => {
		const empty: [] = [];
		const item = randomItem(empty);

		expect(item === undefined).toBe(true);
	});
});
