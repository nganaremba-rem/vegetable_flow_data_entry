import { z } from "zod";

export const FarmerSchema = z.object({
	id: z.coerce.string(),
	farmerId: z.string().trim().min(1, "Farmer ID is required"),
	fullName: z.string().trim().min(1, "Full Name is required"),
	address: z.string().trim().min(1, "Address is required"),
	phoneNo: z.string().trim().min(1, "Phone Number is required"),
	availableItem: z.string().optional(),
});
