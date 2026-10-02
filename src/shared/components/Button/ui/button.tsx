import type { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import type { IButtonProps } from '../types/types';
import { ButtonArrow } from './button-arrow';

import styles from '../styles/button.module.scss';

const ARROW_STROKE = {
	primary: 'var(--mpoem-paper)',
	outline: 'var(--mpoem-dark)',
} as const;

export const Button: FC<IButtonProps> = ({
	children,
	variant = 'outline',
	href,
	to,
	onClick,
	type = 'button',
	className,
	fullWidth,
	withArrow,
	disabled,
	style,
}) => {
	const classNames = clsx(
		styles.button,
		styles[`button_${variant}`],
		fullWidth && styles.button_full,
		className
	);

	const content = (
		<>
			<span className={styles.label}>{children}</span>
			{withArrow && (
				<span className={styles.arrow}>
					<ButtonArrow stroke={ARROW_STROKE[variant]} />
				</span>
			)}
		</>
	);

	if (to) {
		return (
			<Link className={classNames} to={to} style={style}>
				{content}
			</Link>
		);
	}

	if (href) {
		return (
			<a className={classNames} href={href} style={style}>
				{content}
			</a>
		);
	}

	return (
		<button
			className={classNames}
			type={type}
			onClick={onClick}
			disabled={disabled}
			style={style}>
			{content}
		</button>
	);
};
