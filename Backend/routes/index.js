const express = require('express');
const userRouter = require('./user');
const levelRouter = require('./level');
const languageRouter = require('./language');
const jobTypeRouter = require('./job_type');

const app = express();

app.use('/users', userRouter);
app.use('/auth', userRouter);
app.use('/levels', levelRouter);
app.use('/languages', languageRouter);
app.use('/job_types', jobTypeRouter);

module.exports = app;
