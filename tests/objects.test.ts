import { describe } from "vitest";
import { expect } from "vitest";
import { it } from "vitest";
import { trimUndefined } from "../src/objects";

describe("trim undefined", () => {
	it("trims undefined values", () => {
		const initial = { a: 1, b: undefined, c: { d: true, e: undefined } };
		const final = { a: 1, c: { d: true } };

		expect(trimUndefined(initial)).toStrictEqual(final);
	});
});
