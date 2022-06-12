import { Router } from "express";

import AuthRoutes from "./auth/auth.routes";
import UserRoutes from "./user/user.routes";
import ProductsRoutes from "./products/products.routes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/products", ProductsRoutes);

export default router;
