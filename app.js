const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());

app.use('/stripe', stripeRoute);

module.exports = app;