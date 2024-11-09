# The missing js and ts helpers

- [The missing js and ts helpers](#the-missing-js-and-ts-helpers)
  - [Arrays](#arrays)
  - [Functions](#functions)
  - [Heap](#heap)
  - [Numbers](#numbers)
  - [Promises](#promises)
  - [Random](#random)
  - [Sets](#sets)
  - [Strings](#strings)
  - [Types](#types)

## Arrays

- `sum`: Calculates the sum of an array of numbers. Returns 0 if the array is empty.

```js
sum([1,2,3]) // 6
```

- `mean`: Computes the mean of an array of number.  Returns 0 if the array is empty

```js
mean([1,2,3]) // 2
```

- `findIndexAndValue`: Finds a value in an array given a predicate, and returns an object with the value and its index

```js
const fruits = ["banana", "peach", "strawberry"	];

findIndexAndValue(fruits, (f) => f === "peach") // {index: 1, value: "peach"}
```

- `range`: Creates an array of numbers between `start` (defaults to 0) and `stop` (excluded) in increments of `step` (defaults to 1)

```js
range(3) // [0,1,2]
range(1,3) // [1,2]
range(1,6,2) // [1,3,5]
```

- `areArraysEquivalent`: Checks whether two arrays have the same elements

```js
areArraysEquivalent([1, 2, 3], [3, 2, 1]) // true;
```

## Functions

- `once`: Decorator making a function callable once

```js
let i = 0;

const increment = () => i++;
const wrapped = once(increment);

wrapped(); // i = 1
wrapped(); // i = 1
wrapped(); // i = 1
```

## Heap

A fast priority queue / heap implementation, with `O(nlog(n))` complexity.

The constructor takes a comparator function.

Public fields:
- `size`: (number) the size of the heap
- `isEmpty`: (boolean) whether the heap is empty
- `enqueue`: adds an element to the queue and prioritizes it
- `dequeue`: pops the next element in the priority queue
- `peek`: look at the next element without popping it
- `has`: checks whether a given element is in the queue

```js
const queue = new PriorityQueue((a: string, b: string) => a < b ? -1 : a === b ? 0 : 1);

queue.enqueue("Bob");
queue.enqueue("Zack");
queue.enqueue("Alice");

queue.size(); // 3
queue.has("Dan"); // false

queue.dequeue(); // Alice
queue.dequeue(); // Bob

queue.peek(); // Zack
queue.isEmpty(); // false

queue.dequeue(); // Zack
```

## Numbers

- `round`: Rounds a value to a given precision. By default rounds to the nearest integer

```js
round(Math.PI, 2) // 3.14
```

- `modulo(n: number, d: number)`: Computes `n` modulo `d`.

Note: the modulo operator has the same sign as the divisor `d` whereas the remainder `n % d` has
the same sign as the dividend `n`

```js
modulo(-1, 3); // 2
-1 % 3;  // -1
```

## Promises

- `debounce`: A debounce decorator.
  Parameters:
  - `func` The function to debounce.
  - `delay` (default: 100) Minimum delay in ms between calls.
  - `throttle` (default: `false`) When debouncing every new call to `func` resets the delay timer. When throttling the function ensures there is at least `delay` ms between calls

```js
const arr = [];

const fn = debounce(() => arr.push(Math.random()), 10);

fn();
await sleep(6);
fn();
await sleep(6);
fn();
await sleep(11);

arr.length; // 1
```

- `Debounce`: a debounce class, similar to the simpler function, but with the ability to `flush`

## Random

- `randint(a:number, b: number)`: Returns a random integer in `[a;b]`

```js
randint(0, 5) // 2
```

## Sets

- `areSetsEqual`: checks whether two sets are equal

```js
const s1 = new Set([2, 3, 4]);
const s2 = new Set([4, 3, 2]);

areSetsEqual(s1, s2); // true
```

## Strings

- `randomString`: Creates a random string of a given length in the alphabet `[a-zA-Z0-9_-]` (64 characters)

```js
randomString(8); // TNxOLDho
```

- `nanoId`: A fast alias of `randomString` with `length = 8` by default

```js
nanoId(); // b6eKfYLB
```

- `capitalize`: Turns the first letter of a string to uppercase

```js
capitalize("capitalized") // "Capitalized"
```

## Types

- `type`: Returns a string representation of the type of an object and is more precise than `typeof`.

```js
// null / undefined types
type(null); // "null"
type(undefined); // "undefined"

// other primitive types
type(0); // "number"
type(BigInt(0)); // "bigint"
type(true); // "boolean"
type(""); // "string"
type(Symbol("")); // "symbol"

// object types
type([]); // "array"
type(new Date()); // "date"
type(new Boolean(true)); // "boolean"
type(new Number(0)); // "number"
type(new String("")); // "string"
type(new Error("")); // "error"
type(new RegExp("a")); // "regexp"
type(/a/); // "regexp"
type({}); // "object"

// function type
type(() => 1); // "function"
type(class Dog {}); // "class"
```

- `Prettify<T>`: Prettify types by ensuring type expansion

- `Required<T, K extends keyof T>`: Require only a specific subset of keys of `T`

- `Partial<T, K extends keyof T>`: Partial on specific keys of `T`

- `StrictOmit<T, K extends keyof T>`: `Omit` with constrained keys

- `StrictExtract<T, U extends T>`: `Extract` with constrained keys

- `Timeout`: Return type of `setTimeout`

- `StructuredCloneValue`: allowable values for the `structuredClone` function
