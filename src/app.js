import express from 'express';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log('Shop is running.');
});

const io = new Server(httpServer);

io.on('connection', socket => {
    console.log('New client connected to the Server')
    //consumir el emit de index.js 'newproduct' addProduct from productManager
    //emitir - getProducts - consumir products en variable

    socket.on('updateProductList', (productList) => {
        io.emit('updateProductList', productList);
    });
})
