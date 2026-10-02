export interface ISelectProps<T> {
	options: T[];
	currentOption: T | null;
	onChooseOption: (option: T | null) => void;
	valueKey?: keyof T;
	labelKey?: keyof T;
	width?: 'default' | 'medium' | 'full' | 'small' | 'large' | 'auto';
	placeholder?: string;
	withClear?: boolean;
	variant?: 'default' | 'mpoem';
	excludeSelectedFromList?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}
