export const getApiUrl = (): string => {
	const { hostname } = window.location;

	if (hostname === 'localhost') {
		return 'http://localhost:3000/api';
	}

	return 'https://pestovo.emiit.online/api';
};

export const API_URL = getApiUrl();
