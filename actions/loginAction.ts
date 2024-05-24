"use server";

import { formSchema } from "@/app/@login/LoginFormSchema";
import { encrypt } from "@/lib/auth";
import type { userInfoType } from "@/typings";
import { cookies } from "next/headers";

// export async function loginAction(prevState: FormState, formData: FormData) {
// 	const validatedFields = formSchema.safeParse({
// 		email: formData.get("email"),
// 		password: formData.get("password"),
// 	});

// 	if (!validatedFields.success) {
// 		return {
// 			...prevState,
// 			fields: Object.fromEntries(formData) as Record<string, string>,
// 			issues: validatedFields.error.issues.map((issue) => issue.message),
// 		};
// 	}

// 	try {
// 		const response = await fetch("http://burn.pagekite.me/user/logIn", {
// 			method: "POST",
// 			body: JSON.stringify(validatedFields.data),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		if (!response.ok) {
// 			console.log(response);
// 			return {
// 				...prevState,
// 				issues: [response?.statusText] || ["An error occurred"],
// 				fields: Object.fromEntries(formData) as Record<string, string>,
// 			};
// 		}
// 		const responseData = await response.json();

// 		if (!responseData.success) {
// 			return {
// 				...prevState,
// 				fields: Object.fromEntries(formData) as Record<string, string>,
// 				issues: [responseData?.message] || ["An error occurred"],
// 			};
// 		}
// 		const userInfo: userInfoType = responseData?.logInUserInfo;
// 		// Create the session
// 		const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
// 		const session = await encrypt({ expires, userInfo });

// 		// Save the session in a cookie
// 		cookies().set("session", session, { expires, httpOnly: true });
// 		return {
// 			...prevState,
// 		};

// 		// redirect("/");
// 	} catch (err: any) {
// 		console.error(err);
// 		return {
// 			...prevState,
// 			fields: Object.fromEntries(formData) as Record<string, string>,
// 			issues: [err.message || "An error occurred"],
// 		};
// 	}
// }
export async function loginAction(formData: FormData) {
	const validatedFields = formSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			issues: validatedFields.error.issues.map((issue) => issue.message),
			message: "",
		};
	}

	try {
		const response = await fetch("http://burn.pagekite.me/user/logIn", {
			method: "POST",
			body: JSON.stringify(validatedFields.data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.log(response);
			return {
				issues: [response?.statusText] || ["An error occurred"],
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
		const userInfo: userInfoType = responseData?.logInUserInfo;
		// Create the session
		const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
		const session = await encrypt({ expires, userInfo });

		// Save the session in a cookie
		cookies().set("session", session, { expires, httpOnly: true });

		return {
			issues: [],
			message: responseData?.message || "Login successful",
		};

		// redirect("/");
	} catch (err: any) {
		console.error(err);
		return {
			issues: [err.message || "An error occurred"],
			message: "",
		};
	}
}
