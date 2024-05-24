"use server";

import { StoreSchema } from "@/schema/StoreSchema";
import { revalidateTag } from "next/cache";

export async function storeUpdateAction(formData: FormData) {
	const validatedFields = StoreSchema.safeParse({
		storeId: formData.get("storeId"),
		storeName: formData.get("storeName"),
		salesRep: formData.get("salesRep"),
		address: formData.get("address"),
	});

	if (!validatedFields.success) {
		return {
			issues: validatedFields.error.issues.map((issue) => issue.message),
			message: "",
		};
	}

	try {
		const response = await fetch(
			`http://burn.pagekite.me/store/${validatedFields.data.storeId}`,
			{
				method: "POST",
				body: JSON.stringify(validatedFields.data),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		if (!response.ok) {
			console.log(response);
			return {
				issues:
					response?.statusText !== ""
						? [response.statusText]
						: ["An error occurred"],
				message: "",
			};
		}
		const responseData = await response.json();

		if (!responseData.success) {
			return {
				issues:
					responseData?.message !== ""
						? [responseData?.message]
						: ["An error occurred"],
				message: "",
			};
		}

		revalidateTag("store");

		return {
			issues: [],
			message: responseData?.message || "Updated successfully",
		};
	} catch (err: any) {
		return {
			issues: [err?.message || "An error occurred"],
			message: "",
		};
	}
}
