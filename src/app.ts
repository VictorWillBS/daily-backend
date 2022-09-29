import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import errorHandle from "./middleware/errorMiddleware";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandle);
export default app;
