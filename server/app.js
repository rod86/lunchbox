const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('isProduction', (process.env.NODE_ENV === "production"));

// Error handler
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler.init);

// Mongoose connection
const db = require('./database');
db.connect(db.getConnectionURI());
db.loadModels();

/** MIDDLEWARE **/
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** ROUTES **/
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/stands', require('./routes/api/stands'));

/** CLIENT **/
if (app.get('isProduction')) {
    const staticFiles = express.static(path.join(__dirname, '../client/build'));   
    app.use(staticFiles);
    app.use('/*', staticFiles);
}

/** ERRORS **/
app.use((req, res) => res.throwNotFoundError());

app.use((err, req, res, next) => {    
    if (app.get('env') === 'development') {
        console.error(err.stack);
    }

    const status = err.status || 500;
    const response = errorHandler.buildErrorResponse(err);
    res.status(status).json(response);
});

module.exports = app;