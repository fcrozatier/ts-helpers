import { findIndexAndValue, range, sum } from "../src/arrays";
import { describe } from "vitest";
import { expect } from "vitest";
import { it } from "vitest";

describe("sum", () => {
	it("returns 0 for an empty array", () => {
		expect(sum([])).toBe(0);
	});
});

describe("findIndexAndValue", () => {
	const array = [
		{ text: "banana", public: true },
		{ text: "apple", public: false },
		{ text: "candy", public: true },
	];

	it("finds array value and index", () => {
		const found = findIndexAndValue(array, (v) => v.public === false);

		expect(found.value?.text).toBe("apple");
		expect(found.index).toBe(1);

		const found2 = findIndexAndValue(array, (v) => v.text === "strawberry");

		expect(found2.value?.text).toBe(undefined);
		expect(found2.index).toBe(-1);
	});
});

describe("range", () => {
	it("accepts 1 argument", () => {
		const arr = range(5);

		expect(arr.length).toBe(5);
		for (let index = 0; index < arr.length; index++) {
			expect(arr[index]).toBe(index);
		}
	});

	it("accepts 2 arguments", () => {
		const arr = range(1, 5);

		expect(arr.length).toBe(4);
		for (let index = 0; index < arr.length; index++) {
			expect(arr[index]).toBe(index + 1);
		}
	});

	it("accepts 3 arguments", () => {
		const arr = range(1, 6, 2);
		const res = [1, 3, 5];

		expect(arr.length).toBe(2);
		for (let index = 0; index < arr.length; index++) {
			expect(arr[index]).toBe(res[index]);
		}
	});
});
