class DisjointSet {
    constructor() {
        this.parents = {};
        this.sizes = {}; // the # of members in subset (index is representative)
    }

    makeSet(x) {
        this.parents[x] = x;
        this.sizes[x] = 1;
    }

    findRepresentative(x) {
        if (this.parents[x] === x) {
            return x;
        } else {
            return this.findRepresentative(this.parents[x]);
        }
    }

    union(x, y) {
        const xRepresentative = this.findRepresentative(x);
        const yRepresentative = this.findRepresentative(y);

        if (xRepresentative !== yRepresentative) {
            if (this.sizes[xRepresentative] > this.sizes[yRepresentative]) {
                this.parents[yRepresentative] = xRepresentative;
                this.sizes[xRepresentative] += this.sizes[yRepresentative];

                delete this.sizes[yRepresentative];
            } else {
                this.parents[xRepresentative] = yRepresentative;
                this.sizes[yRepresentative] += this.sizes[xRepresentative];

                delete this.sizes[xRepresentative];
            }
        }
    }
}