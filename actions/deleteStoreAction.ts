"use server";

import { revalidateTag } from "next/cache";

export default async function deleteStoreAction(id: string) {
	const response = await fetch(`http://burn.pagekite.me/store/${id}`, {
		method: "DELETE",
	});
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
			issues: [responseData?.message] || ["An error occurred"],
			message: "",
		};
	}

	revalidateTag("store");

	return {
		issues: [],
		message: responseData?.message || "Deleted successfully",
	};
}
