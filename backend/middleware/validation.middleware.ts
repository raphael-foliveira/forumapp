import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

type ExpressRequestKey = 'body' | 'headers' | 'query';

export const createValidationMiddleware = (key: ExpressRequestKey) => {
  return (schema: z.AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req[key] = schema.parse(req[key]);
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(400).json(JSON.stringify);
        }
        next(err);
      }
    };
  };
};

export const validateBodyMiddleware = createValidationMiddleware('body');

export const validateHeadersMiddleware = createValidationMiddleware('headers');

export const validateQueryMiddleware = createValidationMiddleware('query');
