import Joi from "joi";

const authLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
})

export default authLoginSchema;