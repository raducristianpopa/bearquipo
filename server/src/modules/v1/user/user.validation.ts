import Joi from "joi";

import { passwordValidation } from "@modules/v1/auth/auth.validation";

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
};

export default UserValidation;
