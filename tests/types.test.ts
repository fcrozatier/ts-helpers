import { describe, expect, it, test } from "vitest";
import { type } from "../src/types";

describe("type", () => {
	it("discriminates types", () => {
		// null / undefined types
		expect(type(null)).toBe("null");
		expect(type(undefined)).toBe("undefined");

		// other primitive types
		expect(type(0)).toBe("number");
		expect(type(BigInt(0))).toBe("bigint");
		expect(type(true)).toBe("boolean");
		expect(type("")).toBe("string");
		expect(type(Symbol(""))).toBe("symbol");

		// object types
		expect(type([])).toBe("array");
		expect(type(new Date())).toBe("date");
		expect(type(new Boolean(true))).toBe("boolean");
		expect(type(new Number(0))).toBe("number");
		expect(type(new String(""))).toBe("string");
		expect(type(new Error(""))).toBe("error");
		expect(type(new RegExp("a"))).toBe("regexp");
		expect(type(/a/)).toBe("regexp");
		expect(type({})).toBe("object");

		// function type
		expect(type(() => 1)).toBe("function");
		expect(type(async () => 1)).toBe("AsyncFunction");
		expect(type(class Dog {})).toBe("class");
	});
});
