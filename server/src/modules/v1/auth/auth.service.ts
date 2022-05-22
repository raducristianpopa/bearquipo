import HTTPStatus from "http-status";
import argon2 from "argon2";

import { IAuthService } from "./auth.interface";

import db from "@utils/db";
import APIError from "@config/APIError";

const AuthService: IAuthService = {
  async createUser(user, remoteAddress, userAgent) {
    const existingUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) throw new APIError(HTTPStatus.BAD_REQUEST, `E-mail '${user.email}' already exists.`);

    user.password = await argon2.hash(user.password);

    await db.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        registerInfo: {
          create: {
            ip: remoteAddress || "",
            browser: userAgent.browser,
            browserVersion: userAgent.version,
            os: userAgent.os,
            platform: userAgent.platform,
            userAgent: userAgent.source,
          },
        },
      },
    });
  },

  async verifyUser(user) {
    const existingUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) throw new APIError(HTTPStatus.UNAUTHORIZED, "Invalid credentials");

    const passwordsMatch = await argon2.verify(existingUser.password, user.password);
    if (!passwordsMatch) throw new APIError(HTTPStatus.UNAUTHORIZED, "Invalid credentials");

    return existingUser;
  },

  async removeCurrentSession(token) {
    await db.token.update({
      where: {
        token,
      },
      data: {
        isExpired: true,
      },
    });
  },

  async removeAllUserSession(userId) {
    await db.token.updateMany({
      where: {
        userId,
      },
      data: {
        isExpired: true,
      },
    });
  },
};

export default AuthService;
