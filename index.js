require('dotenv').config();
const express = require('express');
const path = require('path');
const stripeRoute = require('./routes/stripe');

const app = express();

app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());

app.use('/stripe', stripeRoute)