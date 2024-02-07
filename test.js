import SegmentTree from "segment-tree";

const sumtree = SegmentTree.fromArray((a, b) => a + b, [1, 2, 3, 4, 5]);
console.log(sumtree.query_range(0, 2)); // 6
sumtree.update(1, 10);
console.log(sumtree.query_range(0, 2)); // 14

// Min segment tree from a size and initial value
const mintree = SegmentTree.fromSizeAndValue((a, b) => Math.min(a, b), 5, 100);
console.log(mintree.query_range(0, 2)); // 100
mintree.update(1, 10);
console.log(mintree.query_range(0, 2)); // 10
console.log(mintree.query(0)) // 100