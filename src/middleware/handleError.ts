import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from 'pg-protocol';
import httpException from '../exception/httpException';
import jwtException from '../exception/jwtException';

export const handleErrors = (
  err: httpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    return res.status(status).json({
      message,
      status,
    });
  }
  next(err);
};

export const handleJwtError = (
  err: jwtException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    const status = err.status || 401;
    const message = err.message || 'Jwt error';
    return res.status(status).json({
      message,
      status,
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
      message: err,
    });
  }
  next(err);
};
