import HTTPStatus from "http-status";
import { Request, Response } from "express";
import { Details } from "express-useragent";

import { catcher } from "@utils/catch";

import AuthService from "./auth.service";

const AuthController = {
  signup: catcher(async function (req: Request, res: Response): Promise<void> {
    const remoteAddress = req.socket.remoteAddress || "";
    const userAgent = req.useragent || ({} as Details);

    console.log(req.body);
    await AuthService.createUser(req.body, remoteAddress, userAgent);

    res.status(HTTPStatus.CREATED).json({ message: "Account was successfuly created." });
  }),
};

export default AuthController;
