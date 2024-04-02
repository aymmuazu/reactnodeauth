import express from "express";
import userRegister from '../Controllers/userRegister.js'
import userLogin from '../Controllers/userLogin.js';
import userGoogleLogin from "../Controllers/userGoogleLogin.js";
import userData from '../Controllers/userData.js'
import generateTwofa from "../Controllers/generateTwofa.js";
import validateTwofa from "../Controllers/validateTwofa.js"
import disableTwofa from "../Controllers/disableTwofa.js";
import updateProfile from "../Controllers/updateProfile.js";
import userLoginTwofa from "../Controllers/userLoginTwofa.js"
import userGoogleLoginTwofa from "../Controllers/userGoogleLoginTwofa.js"

const router  = express.Router();

router.use('/register', userRegister);
router.use('/login', userLogin);
router.use('/login/twofa', userLoginTwofa);
router.use('/login/googletwofa', userGoogleLoginTwofa);
router.use('/googlelogin', userGoogleLogin);
router.use('/user', userData);
router.use('/dashboard/generatetwofa', generateTwofa);
router.use('/dashboard/validatetwofa', validateTwofa);
router.use('/dashboard/diabledtwofa', disableTwofa);
router.use('/dashboard/profile', updateProfile)


export default router;