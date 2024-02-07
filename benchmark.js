import SegmentTree from './index.js';

function hrtime_to_ms(hrtime) {
    const [s, ns] = hrtime;
    return (s * 1000) + (ns / 1000000)
}


const SIZE = 100000;
const QUERIES = 10000;

const segtree = SegmentTree.fromSizeAndValue((a, b) => a + b, SIZE, 1);
const regtree = new Array(SIZE).fill(1);

let start = process.hrtime();
// Getting time for random number generation (so benchmark only compares the query time)
for (let i = 0; i < QUERIES; i++) {
    let l = Math.floor(Math.random() * SIZE);
    let r = Math.floor(Math.random() * (SIZE - l)) + l;

}
const random_time = process.hrtime(start);

start = process.hrtime();
for (let i = 0; i < QUERIES; i++) {
    let l = Math.floor(Math.random() * SIZE);
    let r = Math.floor(Math.random() * (SIZE - l)) + l;
    segtree.query_range(l, r);
}
const segtree_time = process.hrtime(start);

start = process.hrtime();
// Slice method
for (let i = 0; i < QUERIES; i++) {
    let l = Math.floor(Math.random() * SIZE);
    let r = Math.floor(Math.random() * (SIZE - l)) + l;
    regtree.slice(l, r + 1).reduce((a, b) => a + b, 0);
}
const regtree_slice_time = process.hrtime(start);

start = process.hrtime();
// For loop method
for (let i = 0; i < QUERIES; i++) {
    let l = Math.floor(Math.random() * SIZE);
    let r = Math.floor(Math.random() * (SIZE - l)) + l;
    let sum = 0;
    for (let j = l; j <= r; j++) {
        sum += regtree[j];
    }
}
const regtree_for_time = process.hrtime(start);

const random_ms = hrtime_to_ms(random_time).toFixed(3);
const segtree_ms = (hrtime_to_ms(segtree_time) - hrtime_to_ms(random_time)).toFixed(3);
const regtree_slice_ms = (hrtime_to_ms(regtree_slice_time) - hrtime_to_ms(random_time)).toFixed(3);
const regtree_for_ms = (hrtime_to_ms(regtree_for_time) - hrtime_to_ms(random_time)).toFixed(3);

console.log(`${SIZE} (${Math.floor(SIZE/1000)}k) elements, ${QUERIES} (${Math.floor(QUERIES/1000)}k) range queries`);
console.log(`Random number generation: ${random_ms}ms (subtracted from following times)`);
console.log(`SegmentTree time: ${segtree_ms}ms`);
console.log(`Array.slice() time: ${regtree_slice_ms}ms`);
console.log(`For loop time: ${regtree_for_ms}ms`);



