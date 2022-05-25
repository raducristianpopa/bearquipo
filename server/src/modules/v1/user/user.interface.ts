import { User, Token, Prisma, UserAddress } from "@prisma/client";
import { Request } from "express";

/* 
  TODO (its not neccessary - demo project) Create a service that will give the user an option to change his e-mail address.
  Workflow:
    1. Save the new e-mail address.
    2. Send an e-mail to new e-mail address for verification containing a link.
    3. If the user clicks on the link, his current e-mail address will be change to the new one
*/

type UserProfileProps = Pick<User, "firstName" | "lastName" | "email"> & {
  tokens: Pick<Token, "browser" | "browserVersion" | "os" | "platform" | "issuedAt">[];
  addresses: Omit<UserAddress, "userId">[];
};
type UserUpdateRequestBody = Pick<User, "firstName" | "lastName">;

export const UserAddressData = Prisma.validator<Prisma.UserAddressSelect>()({
  id: true,
  addressLine1: true,
  addressLine2: true,
  state: true,
  city: true,
  postalCode: true,
  country: true,
  phone: true,
});

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
  addresses: {
    select: UserAddressData,
  },
});

/**
 * @export
 * @interaface IUserInterface
 */
export interface IUserInterface {
  /**
   * @description Get user informations for his settings page
   * @param {Request} req
   * @returns {Promise<UserProfileProps>}
   * @memberof UserService
   */
  getUser(req: Request): Promise<UserProfileProps | null>;

  /**
   * @description Update user general informations
   * @param {string} userId
   * @param {UserUpdateRequestBody} data
   * @returns {Promise<UserProfileProps>}
   * @memberof UserService
   */
  updateUser(userId: string, info: UserUpdateRequestBody): Promise<UserProfileProps>;

  /**
   * @description Change user password
   * @param {string} userId
   * @param {oldPassword: string; newPassword: string} passwords
   * @returns {Promise<void>}
   * @memberof UserService
   */
  changePassword(userId: string, passwords: { oldPassword: string; newPassword: string }): Promise<void>;

  /**
   * @description Creates a new useer address for orders
   * @param {string} userId
   * @param {Omit<UserAddress, "id">} addressData
   * @returns {Promise<void>}
   * @memberof UserService
   */
  createUserAddress(
    userId: string,
    addressData: Omit<Prisma.UserAddressCreateInput, "userId">
  ): Promise<Omit<UserAddress, "userId">>;
}
