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
		type Options = { a?: number; b?: { c?: boolean; d?: boolean }; e?: string };

		const defaults = { a: 1, b: { c: true } } satisfies Options;
		const options: Options = { a: 2, b: { d: false }, e: undefined };

		const merged = { a: 2, b: { c: true, d: false } };
		const result = merge(defaults, options);

		expect(result).toStrictEqual(merged);
	});

	it("merges functions", () => {
		type Options = { a?: number; b: () => boolean };

		const defaults = { a: 1 } satisfies Omit<Options, "b">;
		const options: Options = { a: 2, b: () => false };

		const result = merge(defaults, options);

		expect(result.b()).toStrictEqual(false);
	});

	it("deep clones target but not source", () => {
		type Options = {
			a: number[];
			b?: { c?: boolean; d?: boolean };
			e?: string;
		};

		const defaults = { a: [], b: { c: true } } satisfies Options;
		const options: Options = { a: [], b: { d: false }, e: undefined };
		const result = merge(defaults, options);

		result.a.push(1);

		expect(result.a.length).toBe(1);
		expect(defaults.a.length).toBe(0);
		expect(options.a.length).toBe(1);
	});

	it("preserves the source's get/set methods", () => {
		type Options = { a?: boolean };
		let bind = true;

		const defaults = { a: false } satisfies Options;
		const options: Options = {
			get a() {
				return bind;
			},
			set a(v) {
				bind = v;
			},
		};

		const result = merge(defaults, options);

		expect(result.a).toBe(true);
		expect(Object.getOwnPropertyDescriptor(result, "a")?.set).toBeDefined();
		expect(Object.getOwnPropertyDescriptor(result, "a")?.get).toBeDefined();

		result.a = false;
		expect(result.a).toBe(false);
		expect(bind).toBe(false);
	});
});
