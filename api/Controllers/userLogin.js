import express  from "express";
import authLoginSchema from "../Helpers/authLoginSchema.js";
const userLogin = express.Router();
import User from '../Models/userSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


userLogin.post('/', async (req, res) => {
    
    try {
        const { email, password } = req.body;

        const { error, data } = authLoginSchema.validate(req.body)

        if (error) {
            return res.status(500).json({
                error: error.details.map(err => err.message)
            });
        }
        else{

            const user = await User.findOne({ email: email })

            if (!user) {
                return res.status(500).json({
                    error: 'User not found at the moment.'
                });
            }

            else{
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
                        twofa: user.twofa
                    })
                }
            }

        }

    } catch (error) {
        console.log(error)
    }

})

export default userLogin;