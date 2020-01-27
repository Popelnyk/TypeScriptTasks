class Product {
    private scale: number=0;
    private name: string='';

    public constructor(name:string, scale:number) {
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
}


class ScalesStorageEngineLocalStorage implements IStorageEngine {
    private data: Window = new Window();
    private lastIndex: number = 0;
    constructor() {}

    addItem(item:Product) {
        this.data.localStorage.setItem(this.lastIndex.toString(), JSON.stringify(item));
        this.lastIndex++;
    }

    getItem(index:number) {
        if(index > this.lastIndex) throw 'Index out of array';
        let obj = JSON.parse(this.data.localStorage.getItem(index.toString()));
        return (new Product(obj.getName(), obj.getScale()));
    }

    getCount() {
        return this.data.length;
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
        let result:number = 0;
        for(let i = 0; i < this.storage.getCount(); ++i) {
            result += this.storage.getItem(i).getScale();
        }
        return result;
    }

    public getNameList():string[] {
        let result:string[] = [];
        for(let i = 0; i < this.storage.getCount(); ++i) {
            result.push(this.storage.getItem(i).getName());
        }
        return result;
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
scales1.addProduct(product3);
console.log('scales1: ', scales1.getSumScale(), scales1.getNameList(), scales1);
scales1.addProduct(product2);
console.log('scales1: ', scales1.getSumScale(), scales1.getNameList());


console.log('scales2: ', scales2.getSumScale(), scales2.getNameList());
scales2.addProduct(product4);
scales2.addProduct(product4);
console.log('scales2: ', scales2.getSumScale(), scales2.getNameList());
scales2.addProduct(product4);
console.log('scales2: ', scales2.getSumScale(), scales2.getNameList());
