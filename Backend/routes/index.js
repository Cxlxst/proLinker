const express = require('express');
const userRouter = require('./userRoute');
const levelRouter = require('./levelRoute');

const app = express();

app.use('/users', userRouter);
app.use('/auth', userRouter);
app.use('/levels', levelRouter)

module.exports = app;
