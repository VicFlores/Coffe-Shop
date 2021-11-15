import express, { NextFunction, Request, Response } from 'express';
import Auth from '../services/auth.service';

const router = express.Router();
const service = new Auth();

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const response = await service.logUser(body);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const response = await service.resetPassword(email);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/changePass',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
