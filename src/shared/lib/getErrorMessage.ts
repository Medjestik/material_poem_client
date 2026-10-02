export const getErrorMessage = (err: unknown): string => {
	if (typeof err === 'string') {
		return err;
	}

	if (err instanceof Error) {
		return err.message;
	}

	if (err && typeof err === 'object' && 'message' in err) {
		return typeof err.message === 'string'
			? err.message
			: 'Что-то пошло не так.';
	}

	return 'Что-то пошло не так.';
};
