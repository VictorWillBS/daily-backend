import { Router } from "express";
import authRouter from "./authRoute";
import questionRouter from "./questionRouter";
const router = Router();

router.use(authRouter);
router.use(questionRouter);

export default router;
