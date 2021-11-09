import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routerApi from './routes';

dotenv.config({ path: './.env' });
const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routerApi(app);

export default app;
