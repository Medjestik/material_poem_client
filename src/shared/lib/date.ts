export const currentYear = new Date().getFullYear();

export const getFullYear = (isoDate: string) => {
	const date = new Date(isoDate);
	return date.getFullYear();
};

export const getFullDate = (isoDate: string) => {
	const date = new Date(isoDate);
	return date.toLocaleDateString('ru-RU');
};

export const convertDate = (dateString: string): string => {
	const date = new Date(dateString);

	// Массивы для дней недели и месяцев
	const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	];

	const dayOfWeek = days[date.getDay()];
	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	// Добавляем ведущие нули для часов и минут
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${dayOfWeek}, ${day} ${month} ${year} г. ${hours}:${minutes}`;
};
