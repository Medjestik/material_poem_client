export interface IProjectLevel {
	id: number;
	name: string;
}

export const projectLevels: IProjectLevel[] = [
	{ id: 1, name: 'Учебный' },
	{ id: 2, name: 'Учебно-прикладной' },
	{ id: 3, name: 'Прикладной' },
];
