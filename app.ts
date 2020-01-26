class Product {
    private scale: number=0;
    private name: string='';

    protected constructor(name:string, scale:number) {
        this.name = name;
        this.scale = scale;
    }

    public getScale():number {
        return this.scale;
    }

    public getName():string {
        return this.name;
    }
}

class Apple extends Product {
    constructor(scale:number, name:string='Red Apple') {
        super(name, scale);
    }
}

class Tomato extends Product {
    constructor(scale:number, name:string='Big Tomato') {
        super(name, scale);
    }
}

class Cucumber extends Product {
    constructor(scale:number, name:string='Small Cucumber') {
        super(name, scale);
    }
}

class Scales {
    private productList: Product[]=[];

    constructor() {}

    public addProduct(product:Product):void {
        this.productList.push(product);
    }

    public getSumScale():number {
        var sum:number = 0;
        for(let i = 0; i < this.productList.length; ++i) {
            sum += this.productList[i].getScale();
        }
        return sum;
    }

    public getNameList():string[] {
        var list:string[]=[];
        for(let i = 0; i < this.productList.length; ++i) {
            list.push(this.productList[i].getName());
        }
        return list;
    }
}

var apple1:Apple = new Apple(14, 'Green Apple'), apple2:Apple = new Apple(1, 'Brown small Apple'), 
    apple3:Apple = new Apple(8); 

var tomato1:Tomato = new Tomato(7, 'Big boy'), tomato2:Tomato = new Tomato(2, 'Small boy'),
    tomato3:Tomato = new Tomato(5);

var cucumber1:Cucumber = new Cucumber(45, 'Super Giant Yellow Cuc'), cucumber2:Cucumber = new Cucumber(4, 'Short'),
    cucumber3:Cucumber = new Cucumber(9);

var scales:Scales = new Scales();

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