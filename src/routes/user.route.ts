import express, { NextFunction, Request, Response } from 'express';
import handlerValidator from '../middleware/handlerValidator';
import Users from '../services/user.service';
import {
  getUserByIdSchema,
  postUserSchema,
  putUserSchema,
} from '../schemas/user.schema';

const router = express.Router();
const service = new Users();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await service.getUsers();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  handlerValidator(getUserByIdSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await service.getUserById(id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  handlerValidator(postUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const response = await service.postUser(body);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  handlerValidator(getUserByIdSchema, 'params'),
  handlerValidator(putUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const response = await service.putUser(body, id);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  handlerValidator(getUserByIdSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await service.deleteUser(id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
