import { AppRouter } from "../../../server/src/index";
import { hc } from "hono/client";

export const client = hc<AppRouter>("/");
