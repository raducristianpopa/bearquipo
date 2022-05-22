import { Tokens } from "@prisma/client";
import { nanoid } from "nanoid";
import moment from "moment";
import jwt from "jsonwebtoken";

import config from "@config/config";
import db from "@utils/db";

import { ITokenService } from "./token.interface";

const TokenService: ITokenService = {
  generateToken(tokenId, expires, tokenType, secret) {
    const payload = {
      id: tokenId,
      type: tokenType,
      expires: expires.unix(),
    };

    return jwt.sign(payload, secret, { algorithm: "HS512" });
  },

  async registerToken(tokenId, token, user, userAgent, expires, type) {
    await db.token.create({
      data: {
        id: tokenId,
        userId: user.id,
        token,
        type,
        expires: expires.toDate(),
        browser: userAgent.browser,
        browserVersion: userAgent.version,
        os: userAgent.os,
        userAgent: userAgent.source,
      },
    });
  },

  async createAuthToken(user, userAgent) {
    const tokenId = nanoid(36);
    const expires = moment().add(config.jwt.tokenExpirationDays, "days");

    const token = this.generateToken(tokenId, expires, Tokens.ACCESS, config.jwt.tokenSecret);

    await this.registerToken(tokenId, token, user, userAgent, expires, Tokens.ACCESS);

    return {
      token,
      expires,
    };
  },
};

export default TokenService;
