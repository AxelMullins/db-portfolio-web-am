const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require("dotenv").config();
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const apiDocs = require('./docs/apiDocs.json')
const swaggerSpec = {
    definition: 
        apiDocs
    ,
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

const indexRouter = require('./routes/index');
const experiencesRouter = require('./routes/experiences');
const { dbConnection } = require("./db/db");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(cors())

app.use('/', indexRouter);
app.use('/experiences', experiencesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)))

dbConnection();

module.exports = app;
