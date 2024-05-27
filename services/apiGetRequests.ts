import { apiBaseUrl } from "@/constants/constants";
import type { CustomResponseType } from "@/typings";

export async function getRequest<T>({
	endpointUrl,
	cache = "no-store",
	tags,
	userId,
}: {
	endpointUrl: string;
	cache?:
		| "default"
		| "force-cache"
		| "no-cache"
		| "no-store"
		| "only-if-cached"
		| "reload";
	tags: string[];
	userId: string;
}): Promise<CustomResponseType<T>> {
	const response = await fetch(`${apiBaseUrl}${endpointUrl}`, {
		headers: {
			userId,
		},
		cache,
		next: {
			tags,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}

	const responseData = await response.json();

	if (responseData?.status !== "SUCCESS") {
		return {
			status: responseData?.status || "ERROR",
			message: responseData?.message || "An error occurred",
			dataList: [] as T[],
		};
	}

	return {
		status: responseData?.status || "SUCCESS",
		message: responseData?.message || "",
		dataList: responseData?.dataList as T[],
	};
}

export async function oldGetRequest<T>({
	endpointUrl,
	cache = "no-store",
	tags,
	userId,
}: {
	endpointUrl: string;
	cache?:
		| "default"
		| "force-cache"
		| "no-cache"
		| "no-store"
		| "only-if-cached"
		| "reload";
	tags: string[];
	userId: string;
}): Promise<T[]> {
	const response = await fetch(`${apiBaseUrl}${endpointUrl}`, {
		headers: {
			userId,
		},
		cache,
		next: {
			tags,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}

	const responseData = await response.json();

	return responseData as T[];
}
