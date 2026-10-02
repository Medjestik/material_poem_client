import type { CSSProperties, ReactNode } from 'react';
import type { To } from 'react-router-dom';

export type TButtonVariant = 'primary' | 'outline';

export interface IButtonProps {
	children: ReactNode;
	variant?: TButtonVariant;
	href?: string;
	to?: To;
	onClick?: () => void;
	type?: 'button' | 'submit';
	className?: string;
	fullWidth?: boolean;
	withArrow?: boolean;
	disabled?: boolean;
	style?: CSSProperties;
}
