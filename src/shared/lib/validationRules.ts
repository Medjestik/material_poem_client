export const required = (errorMessage = 'Поле обязательно для заполнения') => ({
	validate: (value: string) => value.length > 0,
	errorMessage,
});

export const minLength = (
	length: number,
	errorMessage = `Минимальная длина: ${length} символов`
) => ({
	validate: (value: string) => value.length >= length,
	errorMessage,
});

export const emailFormat = (
	errorMessage = 'Неверный формат электронной почты'
) => ({
	validate: (value: string) =>
		/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value),
	errorMessage,
});

export const phoneFormat = (
	errorMessage = 'Введите корректный номер телефона'
) => ({
	validate: (value: string) => {
		if (!value) return true;

		const cleaned = value.replace(/[^\d+]/g, '');

		if (
			(cleaned.match(/\+/g) || []).length > 1 ||
			(cleaned.includes('+') && !cleaned.startsWith('+'))
		) {
			return false;
		}

		const digits = cleaned.replace(/\+/g, '');

		if (digits.length < 10 || digits.length > 15) return false;

		if (cleaned.startsWith('+')) {
			return /^\+[1-9]\d{9,14}$/.test(cleaned);
		}

		return /^(8|9)\d{9}$/.test(cleaned);
	},
	errorMessage,
});
