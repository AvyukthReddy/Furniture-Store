const {
    getOrders, 
    updateOrderStatus, 
    getMostFrequentlySoldProducts, 
    getProductsWithHighestNoOfDistinctCustomers,
    getTenBestCustomers,
    getFiveBestZipCodes,
    getAverageSellingProducts
} = require('../operations/admin');

const Admin = (express) => {
    const api = express.Router();

    api.get('/getOrders', async (req, res) => {
        const customer_id = req.headers.customer_id;
        getOrders(customer_id, res);
    });

    api.post('/updateOrderStatus', async (req, res) => {
        const customer_id = req.headers.customer_id;
        updateOrderStatus(customer_id, req.body, res);
    });

    api.post('/getMostFrequentlySoldProducts', async (req, res) => {
        const customer_id = req.headers.customer_id;
        getMostFrequentlySoldProducts(customer_id, req.body, res);
    });

    api.post('/getProductsWithHighestNoOfDistinctCustomers', async (req, res) => {
        const customer_id = req.headers.customer_id;
        getProductsWithHighestNoOfDistinctCustomers(customer_id, req.body, res);
    });

    api.post('/getTenBestCustomers', async (req, res) => {
        const customer_id = req.headers.customer_id;
        getTenBestCustomers(customer_id, req.body, res);
    });

    api.post('/getFiveBestZipCodes', async (req, res) => {
        const customer_id = req.headers.customer_id;
        getFiveBestZipCodes(customer_id, req.body, res);
    });

    api.post('/getAverageSellingProducts', async (req, res) => {
        const customer_id = req.headers.customer_id;
        getAverageSellingProducts(customer_id, req.body, res);
    });

    return api;
};

module.exports = Admin;