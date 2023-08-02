const express = require('express');

const app = express();
const questionRouter = require('./routes/questionsRoute');
const categoryRouter = require('./routes/categoryRoute');
app.use(express.json());

//Add Routers Here.

app.use('/api/questions', questionRouter);
app.use('/api/category', categoryRouter)

module.exports = app