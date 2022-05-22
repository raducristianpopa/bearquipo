import { User, Token } from "@prisma/client";

type UserWithActiveSessions = Promise<Partial<User> & { tokens: Partial<Token>[] }>;

export interface IUserInterface {
  getUser(userId: string): UserWithActiveSessions;

  changePassword(userId: string, passwords: { old_password: string; new_password: string }): Promise<void>;
}
