"use server";

import { getSession } from "@/lib/auth";
import type { SalesManagerForcastDataType, userSessionType } from "@/typings";

export async function salesManagerForecastAction(
	formData: SalesManagerForcastDataType[],
) {
	const session = await getSession<userSessionType>();
	if (!session)
		return {
			message: "",
			issues: ["Session expired. Please login again."],
		};

	console.log(formData);
	const response = await fetch("http://burn.pagekite.me/forecast/update", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			userId: session.userInfo.userId,
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		console.log(response);
		return {
			issues: [response.statusText || "An error occurred"],
			message: "",
		};
	}
	console.log("here");
	const responseData = await response.json();
	console.log("responsedata", responseData);

	if (responseData.status !== "SUCCESS") {
		return {
			issues: [responseData.message],
			message: "",
		};
	}

	return {
		issues: [],
		message: responseData.message || "Final Forecast Sent Successfully",
	};
}
