import { Hono } from "hono";
import { db } from "../lib/prisma";
import { Context } from "../lib/context";

export const jobsRouter = new Hono<Context>();

jobsRouter.post("/job", async (c) => {
  const body = await c.req.json();
  const user = c.get("user");

  if (!user) {
    return c.json({ message: "Must be signed in, to create job" }, 401);
  }

  const post = await db.job.create({
    data: {
      role: body.role,
      company: body.company,
      status: body.status,
      userId: user.id,
    },
  });

  return c.json({ success: true, post }, 201);
});
