const db = require('../../database');
const validation = require('./../services/validation');
const messages = require('./../constants/messages');

const createUser = async (reqObj, res) => {
    try {
        const hashPassword = await validation.hashPassword(reqObj.password);
        const query = `CALL CreateCustomer('${reqObj.firstName}', '${reqObj.lastName}', '${reqObj.email}', '${reqObj.address}', '${reqObj.phone}', '${hashPassword}', @result)`;
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

const validateUser = async (reqObj, res) => {
    try {
        const query = `SELECT * FROM customer WHERE email="${reqObj.email}"`;
        db.query(query, async (err, result) => {
            if(err)  {
                res.json({status: 500, code: messages.ERROR, message: err});
            } else if(result.length == 1) {
                const isValid = await validation.comparePassword(reqObj.password, result[0].password);
                if(isValid) {
                    const resObj = {...result[0]};
                    delete resObj.password;
                    res.json({status: 200, code: messages.VALID_EMAIL_PASSWORD, message: "Valid email/password", data: resObj});
                } else {
                    res.json({status: 200, code: messages.INVALID_EMAIL_PASSWORD, message: "Invalid email/password"});
                }
            } else {
                res.json({status: 200, code: messages.INVALID_EMAIL_PASSWORD, message: "Invalid email/password"});
            }
        });
    }
    catch (error) {
      console.log(error);
    }
}

module.exports = {
    createUser,
    validateUser
};