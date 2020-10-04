require('dotenv').config()
const express = require('express')

const chalk = require('chalk')
const setMiddleware = require('./middleware/middlewares')
const setRoutes = require('./routes/routes')

const app = express()

// console.log(process.env.NODE_ENV) 
console.log(app.get('env'))

const DB_URI = 'mongodb://localhost:27017/blog';

const config = require('config');
console.log(config.get('name'))

const mongoose = require('mongoose');

// setup view engine 
app.set('view engine', 'ejs')
app.set('views', 'views')


// set middleware
setMiddleware(app)
// using setRouts
setRoutes(app)
app.use((req, res, next) => {
    let error = new Error('404 page not found!!!')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    if(error.status === 404){
        return res.render('pages/error/404', {
            title: '404 page not found',
            error: {},
            value: {},
            flashMassage: {}
        })
    }
})

/**
 *  @conncet database with mlab
 */

// mongoose.connect('mongodb://process.env.DB_USER:process.env.DB_PASS@ds119476.mlab.com:19476/hidonshabat', 
//     {useNewUrlParser: true },function(err)=>{
//     {
//         if(err) {
//             console.log('Some problem with the connection ' +err);
//         } else {
//             console.log('The Mongoose connection is ready');
//         }
//     })


const PORT = process.env.PORT || 8090
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(chalk.green("DB connected"))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server running on ${PORT}`))
        })        
    })
    .catch(e => console.log(e))