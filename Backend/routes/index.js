const express = require('express');
const userRouter = require('./user');
const authRouter = require('./auth')
const levelRouter = require('./level');
const cv_languageRouter = require('./cv_language');
const jobTypeRouter = require('./job_type');
const cvRouter = require('./cv')
const cv_userRouter = require('./cv_user')
const languageRouter = require('./language')
const experienceRouter = require('./experience')

const app = express();

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/levels', levelRouter);
app.use('/cv_languages', cv_languageRouter);
app.use('/job_types', jobTypeRouter);
app.use('/cvs', cvRouter);
app.use('/recommandations', cv_userRouter)
app.use('/languages', languageRouter)
app.use('/experiences', experienceRouter)

module.exports = app;
