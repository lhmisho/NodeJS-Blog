const router = require('express').Router()
const { body } = require('express-validator')
const User = require('../models/User')
const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controllers/authController')

const signupValidator = [
    body('username')
        .isLength({ min: 2, max: 10 }).withMessage('Username must be between 2 and 5 charater')
        .trim()
        .custom(async value => {
            console.log(value)
            let user = await User.findOne({ username: value })
            console.log()
            if (user) {
                return Promise.reject('Username already exists')
            }
        }),
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail()
        .custom(async value => {
            let userEmail = await User.findOne({ email: value })
            if (userEmail) {
                return Promise.reject('Email already in use')
            }
        }),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must be greater than 5 character'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password doesnot matched')
            }
            return true
        })

]
router.get('/signup', signupGetController)
router.post('/signup', signupValidator, signupPostController)

router.get('/login', loginGetController)
router.post('/login', loginPostController)

router.get('/logout', logoutController)

module.exports = router