import { NextFunction, Request, Response } from "express";
import HTTPStatus from "http-status";
import jwt from "jsonwebtoken";
import moment from "moment";
import { IAuthTokenPayload } from "jsonwebtoken";

import config from "@config/config";
import APIError from "@config/APIError";
import db from "@utils/db";

export async function isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token: string = req.cookies[config.cookies.authName];

  if (!token) next(new APIError(HTTPStatus.UNAUTHORIZED, "Unauthorized."));

  try {
    const { id, type } = <IAuthTokenPayload>jwt.verify(token, config.jwt.tokenSecret);

    const existingToken = await db.token.findFirst({
      where: {
        id,
        type,
        token,
      },
    });

    // Token was not found in the database
    if (!existingToken) {
      res.clearCookie(config.cookies.authName);
      return next(new APIError(HTTPStatus.UNAUTHORIZED, "Unauthorized."));
    }

    // Token was marked as expired before
    if (existingToken.is_expired) {
      res.clearCookie(config.cookies.authName);
      return next(new APIError(HTTPStatus.UNAUTHORIZED, "Unauthorized."));
    }

    // This means that the token expired and we have to delete the cookie and mark it as expired in database
    if (moment().unix() > moment(existingToken?.expires).unix()) {
      await db.token.update({
        where: {
          id,
        },
        data: {
          is_expired: true,
        },
      });

      res.clearCookie(config.cookies.authName);
      return next(new APIError(HTTPStatus.UNAUTHORIZED, "Unauthorized."));
    }

    // If all the checks are passed we pass the user id to the `req` object
    req.user = existingToken.user_id;
    return next();
  } catch (err) {
    const savedToken = await db.token.findUnique({ where: { token } });

    if (savedToken) {
      await db.token.update({
        where: { token: token },
        data: {
          is_expired: true,
        },
      });
    }

    res.clearCookie(config.cookies.authName);
    return next(new APIError(HTTPStatus.UNAUTHORIZED, "Unauthorized."));
  }
}
