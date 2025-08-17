import { db } from "../../db";
import { users, type InsertUser, type SelectUser } from "../../db/schema";
import { eq } from "drizzle-orm";

export class UserService {
  /**
   * Retrieves all users from the database.
   * @returns {Promise<SelectUser[]>} A promise that resolves to an array of users.
   */
  async getAllUsers(): Promise<SelectUser[]> {
    return await db.query.users.findMany();
  }

  /**
   * Retrieves a single user by their ID.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<SelectUser | undefined>} A promise that resolves to the user or undefined if not found.
   */
  async getUserById(id: number): Promise<SelectUser | undefined> {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  /**
   * Creates a new user in the database.
   * @param {InsertUser} userData - The data for the new user.
   * @returns {Promise<SelectUser>} A promise that resolves to the newly created user.
   */
  async createUser(userData: InsertUser): Promise<SelectUser> {
    const [newUser] = await db
      .insert(users)
      .values(userData)
      .returning()
      .execute();
    return newUser;
  }
}
