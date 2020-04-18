const User = require('../models/User')

// exports.bindUserWithRequest = () => async (req, res, next) => {
//     if(!req.session.isLoggedIn){
//         return next()
//     }

//     try{
//         let user = await User.findOne({_id: req.session.user._id})
//         req.user = user
//         next()
//     }catch(e){
//         console.log(e)
//         next(e)
//     }
// }

exports.bindUserWithRequest = async () => {
    return (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next()
        }
        try {
            let user = await User.findOne({ _id: req.session.user._id })
            req.user = user
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}