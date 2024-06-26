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
	salesRep: {
		name: string;
		phNo: string | null;
	};
	availability: boolean;
	entryTime: string | null;
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

export interface SalesRepForecastType {
	itemCode: number;
	itemName: string;
	preset: number;
	inventory: number;
	srForecast: number;
	smForeCast?: number;
	storeId?: string;
}

export interface SalesRepForecastedLatestDataType {
	storeId: string;
	storeName: string;
	data: SalesRepForecastType[];
}

export interface SMItemForCastDataType {
	itemCode: string;
	smForeCast: number;
}

export interface SalesManagerForcastDataType {
	storeId: string;
	itemForecastList: SMItemForCastDataType[];
}

export interface SupplierType {
	name: string;
	phNo: string;
}

export interface FinalForecastedDataType {
	itemCode: string;
	itemName: string;
	count: number;
	weight: number;
	suppliers: SupplierType[];
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
	status: "SUCCESS" | "ERROR" | boolean | "AVAILABLE" | "UNAVAILABLE";
	message: string;
	data: T;
}

export interface CustomMutateResponseType<T> {
	status: "SUCCESS" | "ERROR" | boolean;
	message: string;
	issues: string[];
	data: T;
}

export interface UserType {
	id: number;
	userName: string;
	empId: string;
	address: string;
	gender: "M" | "F";
	email: string;
	roleCode: string;
	storeId: string;
	info: string;
	createdBy: string;
	createdOn: string;
}

export interface RoleType {
	roleCode: string;
	roleName: string;
}

export interface VegetableType {
	id: number;
	itemName: string;
	itemGroup: string;
	packetWeight: number;
	preset: number;
}

export interface FarmerType {
	id: string;
	farmerId: string;
	fullName: string;
	address: string;
	phoneNo: string;
	availableItem: string;
}

export interface ItemsWithPreset {
	itemCode: number;
	itemName: string | null;
	preset: number;
	inventory?: number;
	packets_required?: number;
}

export interface SalesManagerTableDataType {
	"Vegetable Types": string;
	"Packet Weight": number;
	"Total Packets": number;
	"Total KG/PC": number;
	[storeName: string]: string | number; // Indexed signature for dynamic properties
}

export interface StoreItemsType {
	itemCode: number;
	itemName: string;
	preset: number;
}
