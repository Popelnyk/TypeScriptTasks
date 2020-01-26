var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = /** @class */ (function () {
    function Product(name, scale) {
        this.scale = 0;
        this.name = '';
        this.name = name;
        this.scale = scale;
    }
    Product.prototype.getScale = function () {
        return this.scale;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(scale, name) {
        if (name === void 0) { name = 'Red Apple'; }
        return _super.call(this, name, scale) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(scale, name) {
        if (name === void 0) { name = 'Big Tomato'; }
        return _super.call(this, name, scale) || this;
    }
    return Tomato;
}(Product));
var Cucumber = /** @class */ (function (_super) {
    __extends(Cucumber, _super);
    function Cucumber(scale, name) {
        if (name === void 0) { name = 'Small Cucumber'; }
        return _super.call(this, name, scale) || this;
    }
    return Cucumber;
}(Product));
var Scales = /** @class */ (function () {
    function Scales() {
        this.productList = [];
    }
    Scales.prototype.addProduct = function (product) {
        this.productList.push(product);
    };
    Scales.prototype.getSumScale = function () {
        var sum = 0;
        for (var i = 0; i < this.productList.length; ++i) {
            sum += this.productList[i].getScale();
        }
        return sum;
    };
    Scales.prototype.getNameList = function () {
        var list = [];
        for (var i = 0; i < this.productList.length; ++i) {
            list.push(this.productList[i].getName());
        }
        return list;
    };
    return Scales;
}());
var apple1 = new Apple(14, 'Green Apple'), apple2 = new Apple(1, 'Brown small Apple'), apple3 = new Apple(8);
var tomato1 = new Tomato(7, 'Big boy'), tomato2 = new Tomato(2, 'Small boy'), tomato3 = new Tomato(5);
var cucumber1 = new Cucumber(45, 'Super Giant Yellow Cuc'), cucumber2 = new Cucumber(4, 'Short'), cucumber3 = new Cucumber(9);
var scales = new Scales();
console.log(scales.getNameList());
console.log(scales.getSumScale());
scales.addProduct(apple1);
scales.addProduct(tomato1);
scales.addProduct(apple3);
console.log(scales.getNameList());
console.log(scales.getSumScale());
scales.addProduct(apple2);
scales.addProduct(cucumber1);
scales.addProduct(tomato3);
console.log(scales.getNameList());
console.log(scales.getSumScale());
scales.addProduct(cucumber2);
scales.addProduct(cucumber3);
scales.addProduct(tomato2);
console.log(scales.getNameList());
console.log(scales.getSumScale());
//# sourceMappingURL=app.js.map