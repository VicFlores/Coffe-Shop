import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwtException from '../exception/jwtException';
import { IPayload } from '../interfaces/iPayload';
import { iRequest } from '../interfaces/iRequest';

const tokenValidation = (req: iRequest, res: Response, next: NextFunction) => {
  const token = req.header('token');

  if (!token) throw new jwtException(401, 'Access denied');

  const payload = jwt.verify(token, process.env.TOKEN_SECRET || '') as IPayload;

  req.userID = payload.id;

  next();
};

export default tokenValidation;
