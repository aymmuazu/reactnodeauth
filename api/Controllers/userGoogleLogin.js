import express  from "express";
import authLoginSchema from "../Helpers/authLoginSchema.js";
const userGoogleLogin = express.Router();
import User from '../Models/userSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


userGoogleLogin.post('/', async (req, res) => {
    
    try {
        const { message, email, authorization } = req.body;


        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(500).json({
                error: 'User not found at the moment.'
            });
        }

        else{
        
            const expiresIn = '1h';
            const token = jwt.sign({ _id: user.id }, 'secret', { expiresIn });

            return res.status(200).json({
                message: "You are now logged in successfully.",
                token: token,
                twofa: user.twofa
            })
        }        

    } catch (error) {
        console.log(error)
    }

    
})

export default userGoogleLogin;