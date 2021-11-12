import express from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';

const routerApi = (app: express.Application) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userRoute);
  router.use('/auth', authRoute);
};

export default routerApi;
