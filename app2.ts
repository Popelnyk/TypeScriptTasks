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
    constructor(private token:string) { }

    addItem(item:Product) {
        let rawData = JSON.parse(this.data.getItem(this.token));
        if(!rawData) {
            let products:Array<Product> = [item];
            this.data.setItem(this.token, JSON.stringify(products));
        }
        else {
            this.data.removeItem(this.token);
            let dataArray = rawData.map((value:any) => new Product(value['name'], value['scale']));
            dataArray.push(item);
            this.data.setItem(this.token, JSON.stringify(dataArray));
        }
    }

    getItem(index:number) {
        let rawData = JSON.parse(this.data.getItem(this.token));
        if(index >= rawData.length) throw 'index out of array';
        return new Product(rawData[index]['name'], rawData[index]['scale']);
    }

    getCount() {
        return (JSON.parse(this.data.getItem(this.token))).length;
    }

    get items():Array<Product> {
        let rawData = JSON.parse(this.data.getItem(this.token));
        if(!rawData) rawData = [];
        return rawData.map((value:any) => new Product(value['name'], value['scale']));
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
const localstorage1 = new ScalesStorageEngineLocalStorage('14fZf5');
const localstorage2 = new ScalesStorageEngineLocalStorage('eeiK94');

const scales1 = new Scales<ScalesStorageEngineArray>(engineArray);
const scales2 = new Scales<ScalesStorageEngineLocalStorage>(localstorage1);
const scales3 = new Scales<ScalesStorageEngineLocalStorage>(localstorage2);

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
scales2.addProduct(product4);
console.log('scales2: ', scales2.getSumScale(), scales2.getNameList());


console.log('scales3: ', scales3.getSumScale(), scales3.getNameList());
scales3.addProduct(product4);
scales3.addProduct(product4);
console.log('scales3: ', scales3.getSumScale(), scales3.getNameList());
scales3.addProduct(product2);
scales3.addProduct(product2);
scales3.addProduct(product1);
console.log('scales3: ', scales3.getSumScale(), scales3.getNameList());