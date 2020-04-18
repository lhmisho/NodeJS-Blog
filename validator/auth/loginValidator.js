const { body } = require('express-validator')


module.exports = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please provide your email')
        .isEmail()
        .withMessage('Please provide your email'),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Please provide password')

]