import express from "express";

import { isAuthenticated } from "@middlewares/isAuthenticated";

const router = express.Router();

router.get("/me", isAuthenticated);

export default router;
