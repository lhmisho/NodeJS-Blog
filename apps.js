const express = require('express')
const morgan = require('morgan')

const app = express()

const authRoutes = require('./routes/authRoutes')
const validatorRoutes = require('./playground/validator') // should be remove letter

const mongoose = require('mongoose');

// setup view engine 
app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]
app.use(middleware)

app.use('/auth', authRoutes)
app.use('/playground', validatorRoutes) // should be remove letter

app.get('/', (req, res) => {
    // res.render('pages/auth/signup.ejs', {title: 'Create a new account'})
    res.json({
        massage: 'Welcome to new blog'
    })
})

const PORT = process.env.PORT || 8090
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("DB connected")
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })        
    })
    .catch(e => console.log(e))