const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// get connection URI
const getConnectionURI = () => {
    let authUri = '';

    if (typeof process.env.DB_USERNAME !== 'undefined' && process.env.DB_USERNAME !== ''
        && typeof process.env.DB_PASSWORD !== 'undefined' && process.env.DB_PASSWORD !== '') {
        authUri = `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`;
    }

    return `mongodb://${authUri}${process.env.DB_HOST}/${process.env.DB_NAME}`;
};

// connect
const connect = connectionURI => {
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionURI)
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));
};

// load models
const loadModels = () => {
    require('./models/User');
    require('./models/Stand');
};

module.exports = { getConnectionURI, connect, loadModels };



