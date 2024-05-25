"use server";

import type { salesForecastSubmitDataType } from "@/typings";

export async function salesRepForecast(
	formData: salesForecastSubmitDataType[],
	userId: string,
) {
	console.log(formData);
	const response = await fetch("http://burn.pagekite.me/forecast/insert", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			userId: userId,
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		return {
			issues: [response.statusText],
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
		message: responseData.message || "Forecast added successfully",
	};
}
