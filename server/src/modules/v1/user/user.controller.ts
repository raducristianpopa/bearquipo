import { Request, Response } from "express";
import HTTPStatus from "http-status";

import { catcher } from "@utils/catch";

import UserService from "./user.service";

const UserController = {
  me: catcher(async function (req: Request, res: Response): Promise<void> {
    const user = await UserService.getUser(req.user);

    res.status(HTTPStatus.OK).json(user);
  }),
  changePassword: catcher(async function (req: Request, res: Response): Promise<void> {
    await UserService.changePassword(req.user, req.body);
    res.status(HTTPStatus.OK).json({ message: "Your password was successfuly changed." });
  }),
};

export default UserController;
