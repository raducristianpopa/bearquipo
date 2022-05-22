import Joi, { CustomHelpers } from "joi";

import regex from "@utils/regex";

export function passwordValidation(value: string, helpers: CustomHelpers) {
  if (value.length < 8) {
    return helpers.message({ custom: "{{#label}} must be at least 8 characters" });
  }
  if (!regex.MIN_ONE_LOWERCASE.test(value)) {
    return helpers.message({ custom: "{{#label}} has to contain at least one lowercase character" });
  }
  if (!regex.MIN_ONE_UPPERCASE.test(value)) {
    return helpers.message({ custom: "{{#label}} has to contain at least one uppercase character" });
  }
  if (!regex.MIN_ONE_NUMERIC.test(value)) {
    return helpers.message({ custom: "{{#label}} has to contain at least one number" });
  }
  if (!regex.MIN_ONE_SPECIAL.test(value)) {
    return helpers.message({ custom: "{{#label}} has to contain at least one special character" });
  }

  return value;
}

const AuthValidation = {
  register: {
    body: Joi.object().keys({
      firstName: Joi.string()
        .trim()
        .required()
        .pattern(regex.ONLY_ALPHA_SPACES)
        .min(3)
        .max(50)
        .label("First name")
        .messages({
          "string.pattern.base": "{#label} can only cantain alpha characteres, whitespaces and dash symbol.",
        }),
      lastName: Joi.string()
        .required()
        .trim()
        .pattern(regex.ONLY_ALPHA_SPACES)
        .min(3)
        .max(50)
        .label("Last name")
        .messages({
          "string.pattern.base": "{#label} can only cantain alpha characteres, whitespaces and dash symbol.",
        }),
      email: Joi.string()
        .trim()
        .required()
        .email({
          minDomainSegments: 2,
        })
        .label("E-mail"),
      password: Joi.string().required().custom(passwordValidation).label("Password"),
      confirmPassword: Joi.string()
        .strip()
        .required()
        .valid(Joi.ref("password"))
        .label("Confirm password")
        .messages({
          "any.only": "Passwords do not match.",
        }),
    }),
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string()
        .trim()
        .required()
        .email({
          minDomainSegments: 2,
        })
        .label("E-mail"),
      password: Joi.string().required().label("Password"),
    }),
  },
};

export default AuthValidation;
