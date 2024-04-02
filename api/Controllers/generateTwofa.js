import express  from "express";
import User from '../Models/userSchema.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import speakeasy from 'speakeasy'

dotenv.config()

const APP_NAME = process.env.APP_NAME;

const generateTwofa = express.Router();

generateTwofa.post('/', async (req, res) => {
    const token = req.headers.authorization;
    
        const claims  = jwt.verify(token, 'secret')
        if (!claims) {
            res.status(500).json({
                message: 'Unauthenticated.'
            })
        }
        else{
            const secret = speakeasy.generateSecret({ name: APP_NAME });
            const user = await User.findOneAndUpdate(
                { _id: claims._id },
                { $set: { secret: secret.base32 } },
                { new: true }
            );
            
            //console.log(secret);
            
            return res.status(200).json({
                secret: secret.base32,
                otpauth_url: secret.otpauth_url
            })
        }
})

export default generateTwofa;