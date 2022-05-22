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
    }),
  },
};

export default UserValidation;
