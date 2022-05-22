import { User, Token } from "@prisma/client";

type UserWithActiveSessions = Partial<User> & { tokens: Partial<Token>[] };

/**
 * @export
 * @interaface IUserInterface
 */
export interface IUserInterface {
  /**
   * @description Get user informations for this settings page
   * @param {string} userId
   * @returns {Promise<UserWithActiveSessions>}
   * @memberof UserService
   */
  getUser(userId: string): Promise<UserWithActiveSessions>;

  /**
   * @description Change user password
   * @param {string} userId
   * @param {oldPassword: string; newPassword: string} passwords
   * @returns {Promise<void>}
   * @memberof UserService
   */
  changePassword(userId: string, passwords: { oldPassword: string; newPassword: string }): Promise<void>;
}
