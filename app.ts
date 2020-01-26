interface IScalable {
    getScale():number;
    getName():string;
}

class Product {
    protected scale: number=0;
    protected name: string='';

    protected constructor(name:string, scale:number) {
        this.name = name;
        this.scale = scale;
    }
}

class Apple extends Product implements IScalable {
    constructor(scale:number, name:string='Red Apple') {
        super(name, scale);
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }
}

class Tomato extends Product implements IScalable {
    constructor(scale:number, name:string='Big Tomato') {
        super(name, scale);
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }
}

class Cucumber extends Product implements IScalable {
    constructor(scale:number, name:string='Small Cucumber') {
        super(name, scale);
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }
}

class Scales {
    private productList: IScalable[]=[];

    constructor() {}

    public addProduct(product:IScalable):void {
        this.productList.push(product);
    }

    public getSumScale():number {
        const reducer = (accumulator:number, currentValue: IScalable):number => accumulator + currentValue.getScale();
        return this.productList.reduce(reducer, 0);
    }

    public getNameList():string[] {
        return this.productList.map((value:IScalable) => value.getName());
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