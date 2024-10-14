export function areSetsEqual(a: Set<unknown>, b: Set<unknown>) {
	// Not yet mainstream in 2024 (82% support) https://caniuse.com/?search=isSupersetOf
	// return a.size === b.size && b.isSupersetOf(a);
	return a.size === b.size && [...b].every((el) => a.has(el));
}
