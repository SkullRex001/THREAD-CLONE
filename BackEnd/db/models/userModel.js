import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true , "name is required"],
        trim : true
    },

    username: {
        type: String,
        required: [true , "username is required"],
        unique: true,
        minLength: [5, "username to short "],
        trim : true
    },

    email: {
        type: String,
        required: [true , "email is required"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email"],
        trim : true
    },
    password: {
        type: String,
        minLength: 6,
        required: [true , 'password is required'],
        select: false,
        trim : true
    },

    profilePic: {
        type: String,
        default: ""
    },

    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },

    bio: {
        type: String,
        default: "",
        maxLength: [500, "bio is too long"],
        trim : true

    },
}, {
    timestamps: true,
    select : false
})


const User = mongoose.model('User', userSchema)

export default User