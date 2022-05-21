import { Details } from "express-useragent";
import { User } from "@prisma/client";
import HTTPStatus from "http-status";
import argon2 from "argon2";

import { IAuthService } from "./auth.interface";

import db from "@utils/db";
import APIError from "@config/APIError";

const AuthService: IAuthService = {
  async createUser(user: User, remoteAddress: string | undefined, userAgent: Details): Promise<void> {
    const existingUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) throw new APIError(HTTPStatus.BAD_REQUEST, `E-mail '${user.email}' already exists.`);

    // hash existing password
    user.password = await argon2.hash(user.password);

    await db.user.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        register_info: {
          create: {
            ip: remoteAddress || "",
            browser: userAgent.browser,
            brower_version: userAgent.version,
            os: userAgent.os,
            platform: userAgent.platform,
            user_agent: userAgent.source,
          },
        },
      },
    });
  },
};

export default AuthService;
