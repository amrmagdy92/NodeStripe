const express = require('express');
const path = require('path');
const stripeRoute = require('./routes/stripe');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());

app.use('/', indexRouter);
app.use('/stripe', stripeRoute);

module.exports = app;