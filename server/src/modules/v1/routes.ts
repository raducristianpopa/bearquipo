import { Request, Router } from "express";

import AuthRoutes from "./auth/auth.routes";

const router = Router();

router.use("/auth", AuthRoutes);

router.post("/test", (req: Request) => {
  console.log(req.headers.cookie);
});

export default router;
