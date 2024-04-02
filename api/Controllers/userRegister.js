import express from 'express'
import authSchema from '../Helpers/authSchema.js';
import bcrypt from 'bcryptjs'
import User from '../Models/userSchema.js';

const userRegister = express.Router();

userRegister.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const { error, value } = authSchema.validate(req.body);
        
        if (error) {
            return res.status(500).json({
                error: error.details.map(err => err.message)
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            secret: null,
            verify_secret: false,
            status: 'active',
            twofa: false,
        }

        const user = new User(data)

        await user.save();

        return res.status(200).json({
            message: "User account created successful"
        })
        
    } catch (error) {
        return res.status(501).json({
            message: "Something went wrong."
        })
    }
})

export default userRegister;