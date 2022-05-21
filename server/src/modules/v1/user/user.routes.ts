import express from "express";

import { isAuthenticated } from "@middlewares/isAuthenticated";

import UserController from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, UserController.me);

export default router;
