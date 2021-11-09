import express, { NextFunction, Request, Response } from 'express';
import Users from '../services/user.service';

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

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await service.getUserById(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    console.log(body);
    const response = await service.postUser(body);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await service.putUser(body, id);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await service.deleteUser(id);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
