import type {
	SalesManagerTableDataType,
	SalesRepForecastedLatestDataType,
	itemType,
} from "./../typings.d";

export default function generateSalesManagerTableData({
	allVeg,
	salesRepForecastedData,
}: {
	allVeg: itemType[];
	salesRepForecastedData: SalesRepForecastedLatestDataType[];
}): SalesManagerTableDataType[] {
	/*
            [{
                'Vegetable Types': 'Tomato',
                'Packet Weight': 100,
                'Store 1': 100,
                'Store 2': 200,
                'Store 3': 300,
                'Total Packets': 600,
                'Total KG/PC': 60000    
            }]

    */
	return allVeg.map((veg) => {
		return {
			"Vegetable Types": veg.itemName,
			"Packet Weight": veg.packetWeight,
			...salesRepForecastedData.reduce(
				(acc: { [key: string]: number | null }, data) => {
					const srForecast = data.data.find(
						(item) => item.itemCode === veg.id,
					)?.srForecast;
					acc[`${data.storeName}`] = srForecast || null;

					return acc;
				},
				{},
			),
			"Total Packets": salesRepForecastedData.reduce((acc, curr) => {
				const srForecast = curr.data.find(
					(item) => item.itemCode === veg.id,
				)?.srForecast;
				if (!srForecast) return acc;
				return acc + srForecast;
			}, 0),
			"Total KG/PC": salesRepForecastedData.reduce((acc, curr) => {
				const srForecast = curr.data.find(
					(item) => item.itemCode === veg.id,
				)?.srForecast;
				if (!srForecast) return acc;
				return acc + srForecast * veg.packetWeight;
			}, 0),
		};
	});
}
