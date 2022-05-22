import { User, Token, Prisma } from "@prisma/client";

type UserWithActiveSessions = Partial<User> & { tokens: Partial<Token>[] };
type UserUpdateRequestBody = Pick<User, "firstName" | "lastName">;

export const UserProfileData = Prisma.validator<Prisma.UserSelect>()({
  firstName: true,
  lastName: true,
  email: true,
  tokens: {
    select: {
      issuedAt: true,
      browser: true,
      browserVersion: true,
      os: true,
      platform: true,
    },
  },
});

/**
 * @export
 * @interaface IUserInterface
 */
export interface IUserInterface {
  /**
   * @description Get user informations for his settings page
   * @param {string} userId
   * @returns {Promise<UserWithActiveSessions>}
   * @memberof UserService
   */
  getUser(userId: string): Promise<UserWithActiveSessions>;

  /**
   * @description Update user general informations
   * @param {string} userId
   * @param {UserUpdateRequestBody} data
   * @returns {Promise<UserWithActiveSessions>}
   * @memberof UserService
   */
  updateUser(userId: string, info: UserUpdateRequestBody): Promise<UserWithActiveSessions>;

  /* 
    TODO: Create a service that will give the user an option to change his e-mail address.
    Workflow:
      1. Save the new e-mail address.
      2. Send an e-mail to new e-mail address for verification containing a link.
      3. If the user clicks on the link, his current e-mail address will be change to the new one
  */

  /**
   * @description Change user password
   * @param {string} userId
   * @param {oldPassword: string; newPassword: string} passwords
   * @returns {Promise<void>}
   * @memberof UserService
   */
  changePassword(userId: string, passwords: { oldPassword: string; newPassword: string }): Promise<void>;
}
