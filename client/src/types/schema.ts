import { z } from "zod";

export const credentialsSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be at least 1 character" })
    .max(20),
  password: z.string().min(1, { message: "Password is required" }),
});
