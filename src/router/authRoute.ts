import { Router } from "express";
import validSchema from "../middleware/validSchema";
import signInSchema from "../schemas/signinSchema";
import signUpSchema from "../schemas/signUpSchema";
import * as authController from "../controller/authController";
const authRouter = Router();
authRouter.post("/signup", validSchema(signUpSchema), authController.signup);
authRouter.post("/signin", validSchema(signInSchema), authController.singin);
export default authRouter;
