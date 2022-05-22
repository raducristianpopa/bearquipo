import HTTPStatus from "http-status";
import argon2 from "argon2";

import APIError from "@config/APIError";
import db from "@utils/db";

import { IUserInterface } from "./user.interface";

const UserService: IUserInterface = {
  async getUser(userId: string) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        tokens: {
          select: {
            issuedAt: true,
            browser: true,
            browserVersion: true,
            os: true,
            platform: true,
          },
        },
      },
    });

    if (!user) throw new APIError(HTTPStatus.NOT_FOUND, "User not found.");

    return user;
  },

  async changePassword(userId, passwords) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new APIError(HTTPStatus.NOT_FOUND, "User not found");

    const passwordsMatch = await argon2.verify(user.password, passwords.oldPassword);
    if (!passwordsMatch) {
      if (!user) throw new APIError(HTTPStatus.BAD_REQUEST, "Your current password does not match.");
    }

    const newPassword = await argon2.hash(passwords.newPassword);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
  },
};

export default UserService;
