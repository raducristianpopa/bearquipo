import express from "express";

import { isAuthenticated } from "@middlewares/isAuthenticated";
import { validate } from "@middlewares/validate";

import UserController from "./user.controller";
import UserValidation from "./user.validation";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, UserController.me)
  .patch(isAuthenticated, validate(UserValidation.changePassword), UserController.changePassword)
  .put(isAuthenticated, validate(UserValidation.updateUser), UserController.updateUser);

router
  .route("/address")
  .post(isAuthenticated, validate(UserValidation.addAddress), UserController.createAddress);

// router.get("/me", isAuthenticated, UserController.me);
// router.patch(
//   "/change-password",
//   isAuthenticated,
//   validate(UserValidation.changePassword),
//   UserController.changePassword
// );
// router.put(
//   "/update-profile",
//   isAuthenticated,
//   validate(UserValidation.updateUser),
//   UserController.updateUser
// );

export default router;
