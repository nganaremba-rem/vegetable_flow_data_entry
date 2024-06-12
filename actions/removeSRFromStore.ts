"use server";

import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";

export default async function removeSRFromStore(storeId: string) {
	return submitHandleValidationAndSessionErrors({
		endpointUrl: "/store/removeSR",
		revalidateTagString: "store",
		method: "PUT",
		validatedFields: { data: { marker: storeId }, success: true },
	});
}
