const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require("dotenv").config();

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
dbConnection();

module.exports = app;
