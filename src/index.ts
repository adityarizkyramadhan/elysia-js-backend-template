import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { userController } from "./modules/users/user.controller";

// Inisialisasi aplikasi Elysia
const app = new Elysia()
  // Menggunakan Swagger untuk dokumentasi API
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Elysia Drizzle Template API",
          version: "1.0.0",
          description:
            "Template best-practice untuk membangun API scalable dengan Elysia.js dan Drizzle ORM.",
        },
      },
    })
  )

  // Mendaftarkan modul/controller pengguna
  // Metode .use() memungkinkan kita menyusun aplikasi dari bagian-bagian modular.
  .use(userController)

  // Endpoint sederhana untuk health check
  .get("/", () => ({
    status: "ok",
    message: "Welcome to Elysia Drizzle Template!",
  }))

  // Menjalankan server
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `📄 API documentation available at http://${app.server?.hostname}:${app.server?.port}/docs`
);

export type App = typeof app;
