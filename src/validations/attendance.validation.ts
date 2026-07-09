import Joi from "joi";

export const createAttendanceValidation = Joi.object({
  employee_id: Joi.number().integer().positive().required(),
  date: Joi.date().required(),
  check_in_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "check_in_time must be in HH:mm:ss format",
    }),
});

export const updateAttendanceValidation = Joi.object({
  employee_id: Joi.number().integer().positive().optional(),
  date: Joi.date().optional(),
  check_in_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .optional()
    .messages({
      "string.pattern.base": "check_in_time must be in HH:mm:ss format",
    }),
});
