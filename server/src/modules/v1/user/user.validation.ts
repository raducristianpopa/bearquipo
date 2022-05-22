import Joi from "joi";

import { passwordValidation } from "@modules/v1/auth/auth.validation";

const UserValidation = {
  changePassword: {
    body: Joi.object().keys({
      old_password: Joi.string().required().label("Old password"),
      new_password: Joi.string().required().custom(passwordValidation).label("New password"),
      new_confirm_password: Joi.string()
        .strip()
        .required()
        .valid(Joi.ref("new_password"))
        .label("New confirm password")
        .messages({
          "any.only": "Passwords do not match.",
        }),
    }),
  },
};

export default UserValidation;
