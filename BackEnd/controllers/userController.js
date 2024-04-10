import User from '../db/models/userModel.js'

import bcrypt from 'bcrypt'
import generateTokenAndSetCookies from '../utils/generateTokenAndSetCookies.js';

export const signupUser = async (req, res, next) => {
    try {

        let { name, email, username, password } = req.body;
        console.log(req.body)

        username = username.replace(/\s+/g, '_');

        const user = await User.findOne({ $or: [{ email }, { username }] })
        console.log(user)

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword

        })

        await newUser.save()

        generateTokenAndSetCookies(newUser._id, res)

        res.status(200).json({
            success: true,
            newUser
        })

    }

    catch (err) {
        res.status(500).json({ message: err.message })
        console.log({ Error: err.message  , path : err.stack})
    }
}



export const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid username or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid username or password" })
        }

        generateTokenAndSetCookies(user._id, res)

        res.status(200).json({
            login: "success",
            user
        })


    }
    catch (err) {
        res.status(500).json({ message: err.message })
        console.log({ error: err.message })
    }
}


export const logout = async (req, res) => {

    res.clearCookie('jwt');
    res.status(200).json({
        success: true,
        logout: 'user logged out'
    });



}


export const followUnfollowUser = async (req, res, next) => {

    try{

        const { id } = req.params;
        const userToModify = await User.findById(id);
    
        const currentUser = await User.findById(req.user._id)
    
        if (!userToModify || !currentUser) {
            return res.status(500).json({
                success: false,
                error: "User does not exist"
            })
        }

    
    
        if (id === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot follow/unfollow yourself"
            })
        }
    
        const isFollowing = currentUser.following.includes(id)
    
        if (isFollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
    
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { following: id }
    
            })

            res.status(200).json({
                success : true,
                action : "user unfollowed"
            })
        }
        else {
            await User.findByIdAndUpdate(id , {$push: {followers : req.user._id}})
    
            await User.findByIdAndUpdate(req.user._id , {
                $push : {following : id}})

                res.status(200).json({
                    success : true,
                    action : "user followed"
                })
    
            }





    }
    catch(err){

        res.status(500).json({
            success: false,
            error : err.message
        })

        console.log({
            error : err.message,
           path : err.stack
        })

    }
  

}


export const updateUser = async (req , res)=>{

    const {password , username} = req.body;

    const userId = req.user._id

 

    try{

        let user = await User.findById(userId)

    

        if(!user){
            return res.status(400).json({
                message : 'user not found'
            })
        }

        if(req.params.id !== userId.toString() ) {
            return res.status(400).json({
                message : 'unauthorized request'
            })

        }

      

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password , salt)

            req.body.password = hashedPassword
        }

        if(username){
            req.body.username = username.replace(/\s+/g, '_');
        }

     

        const updatedUser = await User.findByIdAndUpdate(userId , req.body , {new : true})

        console.log(req.body)

       res.status(200).json({
        updatedUser
       })



    }
    catch(err){
        res.status(500).json({
            error : err.message
        })

        console.log({
            err : err.message
        })
    }



}




