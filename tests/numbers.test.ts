import { describe, test } from "vitest";
import { expect } from "vitest";
import { it } from "vitest";
import { modulo, round } from "../src/numbers";

describe("round", () => {
	it("rounds to a given precision", () => {
		expect(round(Math.PI, 2)).toBe(3.14);
	});
});

describe("modulo", () => {
	test.each([
		[12, 5],
		[12, 4],
		[12, 3],
		[12, 2],
		[12, 6],
	])("equals the remainder with positive numbers", (n, d) => {
		expect(modulo(n, d)).toBe(n % d);
	});

	it("works with a negative dividend", () => {
		expect(modulo(-1, 3)).toBe(2);
		expect(-1 % 3).toBe(-1);
	});
});
