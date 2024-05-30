"use server";

import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";

export default async function deleteUserAction(id: string) {
	return submitHandleValidationAndSessionErrors({
		endpointUrl: "/user/delete",
		revalidateTagString: "user",
		method: "DELETE",
		validatedFields: { data: { marker: id }, success: true },
	});
}
