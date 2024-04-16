import { RequestHandler } from 'express';

export const useHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
