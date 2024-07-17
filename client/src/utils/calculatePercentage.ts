export const calculatePercentage = (total: number, element: number): number => {
	if (total === 0) {
		return 0;
	}

	let percentage = (element / total) * 100;

	if (!isFinite(percentage)) {
		return 0;
	}

	percentage = Number(percentage.toFixed(1));

	return percentage;
};
