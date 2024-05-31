type CSVDataFormatRequired = {
	[key: string]: any;
};

export type CSVDataFinalType = string[][];

export function generateCSVData(
	data: CSVDataFormatRequired[] | null | undefined,
): CSVDataFinalType {
	if (!data || data?.length === 0) return [];

	const csvData: CSVDataFinalType = [];
	const headers = Object.keys(data[0]);
	csvData.push(headers);

	for (const item of data) {
		const row: string[] = [];
		for (const header of headers) {
			row.push(item[header]);
		}
		csvData.push(row);
	}

	return csvData;
}
