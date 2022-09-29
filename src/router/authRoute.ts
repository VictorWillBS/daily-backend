import { Router } from "express";
import validSchema from "../middleware/validSchema";
import signInSchema from "../schemas/signinSchema";
import signUpSchema from "../schemas/signUpSchema";
import * as authController from "../controller/authController";
const authRoute = Router();
authRoute.post("/signup", validSchema(signUpSchema), authController.signup);
authRoute.post("/signin", validSchema(signInSchema), authController.singin);
export default authRoute;
