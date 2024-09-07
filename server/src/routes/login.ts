import { Hono } from "hono";
import { db } from "../lib/prisma";
import { lucia } from "../lib/auth";
import { verify } from "@node-rs/argon2";

import type { Context } from "../lib/context";
import { ObjectId } from "mongodb";

export const loginRouter = new Hono<Context>().post("/login", async (c) => {
  console.log("LOGIN START");
  const body: { username: string; password: string } = await c.req.json();
  console.log("LOGIN BODY", body);
  const username: string | null = body.username ?? null;
  if (!username) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const password: string | null = body.password || null;
  if (!password) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const existingUser = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!existingUser) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const validPassword = await verify(existingUser.hashed_password, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const sessionId = new ObjectId().toString();
  const session = await lucia.createSession(
    existingUser.id,
    {},
    {
      sessionId,
    }
  );

  c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
    append: true,
  });

  return c.json({ message: "Logged in" });
});
