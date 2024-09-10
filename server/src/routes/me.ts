import { Hono } from "hono";

import type { Context } from "../lib/context";

export const meRouter = new Hono<Context>().get("/me", async (c) => {
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
