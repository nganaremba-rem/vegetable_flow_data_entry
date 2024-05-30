"use server";

import { StoreSchema } from "@/schema/StoreSchema";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { z } from "zod";

export async function storeUpdateAction(formData: z.infer<typeof StoreSchema>) {
	const validatedFields = StoreSchema.safeParse({
		storeId: formData.storeId,
		storeName: formData.storeName,
		salesRep: formData.salesRep,
		address: formData.address,
	});

	return await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/store/updateInfo",
		revalidateTagString: "store",
		method: "PUT",
	});
}
