import { Elysia, t } from "elysia";
import { UserService } from "./user.service";
import {
  createUserSchema,
  userIdParamSchema,
  userResponseSchema,
} from "./user.schema";

const userService = new UserService();

export const userController = new Elysia({ prefix: "/users", tags: ["Users"] })
  .get(
    "/",
    async () => {
      return await userService.getAllUsers();
    },
    {
      response: {
        200: t.Array(userResponseSchema),
      },
      detail: {
        summary: "Get All Users",
        description: "Mengambil daftar semua pengguna yang terdaftar.",
      },
    }
  )
  .post(
    "/",
    async ({ body, set }) => {
      const newUser = await userService.createUser(body);
      set.status = 201;
      return newUser;
    },
    {
      body: createUserSchema,
      response: {
        201: userResponseSchema,
      },
      detail: {
        summary: "Create a User",
        description:
          "Membuat pengguna baru dengan nama lengkap dan email yang unik.",
      },
    }
  )

  .get(
    "/:id",
    async ({ params, set }) => {
      const user = await userService.getUserById(params.id);
      if (!user) {
        set.status = 404;
        return { message: "User not found" };
      }
      return user;
    },
    {
      params: userIdParamSchema,
      response: {
        200: userResponseSchema,
        404: t.Object({ message: t.String() }),
      },
      detail: {
        summary: "Get User by ID",
        description: "Mengambil data satu pengguna berdasarkan ID unik mereka.",
      },
    }
  );
