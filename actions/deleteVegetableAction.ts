"use server";

import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";

export default async function deleteVegetableAction(id: string) {
	return submitHandleValidationAndSessionErrors({
		endpointUrl: "/item/delete",
		revalidateTagString: "vegetable",
		method: "DELETE",
		validatedFields: { data: { marker: id }, success: true },
	});
}
