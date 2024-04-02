import express from 'express'
import jwt from 'jsonwebtoken';
import User from "../Models/userSchema.js"

const updateProfile = express.Router();


updateProfile.post('/', async (req, res) => {

    const token = req.headers.authorization;

    const claims = jwt.verify(token, "secret");

    if (!claims) {
        return res.status(500).json({
            message: "Unathenticated."
        })
    }
    else{        
        try {
            
            const updatedFields = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            }

            const user = await User.findOneAndUpdate(
                { _id: claims._id },
                {$set: updatedFields},
                {new: true}
            )

            return res.status(200).json({ message: "Profile Updated Successfully." })

        } catch (error) {
            return res.status(500).json({message: "Something went wrong."})
        }
    }


})

export default updateProfile;