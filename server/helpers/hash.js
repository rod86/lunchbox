const bcrypt = require('bcryptjs');
const salt = parseInt(process.env.BCRYPT_SALT);

const generateHash = value => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(salt, (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(value, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
};

const compareHash = (value, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(value, hash)
            .then(isMatch => {
                (isMatch) ? resolve() : reject();
            });
    });  
};

module.exports = { generateHash, compareHash };