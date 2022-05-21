import { Router } from "express";

import AuthRoutes from "./auth/auth.routes";
import UserRoutes from "./user/user.routes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;
