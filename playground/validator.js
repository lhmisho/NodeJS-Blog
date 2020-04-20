const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Flash = require('../utilitiy/Flash')

router.get('/validator', (req, res, next) => {
    // console.log(req.flash('fail'))
    // console.log(req.flash('success'))
    console.log(Flash.getMessage(req))
    res.render('playground/signup', { title: 'Validator playground', error: {} })
})


router.post('/validator', [
    check('username')
        .not()
        .isEmpty()
        .withMessage("Username must not be empty")
        .isLength({ max: 15 })
        .withMessage(`User name cannot be greater than 15 character`)
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    check('password')
        .custom(value => {
            if(value.length < 5 ){
                throw new Error('Password must be greater than 5 character')
            }
            return true
        }),
    check('confirmPassword')
        .custom((value, { req }) => {
            if(value !== req.body.password){
                throw new Error('Password doesnot matched')
            }
            return true
        })
    
    
], (req, res, next) => {
    let errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        req.flash('fail', 'Some error occured!')
    }else{
        req.flash('success', 'Success')
    }
    res.redirect('/playground/validator')
})

module.exports = router