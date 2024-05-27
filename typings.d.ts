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

export interface itemType {
	id: number;
	itemName: string;
	itemGroup: string;
	packetWeight: number;
	preset: number;
	inventory?: number;
	packets_required: number;
}

export interface salesForecastSubmitDataType {
	itemCode: number;
	inventory: number;
	srForecast: number;
}

export interface DataAvailabilityType {
	storeId: string;
	storeName: string;
	salesRep: string;
	availability: boolean;
}

export interface SrPredictedDataType {
	storeId: string;
	inventory: number;
	srForecast: number;
	smForeCast?: number;
	itemId?: string;
}

export interface SalesRepForcastedDataType {
	itemCode: string;
	itemName: string;
	presetTarget: number;
	packetWeight: number;
	srPredictDataList: SrPredictedDataType[];
}

export interface SMItemForCastDataType {
	itemCode: string;
	smForeCast: number;
}

export interface SalesManagerForcastDataType {
	storeId: string;
	itemForecastList: SMItemForCastDataType[];
}

export interface FinalForecastedDataType {
	itemCode: string;
	itemName: string;
	count: number;
	weight: number;
	suppliers: string;
}

export interface FinalForecastedDataResponseType {
	status: "SUCCESS" | "ERROR";
	message: string;
	dataList: FinalForecastedDataType[] | [];
}

export interface salesManagerReportStatus {
	status: boolean;
	updateTime: string;
}

export interface CustomResponseType<T> {
	status: "SUCCESS" | "ERROR";
	message: string;
	dataList: T[];
}

export interface CustomMutateResponseType<T> {
	status: "SUCCESS" | "ERROR";
	message: string;
	data: T;
}
