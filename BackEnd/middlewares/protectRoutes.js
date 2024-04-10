import User from '../db/models/userModel.js'
import jwt from 'jsonwebtoken'

const protectRouts = async (req ,res , next)=>{

    try{

        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({
                message : "You are Unauthorized"
            })
        }

        const decode = jwt.verify(token , process.env.JWTSECREAT)

        const user = await User.findById(decode.userId)

        req.user = user

        next()

    }
    catch(err){

        res.status(500).json({message : err.message})
        console.log({error : err.message})

    }

}

export default protectRouts