"use server";

import { userInfoType, type userSessionType } from "@/typings";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7 days from now")
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export type PrevStateType = { message: string };

export async function login(state: PrevStateType, formData: FormData) {
	// Verify credentials && get the user

	const user = {
		email: formData.get("email"),
		password: formData.get("password"),
		role: "admin",
	};

	// Create the session
	const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
	const session = await encrypt({ expires, user });

	// Save the session in a cookie
	cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
	// Destroy the session
	cookies().set("session", "", { expires: new Date(0) });
	redirect("/");
}

export async function getSession(): Promise<userSessionType | null> {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	if (!session) return;

	// Refresh the session so it doesn't expire
	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
	return res;
}
