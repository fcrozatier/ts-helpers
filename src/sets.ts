export function areSetsEqual(a: Set<unknown>, b: Set<unknown>) {
	if (a.size !== b.size) {
		return false;
	}

	return [...b].map((el) => a.has(el)).every(Boolean);
}
