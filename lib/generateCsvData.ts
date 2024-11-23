import { flattenObject } from "./flattenObject";
import { getColumnLabel, type keyToLabel } from "./keyToLabel";

export type CSVDataFormatRequired = {
	[key: string]: any;
};

export type CSVDataFinalType = string[][];

/*

[[Veg Name, Preset, Weight], [Onion, 10, 50g], [Potato, 20, 10g]]

*/

export function generateCSVData(
	data: CSVDataFormatRequired[] | null | undefined, // the array of objects
	hiddenColumns: string[] = [], // Columns to hide eg. ['id', 'itemName']
	listOfKeysWithFormatterCallback:
		| {
				key: string;
				cb: (value: string) => string;
		  }[]
		| null = null, // in order to format date or convert to another format
): CSVDataFinalType {
	if (!data || data?.length === 0) return [];

	const csvData: CSVDataFinalType = [];
	// flatten the object, skip the hidden columns and extract the header keys from the first object keys eg. ['id', 'itemName', 'itemGroup', 'packetWeight']
	const headerKeys = Object.keys(flattenObject(data[0])).filter(
		(key) => !hiddenColumns?.includes(key),
	);
	// assign a label to header keys eg. ['ID', 'Vegetable', 'Vegetable Group', 'Packet Weight']
	const headers = headerKeys.map((headerKey) =>
		getColumnLabel(headerKey as keyof typeof keyToLabel),
	);

	// push the headers to the csvData array
	csvData.push(headers);

	// initialize the isFormattedValue to false
	let isFormattedValue = false;

	// flatten all the nested data with period eg. { 'id': 1, 'itemName': 'Tomato', 'itemGroup': 'Fruit', 'packetWeight': 100 }
	const flattenData = data.map((item) => flattenObject(item));

	// loop through the flattenData array
	for (const item of flattenData) {
		const row: string[] = []; // initialize the row array
		for (const headerKey of headerKeys) {
			if (listOfKeysWithFormatterCallback !== null) {
				// if the headerKey is in the listOfKeysWithFormatterCallback then push the formatted value to the row
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
			// if the headerKey is not in the listOfKeysWithFormatterCallback then push the item value to the row
			if (!isFormattedValue) {
				row.push(item[headerKey]);
			}
		}
		// push the row to the csvData array
		csvData.push(row);
	}
	return csvData;
}
