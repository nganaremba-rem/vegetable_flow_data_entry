import { axiosInstance } from "@/lib/axiosInstance";

export interface signInFormDataType {
	email: string;
	password: string;
}

export function signInUser(signInUserData: signInFormDataType) {
	return axiosInstance.post("/user/logIn", signInUserData);
}
