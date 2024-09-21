import { describe, expect, test } from "vitest";
import { capitalize } from "../src/strings";

describe("capitalize", () => {
	test.each([
		["", ""],
		["a", "A"],
		["so", "So"],
		["choco", "Choco"],
	])("capitalize test case", (before, after) => {
		expect(capitalize(before)).toBe(after);
	});
});
