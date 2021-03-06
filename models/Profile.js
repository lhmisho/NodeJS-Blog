const { Schema, model } = require('mongoose')
const User = require('./User')
const Post = require('./Post')


const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    title: {
        type: String,
        trim: true,
        maxlength: 200
    },
    name:{
        type: String,
        trim: true,
        maxlength: 40
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    profilePic: String,
    socialLinks: {
        website: String,
        facebook: String,
        linkedin: String,
        twitter: String,
        github: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ]
}, {
    timestamps: true
})

const Profile = model('Profile', profileSchema)
module.exports = Profile