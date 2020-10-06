const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Flash = require('../utilitiy/Flash')
const User = require('../models/User')

router.get('/play', (req, res, next) => {
    console.log(Flash.getMessage(req))
    res.render('playground/play', { title: 'Validator playground', error: {}, flashMassage: {} })
})


router.post('/validator', 
 (req, res, next) => {
    res.redirect('/playground/play')
 })

module.exports = router