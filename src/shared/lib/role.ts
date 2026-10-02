export const convertRole = (role: string): string => {
	switch (role) {
		case 'admin':
			return 'Администратор';
		case 'company_representative':
			return 'Представитель компании';
		case 'cpds':
			return 'ЦПДС';
		case 'department_validator':
			return 'Ответственный от кафедры';
		case 'employee':
			return 'Работник РУТ (МИИТ)';
		case 'institute_validator':
			return 'Ответственный от института';
		case 'mentor':
			return 'Наставник';
		case 'other':
			return 'Иное лицо';
		case 'partner':
			return 'Партнёр';
		case 'student':
			return 'Студент РУТ (МИИТ)';
		case 'tutor':
			return 'Преподаватель';
		default:
			return 'Неизвестная роль';
	}
};
