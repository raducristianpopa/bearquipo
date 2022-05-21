import express from "express";

import { validate } from "@middlewares/validate";
import { isAuthenticated } from "@middlewares/isAuthenticated";

import AuthValidation from "./auth.validation";
import AuthController from "./auth.controller";

const router = express.Router();

router.post("/signup", validate(AuthValidation.register), AuthController.signUp);
router.post("/signin", validate(AuthValidation.login), AuthController.signIn);
router.post("/signout", isAuthenticated, AuthController.signOut);
router.post("/signoutall", isAuthenticated, AuthController.massSignOut);

export default router;
