import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma migrate ve introspect için DIRECT bağlantı
    url: process.env["DIRECT_URL"],
  },
});
