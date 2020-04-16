/**
 * name,
 * email,
 * password,
 * profile 
 */

const { Schema, model, SchemaTypes } = require('mongoose')
const Profile = require('./Profile')


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 15,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User