import Joi from "joi";

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required()
})

export default authSchema;