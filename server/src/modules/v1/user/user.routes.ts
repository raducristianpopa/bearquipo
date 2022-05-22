import express from "express";

import { isAuthenticated } from "@middlewares/isAuthenticated";
import { validate } from "@middlewares/validate";

import UserController from "./user.controller";
import UserValidation from "./user.validation";

const router = express.Router();

router.get("/me", isAuthenticated, UserController.me);
router.patch(
  "/change-password",
  isAuthenticated,
  validate(UserValidation.changePassword),
  UserController.changePassword
);

export default router;
