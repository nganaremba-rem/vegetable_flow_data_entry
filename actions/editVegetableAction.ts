"use server";

import { VegetableSchema } from "@/schema/VegetableSchema";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { z } from "zod";

export async function updateVegetableAction(
	formData: z.infer<typeof VegetableSchema>,
) {
	const validatedFields = VegetableSchema.safeParse({
		id: formData.id,
		itemName: formData.itemName,
		itemGroup: formData.itemGroup,
		packetWeight: formData.packetWeight,
		preset: formData.preset,
	});

	return await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/item/update",
		revalidateTagString: "vegetable",
		method: "PUT",
	});
}
