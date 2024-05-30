import { z } from "zod";

export const VegetableSchema = z.object({
	id: z.number().optional(),
	itemName: z.string().trim().min(1, "Vegetable Name is required"),
	itemGroup: z.string().trim().min(1, "Vegetable Group is required"),
	packetWeight: z.coerce.number().min(0, "Weight is required"),
	preset: z.coerce.number().min(0, "Preset is required"),
});
