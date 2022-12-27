const {placeOrder, getOrders, getOrder, filterOrders} = require('../operations/orders');

const Orders = (express) => {
    const api = express.Router();

    api.post('/placeOrder', async (req, res) => {
        placeOrder(req.body, res);
    });

    api.get('/getOrders', async (req, res) => {
        const customer_id = req.headers.customer_id;
        getOrders(customer_id, res);
    });

    api.get('/getOrder/:orderId', async (req, res) => {
        const customer_id = req.headers.customer_id;
        const orderId = req.params.orderId;
        getOrder(customer_id, orderId, res);
    });

    api.post('/filterOrders', async (req, res) => {
        const customer_id = req.headers.customer_id;
        filterOrders(customer_id, req.body, res);
    });
    return api;
};

module.exports = Orders;