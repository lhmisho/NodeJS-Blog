const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const { bindUserWithRequest } = require('./authMiddleware')
const setLocalMiddleWare = require('./setLocals')

const DB_URI = 'mongodb://localhost:27017/blog';
var store = new MongoDBStore({
    uri: DB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7 // one week
  });

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRATE || 'SECRATE_KEY',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // one week
        },
        store: store
    }),
    bindUserWithRequest(),
    setLocalMiddleWare(),
    flash()
]

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}