"use server";

import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";

export default async function deleteFarmerAction(id: string) {
	return submitHandleValidationAndSessionErrors({
		endpointUrl: "/farmer/delete",
		revalidateTagString: "farmer",
		method: "DELETE",
		validatedFields: { data: { marker: id }, success: true },
	});
}
