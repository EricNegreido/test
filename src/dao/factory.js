import config from "../config/config.js";

const persistence = config.persistence;
let Product;
let Cart;

switch(persistence) {
    case 'MONGO':
        console.log('Persistence: Data Base')
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        console.log('BBD connected App');

        const { default: ProductMongo } = await import('./dbManagers/products.manager.js');
        const { default: CartMongo } = await import('./dbManagers/carts.manager.js');
        Product = ProductMongo;
        Cart = CartMongo;

        break; 
    case 'File':
        console.log('Persistence: File')
        const { default: ProductFile } = await import('./fileManagers/products.manager.js');
        const { default: CartFile } = await import('./fileManagers/carts.manager.js');
        Product = ProductFile;
        Cart = CartFile;
        break;
}

export{
    Product,
    Cart
}