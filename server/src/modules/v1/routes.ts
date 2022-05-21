import { Request, Router } from "express";

import AuthRoutes from "./auth/auth.routes";

const router = Router();

router.use("/auth", AuthRoutes);

export default router;
