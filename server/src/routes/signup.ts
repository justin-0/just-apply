import { Hono } from "hono";
import { db } from "../lib/prisma";
import { lucia } from "../lib/auth";
import { hash } from "@node-rs/argon2";
import { ObjectId } from "mongodb";
import { Context } from "../lib/context";

export const signupRouter = new Hono<Context>().post("/signup", async (c) => {
  const body = await c.req.json();

  const username: string | null = body.username ?? null;
  if (!username) {
    return c.json({ message: "Username is required" }, 401);
  }

  const password: string | null = body.password ?? null;
  if (!password) {
    return c.json({ message: "Password is required" }, 401);
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  console.log("SIGN_UP: PASSWORD HASHED");

  try {
    const user = await db.user.create({
      data: {
        username,
        hashed_password: passwordHash,
      },
    });
    console.log("SIGN_UP: USER CREATED", user);
    const sessionId = new ObjectId().toString();
    const session = await lucia.createSession(
      user.id,
      {},
      {
        sessionId,
      }
    );
    console.log("SIGN_UP: SESSION CREATED", session);

    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
    return c.json({ success: true }, 200);
  } catch (e) {
    if (e instanceof Error) {
      console.log("SIGN_UP: ERROR", e.message);
    }
  }
});
