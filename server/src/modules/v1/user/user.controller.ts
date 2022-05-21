import { Request, Response } from "express";
import HTTPStatus from "http-status";

import { catcher } from "@utils/catch";

import UserService from "./user.service";

const UserController = {
  me: catcher(async function (req: Request, res: Response): Promise<void> {
    const user = await UserService.getUser(req.user);

    res.status(HTTPStatus.OK).json(user);
  }),
};

export default UserController;
