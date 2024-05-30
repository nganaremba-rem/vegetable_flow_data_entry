import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";
import { mutateData } from "./apiPostRequests";

export async function submitHandleValidationAndSessionErrors({
	validatedFields,
	endpointUrl,
	revalidateTagString,
	method = "POST",
}: {
	validatedFields?: any;
	endpointUrl: string;
	revalidateTagString: string;
	method: "POST" | "PUT" | "DELETE";
}) {
	const session = await getSession<userSessionType>();
	if (!session)
		return {
			status: "ERROR",
			message: "",
			issues: ["Session expired. Please login again."],
			data: [],
		};

	if (validatedFields && !validatedFields.success) {
		return {
			status: "ERROR",
			issues: validatedFields?.error?.issues?.map(
				(issue: any) => issue.message,
			) || ["An error occurred"],
			message: "",
			data: [],
		};
	}

	return await mutateData<[]>({
		data: validatedFields.data,
		endpointUrl,
		revalidateTagString,
		userId: session.userInfo.userId,
		method,
	});
}
