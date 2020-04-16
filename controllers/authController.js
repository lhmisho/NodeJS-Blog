let User = require('../models/User')
const bcrypt = require('bcrypt')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup.ejs', { title: 'Create a new account' })
}

exports.signupPostController = async (req, res, next) => {
    console.log(req.body)

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

}

exports.loginPostController = (req, res, next) => {

}

exports.logoutController = (req, res, next) => {

}