const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config();

    if (env.error) {
        throw env.error;
    }
};