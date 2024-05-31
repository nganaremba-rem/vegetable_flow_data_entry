import { z } from "zod";

export const AvailableVegetablesSchema = z.object({
	farmerId: z.string().trim().min(1, "Farmer ID is required"),
	availableItem: z.string().optional(),
});
