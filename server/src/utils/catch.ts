import { Request, Response, NextFunction } from "express";

/**
 * @description catch function to avoid using try-catch block
 * @param fn
 * @returns {Promise<any>}
 */
export function catcher(fn: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(error => next(error));
  };
}
