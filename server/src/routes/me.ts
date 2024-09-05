import { Hono } from "hono";
import { db } from "../lib/prisma";
import { lucia } from "../lib/auth";

import type { Context } from "../lib/context";

export const meRouter = new Hono<Context>();

meRouter.get("/me", async (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (session && user) {
    return c.json({
      isAuthenticated: true,
      session: {
        ...session,
      },
      user: {
        ...user,
      },
    });
  } else {
    return c.json({
      isAuthenticated: false,
      session: null,
      user: null,
    });
  }
});
