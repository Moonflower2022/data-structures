function elementsEqual(x, y) {
    return x === y;
}

function copyElement(x) {
    return x;
}

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
        if (elementsEqual(this.parents[x], x)) {
            return x;
        } else {
            return this.findRepresentative(this.parents[x]);
        }
    }

    union(x, y) {
        const xRepresentative = this.findRepresentative(x);
        const yRepresentative = this.findRepresentative(y);

        if (!elementsEqual(xRepresentative, yRepresentative)) {
            if (this.sizes[xRepresentative] > this.sizes[yRepresentative]) {
                this.parents[yRepresentative] = copyElement(xRepresentative);
                this.sizes[xRepresentative] += this.sizes[yRepresentative];

                delete this.sizes[yRepresentative];
            } else {
                this.parents[xRepresentative] = copyElement(yRepresentative);
                this.sizes[yRepresentative] += this.sizes[xRepresentative];

                delete this.sizes[xRepresentative];
            }
        }
    }
}

let set = new DisjointSet();
set.makeSet(4);
set.makeSet(8);
set.makeSet(3);
set.union(4, 8);
set.union(4, 3);
let a = [4, 8, 3];
a.forEach((item) => {
    console.log(set.findRepresentative(item));
});
console.log(set.parents)
console.log(set.sizes);