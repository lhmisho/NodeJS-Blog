const router = require('express').Router()
const { check, validationResult } = require('express-validator')

router.get('/validator', (req, res, next) => {
    res.render('playground/signup', { title: 'Validator playground' })
})


router.post('/validator', [
    check('username')
        .not()
        .isEmpty()
        .withMessage("Username must not be empty")
        .isLength({ max: 15 })
        .withMessage(`User name cannot be greater than 15 character`),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
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
    console.log(errors.isEmpty())
    console.log(errors.mapped())
    console.log(errors.array())

    const formatter = error => error.msg 
    console.log(errors.formatWith(formatter).mapped())
    res.render('playground/signup', { title: 'Validator playground' })
})

module.exports = router