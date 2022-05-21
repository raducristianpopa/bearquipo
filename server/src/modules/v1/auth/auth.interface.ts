import { Express } from "express";
import { Details } from "express-useragent";
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
  /**
   * @param {User} user
   * @returns {Promise<void>}
   * @memberof AuthService
   */
  createUser(user: User, remoteAddress: string | undefined, userAgent: Details): Promise<void>;

  /**
   *
   * @param {User} user
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  verifyUser(user: User): Promise<User>;
}
