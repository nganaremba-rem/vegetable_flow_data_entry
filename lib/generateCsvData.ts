import { flattenObject } from "./flattenObject";
import { getColumnLabel, type keyToLabel } from "./keyToLabel";

export type CSVDataFormatRequired = {
	[key: string]: any;
};

export type CSVDataFinalType = string[][];

export function generateCSVData(
	data: CSVDataFormatRequired[] | null | undefined,
	hiddenColumns: string[] = [],
	listOfKeysWithFormatterCallback:
		| {
				key: string;
				cb: (value: string) => string;
		  }[]
		| null = null,
): CSVDataFinalType {
	if (!data || data?.length === 0) return [];

	const csvData: CSVDataFinalType = [];
	const headerKeys = Object.keys(flattenObject(data[0])).filter(
		(key) => !hiddenColumns?.includes(key),
	);
	const headers = headerKeys.map((headerKey) =>
		getColumnLabel(headerKey as keyof typeof keyToLabel),
	);

	csvData.push(headers);

	let isFormattedValue = false;

	const flattenData = data.map((item) => flattenObject(item));

	for (const item of flattenData) {
		const row: string[] = [];
		for (const headerKey of headerKeys) {
			if (listOfKeysWithFormatterCallback !== null) {
				for (const formatter of listOfKeysWithFormatterCallback || []) {
					if (formatter?.key === headerKey) {
						isFormattedValue = true;
						const formattedItem = formatter.cb(item[headerKey]);
						row.push(formattedItem);
						break;
					}
					isFormattedValue = false;
				}
			}

			if (!isFormattedValue) {
				row.push(item[headerKey]);
			}
		}
		csvData.push(row);
	}
	return csvData;
}
