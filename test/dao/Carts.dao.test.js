import mongoose from "mongoose";
import Carts from "../../src/dao/dbManagers/carts.manager.js";
import * as chai from "chai";

await mongoose.connect('mongodb+srv://ericnegreidooo:NwhiTotw0VIjgLVp@cluster47300ap.yetvntr.mongodb.net/loginx3eros?retryWrites=true&w=majority');

const expect= chai.expect;


let carts;

describe("PROBANDO DAO DE CARTS", () => {
    before( () => {
        carts = new Carts();
    })
    
    it('El dao debe poder obtener un arreglo', async function () {
        const result = await carts.save();
        expect(Array.isArray(result)).to.equal(true);
    });

    it('El dao debe poder agregar productos al carrito', async function () {
        const cartId = "someCartId";
        const productId = "someProductId";
        const quantity = 2;

        const result = await carts.addProductToCart(cartId, productId, quantity);

        expect(result).to.be.an('object');
        expect(result).to.have.property('success').to.equal(true);
    });

    it('El dao debe poder obtener un carrito existente', async function () {
        const cartId = "someExistingCartId";

        const result = await carts.getArray(cartId);

        expect(result).to.be.an('object');
        expect(result).to.have.property('cartId').to.equal(cartId);
    });

    it('El dao debe poder actualizar la cantidad de productos en el carrito', async function () {
        const cartId = "someCartId";
        const productId = "someProductId";
        const newQuantity = 5;

        const result = await carts.updateProductQuantity(cartId, productId, newQuantity);

        expect(result).to.be.an('object');
        expect(result).to.have.property('success').to.equal(true);
    });

    it('El dao debe poder eliminar un producto del carrito', async function () {
        const cartId = "someCartId";
        const productId = "someProductId";

        const result = await carts.removeProductFromCart(cartId, productId);

        expect(result).to.be.an('object');
        expect(result).to.have.property('success').to.equal(true);
    });
})