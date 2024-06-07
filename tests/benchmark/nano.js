// node tests/benchmark/nano.js

const alphabet =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz0123456789-";

const randomString = (length = 8) => {
	let str = "";

	while (str.length < length) {
		str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	}

	return str;
};

const nanoId = (length = 8) => {
	let str = "";
	const arr = crypto.getRandomValues(new Uint8Array(length));

	for (const byte of arr) {
		str += alphabet.charAt(byte & 63);
	}

	return str;
};

const N = 1_000_000;

console.time("random");
for (let index = 0; index < N; index++) {
	randomString();
}
console.timeEnd("random");

console.time("nano");
for (let index = 0; index < N; index++) {
	nanoId();
}
console.timeEnd("nano");
