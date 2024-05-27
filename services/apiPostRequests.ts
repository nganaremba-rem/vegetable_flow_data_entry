import { apiBaseUrl } from "@/constants/constants";
import { axiosInstance } from "@/lib/axiosInstance";
import type { CustomMutateResponseType } from "@/typings";

export interface signInFormDataType {
	email: string;
	password: string;
}

export function signInUser(signInUserData: signInFormDataType) {
	return axiosInstance.post("/user/logIn", signInUserData);
}

export async function mutateData<T>({
	endpointUrl,
	data,
	userId,
	method = "POST",
	tags = [],
}: {
	endpointUrl: string;
	data: any;
	userId: string;
	method?: "POST" | "PUT" | "DELETE";
	tags?: string[];
}): Promise<CustomMutateResponseType<T>> {
	const response = await fetch(`${apiBaseUrl}${endpointUrl}`, {
		method: method.toUpperCase(),
		headers: {
			userId,
		},
		body: JSON.stringify(data),
		next: {
			tags,
		},
	});

	if (!response.ok) {
		return {
			status: "ERROR",
			message: "An error occurred",
			data: {} as T,
		};
	}

	const responseData = await response.json();

	if (responseData?.status !== "SUCCESS") {
		return {
			status: responseData?.status || "ERROR",
			message: responseData?.message || "An error occurred",
			data: {} as T,
		};
	}

	return {
		status: responseData?.status || "SUCCESS",
		message: responseData?.message || "",
		data: responseData?.data as T,
	};
}
