export function areSetsEqual(a: Set<unknown>, b: Set<unknown>) {
	return a.size === b.size && [...b].every((el) => a.has(el));
}
