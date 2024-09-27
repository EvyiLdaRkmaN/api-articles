import { NextFunction, Request, Response } from 'express';

interface Error extends SyntaxError {
  name: string;
  message: string;
  stack?: string;
  status: number;
}

const validateJSON = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    res.status(400).send({ status: 404, message: err.message }); // Bad request
    return;
  }
  next();
};

export default validateJSON;
