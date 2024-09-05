import { Lucia } from "lucia";
import { db } from "./prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import "dotenv/config";
import { User } from "./types/user";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<User, "id" | "hashed_password">;
  }
}
