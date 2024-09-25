import { describe, expect, it, test } from "vitest";
import { areSetsEqual } from "../src/sets";

describe("areSetsEqual", () => {
	it("checks sets equality", () => {
		const s1 = new Set([2, 3, 4]);
		const s2 = new Set([4, 3, 2]);

		expect(areSetsEqual(s1, s2)).toBe(true);
	});
});
