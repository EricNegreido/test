import mongoose from "mongoose";
import Assert from 'assert';
import Products from "../../src/dao/dbManagers/products.manager.js";

await mongoose.connect('mongodb+srv://ericnegreidooo:NwhiTotw0VIjgLVp@cluster47300ap.yetvntr.mongodb.net/loginx3eros?retryWrites=true&w=majority');

const assert = Assert.strict;

let products;

describe("PROBANDO DAO DE PRODUCTOS", () => {
    before( () => {
        products = new Products();
    })
    
    it('El dao debe poder obtener un arreglo', async function(){
        const result = await products.getAll();
        assert.strictEqual(Array.isArray(result), true);
    })
})