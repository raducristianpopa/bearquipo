import express from "express";

import { validate } from "@middlewares/validate";

import AuthValidation from "./auth.validation";
import AuthController from "./auth.controller";

const router = express.Router();

router.post("/signup", validate(AuthValidation.createUser), AuthController.signup);

export default router;
