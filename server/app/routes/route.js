const User = require('./user');
const Product = require('./product');
const Orders = require('./orders');
const Admin = require('./admin');
const Profile = require('./profile');

const route = (app, express) => {
    app.use('/api/user', User(express));
    app.use('/api/product', Product(express));
    app.use('/api/orders', Orders(express));
    app.use('/api/profile', Profile(express));
    app.use('/api/admin', Admin(express));
};

module.exports = route;