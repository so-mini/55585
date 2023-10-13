import fs from 'fs';

class ProductManager {
    constructor(filename) {
        this.filename = filename;
        this.format = 'utf-8';
    }

    getProducts = async () => {
        try {
            const content = await fs.promises.readFile(this.filename, this.format);
            if (!content) return [];

            const db = JSON.parse(content);
            return db;
        } catch (e) {
            return console.error(e);
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                return console.error('Could not add one product due to incomplete fields.');
            }

            const products = await this.getProducts();
            const id = products.length + 1;
            products.push({ id, title, description, price, thumbnail, code, stock });

            await fs.promises.writeFile(this.filename, JSON.stringify(products));
            return products;
        } catch (e) {
            return console.error(e);
        }
    }

    getProductById = async (id) => {
        try {
            if (!fs.existsSync(this.filename)) return;

            const products = await fs.promises.readFile(this.filename, this.format);
            const product = JSON.parse(products).find((p) => p.id === id);

            return product;
        } catch (e) {
            return console.error('Product not found.', e);
        }
    }

    updateProduct = async (id, field, value) => {
        try {
            if (!fs.existsSync(this.filename)) return;

            const products = await this.getProduct();
            const product = products.find((p) => p.id === id);

            if (product) {
                product[field] = value;
                await fs.promises.writeFile(this.filename, JSON.stringify(products));

                return products;
            }
        } catch (e) {
            return console.error(e);
        }
    }

    deleteProduct = async (id) => {
        try {
            if (!fs.existsSync(this.filename)) return;

            const raw = await fs.promises.readFile(this.filename, this.format);
            const products = JSON.parse(raw).filter((p) => parseInt(p.id) !== id);

            await fs.promises.writeFile(this.filename, JSON.stringify(products));
        } catch (e) {
            return console.error(e);
        }
    }

}

async function run() {
    const productManager = new ProductManager('./src/products.json');

    // await productManager.addProduct('Monstera Deliciosa', 'This is a monstera.', 30, 'monstera.jpg', '1A', 50);
    // await productManager.addProduct('Pothos', 'This is a pothos.', 15, 'pothos.jpg', '2A', 50);
    // await productManager.addProduct('Spider Plant', 'This is a spider plant.', 12, 'spider-plant.jpg', '3A', 50);
    // await productManager.addProduct('Alocasia Frydek', 'This is a frydek', 60, 'frydek.jpg', '4A', 50);
    // await productManager.addProduct('Hoya', 'This is a hoya', 40, 'hoya.jpg', '5A', 50);
    // await productManager.addProduct('African Violet', 'This is a African Violet.', 45, 'African Violet.jpg', '6A', 50);
    // await productManager.addProduct('Aloe', 'This is an aloe plant.', 5, 'aloe.jpg', '7A', 50);
    // await productManager.addProduct('Anthurium', 'This is an anthurium.', 15, 'anthurium.jpg', '8A', 50);
    // await productManager.addProduct('Asparagus Fern', 'This is an Asparagus Fern', 20, 'fern.jpg', '9A', 50);
    // await productManager.addProduct('Banana Plant', 'This is a banana plant', 10, 'banana.jpg', '10A', 50);

    // console.log(await productManager.getProducts());

    // console.log(await productManager.getProductById(2));
    // await productManager.deleteProduct(3);
    // await productManager.updateProduct(1, 'title', 'Monstera Adansonii');
}

run();

export default ProductManager;