import { NextFunction, Request, Response } from 'express';

import { AuthContext } from '../types/types';

const addUserId = (
  _req: Request,
  res: Response<unknown, AuthContext>,
  next: NextFunction,
) => {
  res.locals.user = {
    _id: '6804e5915fd9f17b27e2cc5a',
  };
  next();
};

export default addUserId;
