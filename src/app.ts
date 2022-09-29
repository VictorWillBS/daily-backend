import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(json());
app.use(cors());


