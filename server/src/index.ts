import { Hono } from "hono";
import { signupRouter } from "./routes/signup";
import { lucia } from "./lib/auth";
import { Context } from "./lib/context";
import { loginRouter } from "./routes/login";

const app = new Hono<Context>();

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

app.route("/", signupRouter);
app.route("/", loginRouter);
app.get("/", (c) => {
  const session = c.get("session");

  if (!session) {
    return c.json({ message: "Unauthorised" });
  }

  return c.json({ message: "authorised" });
});

export default app;
