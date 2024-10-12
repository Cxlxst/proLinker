const express = require('express');
const userRouter = require('./user');
const authRouter = require('./auth')
const levelRouter = require('./level');
const cv_languageRouter = require('./cv_language');
const jobTypeRouter = require('./job_type');
const cv = require('./cv')
const cv_user = require('./cv_user')

const app = express();

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/levels', levelRouter);
app.use('/cv_languages', cv_languageRouter);
app.use('/job_types', jobTypeRouter);
app.use('/cvs', cv);
app.use('/cv_users', cv_user)

module.exports = app;
