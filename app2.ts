class Product {
    private scale: number=0;
    private name: string='';

    constructor(name:string, scale:number) {
        this.name = name;
        this.scale = scale;
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }
}

interface IStorageEngine {
    addItem(item:Product):void;
    getItem(index:number):Product;
    getCount():number;
    items: Product[];
}


class ScalesStorageEngineArray implements IStorageEngine {
    private data: Array<Product>=[];

    constructor() {}

    addItem(item:Product) {
        this.data.push(item);
    }

    getItem(index:number) {
        if(index >= this.data.length) throw 'Index out of array'; 
        return this.data[index];
    }

    getCount() {
        return this.data.length;
    }

    get items():Array<Product> {
        return this.data;
    }
}


class ScalesStorageEngineLocalStorage implements IStorageEngine {
    private data = localStorage;
    private token:number = 0;
    private products:Array<Product> = [];

    constructor() { }

    addItem(item:Product) {
        this.data.setItem(this.token.toString(), JSON.stringify(item));
        this.products.push(item);
        this.token++;
    }

    getItem(index:number) {
        let obj = JSON.parse(this.data.getItem(index.toString()));
        return new Product(obj['name'], obj['scale']);
    }

    getCount() {
        return this.products.length;
    }

    get items():Array<Product> {
        return this.products;
    }
}

class Scales<StorageEngine extends IStorageEngine> {
    private storage:StorageEngine;

    constructor(engine:StorageEngine) {
        this.storage = engine;
    }

    public addProduct(product:Product):void {
        this.storage.addItem(product);
    }

    public getSumScale():number {
        const reducer = (accumulator:number, currentValue: Product):number => accumulator + currentValue.getScale();
        return this.storage.items.reduce(reducer, 0);
    }

    public getNameList():string[] {
        return this.storage.items.map((value:Product) => value.getName());
    }
}

const engineArray = new ScalesStorageEngineArray();
const localstorage = new ScalesStorageEngineLocalStorage();

const scales1 = new Scales<ScalesStorageEngineArray>(engineArray);
const scales2 = new Scales<ScalesStorageEngineLocalStorage>(localstorage);


let product1:Product = new Product('Apple', 10), product2:Product = new Product('Tomato', 5.4), 
    product3:Product = new Product('Cucumber', 12.9), product4:Product = new Product('Onion', 3);


console.log('scales1: ', scales1.getSumScale(), scales1.getNameList());
scales1.addProduct(product1);
scales1.addProduct(product4);
console.log('scales1: ', scales1.getSumScale(), scales1.getNameList(), scales1);
scales1.addProduct(product2);
console.log('scales1: ', scales1.getSumScale(), scales1.getNameList());


console.log('scales2: ', scales2.getSumScale(), scales2.getNameList());
scales2.addProduct(product1);
scales2.addProduct(product2);
console.log('scales2: ', scales2.getSumScale(), scales2.getNameList());
scales2.addProduct(product3);
scales2.addProduct(product3);
console.log('scales2: ', scales2.getSumScale(), scales2.getNameList());