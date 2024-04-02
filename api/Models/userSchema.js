import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({

    first_name: {
        type: String,
        require: true
    },

    last_name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    secret: {
        type: String,
        require: false
    },

    verify_secret: {
        type: Boolean,
        require: false
    },

    status: {
        type: String,
        require: true
    },

    twofa: {
        type: Boolean,
        require: true
    }
})

const User = mongoose.model('User', userSchema);

export default User;