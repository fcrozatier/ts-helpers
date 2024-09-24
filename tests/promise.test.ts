import { describe, expect, it } from "vitest";
import { debounce, sleep } from "../src/promises";

describe("debounce", () => {
	it("debounces values", async () => {
		const arr: number[] = [];

		const fn = debounce(() => arr.push(Math.random()), 10);

		fn();
		await sleep(6);
		fn();
		await sleep(6);
		fn();
		await sleep(11);

		expect(arr.length).toBe(1);
	});

	it("throttles values", async () => {
		const arr: number[] = [];

		const fn = debounce(() => arr.push(Math.random()), 10, true);

		fn();
		await sleep(6);
		fn();
		await sleep(6);
		fn();
		await sleep(11);

		expect(arr.length).toBe(2);
	});
});
