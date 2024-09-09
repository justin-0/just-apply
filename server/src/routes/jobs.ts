import { Hono } from "hono";
import { db } from "../lib/prisma";
import { Context } from "../lib/context";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const jobSchema = z.object({
  role: z.string().min(1, { message: "Role is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  status: z.enum(["Applied", "Rejected", "Accepted"], {
    message: "Status is not valid",
  }),
});

export const jobsRouter = new Hono<Context>()
  .post("/job", zValidator("json", jobSchema), async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ message: "Must be signed in, to create job" }, 401);
    }

    // If result is not valid schema, validator will return a zod error immediately
    const result = c.req.valid("json");

    const post = await db.job.create({
      data: {
        role: result.role,
        company: result.company,
        status: result.status,
        userId: user.id,
      },
    });
    return c.json({ success: true, post }, 201);
  })
  .get("/job", async (c) => {
    const user = c.get("user");

    try {
      const jobs = await db.job.findMany({
        where: {
          userId: user?.id,
        },
        select: {
          id: true,
          status: true,
          role: true,
          company: true,
        },
      });
      return c.json({ jobs });
    } catch (error) {}
  })
  .delete("/job/:id", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    if (!id) {
      return c.json({ message: "ID required" }, 401);
    }

    try {
      const job = await db.job.findUnique({
        where: {
          id,
        },
      });

      if (user.id !== job?.userId) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      await db.job.delete({
        where: { id },
      });

      return c.json(
        { success: true, message: "Job deleted successfully" },
        200
      );
    } catch (error) {}
  });
