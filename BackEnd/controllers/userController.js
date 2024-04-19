import User from '../db/models/userModel.js'
import bcrypt from 'bcrypt'
import generateTokenAndSetCookies from '../utils/generateTokenAndSetCookies.js';

import { v2 } from 'cloudinary';

export const signupUser = async (req, res, next) => {
    try {

        let { name, email, username, password } = req.body;


        username = username.replace(/\s+/g, '_');

        let user = await User.findOne({ $or: [{ email }, { username }] })


        if (user) {
            return res.status(400).json({
                error: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        user = new User({
            name,
            email,
            username,
            password: hashedPassword

        })

        await user.save()

        generateTokenAndSetCookies(user._id, res)

        res.status(200).json({
            success: true,
            user
        })

    }

    catch (err) {
        res.status(500).json({ error: err.message })
        console.log({ Error: err.message, path: err.stack })
    }
}



export const loginUser = async (req, res) => {
    try {



        const { username, password } = req.body;

        console.log(username)
        console.log(password)
        const user = await User.findOne({ username }).select('+password')
        if (!user) {
            return res.status(400).json({
                error: "Invalid username or password"
            })
        }



        const isPasswordCorrect = await bcrypt.compare(password, user.password)



        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" })
        }





        generateTokenAndSetCookies(user._id, res)


        res.status(200).json({
            success: true,
            login: "success",
            user
        })




    }
    catch (err) {
        res.status(500).json({ error: err.message })
        console.log({
            error: err.message,
            path: err.stack
        })
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

    try {

        const { id } = req.params;
        let userToModify = await User.findById(id);

        const currentUser = await User.findById(req.user._id)

        if (!userToModify || !currentUser) {
            return res.status(500).json({
                error: "User does not exist"
            })
        }



        if (id === req.user._id.toString()) {
            return res.status(400).json({
                error: "You cannot follow/unfollow yourself"
            })
        }

        const isFollowing = currentUser.following.includes(id)

        if (isFollowing) {
           userToModify =  await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } } , {new : true});

            await User.findByIdAndUpdate(req.user._id, {
                $pull: { following: id }

            })

            res.status(200).json({
                success: true,
                action: "user unfollowed",
                user : userToModify
            })
        }
        else {
            userToModify =   await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } } , {new : true})

            await User.findByIdAndUpdate(req.user._id, {
                $push: { following: id }
            })

            res.status(200).json({
                success: true,
                action: "user followed",
                user : userToModify
            })

        }





    }
    catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        })

        console.log({
            error: err.message,
            path: err.stack
        })

    }


}


export const updateUser = async (req, res) => {

    let { password, username, profilePic , bio , name , email } = req.body;

    const userId = req.user._id



    try {

        let user = await User.findById(userId)



        if (!user) {
            return res.status(400).json({
                error: 'user not found'
            })
        }

        if (req.params.id !== userId.toString()) {
            return res.status(400).json({
                error: 'unauthorized request'
            })

        }




        if (username) {
            req.body.username = username.replace(/\s+/g, '_');
        }

        if (profilePic) {

            if (user.profilePic) {

                await v2.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])

            }

            const uplodedResponse = await v2.uploader.upload(profilePic)

            profilePic = uplodedResponse.secure_url;
            req.body.profilePic = profilePic



        }

        console.log(userId)


        if (password.length >= 6) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            req.body.password = hashedPassword
            user = await User.findByIdAndUpdate(userId, req.body, { new: true })
            console.log(user)

            return res.status(200).json({
                success: true,
                user
            })
        }

        req.body.name  = name || user.name
        req.body.bio  = bio || user.bio
        req.body.email  = email || user.email
        req.body.profilePic  = profilePic || user.profilePic



        user = await User.findByIdAndUpdate(userId, {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            profilePic: req.body.profilePic,
            bio: req.body.bio

        }, { new: true })

        console.log(user)

        user.password = null



        res.status(200).json({
            success: true,
            user
        })



    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })

        console.log({
            err: err.message
        })
    }



}


export const searchUserProfile = async (req, res) => {
    const { username, name } = req.query;

    try {

        const user = await User.find({
            $or: [
                { name: { $regex: new RegExp(name, 'i') } },
                { username: { $regex: new RegExp(username, 'i') } }
            ]
        });


        if (!user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })

        console.log({
            error: err.message,
            path: err.stack
        })
    }

}


export const getUserProfile = async (req , res) =>{
    try {
        const {username} = req.params

        const user = await User.findOne({
         username: { $regex: new RegExp(username, 'i')
        }})

        console.log(user)



        if(!user){
           return res.status(400).json({
                error : "User Not Found"
            })
        }

        res.status(200).json({
            success : true ,
            user
        })
        
    } catch (error) {
        console.log({
            error : error.message,
            path : error.stack
        })

        res.status(500).json({
            error : "Something went wrong"
        })
    }
}



