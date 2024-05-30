"use server";

import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import type { salesForecastSubmitDataType } from "@/typings";

export async function salesRepForecast(formData: {
	storeId: string;
	byRole: string;
	data: salesForecastSubmitDataType[];
}) {
	return submitHandleValidationAndSessionErrors({
		validatedFields: { data: formData, success: true },
		endpointUrl: "/forecast/insert",
		revalidateTagString: "forecast",
		method: "POST",
	});
}
