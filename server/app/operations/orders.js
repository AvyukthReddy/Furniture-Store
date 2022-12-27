const db = require('../../database');
const messages = require('./../constants/messages');

const placeOrder = async (reqObj, res) => {
    try {
        const query = `CALL PlaceOrder("${reqObj.paymentDetails.cardNumber}", ${reqObj.paymentDetails.secCode}, "${reqObj.paymentDetails.cardName}", "${reqObj.paymentDetails.cardType}", "${reqObj.paymentDetails.billingAddress}", "${reqObj.paymentDetails.expiryDate}", ${reqObj.customer_id}, "${reqObj.shippingAddress.shippingName}", "${reqObj.shippingAddress.streetNumber}", "${reqObj.shippingAddress.streetName}", "${reqObj.shippingAddress.zip}", "${reqObj.shippingAddress.city}", "${reqObj.shippingAddress.state}", "${reqObj.shippingAddress.country}", "${reqObj.shippingAddress.recepientName}", @cart_id)`;
        db.query(query, (err, result) => {
            console.log(result);
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else {
                const cart_id = result[0][0].cart_id;
                if(reqObj.products?.length) {
                    reqObj.products.forEach(product => {
                        const query_appears_in = `
                            INSERT INTO appears_in(cart_id, product_id, quantity, price_sold) 
                            VALUES (${cart_id}, ${product.product_id}, ${product.selectedQty}, ${product.product_price})
                            `;
                        db.query(query_appears_in, (err_insert, res_insert) => {});
                    });
                }
                res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success"});
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const getOrders = async (customer_id, res) => {
    try {
        const query = `SELECT * FROM cart WHERE customer_id = ${customer_id}`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else {
                res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: result});
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const getOrder = async (customer_id, orderId, res) => {
    try {
        const query = `CALL OrderDetails(${orderId})`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else {
                const shippingQuery = `CALL ShippingDetails(${customer_id}, ${orderId})`;
                db.query(shippingQuery, (shippingErr, shippingResult) => {
                    if(err)  {
                        res.json({status: 500, code: messages.ERROR, message: shippingErr});
                    } else {
                        const responseObj = {
                            products: result[0],
                            shippingDetails: shippingResult[0][0]
                        }
                        res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: responseObj});
                    }
                });
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

const filterOrders = async (customer_id, reqObj, res) => {
    try {
        const query = `CALL FilterOrders(${customer_id}, "%${reqObj.product_description}%", "%${reqObj.shipping_name}%", "%${reqObj.status}%")`;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else {
                res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", data: result[0]});
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

module.exports = {
    placeOrder,
    getOrders,
    getOrder,
    filterOrders
};