import HTTPStatus from "http-status";
import { NextFunction, Request, Response } from "express";

import config from "@config/config";
import log from "@config/logger";
import APIError from "@config/APIError";

/**
 * @description Converts unknown thrown errors to an APIError
 * @param {any | APIError} error
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} _next
 */
export function errorConverter(error: any | APIError, _req: Request, _res: Response, next: NextFunction) {
  if (!(error instanceof APIError)) {
    const statusCode = error.statusCode ? HTTPStatus.BAD_REQUEST : HTTPStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || HTTPStatus[statusCode];
    error = new APIError(statusCode, message, false, error.stack);
  }

  next(error);
}

/**
 * @description Generates the error that has to be sent
 * @param {APIError} error
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} _next
 */
export function errorHandler(error: APIError, _req: Request, res: Response, _next: NextFunction) {
  let { statusCode, message } = error;

  if (config.env === "production") {
    statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
    message = HTTPStatus[statusCode] as string;
  }

  const errorResponse = {
    code: statusCode,
    message,
    fields: error.fields,
    ...(config.env === "development" && { stack: error.stack }),
  };

  if (config.env === "development") log.error(error);

  res.status(statusCode).json(errorResponse);
}
