import express from 'express';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.json('okay'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(8080);