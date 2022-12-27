const {createPool} = require('mysql')

const db = createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Database@18",
    connectionLimit: 10,
    database: "ecommerce"
});

module.exports = db;