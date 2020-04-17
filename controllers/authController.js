let User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const errorFormatter = require('../utilitiy/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup.ejs', { title: 'Create a new account' })
}

exports.signupPostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)
    if (errors) {
        return console.log(errors.mapped())
    }
    try {
        let { username, password, email } = req.body
        let hashedPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createdUser = await user.save()
        console.log("User successfully created, ", createdUser)
        res.render('pages/auth/signup.ejs', { title: 'Create a new account' })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login.ejs', { title: 'Signin to your account' })
}

exports.loginPostController = async (req, res, next) => {
    console.log(req.body)
    let { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.json({ message: 'Invalid Credentials' })
        }
        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.json({ message: 'Invalid Credentials' })
        }
        console.log(user)
        res.render('pages/auth/login.ejs', { title: 'Signin to your account' })
    } catch (e) {
        console.log(e)
        next(e)
    }

}

exports.logoutController = (req, res, next) => {

}