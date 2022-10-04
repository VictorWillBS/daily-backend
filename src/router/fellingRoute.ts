import { Router } from "express";
import fellingController from "../controller/fellingController";
import validSchema from "../middleware/validSchema";
import verifyToken from "../middleware/validToken";
import fellingSchema from "../schemas/fellingSchema";

const fellingRouter = Router();

fellingRouter.post(
  "/felling",
  verifyToken,
  validSchema(fellingSchema),
  fellingController.createFelling
);
fellingRouter.get(
  "/felling/today",
  verifyToken,
  fellingController.getFellingToday
);

export default fellingRouter;
