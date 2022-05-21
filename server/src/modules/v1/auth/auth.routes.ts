import express from "express";

import { validate } from "@middlewares/validate";

import AuthValidation from "./auth.validation";
import AuthController from "./auth.controller";

const router = express.Router();

router.post("/signup", validate(AuthValidation.register), AuthController.signup);
router.post("/signin", validate(AuthValidation.login), AuthController.signin);

export default router;
