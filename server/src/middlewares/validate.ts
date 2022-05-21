import { Request, NextFunction, Response } from "express";
import Joi from "joi";
import HTTPStatus from "http-status";
import _ from "lodash";

import APIError from "@config/APIError";

interface ISchema {
  body: Joi.ObjectSchema;
}

export function validate(schema: ISchema) {
  return function (req: Request, _res: Response, next: NextFunction): void {
    const validSchema = _.pick(schema, ["body"]);
    const object = _.pick(req, Object.keys(validSchema));

    //@ts-ignore
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const details = error.details.map(err => ({
        field: err.path[1],
        message: err.message.replace(/['"]/g, ""),
      }));

      return next(
        new APIError(HTTPStatus.BAD_REQUEST, "Some of the fields are not filled correctly.", false, details)
      );
    }

    Object.assign(req, value);
    return next();
  };
}
