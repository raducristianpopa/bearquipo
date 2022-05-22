import { Details } from "express-useragent";
import { Tokens, User } from "@prisma/client";
import moment from "moment";

export interface IAuthToken {
  token: string;
  expires: moment.Moment;
}
declare module "jsonwebtoken" {
  export interface IAuthTokenPayload extends JwtPayload {
    id: string;
    type: Tokens;
    iat: number;
    exp: number;
  }
}

declare global {
  namespace jwt {
    interface Request {
      user: string;
    }
  }
}

/**
 * @export
 * @interaface IAuthService
 */
export interface ITokenService {
  /**
   * @description Generates a JWT token
   * @param {string} tokenId
   * @param {moment.Moment} expires
   * @param {Tokens} tokenType
   * @param {string} secret
   * @returns {string}
   * @memberof TokenService
   */
  generateToken(tokenId: string, expires: moment.Moment, tokenType: Tokens, secret: string): string;

  /**
   * @description Saves the token in the `Token` model (in our database)
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
   * @description Generates the authentication token that is saved in a cookie afterwards
   * @param {User} user
   * @return {Promise<IAuthToken>}
   * @memberof TokenService
   */
  createAuthToken(user: User, userAgent: Details): Promise<IAuthToken>;
}
