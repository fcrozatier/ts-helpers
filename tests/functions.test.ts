import { describe } from "vitest";
import { expect } from "vitest";
import { it } from "vitest";
import { once } from "../src/functions";

describe("once", () => {
	it("runs once", () => {
		let i = 0;

		const increment = () => i++;
		const wrapped = once(increment);

		wrapped();
		wrapped();
		wrapped();

		expect(i).toBe(1);
	});
});
