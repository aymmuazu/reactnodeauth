import express  from "express";
import User from '../Models/userSchema.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import speakeasy from 'speakeasy'
import bcrypt from 'bcryptjs'

dotenv.config()

const APP_NAME = process.env.APP_NAME;

const userGoogleLoginTwofa = express.Router();

userGoogleLoginTwofa.post('/', async (req, res) => {

    const {authenticator_code, email} = req.body;

    try {
        const user = await User.findOne({ email: email })
        const secret = user.secret;
        const token = authenticator_code;

        const verified = speakeasy.totp.verify({secret, encoding: 'base32',token })
        
        if (verified && user) {

            const expiresIn = '1h';
            const token = jwt.sign({ _id: user.id }, 'secret', { expiresIn });

            return res.status(200).json({
                message: "You are now logged in successfully.",
                token: token,
            })
            
        }
        else{
            res.status(500).json({ verified: false })
        }

    } catch (error) {
        console.log(error);
    }
  
})

export default userGoogleLoginTwofa;
