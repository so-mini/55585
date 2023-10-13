import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const productManager = new ProductManager('./src/products.json');

app.get('/', (req, res) => res.json('okay'));

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

        if(!limit) res.json(products);

        const limitProds = products.slice(0,limit);
        res.json(limitProds);

    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid)
        if(!product) {
            res.status(500).json({ success: false, message: 'Product not found.' });
        }

        res.json(product);

    } catch(e) {
        console.error(e);
    }
})

app.listen(8080);