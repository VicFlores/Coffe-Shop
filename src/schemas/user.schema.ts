import Joi from 'joi';

const id = Joi.number().integer().required();
const name = Joi.string().required();
const password = Joi.string().min(8).required();
const email = Joi.string().email().required();

export const getUserByIdSchema = Joi.object({
  id,
});

export const postUserSchema = Joi.object({
  name,
  password,
  email,
});

export const putUserSchema = Joi.object({
  name,
  email,
});
