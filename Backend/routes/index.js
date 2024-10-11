const express = require('express');
const userRouter = require('./user');
const levelRouter = require('./level');
const languageRouter = require('./language');
const jobTypeRouter = require('./job_type');
const cv = require('./cv')
const cv_user = require('./cv_user')

const app = express();

app.use('/users', userRouter);
app.use('/auth', userRouter);
app.use('/levels', levelRouter);
app.use('/languages', languageRouter);
app.use('/job_types', jobTypeRouter);
app.use('/cv', cv);
app.use('/cv_users', cv_user)

module.exports = app;
