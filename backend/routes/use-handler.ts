import { RequestHandler } from 'express';

export const useHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

export const useHandlers = (...handlers: RequestHandler[]) => {
  return handlers.map(useHandler);
};
