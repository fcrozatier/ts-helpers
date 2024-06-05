import { describe, expect, it } from "vitest";
import { merge, trimUndefined } from "../src/objects";

describe("trimUndefined", () => {
	it("trims undefined values", () => {
		const initial = { a: 1, b: undefined, c: { d: true, e: undefined } };
		const final = { a: 1, c: { d: true } };

		expect(trimUndefined(initial)).toStrictEqual(final);
	});
});

describe("merge", () => {
	it("merges objects", () => {
		const target = { a: 1, b: { c: true } };
		const source = { a: 2, b: { d: false }, e: undefined };

		const merged = { a: 2, b: { c: true, d: false } };

		expect(merge(target, source)).toStrictEqual(merged);
	});
});
