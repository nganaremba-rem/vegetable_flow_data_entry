"use server";

import { apiBaseUrl } from "@/constants/constants";
import type { CustomMutateResponseType } from "@/typings";
import { revalidateTag } from "next/cache";

export async function mutateData<T>({
	endpointUrl,
	data,
	userId,
	method = "POST",
	tags = [],
	revalidateTagString,
}: {
	endpointUrl: string;
	data: any;
	userId: string;
	method?: "POST" | "PUT" | "DELETE";
	tags?: string[];
	revalidateTagString: string;
}): Promise<CustomMutateResponseType<T>> {
	try {
		const response = await fetch(`${apiBaseUrl}${endpointUrl}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				userId,
			},
			body: JSON.stringify(data),
			cache: "no-store",
		});
		console.log(response);
		if (!response.ok) {
			return {
				status: "ERROR",
				message: "",
				issues: [response.statusText || "Failed to mutate data"],
				data: {} as T,
			};
		}

		const responseData = await response.json();

		if (responseData?.status !== "SUCCESS") {
			return {
				status: responseData?.status || "ERROR",
				message: "",
				issues: [responseData?.message || "An error occurred"],
				data: {} as T,
			};
		}

		revalidateTag(revalidateTagString);

		return {
			status: responseData?.status || "SUCCESS",
			message: responseData?.message || "",
			issues: [],
			data: responseData?.data as T,
		};
	} catch (error: any) {
		return {
			status: "ERROR",
			message: "",
			issues: [error?.message || "An error occurred"],
			data: {} as T,
		};
	}
}
