import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = Router();
const productManager = new ProductManager('./src/products.json');

router.get('/', async (req, res) => {
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

router.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid)
        if(!product) {
            res.status(500).json({ success: false, message: 'Product not found.' });
        }

        res.json(product);

    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
})

router.post('/', async (req, res) => {
    try{
        const { title, description, price, thumbnail, code, stock } = req.body;
        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return res.status(500).json({ success: false, message: 'All fields are mandatory.' });
        }

        const products = await productManager.addProduct(title, description, price, thumbnail, code, stock);
        
        return res.status(200).json({ success: true, message: 'Product was successfully updated.', products });

    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
}) 

router.put('/:pid', async (req, res) => {
    try{
        const pid = parseInt(req.params.pid);
        if(!pid){
            return res.status(404).json({ success: false, message: 'Product not found.'})
        }

        const { field, value } = req.body;

        const updatedProduct = await productManager.updateProduct(pid, field, value);
        return res.status(200).json({ success: true, message: 'Product was successfully updated.', updatedProduct });

    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        if(!pid){
            return res.status(404).json({ success: false, message: 'Product not found.'})
        }

        await productManager.deleteProduct(pid);
        const products = await productManager.getProducts();
        return res.status(200).json({ success: true, message: 'Product was successfully updated.', products });

    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
})

export default router;