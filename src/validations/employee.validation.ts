import Joi from "joi";

export const createEmployeeValidation = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().positive().required(),
  designation: Joi.string().required(),
  hiring_date: Joi.date().required(),
  date_of_birth: Joi.date().required(),
  salary: Joi.number().positive().required(),
});

export const updateEmployeeValidation = Joi.object({
  name: Joi.string().optional(),
  age: Joi.number().integer().positive().optional(),
  designation: Joi.string().optional(),
  hiring_date: Joi.date().optional(),
  date_of_birth: Joi.date().optional(),
  salary: Joi.number().positive().optional(),
});
