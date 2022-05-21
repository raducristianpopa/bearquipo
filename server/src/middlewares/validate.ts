import { Request, NextFunction, Response } from "express";
import Joi from "joi";
import HTTPStatus from "http-status";
import _ from "lodash";

import APIError from "@config/APIError";

interface ISchema {
  body: Joi.ObjectSchema;
}

// properties of the `req` object that we use, or may use in a validation schema
const props = ["body", "params", "query"];

/**
 * @description validates the Joi schema.
 * @param {ISchema} schema
 * @returns
 */
export function validate(schema: ISchema) {
  return function (req: Request, _res: Response, next: NextFunction): void {
    const validSchema = _.pick(schema, props);
    const object = _.pick(req, Object.keys(validSchema));
    /* 
      👆🏻
      Validate `req` based on the Joi schema. The `req` object represents the HTTP request and has properties for
      the request query string, parameters, body, HTTP headers, and so on. We pick the correct properties from `req`
      using the lodash `pick` function based on the Joi validation Schema. 

      The option `abortEarly: false` will not stop the validation on the first error, it will validate the whole schema
      and it will output the errors for each failed validation.
      👇🏻
    */
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    /*
      If the validation fails, we map the `error` object grabing only the message and the field for each error.
      `err.path[1]` represents the field.
    */
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
