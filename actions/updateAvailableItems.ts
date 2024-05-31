"use server";

import { AvailableVegetablesSchema } from "./../schema/AvailableVegetablesSchema";

import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";

export async function updateAvailableItems(formData: {
	farmerId: string;
	availableItem: string;
}) {
	const validatedFields = AvailableVegetablesSchema.safeParse({
		farmerId: formData.farmerId,
		availableItem: formData.availableItem,
	});

	return await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/farmer/update/items",
		revalidateTagString: "farmer",
		method: "PUT",
	});
}
