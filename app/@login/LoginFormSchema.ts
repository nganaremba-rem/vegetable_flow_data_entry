import { z } from "zod";

export const formSchema = z.object({
	email: z.string().email().trim(),
	password: z.string().trim().min(1, "Password must be at least 1 characters"),
});
