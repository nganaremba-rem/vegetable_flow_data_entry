import { z } from "zod";

export const UserSchema = z.object({
	userName: z.string().trim().min(1, "Username is required"),
	empId: z.string().trim().min(1, "Employee ID is required"),
	address: z.string().trim().min(1, "Address is required"),
	gender: z.string().trim().min(1, "Please select gender"),
	email: z.string().email(),
	password: z.string().trim().min(1, "Password is required"),
	roleCode: z.string().trim().min(1, "Role Code is required"),
	storeId: z.string().trim().optional(),
	info: z.string().trim().optional(),
});
