import { t } from "elysia";

export const userResponseSchema = t.Object({
  id: t.Number(),
  fullName: t.String(),
  email: t.String({ format: "email" }),
});

export const createUserSchema = t.Object({
  fullName: t.String({ minLength: 3, maxLength: 100 }),
  email: t.String({ format: "email" }),
});

export const userIdParamSchema = t.Object({
  id: t.Numeric(),
});
