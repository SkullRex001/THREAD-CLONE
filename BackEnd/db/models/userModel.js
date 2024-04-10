import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    username : {
        type : String,
        required : true,
        unique : true,
        minLength : [5, "username to short "],
    },

    email : {
        type : String,
        required : true,
        unique : true,
        validate : [validator.isEmail , "please enter a valid email"]
    },
    password : {
        type : String,
        minLength : 6,
        required : true,
        select : false,
    },

    profilePic : {
        type : String,
        default : ""
    },

    followers: {
        type : [String],
        default : []
    },
    following : {
        type : [String],
        default : []
    },

    bio : {
        type : String,
        default : "",
        maxLength : [500 , "bio is too long"]
        
    },
} , {timestamps : true})


const User = mongoose.model('User' , userSchema)

export default User