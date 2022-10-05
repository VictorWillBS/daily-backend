import { Router } from "express";
import questionController from "../controller/questionController";
import validSchema from "../middleware/validSchema";
import verifyToken from "../middleware/validToken";
import questionSchema from "../schemas/questionSchema";

const questionRouter = Router();

questionRouter.post(
  "/question/create",
  verifyToken,
  validSchema(questionSchema),
  questionController.createQuestion
);
questionRouter.get("/questions", verifyToken, questionController.getQuestions);
questionRouter.get(
  "/questions/:date",
  verifyToken,
  questionController.getQuestionsByDate
);

questionRouter.delete(
  "/questions/:id",
  verifyToken,
  questionController.disableQuestion
);

export default questionRouter;
