type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> {
	public comparator: Comparator<T>;
	private elements: T[] = [];

	/**
	 * @param comparator The comparator function takes parameters a,b and returns
	 * -1 if a < b, 0 if a == b, 1 if a > b
	 */
	constructor(comparator?: Comparator<T>) {
		this.comparator = comparator ?? (() => 1);
	}

	public size() {
		return this.elements.length;
	}

	public isEmpty() {
		return this.elements.length === 0;
	}

	public enqueue(element: T) {
		const size = this.elements.push(element);
		const last = size - 1;

		this.upHeap(last);

		return size;
	}

	public dequeue() {
		const first = this.elements[0];
		const last = this.elements.pop();

		if (last && this.size() !== 0) {
			this.elements[0] = last;
			this.downHeap(0);
		}

		return first;
	}

	public peek() {
		return this.elements[0];
	}

	public has(element: T) {
		return this.elements.includes(element);
	}

	/**
	 * For a min heap, bubble up the element at a given index while it is smaller than its parent
	 */
	private upHeap(index: number) {
		let current = index;

		while (current > 0) {
			const parent = Math.floor((current - 1) / 2);

			// Break if current element is already bigger than its parent element
			if (this.compare(current, parent) >= 0) break;

			this.swap(current, parent);
			current = parent;
		}
	}

	private downHeap(index: number) {
		const size = this.size();
		const left = 2 * index + 1;
		const right = 2 * index + 2;
		let min = index;

		if (left < size && this.compare(left, min) <= 0) {
			min = left;
		}

		if (right < size && this.compare(right, min) <= 0) {
			min = right;
		}

		if (min !== index) {
			this.swap(min, index);
			this.downHeap(min);
		}
	}

	private compare(i: number, j: number) {
		const first = this.elements[i];
		const second = this.elements[j];

		if (!first || !second) throw new Error("Index out of range");

		return this.comparator(first, second);
	}

	private swap(i: number, j: number) {
		const temp1 = this.elements[i];
		const temp2 = this.elements[j];

		if (temp1 && temp2) {
			this.elements[i] = temp2;
			this.elements[j] = temp1;
		}
	}
}
