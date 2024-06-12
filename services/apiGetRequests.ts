"use server";

import { apiBaseUrl } from "@/constants/constants";
import { getSession } from "@/lib/auth";
import type { CustomResponseType, userSessionType } from "@/typings";

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
	userId?: string;
}): Promise<CustomResponseType<T>> {
	try {
		const session = await getSession<userSessionType>();
		if (!session)
			return {
				status: "ERROR",
				message: "Session expired. Please login again.",
				data: [] as T,
			};

		const response = await fetch(`${apiBaseUrl}${endpointUrl}`, {
			headers: {
				userId: session.userInfo.userId,
			},
			cache,
			next: {
				tags,
			},
		});

		if (!response.ok) {
			return {
				status: "ERROR",
				message: response.statusText || "Failed to fetch data",
				data: [] as T,
			};
		}

		const responseData = await response.json();

		console.log(responseData);

		if (
			responseData?.status !== "SUCCESS" &&
			responseData?.status !== "AVAILABLE" &&
			responseData?.status !== true
		) {
			return {
				status: responseData?.status || "ERROR",
				message: responseData?.message || "An error occurred",
				data: [] as T,
			};
		}
		return {
			status: responseData?.status || "SUCCESS",
			message: responseData?.message || "",
			data: responseData?.data as T,
		};
	} catch (error: any) {
		return {
			status: "ERROR",
			message: error?.message || "An error occurred",
			data: [] as T,
		};
	}
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
