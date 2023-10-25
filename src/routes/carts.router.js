import { Router } from 'express';
import CartManager from '../cartManager.js';

const router = Router();
const cartManager = new CartManager('./src/carts.json');

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts();

        res.json(carts);

    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
})

router.post ('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart();

        return res.status(200).json({ success: true, message: 'Cart was successfully created.', newCart });
    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
})

router.get ('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cid);

        if(!cart) {
            res.status(500).json({ success: false, message: 'Cart not found.' });
        }

        res.json(cart)
    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
})

router.post ('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        const addToCart = await cartManager.addToCart(cid, pid);

        if(!cid) {
            res.status(404).json({ success: false, message: 'Cart not found.' });
        }

        if(!pid) {
            res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.json(addToCart)
    } catch(e) {
        res.status(500).send(`An error has occurred: ${e}`);
    }
})

export default router;