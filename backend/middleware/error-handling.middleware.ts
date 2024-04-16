import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export const errorHandlingMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json(err.issues);
  }
  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ error: err.message, status: err.status });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};
