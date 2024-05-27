"use server";

import { encrypt } from "@/lib/auth";
import { formSchema } from "@/schema/LoginFormSchema";
import type { userInfoType } from "@/typings";
import { cookies } from "next/headers";

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
			return {
				issues: [
					response?.statusText === "Unavailable"
						? "Backend Server is not running OR there might be other user logged in currently"
						: response.statusText,
				] || ["An error occurred"],
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
