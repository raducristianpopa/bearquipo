import { Details } from "express-useragent";
import { Tokens, User } from "@prisma/client";
import moment from "moment";

import { IAuthToken } from "./token.service";

/**
 * @export
 * @interaface IAuthService
 */
export interface ITokenService {
  /**
   * @param {string} tokenId
   * @param {moment.Moment} expires
   * @param {Tokens} tokenType
   * @param {string} secret
   * @returns {string}
   * @memberof TokenService
   */
  generateToken(tokenId: string, expires: moment.Moment, tokenType: Tokens, secret: string): string;

  /**
   * @param {string} tokenId
   * @param {string} token
   * @param {User} user
   * @param {moment.Moment} expires
   * @param {Tokens} type
   * @return {Promise<void>}
   * @memberof TokenService
   */
  registerToken(
    tokenId: string,
    token: string,
    user: User,
    userAgent: Details,
    expires: moment.Moment,
    type: Tokens
  ): Promise<void>;

  /**
   * @param {User} user
   * @return {Promise<IAuthToken>}
   * @memberof TokenService
   */
  createAuthToken(user: User, userAgent: Details): Promise<IAuthToken>;
}
