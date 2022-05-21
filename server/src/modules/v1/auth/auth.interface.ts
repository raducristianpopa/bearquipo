import { Details } from "express-useragent";
import { User } from "@prisma/client";

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
}
