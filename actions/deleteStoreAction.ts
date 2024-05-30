"use server";

import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";

export default async function deleteStoreAction(id: string) {
	return submitHandleValidationAndSessionErrors({
		endpointUrl: "/store/delete",
		revalidateTagString: "store",
		method: "DELETE",
		validatedFields: { data: { marker: id }, success: true },
	});
}
