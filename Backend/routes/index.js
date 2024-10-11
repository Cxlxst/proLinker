const express = require('express');
const userRouter = require('./user');
const levelRouter = require('./level');

const app = express();

app.use('/users', userRouter);
app.use('/auth', userRouter);
app.use('/levels', levelRouter);
app.use('/languages', levelRouter);
app.use('/job_types', levelRouter);

module.exports = app;
