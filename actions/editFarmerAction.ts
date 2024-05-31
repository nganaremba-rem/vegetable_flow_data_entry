"use server";

import { FarmerSchema } from "@/schema/FarmerSchema";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { z } from "zod";

export async function farmerUpdateAction(
	formData: z.infer<typeof FarmerSchema>,
) {
	const validatedFields = FarmerSchema.safeParse({
		id: formData.id,
		farmerId: formData.farmerId,
		fullName: formData.fullName,
		address: formData.address,
		phoneNo: formData.phoneNo,
	});

	return await submitHandleValidationAndSessionErrors({
		validatedFields,
		endpointUrl: "/farmer/update/info",
		revalidateTagString: "farmer",
		method: "PUT",
	});
}
