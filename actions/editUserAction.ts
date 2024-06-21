"use server";

import { UserSchema } from "@/schema/UserSchema";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { z } from "zod";

export async function userUpdateAction(formData: z.infer<typeof UserSchema>) {
	const validatedFields = UserSchema.safeParse({
		userName: formData.userName,
		empId: formData.empId,
		address: formData.address,
		gender: formData.gender,
		email: formData.email,
		password: formData.password,
		roleCode: formData.roleCode,
		// storeId: formData.storeId,
		info: formData.info,
	});

	return await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/user/updateInfo",
		revalidateTagString: "user",
		method: "PUT",
	});
}
