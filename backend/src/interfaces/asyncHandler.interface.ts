import { NextFunction, Request, Response } from 'express';

export interface AsyncHandler {
  (req: Request, res: Response, next: NextFunction): Promise;
}
