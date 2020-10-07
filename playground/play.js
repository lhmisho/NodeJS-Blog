const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Flash = require('../utilitiy/Flash')
const User = require('../models/User')
const upload = require('../middleware/uploadMiddleware')

router.get('/play', (req, res, next) => {
    console.log(Flash.getMessage(req))
    res.render('playground/play', { title: 'Validator playground', error: {}, flashMassage: {} })
})


router.post('/play', upload.single('my-file'),
 (req, res, next) => {
    if(req.file){
        console.log(req.file)
    }
    res.redirect('/playground/play')
 })

module.exports = router