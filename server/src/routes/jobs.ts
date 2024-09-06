import { Hono } from "hono";
import { db } from "../lib/prisma";
import { Context } from "../lib/context";
import { zValidator } from "@hono/zod-validator";
import { z, ZodError } from "zod";

export const jobSchema = z.object({
  role: z.string().min(1, { message: "Role is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  status: z.enum(["Applied", "Rejected", "Accepted"], {
    message: "Status is not valid",
  }),
});

export const jobsRouter = new Hono<Context>();

jobsRouter.post("/job", zValidator("json", jobSchema), async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ message: "Must be signed in, to create job" }, 401);
  }
  const result = c.req.valid("json");

  try {
    const post = await db.job.create({
      data: {
        role: result.role,
        company: result.company,
        status: result.status,
        userId: user.id,
      },
    });
    return c.json({ success: true, post }, 201);
  } catch (e) {
    console.log(e);
  }
});
