import express from 'express';
import userRoute from './user.route';

const routerApi = (app: express.Application) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userRoute);
};

export default routerApi;
