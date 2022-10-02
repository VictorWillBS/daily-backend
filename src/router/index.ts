import { Router } from "express";
import authRouter from "./authRoute";
import questionRouter from "./questionRouter";
import answerRouter from "./answerRoute";
const router = Router();

router.use(authRouter);
router.use(questionRouter);
router.use(answerRouter);
export default router;
