"use server";

import { VegetableSchema } from "@/schema/VegetableSchema";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { z } from "zod";

export async function addVegetableAction(
	formObject: z.infer<typeof VegetableSchema>,
) {
	const validatedFields = VegetableSchema.safeParse({
		itemName: formObject.itemName,
		itemGroup: formObject.itemGroup,
		packetWeight: formObject.packetWeight,
		preset: formObject.preset,
	});

	console.log(validatedFields);

	const data = await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/item/insert",
		revalidateTagString: "vegetable",
		method: "POST",
	});

	return data;
}
