export const extractFromBrackets = (str: string): string => {
	const match = str.match(/\(([^)]+)\)/);
	return match ? match[1] : '';
};
