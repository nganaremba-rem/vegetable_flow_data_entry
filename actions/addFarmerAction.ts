"use server";

import { FarmerSchema } from "@/schema/FarmerSchema";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { z } from "zod";

export async function addFarmerAction(
	formObject: z.infer<typeof FarmerSchema>,
) {
	const validatedFields = FarmerSchema.safeParse({
		farmerId: formObject.farmerId,
		fullName: formObject.fullName,
		address: formObject.address,
		phoneNo: formObject.phoneNo,
		availableItem: formObject.availableItem,
	});

	const data = await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/farmer/insert",
		revalidateTagString: "farmer",
		method: "POST",
	});

	return data;
}
