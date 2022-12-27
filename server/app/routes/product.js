const {getProducts} = require('../operations/product');

const Product = (express) => {
    const api = express.Router();

    api.get('/getProducts', async (req, res) => {
        getProducts(req.body, res);
    });
    return api;
};

module.exports = Product;