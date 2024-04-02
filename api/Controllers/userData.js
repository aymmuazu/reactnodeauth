import express  from "express";
import User from '../Models/userSchema.js'
import jwt from 'jsonwebtoken'

const userData = express.Router();

userData.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const claims  = jwt.verify(token, 'secret')
        if (!claims) {
            res.status(500).json({
                message: 'Unauthenticated.'
            })
        }
        else{
            const user = await User.findOne({ _id: claims._id })
            const { password, secret, verify_secret,__v,_id, ...data } = user.toJSON();

            return res.status(200).json(data);

        }
    } catch (error) {
         return res.status(401).send({
            message: 'Unauthenticated.'
        }) 
    }
})

export default userData;