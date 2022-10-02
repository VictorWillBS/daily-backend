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

export default questionRouter;
