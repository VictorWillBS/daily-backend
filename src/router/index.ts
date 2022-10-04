import { Router } from "express";
import authRouter from "./authRoute";
import questionRouter from "./questionRouter";
import answerRouter from "./answerRoute";
import fellingRouter from "./fellingRoute";
const router = Router();

router.use(authRouter);
router.use(questionRouter);
router.use(answerRouter);
router.use(fellingRouter);
export default router;
