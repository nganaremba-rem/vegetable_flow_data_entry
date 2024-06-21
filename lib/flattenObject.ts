export const flattenObject = (
	obj: any,
	parent = "",
	res: Record<string, any> = {},
): Record<string, any> => {
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const propName = parent ? `${parent}.${key}` : key;
			if (
				typeof obj[key] === "object" &&
				obj[key] !== null &&
				!Array.isArray(obj[key])
			) {
				flattenObject(obj[key], propName, res);
			} else if (Array.isArray(obj[key])) {
				const firstItem = obj[key][0];
				if (
					obj[key].every(
						(item: any) => typeof item !== "object" || item === null,
					)
				) {
					res[propName] = obj[key].join(", ");
				} else if (typeof firstItem === "object" && firstItem !== null) {
					flattenObject(firstItem, propName, res);
				} else {
					res[propName] = firstItem;
				}
			} else {
				res[propName] = obj[key];
			}
		}
	}
	return res;
};
