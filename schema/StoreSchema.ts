import { z } from "zod";

export const StoreSchema = z.object({
	storeId: z.string().trim().min(1, "Store ID is required"),
	storeName: z.string().trim().min(1, "Store Name is required"),
	salesRep: z.string().trim().optional(),
	address: z.string().trim().min(1, "Address is required"),
});
