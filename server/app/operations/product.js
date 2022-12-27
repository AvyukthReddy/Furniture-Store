const db = require('../../database');
const messages = require('./../constants/messages');

const getProducts = async (reqObj, res) => {
    try {
        const query = `CALL FetchProducts()`;
        db.query(query, async (err, result) => {
            // console.log(result);
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else {
                const resObj = {};
                result[0].forEach(product => {
                    if(!resObj[product.product_type]) {
                        resObj[product.product_type] = {
                            product_id: product.product_id,
                            product_name: product.product_name,
                            product_price: product.product_price,
                            product_type: product.product_type,
                            type_id: product.type_id,
                            categories : []
                        }
                    }
                    resObj[product.product_type].categories.push({
                        product_id: product.product_id,
                        product_name: product.product_name,
                        product_type: product.product_type,
                        product_price: product.product_price,
                        product_quantity: product.product_quantity,
                        product_description: product.product_description,
                        type_id: product.type_id,
                        fabric_type: product.fabric_type,
                        chair_type: product.chair_type,
                        drawers_qty: product.drawers_qty,
                        drawers_material: product.drawers_material,
                        shelves_qty: product.shelves_qty,
                        bookcase_material: product.bookcase_material
                    });
                })
                res.json({status: 200, code: messages.GET_PRODUCTS_SUCCESS, message: "success", products: Object.values(resObj)});
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

module.exports = {
    getProducts
};