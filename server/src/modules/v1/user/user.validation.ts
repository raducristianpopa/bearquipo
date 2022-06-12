import Joi from "joi";

import { passwordValidation } from "@modules/v1/auth/auth.validation";
import regex from "@utils/regex";

const UserValidation = {
  changePassword: {
    body: Joi.object().keys({
      oldPassword: Joi.string().required().label("Old password"),
      newPassword: Joi.string().required().custom(passwordValidation).label("New password"),
      newConfirmPassword: Joi.string()
        .strip()
        .required()
        .valid(Joi.ref("newPassword"))
        .label("New confirm password")
        .messages({
          "any.only": "Passwords do not match.",
        }),
    }),
  },

  updateUser: {
    body: Joi.object().keys({
      firstName: Joi.string()
        .trim()
        .required()
        .pattern(regex.ONLY_ALPHA_SPACES)
        .min(3)
        .max(50)
        .label("First name")
        .messages({
          "string.pattern.base":
            "{{#label}} can only cantain alpha characteres, whitespaces and dash symbol.",
        }),
      lastName: Joi.string()
        .required()
        .trim()
        .pattern(regex.ONLY_ALPHA_SPACES)
        .min(3)
        .max(50)
        .label("Last name")
        .messages({
          "string.pattern.base":
            "{{#label}} can only cantain alpha characteres, whitespaces and dash symbol.",
        }),
    }),
  },

  addAddress: {
    body: Joi.object().keys({
      addressLine1: Joi.string()
        .pattern(regex.ONLY_ALPHA_NUM_DASH_SPACES_DOT)
        .min(3)
        .trim()
        .required()
        .label("Address line 1")
        .messages({
          "string.pattern.base":
            "{{#label}} can only contain alphanumeric characters, whitespaces, dashes and dots.",
        }),
      addressLine2: Joi.string().empty("").default(null).trim().label("Address line 2"),
      city: Joi.string().min(3).required().label("City"),
      state: Joi.string().required().label("State"),
      postalCode: Joi.string().min(3).required().label("Postal code"),
      country: Joi.string().min(3).required().label("Country"),
      phone: Joi.string().min(9).required().label("Phone number"),
    }),
  },

  updateAddress: {
    body: Joi.object().keys({
      id: Joi.string().required().uuid(),
      addressLine1: Joi.string()
        .pattern(regex.ONLY_ALPHA_NUM_DASH_SPACES_DOT)
        .min(3)
        .trim()
        .required()
        .label("Address line 1")
        .messages({
          "string.pattern.base":
            "{{#label}} can only contain alphanumeric characters, whitespaces, dashes and dots.",
        }),
      addressLine2: Joi.string().empty("").default(null).trim().label("Address line 2"),
      city: Joi.string().min(3).required().label("City"),
      state: Joi.string().required().label("State"),
      postalCode: Joi.string().min(3).required().label("Postal code"),
      country: Joi.string().min(3).required().label("Country"),
      phone: Joi.string().min(9).required().label("Phone number"),
    }),
  },
};

export default UserValidation;
