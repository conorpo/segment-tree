import {expect, test, describe} from "bun:test"
import SegmentTree from ".";

describe('SegmentTree', () => {
    let segtree;
    test('fromArray', () => {
        segtree = SegmentTree.fromArray((a, b) => a + b, [1, 2, 3, 4, 5]);

        expect(segtree).toBeInstanceOf(Object);
        expect(segtree.query).toBeInstanceOf(Function);
        expect(segtree.query_range).toBeInstanceOf(Function);
        expect(segtree.update).toBeInstanceOf(Function);
    });

    test('query', () => {
        expect(segtree.query(3)).toBe(4);
    });

    test('query_range', () => {
        expect(segtree.query_range(1, 3)).toBe(9);
    });

    test('update', () => {
        segtree.update(3, 10);

        expect(segtree.query(3)).toBe(10);
        expect(segtree.query_range(1, 3)).toBe(15);
    });

    let segtree2;

    test('fromSizeAndValue', () => {
        segtree2 = SegmentTree.fromSizeAndValue((a,b) => Math.max(a,b), 100, 1);

        expect(segtree2).toBeInstanceOf(Object);
        expect(segtree2.query).toBeInstanceOf(Function);
        expect(segtree2.query_range).toBeInstanceOf(Function);
        expect(segtree2.update).toBeInstanceOf(Function);
    });

    test('query_range', () => {
        expect(segtree2.query_range(1, 3)).toBe(1);
    });

    test('update', () => {
        segtree2.update(3, 10);
        
        expect(segtree2.query(3)).toBe(10);
        expect(segtree2.query_range(1, 3)).toBe(10);
    });
});
    
