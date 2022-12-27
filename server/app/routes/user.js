const {createUser, validateUser} = require('../operations/user');

const User = (express) => {
    const api = express.Router();

    api.post('/signup', async (req, res) => {
        createUser(req.body, res);
    });

    api.post('/signin', async (req, res) => {
        validateUser(req.body, res);
    });

    return api;
};

module.exports = User;