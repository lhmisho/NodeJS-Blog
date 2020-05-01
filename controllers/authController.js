let User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const errorFormatter = require('../utilitiy/validationErrorFormatter')
const Flash = require('../utilitiy/Flash')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup.ejs',
        {
            title: 'Create a new account',
            error: {},
            value: {},
            flashMassage: Flash.getMessage(req)
        }
    )
}

exports.signupPostController = async (req, res, next) => {
    let { username, password, email } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (errors) {
        console.log(errors.mapped())
        return res.render('pages/auth/signup.ejs',
            {
                title: 'Create a new account', error: errors.mapped(),
                value: {
                    username, password, email
                },
                flashMassage: Flash.getMessage(req)
            }
        )
    }
    try {
        let hashedPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        await user.save()
        req.flash('success', 'User created successfully!')
        redirect('/auth/login')
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {
    console.log(req.session.isLoggedIn, req.session.user)
    res.render('pages/auth/login.ejs',
        {
            title: 'Signin to your account',
            error: {},
            value: {},
            flashMassage: Flash.getMessage(req)
        }
    )
}

exports.loginPostController = async (req, res, next) => {
    console.log(req.body)
    res.setHeader("Content-Type", "text/html");
    let { email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors.mapped())
    
    if (!errors.isEmpty()) {
        req.flash('fail', 'Please check your form')
        return res.render('pages/auth/login.ejs',
            {
                title: 'Signin to your account', error: errors.mapped(),
                value: {},
                flashMassage: Flash.getMessage(req)
            }
        )
    }
    try {
        let user = await User.findOne({ email })
        if (!user) {
            req.flash('fail', 'Please provide valid credentials')
            return res.render('pages/auth/login.ejs',
            {
                title: 'Signin to your account', 
                error: {},
                value: {},
                flashMassage: Flash.getMessage(req)
            }
        )
        }
        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            req.flash('fail', 'Please provide valid credentials')
            return res.render('pages/auth/login.ejs',
            {
                title: 'Signin to your account', 
                error: {},
                value: {},
                flashMassage: Flash.getMessage(req)
            }
        )
        }

        console.log(user)
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if (err) {
                console.log(err)
                return next(err)
            }
            req.flash('success', 'Successfully loged in')
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