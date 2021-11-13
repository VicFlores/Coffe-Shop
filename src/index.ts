import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routerApi from './routes';
import { handleDatabaseErrors, handleErrors } from './middleware/handleError';

dotenv.config({ path: './.env' });
const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routerApi(app);

app.use(handleErrors);
app.use(handleDatabaseErrors);

export default app;
