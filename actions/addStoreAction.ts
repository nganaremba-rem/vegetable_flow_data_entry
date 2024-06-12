"use server";

import { StoreSchema } from "@/schema/StoreSchema";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { z } from "zod";

export async function addStoreAction(formObject: z.infer<typeof StoreSchema>) {
	const validatedFields = StoreSchema.safeParse({
		storeId: formObject.storeId,
		storeName: formObject.storeName,
		// salesRep: formObject.salesRep,
		address: formObject.address,
	});

	const data = await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/store/insert",
		revalidateTagString: "store",
		method: "POST",
	});

	return data;
}
