import { Router } from "express";
import answerController from "../controller/answerController";
import validSchema from "../middleware/validSchema";
import verifyToken from "../middleware/validToken";
import answerSchema from "../schemas/answerSchema";

const answerRouter = Router();

answerRouter.post(
  "/answer",
  verifyToken,
  validSchema(answerSchema),
  answerController.createAnswer
);

export default answerRouter;
