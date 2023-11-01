import { Router } from "express";
import apiRoutes from "./api";
const router = Router();

router.use("/api", apiRoutes);
// fallback 404
router.use("/api", (_, res) => res.status(404));

export default router;
