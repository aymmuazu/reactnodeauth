import express  from "express";
import User from '../Models/userSchema.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import speakeasy from 'speakeasy'
import bcrypt from 'bcryptjs'

dotenv.config()

const APP_NAME = process.env.APP_NAME;

const userLoginTwofa = express.Router();

userLoginTwofa.post('/', async (req, res) => {

    const {authenticator_code, email, password} = req.body;

    try {
        const user = await User.findOne({ email: email })
        const secret = user.secret;
        const token = authenticator_code;

        const verified = speakeasy.totp.verify({secret, encoding: 'base32',token })
        
        if (verified) {

            if (!await bcrypt.compare(password, user.password)) {
                return res.status(500).json({
                    error: 'Invalid Credentials.'
                }); 
            }else{
                const expiresIn = '1h';
                const token = jwt.sign({ _id: user.id }, 'secret', { expiresIn });

                return res.status(200).json({
                    message: "You are now logged in successfully.",
                    token: token,
                })
            }
        }
        else{
            res.status(500).json({ verified: false })
        }

    } catch (error) {
        console.log(error);
    }
  
})

export default userLoginTwofa;
