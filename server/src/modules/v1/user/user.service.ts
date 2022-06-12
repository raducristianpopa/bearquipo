import HTTPStatus from "http-status";
import argon2 from "argon2";

import APIError from "@config/APIError";
import db from "@utils/db";

import { IUserInterface, UserProfileData, UserAddressData } from "./user.interface";

const UserService: IUserInterface = {
  async getUser(req) {
    const user = await db.user.findUnique({
      where: {
        id: req.user,
      },
      select: UserProfileData,
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

    /*
    If the current user password does not match, the user sent the wrong password and we will
    not let him change his password
    */

    if (!(await argon2.verify(user.password, passwords.oldPassword))) {
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

    // mark all sessions as expred
    await db.token.updateMany({
      where: {
        userId,
      },
      data: {
        isExpired: true,
      },
    });
  },

  async updateUser(userId, info) {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...info,
      },
      select: UserProfileData,
    });

    return user;
  },

  async createUserAddress(userId, addressData) {
    await db.userAddress.create({
      data: {
        ...addressData,
        user: {
          connect: { id: userId },
        },
      },
    });

    // get a copy all of the user addresses
    const addresses = db.userAddress.findMany({
      where: {
        userId,
      },
      select: UserAddressData,
    });

    return addresses;
  },

  async updateUserAddress(userId, addressData) {
    const { id, ...addressInfo } = addressData;

    // update the address
    await db.userAddress.update({
      where: {
        id,
      },
      data: {
        ...addressInfo,
      },
    });

    // get a copy all of the user addresses
    const addresses = db.userAddress.findMany({
      where: {
        userId,
      },
      select: UserAddressData,
    });

    return addresses;
  },
};

export default UserService;
