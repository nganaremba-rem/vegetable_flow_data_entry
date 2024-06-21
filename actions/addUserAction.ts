"use server";

import { UserSchema } from "@/schema/UserSchema";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { z } from "zod";

export async function addUserAction(formObject: z.infer<typeof UserSchema>) {
	const validatedFields = UserSchema.safeParse({
		userName: formObject.userName,
		empId: formObject.empId,
		address: formObject.address,
		gender: formObject.gender,
		email: formObject.email,
		confirmPassword: formObject.confirmPassword,
		password: formObject.password,
		roleCode: formObject.roleCode,
		info: formObject.info,
		phNo: formObject.phNo,
	});

	const data = await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/user/insert",
		revalidateTagString: "user",
		method: "POST",
	});

	return data;
}
