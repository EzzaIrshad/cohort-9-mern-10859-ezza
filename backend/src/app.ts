import express from 'express'
import cors from 'cors'
import logger from './config/logger.js';
import userRoute from './routes/auth.route.js'
import { pinoHttp } from 'pino-http';
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(pinoHttp({ logger }));

app.use('/api/auth', userRoute);

export default app;