const Joi = require('joi')

const postRegisterSchema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const postAuthSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const putAuthSchema = Joi.object({
    refreshToken: Joi.string().required()
})

const deleteAuthSchema = Joi.object({
    refreshToken: Joi.string().required()
})

module.exports = {postRegisterSchema, postAuthSchema, putAuthSchema, deleteAuthSchema}