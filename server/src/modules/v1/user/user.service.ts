import db from "@utils/db";

const UserService = {
  async getUser(userId: string) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        tokens: {
          select: {
            browser: true,
            browser_version: true,
            os: true,
            platform: true,
          },
        },
      },
    });

    return user;
  },
};

export default UserService;
