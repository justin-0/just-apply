import { Hono } from "hono";
import { signupRouter } from "./routes/signup";
import { lucia } from "./lib/auth";
import { Context } from "./lib/context";
import { loginRouter } from "./routes/login";
import { meRouter } from "./routes/me";
import { verifyRequestOrigin } from "lucia";
import { jobsRouter } from "./routes/jobs";

const app = new Hono<Context>().basePath("/api");

// app.use("*", async (c, next) => {
//   if (c.req.method === "GET") {
//     return next();
//   }
//   const originHeader = c.req.header("Origin") ?? null;
//   const hostHeader = c.req.header("Host") ?? null;
//   if (
//     !originHeader ||
//     !hostHeader ||
//     !verifyRequestOrigin(originHeader, [hostHeader])
//   ) {
//     return c.body(null, 403);
//   }
//   return next();
// });

app.use("*", async (c, next) => {
  const sessionId = lucia.readSessionCookie(c.req.header("Cookie") ?? "");
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }
  if (!session) {
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }
  c.set("session", session);
  c.set("user", user);
  return next();
});

const routes = app
  .route("/", signupRouter)
  .route("/", loginRouter)
  .route("/", meRouter)
  .route("/", jobsRouter);

export default app;
export type AppRouter = typeof routes;
