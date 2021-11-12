import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from 'pg-protocol';

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  next(err);
};

export const handleDatabaseErrors = (
  err: DatabaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.severity) {
    return res.status(409).json({
      message: err.detail,
    });
  }
  next(err);
};
