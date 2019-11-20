module.exports = class Lagrange {
    constructor() {
        this.points = [];
    }
    getMinValue() {
        return Math.min(...this.points.map(p => p.x));
    }
    getMaxValue() {
        return Math.max(...this.points.map(p => p.x));
    }
    clear() {
        this.points = [];
    }
    addPoint(valX, valY) {
        this.removePoint(valX);
        this.points.push({x: valX, y: valY});
    }
    removePoint(valX) {
        const dotPointIndex = this.points.findIndex(d => d.x == valX);
        if (dotPointIndex != -1) { this.points.splice(dotPointIndex, 1); }
    }
    Interpolate(xvalue) {
        if (xvalue < this.getMinValue() || xvalue > this.getMaxValue()) { return 0; }
        const pInArray = this.points.find(p => p.x == xvalue);
        if (pInArray){
            return pInArray.y;
        }
        let output = this.points.reduce((p, c, index) => {
            p += this.CalculatePoint(index, xvalue); return p;
        }, 0);
        return output;
    }

    CalculatePoint(N, X)
    {
        const Np = this.points[N];
        const values = {
            denominator: this.ProductOfPointsAt(N, X),
            numerator: this.ProductOfPointsAt(N, Np.x)
        };
        return (Np.y) * (values.denominator / values.numerator);
    }

    ProductOfPointsAt(index_item_skip, _X) {
        let output = this.points.reduce((p, element, index) => {
            p *=  (index == index_item_skip) ? 1 : (_X - element.x);
            return p;
        }, 1);
        return output;
    }
};