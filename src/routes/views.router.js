import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = Router();
const productManager = new ProductManager('./src/products.json');
const products = await productManager.getProducts();

router.get('/', async (req, res) => {
    try{
        res.render('home', {
        products: products
        });

    } catch (error) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try{
        res.render('realtimeproducts', {
            products: products
        });

    } catch (error) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
});

export default router;

