export interface userInfoType {
	userId: string;
	userName: string;
	userRole: string;
	storeId: string;
}

export interface userSessionType {
	expires: string;
	userInfo: userInfoType;
	iat: number;
	exp: number;
}
