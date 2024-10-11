const express = require('express');
const userRouter = require('./userRoute');

const app = express();

app.use('/users', userRouter);
app.use('/auth', userRouter);

module.exports = app;
