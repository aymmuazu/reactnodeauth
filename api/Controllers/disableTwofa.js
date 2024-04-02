import express from "express";
import jwt from 'jsonwebtoken';
import User from '../Models/userSchema.js'

const disableTwofa = express.Router();

disableTwofa.post('/', async (req, res) => {
    
    const token = req.headers.authorization;

    const claims = jwt.verify(token, 'secret');

    if (!claims) {
        return res.status(500).json({
            message: 'Unauthorized'
        })
    }
    else{

        try {
            const user = await User.findOneAndUpdate(
                {_id: claims._id},
                {$set: { twofa: false }},
                {new: true}
            )

            return res.status(200).json({ message: "You have successfully disabled two factor." })
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong." })
        }


    }


})

export default disableTwofa;