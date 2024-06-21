import { z } from "zod";

const passwordSchema = z
	.string()
	.min(8, { message: "Password must be at least 8 characters long" })
	.regex(/[a-z]/, {
		message: "Password must contain at least one lowercase letter",
	})
	.regex(/[A-Z]/, {
		message: "Password must contain at least one uppercase letter",
	})
	.regex(/[0-9]/, { message: "Password must contain at least one number" })
	.regex(/[^a-zA-Z0-9]/, {
		message: "Password must contain at least one special character",
	});

const confirmPasswordSchema = z.string();

export const UserSchema = z
	.object({
		userName: z.string().trim().min(1, "Username is required"),
		empId: z.string().trim().min(1, "Employee ID is required"),
		address: z.string().trim().min(1, "Address is required"),
		gender: z.string().trim().min(1, "Please select gender"),
		email: z.string().email(),
		password: z.string().trim().min(1, "Password is required"),
		confirmPassword: z.string().trim().min(1, "Confirm Password is required"),
		roleCode: z.string().trim().min(1, "Role Code is required"),
		// storeId: z.string().trim().optional(),
		phNo: z
			.string()
			.trim()
			.min(10, "Phone number must be 10 digits")
			.max(10, "Phone number must be 10 digits")
			.optional(),
		info: z.string().trim().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
