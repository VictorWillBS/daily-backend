import { Router } from "express";
import authRouter from "./authRoute";
import questionRouter from "./questionRouter";
import answerRouter from "./answerRoute";
import fellingRouter from "./fellingRoute";
import dotenv from "dotenv";
import testerRouter from "./testerRoute";
dotenv.config();
const router = Router();

router.use(authRouter);
router.use(questionRouter);
router.use(answerRouter);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "test") {
  router.use(testerRouter);
}

router.use(fellingRouter);
export default router;
