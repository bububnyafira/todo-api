const Joi = require("joi");

// Define validation schema using Joi
const todoSchema = Joi.object({
  title: Joi.string().required(),
  brand: Joi.string().required(),
  platform: Joi.string()
    .valid("Instagram", "Twitter", "Facebook", "TikTok", "Other")
    .required(),
  dueDate: Joi.date().required(),
  payment: Joi.number().min(0).allow(null),
  status: Joi.string()
    .valid("Draft", "Scheduled", "Published")
    .default("Draft"),
});

// Validation middleware
exports.validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
