let User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const errorFormatter = require('../utilitiy/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup.ejs', { title: 'Create a new account', error: {}, value: {} })
}

exports.signupPostController = async (req, res, next) => {
    let { username, password, email } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (errors) {
        console.log(errors.mapped())
        return res.render('pages/auth/signup.ejs', {
            title: 'Create a new account', error: errors.mapped(),
            value: {
                username, password, email
            }
        })
    }
    try {
        let hashedPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createdUser = await user.save()
        console.log("User successfully created, ", createdUser)
        res.render('pages/auth/signup.ejs', { title: 'Create a new account', error: {}, value: {} })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {
    console.log(req.session.isLoggedIn, req.session.user)
    res.render('pages/auth/login.ejs', { title: 'Signin to your account', error: {}, value: {} })
}

exports.loginPostController = async (req, res, next) => {
    console.log(req.body)
    res.setHeader("Content-Type", "text/html");
    let { email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors.mapped())
    if (!errors.isEmpty()) {
        return res.render('pages/auth/login.ejs', {
            title: 'Signin to your account', error: errors.mapped(),
            value: {}
        })
    }
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: 'Unable to login with provided credentials!' })
        }
        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({ message: 'Unable to login with provided credentials!' })
        }

        console.log(user)
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if (err) {
                console.log(err)
                return next(err)
            }
            res.redirect('/dashboard')
        })
    } catch (e) {
        console.log(e)
        next(e)
    }

}

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}