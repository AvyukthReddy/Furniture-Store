const db = require('../../database');
const messages = require('./../constants/messages');

const getOrders = async (customer_id, res) => {
    try {
        const query = `SELECT isAdmin FROM customer WHERE customer_id = ${customer_id}`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else if (!result[0].isAdmin) {
                res.json({status: 401, code: messages.ERROR, message: "Unauthorized"});
            } else {
                const ordersQuery = `SELECT * FROM cart`;
                db.query(ordersQuery, (ordersErr, ordersResult) => {
                    if(ordersErr)  {
                        res.json({status: 500, code: messages.ERROR, message: ordersErr});
                    } else {
                        res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: ordersResult});
                    }
                });
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const updateOrderStatus = async (customer_id, reqObj, res) => {
    if(![1, 2, 3, 4].includes(reqObj.transaction_status)) {
        res.json({status: 500, code: messages.ERROR, message: "Invalid transaction status!"});
        return;
    }
    try {
        const query = `SELECT isAdmin FROM customer WHERE customer_id = ${customer_id}`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else if (!result[0].isAdmin) {
                res.json({status: 401, code: messages.ERROR, message: "Unauthorized"});
            } else {
                const updateOrderQuery = `UPDATE cart SET transaction_status=${reqObj.transaction_status} WHERE cart_id=${reqObj.cart_id}`;
                db.query(updateOrderQuery, (ordersErr, ordersResult) => {
                    if(ordersErr)  {
                        res.json({status: 500, code: messages.ERROR, message: ordersErr});
                    } else {
                        res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: ordersResult});
                    }
                });
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const getMostFrequentlySoldProducts = async (customer_id, reqObj, res) => {
    try {
        const query = `SELECT isAdmin FROM customer WHERE customer_id = ${customer_id}`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else if (!result[0].isAdmin) {
                res.json({status: 401, code: messages.ERROR, message: "Unauthorized"});
            } else {
                const ordersQuery = `CALL MostFrequentlySoldProducts("${reqObj.startDate}", "${reqObj.endDate}")`;
                db.query(ordersQuery, (ordersErr, ordersResult) => {
                    if(ordersErr)  {
                        res.json({status: 500, code: messages.ERROR, message: ordersErr});
                    } else {
                        res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: ordersResult[0]});
                    }
                });
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const getProductsWithHighestNoOfDistinctCustomers = async (customer_id, reqObj, res) => {
    try {
        const query = `SELECT isAdmin FROM customer WHERE customer_id = ${customer_id}`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else if (!result[0].isAdmin) {
                res.json({status: 401, code: messages.ERROR, message: "Unauthorized"});
            } else {
                const ordersQuery = `CALL ProductsWithHighestNoOfDistinctCustomers("${reqObj.startDate}", "${reqObj.endDate}")`;
                db.query(ordersQuery, (ordersErr, ordersResult) => {
                    if(ordersErr)  {
                        res.json({status: 500, code: messages.ERROR, message: ordersErr});
                    } else {
                        res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: ordersResult[0]});
                    }
                });
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const getTenBestCustomers = async (customer_id, reqObj, res) => {
    try {
        const query = `SELECT isAdmin FROM customer WHERE customer_id = ${customer_id}`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else if (!result[0].isAdmin) {
                res.json({status: 401, code: messages.ERROR, message: "Unauthorized"});
            } else {
                const ordersQuery = `CALL TenBestCustomers("${reqObj.startDate}", "${reqObj.endDate}")`;
                db.query(ordersQuery, (ordersErr, ordersResult) => {
                    if(ordersErr)  {
                        res.json({status: 500, code: messages.ERROR, message: ordersErr});
                    } else {
                        res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: ordersResult[0]});
                    }
                });
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const getFiveBestZipCodes = async (customer_id, reqObj, res) => {
    try {
        const query = `SELECT isAdmin FROM customer WHERE customer_id = ${customer_id}`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else if (!result[0].isAdmin) {
                res.json({status: 401, code: messages.ERROR, message: "Unauthorized"});
            } else {
                const ordersQuery = `CALL FiveBestZipCodes("${reqObj.startDate}", "${reqObj.endDate}")`;
                db.query(ordersQuery, (ordersErr, ordersResult) => {
                    if(ordersErr)  {
                        res.json({status: 500, code: messages.ERROR, message: ordersErr});
                    } else {
                        res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: ordersResult[0]});
                    }
                });
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const getAverageSellingProducts = async (customer_id, reqObj, res) => {
    try {
        const query = `SELECT isAdmin FROM customer WHERE customer_id = ${customer_id}`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else if (!result[0].isAdmin) {
                res.json({status: 401, code: messages.ERROR, message: "Unauthorized"});
            } else {
                const ordersQuery = `CALL AverageSellingProducts("${reqObj.startDate}", "${reqObj.endDate}")`;
                db.query(ordersQuery, (ordersErr, ordersResult) => {
                    if(ordersErr)  {
                        res.json({status: 500, code: messages.ERROR, message: ordersErr});
                    } else {
                        res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: ordersResult[0]});
                    }
                });
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

module.exports = {
    getOrders,
    updateOrderStatus,
    getMostFrequentlySoldProducts, 
    getProductsWithHighestNoOfDistinctCustomers,
    getTenBestCustomers,
    getFiveBestZipCodes,
    getAverageSellingProducts
};