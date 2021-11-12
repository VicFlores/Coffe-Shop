import express, { NextFunction, Request, Response } from 'express';
import Auth from '../services/auth.service';

const router = express.Router();
const service = new Auth();

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

export default router;
