const db = require('../../database');
const messages = require('./../constants/messages');

const saveProfile = async (reqObj, res) => {
    try {
        const query = `
            UPDATE customer 
            SET 
                first_name="${reqObj.first_name}",
                last_name="${reqObj.last_name}",
                address="${reqObj.address}",
                phone="${reqObj.phone}"
            WHERE
                customer_id=${reqObj.customer_id}
        `;
        db.query(query, (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else {
                res.json({status: 200, code: messages.CREATE_USER_SUCCESS, message: "success"});
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

module.exports = {
    saveProfile
};