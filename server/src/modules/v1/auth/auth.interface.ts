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
   * @description Register a user
   * @param {User} user
   * @returns {Promise<void>}
   * @memberof AuthService
   */
  createUser(user: User, remoteAddress: string | undefined, userAgent: Details): Promise<void>;

  /**
   * @description Check the user on sign in
   * @param {User} user
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  verifyUser(user: User): Promise<User>;

  /**
   * @description Sign out the user
   * @param {string} token
   * @returns {Promise<void>}
   * @memberof AuthService
   */
  removeCurrentSession(token: string): Promise<void>;

  /**
   * @description Sign out the user from all active sessions
   * @param {string} userId
   * @returns {Promise<void>}
   * @memberof AuthService
   */
  removeAllUserSession(userId: string): Promise<void>;
}
