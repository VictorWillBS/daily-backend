import { Router } from "express";
import testerController from "../controller/testerController";
const testerRouter = Router();

testerRouter.post("/clearbank", testerController.clearbank);

export default testerRouter;
