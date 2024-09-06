import prisma from "../prisma/db";
import { User } from "@prisma/client";

class UserService {
  // Fetch a user by its ID
  async getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
}

export default new UserService();
