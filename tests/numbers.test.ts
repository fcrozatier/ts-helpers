import { describe } from "vitest";
import { expect } from "vitest";
import { it } from "vitest";
import { round } from "../src/numbers";

describe("round", () => {
	it("rounds to a given precision", () => {
		expect(round(Math.PI, 2)).toBe(3.14);
	});
});
