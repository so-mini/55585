import fs from 'fs';
import ProductManager from './productManager.js';

const productManager = new ProductManager('./src/products.json');

class CartManager {
    constructor(filename) {
        this.filename = filename;
        this.format = 'utf-8';
    }

    getCarts = async () => {
        try {
            const content = await fs.promises.readFile(this.filename, this.format);
            if (!content) return [];

            const cart = JSON.parse(content);
            return cart;
        } catch (e) {
            return console.error(e);
        }
    }

    addCart = async () => {
        try {
            const carts = await this.getCarts();

            const newCart = {
                id: carts.length + 1,
                products: []
            };

            carts.push(newCart);

            await fs.promises.writeFile(this.filename, JSON.stringify(carts));
            return newCart;

        } catch (e) {
            return console.error(e);
        }
    }

    getCartById = async (id) => {
        try {
            if (!fs.existsSync(this.filename)) return;

            const carts = await fs.promises.readFile(this.filename, this.format);
            const cart = JSON.parse(carts).find((c) => c.id === id);

            return cart;
        } catch (e) {
            return console.error('Product not found.', e);
        }
    }

    addToCart = async (cid, pid) => {
        try {
            const carts = await this.getCarts();

            const cart = carts.find(c => c.id === cid);
            const product = await productManager.getProductById(pid);;

            if (!cart || !product) return;

            let productInCart = cart.products.find(p => p.product === pid);

            if(productInCart) {
                productInCart.quantity ++;
            } else {
                cart.products.push({product: pid, quantity: 1});
            }

            await fs.promises.writeFile(this.filename, JSON.stringify(carts));
            return cart;

        } catch (e) {
            return console.error('Product not found.', e);
        }
    }

}

async function run() {
    const cartManager = new CartManager('./src/carts.json');

    // console.log(await cartManager.addCart());
    // console.log(await cartManager.getCarts());
    // console.log(await cartManager.addToCart(1, 1));
}

run();

export default CartManager;