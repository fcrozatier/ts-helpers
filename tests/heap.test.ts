import { describe, expect, it } from "vitest";

import { Heap as PriorityQueue } from "../src/heap";

describe("PriorityQueue()", () => {
	describe("isEmpty()", () => {
		it("returns true when the queue is empty", () => {
			const queue = new PriorityQueue();
			expect(queue.isEmpty()).toBe(true);
		});

		it("returns false when the queue is not empty", () => {
			const queue = new PriorityQueue();
			queue.enqueue("jan");
			expect(queue.isEmpty()).toBe(false);
		});
	});

	describe("#dequeue()", () => {
		it("return undefined when the queue is empty", () => {
			const queue = new PriorityQueue();
			expect(queue.dequeue()).toBe(undefined);
		});

		it("dequeues the top element of the queue", () => {
			const queue = new PriorityQueue((a: string, b: string) =>
				a < b ? -1 : a === b ? 0 : 1,
			);
			queue.enqueue("jan");
			queue.enqueue("valentin");
			queue.enqueue("zombie");
			queue.enqueue("franc");
			queue.enqueue("Albert");
			queue.enqueue("Albert");
			queue.enqueue("frank");
			queue.enqueue("jan");
			queue.enqueue("valentin");
			queue.enqueue("zombie");
			expect(queue.dequeue()).toBe("Albert");
			expect(queue.dequeue()).toBe("Albert");
			expect(queue.dequeue()).toBe("franc");
			expect(queue.dequeue()).toBe("frank");
			expect(queue.dequeue()).toBe("jan");
			expect(queue.dequeue()).toBe("jan");
			expect(queue.dequeue()).toBe("valentin");
			expect(queue.dequeue()).toBe("valentin");
			expect(queue.dequeue()).toBe("zombie");
			expect(queue.dequeue()).toBe("zombie");
			expect(queue.isEmpty()).toBe(true);
		});

		it("doesn't fail with only one element", () => {
			const queue = new PriorityQueue();
			queue.enqueue("jan");
			expect(queue.dequeue()).toBe("jan");
			expect(queue.size()).toBe(0);
		});

		it("works with custom comparators", () => {
			const queue = new PriorityQueue(function (
				a: { priority: number },
				b: { priority: number },
			) {
				return a.priority - b.priority;
			});

			queue.enqueue({ priority: 100 });
			queue.enqueue({ priority: -1 });
			queue.enqueue({ priority: 0 });
			queue.enqueue({ priority: 5 });
			expect(queue.dequeue()).toEqual({ priority: -1 });
			expect(queue.dequeue()).toEqual({ priority: 0 });
			expect(queue.dequeue()).toEqual({ priority: 5 });
			expect(queue.dequeue()).toEqual({ priority: 100 });
			expect(queue.isEmpty()).toBe(true);
		});
	});

	describe("#enqueue()", () => {
		it("enqueues an element at the end of the queue", () => {
			const queue = new PriorityQueue((a: string, b: string) =>
				a < b ? -1 : a === b ? 0 : 1,
			);
			queue.enqueue("jan");
			queue.enqueue("valentin");
			queue.enqueue("frank");
			expect(queue.size()).toBe(3);
		});

		it("returns the new size of the queue", () => {
			const queue = new PriorityQueue();
			expect(queue.enqueue("jan")).toBe(1);
		});

		it("works with custom comparators", () => {
			const queue = new PriorityQueue(function (
				a: { priority: number },
				b: { priority: number },
			) {
				return b.priority - a.priority;
			});

			queue.enqueue({ priority: 100 });
			queue.enqueue({ priority: -1 });
			queue.enqueue({ priority: 0 });
			queue.enqueue({ priority: 5 });
			expect(queue.size()).toBe(4);
		});
	});

	describe("#size()", () => {
		it("returns 0 when the queue is empty", () => {
			const queue = new PriorityQueue();
			expect(queue.size()).toBe(0);
		});

		it("returns the size of the queue", () => {
			const queue = new PriorityQueue();
			queue.enqueue("jan");
			queue.enqueue("valentin");
			expect(queue.size()).toBe(2);
		});
	});

	describe("when there are elements with the same priority", () => {
		it("keeps the queue behavior", () => {
			const queue = new PriorityQueue(function (
				a: { pri: number },
				b: { pri: number },
			) {
				return a.pri - b.pri;
			});
			const a = { pri: 1, val: 1 };
			const b = { pri: 1, val: 2 };
			const c = { pri: 1, val: 3 };
			queue.enqueue(a);
			queue.enqueue(b);
			queue.enqueue(c);

			expect(queue.dequeue()).toBe(a);
			expect(queue.dequeue()).toBe(b);
			expect(queue.dequeue()).toBe(c);
		});
	});
});
