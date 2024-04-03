import { findIndexAndValue } from "../src/arrays";
import { expect } from "vitest";
import { it } from "vitest";

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
