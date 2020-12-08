//Validation
const Joi = require("@hapi/joi");
// REGISTER VALIDATION
const registerValidation = (data) => {
    const schema =Joi.object( {
        name : Joi.string()
                    .min(6)
                    .required(),
        email : Joi.string()
        .min(6)
        .required()
        .email(),
        password :Joi.string()
        .min(6)
        .required()
    });
    //const {error} = schema.validate(req.body);
    return schema.validate(data);  
}
// REGISTER VALIDATION
const loginValidation = (data) => {
    const schema =Joi.object( {
        email : Joi.string()
        .min(6)
        .required()
        .email(),
        password :Joi.string()
        .min(6)
        .required()
    });
    //const {error} = schema.validate(req.body);
    return schema.validate(data)   
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
