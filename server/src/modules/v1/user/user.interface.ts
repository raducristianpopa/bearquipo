import { User, Token } from "@prisma/client";

type UserWithActiveSessions = Promise<Partial<User> & { tokens: Partial<Token>[] }>;

export interface IUserInterface {
  getUser(userId: string): UserWithActiveSessions;

  changePassword(userId: string, passwords: { oldPassword: string; newPassword: string }): Promise<void>;
}
