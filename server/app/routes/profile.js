const {saveProfile} = require('../operations/profile');

const Profile = (express) => {
    const api = express.Router();

    api.post('/save', async (req, res) => {
        saveProfile(req.body, res);
    });

    return api;
};

module.exports = Profile;