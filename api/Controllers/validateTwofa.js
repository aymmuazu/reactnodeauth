import express  from "express";
import User from '../Models/userSchema.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import speakeasy from 'speakeasy'

dotenv.config()

const APP_NAME = process.env.APP_NAME;

const validateTwofa = express.Router();

validateTwofa.post('/', async (req, res) => {

    const {secret, qrcode, otptoken} = req.body;

    const header_token = req.headers.authorization;
    const claims  = jwt.verify(header_token, 'secret')
        if (!claims) {
            res.status(500).json({
                message: 'Unauthenticated.'
            })
        }
        else{

            try {
                const user = await User.findOne({ _id: claims._id })
                const secret = user.secret;
                const token = otptoken;

                const verified = speakeasy.totp.verify({secret, encoding: 'base32',token })
                
                if (verified) {

                    const updatedFields = {
                        'verify_secret': true,
                        'twofa': true
                    }

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: user._id},
                        { $set: updatedFields }
                    );

                    res.status(200).json({ verified: true })
                }
                else{
                    res.status(500).json({ verified: false })
                }
            } catch (error) {
                console.log(error);
            }

        }
})

export default validateTwofa;
