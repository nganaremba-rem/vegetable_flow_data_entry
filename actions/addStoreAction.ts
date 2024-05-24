"use server";

import { addStoreFormSchema } from "@/app/@admin/store/add/AddStoreformSchema";

export async function addStoreAction(formData: FormData) {
	const validatedFields = addStoreFormSchema.safeParse({
		storeId: formData.get("storeId"),
		storeName: formData.get("storeName"),
		salesRep: formData.get("salesRep"),
		address: formData.get("address"),
	});

	if (!validatedFields.success) {
		return {
			message: "",
			issues: validatedFields.error.issues.map((issue: any) => issue.message),
		};
	}

	try {
		const response = await fetch("http://burn.pagekite.me/store/insert", {
			method: "POST",
			body: JSON.stringify(validatedFields.data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.log(response);
			return {
				message: "",
				issues: [response?.statusText] || ["An error occurred"],
			};
		}
		const responseData = await response.json();

		if (responseData?.status !== "SUCCESS") {
			return {
				message: "",
				issues: [responseData?.message] || ["An error occurred"],
			};
		}

		return {
			message: responseData?.message || "Store added successfully",
			issues: [],
		};
	} catch (error: any) {
		console.error(error);
		return {
			message: "",
			issues: [error?.message || "An error occurred"],
		};
	}
}
// export async function addStoreAction(
// 	prevState: AddFormState,
// 	formData: FormData,
// ) {
// 	const validatedFields = addStoreFormSchema.safeParse({
// 		storeId: formData.get("storeId"),
// 		storeName: formData.get("storeName"),
// 		salesRep: formData.get("salesRep"),
// 		address: formData.get("address"),
// 	});

// 	if (!validatedFields.success) {
// 		return {
// 			message: "",
// 			// fields: Object.fromEntries(formData) as Record<string, string>,
// 			fields: {},
// 			issues: validatedFields.error.issues.map((issue: any) => issue.message),
// 		};
// 	}

// 	try {
// 		const response = await fetch("http://burn.pagekite.me/store/insert", {
// 			method: "POST",
// 			body: JSON.stringify(validatedFields.data),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		if (!response.ok) {
// 			console.log(response);
// 			return {
// 				message: "",
// 				issues: [response?.statusText] || ["An error occurred"],
// 				// fields: Object.fromEntries(formData) as Record<string, string>,
// 				fields: {},
// 			};
// 		}
// 		const responseData = await response.json();

// 		if (responseData?.status !== "SUCCESS") {
// 			return {
// 				message: "",
// 				// fields: Object.fromEntries(formData) as Record<string, string>,
// 				fields: {},
// 				issues: [responseData?.message] || ["An error occurred"],
// 			};
// 		}

// 		//

// 		return {
// 			message: responseData?.message || "Store added successfully",
// 			issues: [],
// 			fields: {
// 				storeId: "",
// 				storeName: "",
// 				salesRep: "",
// 				address: "",
// 			} as Record<string, string>,
// 		};
// 	} catch (error: any) {
// 		console.error(error);
// 		return {
// 			...prevState,
// 			message: "",
// 			issues: [error?.message || "An error occurred"],
// 			fields: Object.fromEntries(formData) as Record<string, string>,
// 		};
// 	}
// }
