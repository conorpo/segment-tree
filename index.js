/**
 * @typedef {Object} SegmentTree
 * @property {(l: number, r: number) => any} query_range Queries the range from [l,r)
 * @property {(i: number) => any} query Query at index i
 * @property {(i: number, new_val: any) => void} update Update the index i (and all dependent nodes)
*/

/**
 * @returns {SegmentTree}
*/
const SegmentTree = (merge_fn, n, initial_value) => {
    const t = new Array(4 * n);

    const build = (v, tl, tr) => {
        if (tl === tr) {
            t[v] = initial_value(tl);
        } else {
            const tm = Math.floor((tl + tr) / 2);
            build(v * 2, tl, tm);
            build(v * 2 + 1, tm + 1, tr);
            t[v] = merge_fn(t[v * 2], t[v * 2 + 1]);
        }
    }
    build(1, 0, n - 1);

    const query_range = (v, tl, tr, l, r) => {
        // if (l > r) return initial_value();     - removed for more general use
        if (l === tl && r === tr) return t[v];
        const tm = Math.floor((tl + tr) / 2);

        const left_new_r = Math.min(r, tm);
        const right_new_l = Math.max(l, tm + 1);

        if(l > left_new_r) return query_range(v * 2+1, tm+1, tr, right_new_l, r);
        if(r < right_new_l) return query_range(v * 2, tl, tm, l, left_new_r);
        return merge_fn(query_range(v * 2+1, tm+1, tr, right_new_l, r), query_range(v * 2, tl, tm, l, left_new_r));
    }

    const update = (v, tl, tr, pos, new_val) => {
        if (tl === tr) {
            t[v] = new_val;
        } else {
            const tm = Math.floor((tl + tr) / 2);
            if (pos <= tm) {
                update(v * 2, tl, tm, pos, new_val);
            } else {
                update(v * 2 + 1, tm + 1, tr, pos, new_val);
            }
            t[v] = merge_fn(t[v * 2], t[v * 2 + 1]);
        }
    }

    return {
        /**
        * @param {number} l - left index (inclusive)
        * @param {number} r - right index (inclusive)
        * @returns {any} - result of merge_fn
        */
        query_range: (l, r) => query_range(1, 0, n - 1, l, r),
        /**
         * @param {number} i - index to query
         * @returns {any} - result of merge_fn
        */
        query: (i) => query_range(1, 0, n - 1, i, i),
        /**
         * @param {number} i - index to update
         * @param {any} new_val - new value to update to
        */
        update: (i, new_val) => update(1, 0, n - 1, i, new_val),
    }
}


export default {
    /**
     * @param {(a: T,b: T) => T} merge_fn The function to merge two values
     * @param {T[]} arr initial array
     * @returns {SegmentTree}
    */
    fromArray: (merge_fn, arr) => SegmentTree(merge_fn, arr.length, (i) => arr[i]),
    /**
     * @param {(a: T,b: T) => T} merge_fn The function to merge two values\
     * @param {Number} n The amount of elements
     * @param {T} initial_value Initial Value for all elements
    */
    fromSizeAndValue: (merge_fn, n, initial_value) => SegmentTree(merge_fn, n, () => initial_value),
}