import { Request, Response } from "express";
import HTTPStatus from "http-status";

import { catcher } from "@utils/catch";

import UserService from "./user.service";
import config from "@config/config";

const UserController = {
  me: catcher(async function (req: Request, res: Response): Promise<void> {
    const user = await UserService.getUser(req);
    res.status(HTTPStatus.OK).json({ user: user });
  }),

  changePassword: catcher(async function (req: Request, res: Response): Promise<void> {
    await UserService.changePassword(req.user, req.body);

    res.clearCookie(config.cookies.authName);
    res.status(HTTPStatus.OK).json("Your password was successfuly changed.");
  }),

  updateUser: catcher(async function (req: Request, res: Response): Promise<void> {
    const user = await UserService.updateUser(req.user, req.body);
    res.status(HTTPStatus.OK).json({ ...user });
  }),

  createAddress: catcher(async function (req: Request, res: Response): Promise<void> {
    const address = await UserService.createUserAddress(req.user, req.body);
    res.status(HTTPStatus.CREATED).json(address);
  }),

  updateAddress: catcher(async function (req: Request, res: Response): Promise<void> {
    const updatedAddresses = await UserService.updateUserAddress(req.user, req.body);
    res.status(HTTPStatus.OK).json(updatedAddresses);
  }),
};

export default UserController;
