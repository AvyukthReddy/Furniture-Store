const bcrypt = require("bcrypt");

async function hashPassword(plaintextPassword) {
    return await bcrypt.hash(plaintextPassword, 10);
}

async function comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
}

module.exports = {
    hashPassword,
    comparePassword
}