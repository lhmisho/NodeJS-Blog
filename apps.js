const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')

const { bindUserWithRequest } = require('./middleware/authMiddleware')
const setLocalMiddleWare = require('./middleware/setLocals')


const app = express()
const DB_URI = 'mongodb://localhost:27017/blog';
var store = new MongoDBStore({
    uri: DB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7 // one week
  });


const playgroundRouts = require('./playground/validator')
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

const mongoose = require('mongoose');

// setup view engine 
app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware array
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

app.use(middleware)

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/playground', playgroundRouts)
app.get('/', (req, res) => {
    // res.render('pages/auth/signup.ejs', {title: 'Create a new account'})
    res.json({
        massage: 'Welcome to new blog'
    })
})

const PORT = process.env.PORT || 8090
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("DB connected")
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })        
    })
    .catch(e => console.log(e))