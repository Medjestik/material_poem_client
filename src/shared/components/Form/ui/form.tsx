import type { FormEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from '../styles/form.module.scss';

export interface IFormProps {
	title?: string;
	lead?: string;
	className?: string;
	validate?: boolean;
	onSubmit?: FormEventHandler<HTMLFormElement>;
	onInput?: FormEventHandler<HTMLFormElement>;
	onChange?: FormEventHandler<HTMLFormElement>;
	children?: ReactNode;
}

export const Form = forwardRef<HTMLFormElement, IFormProps>(function Form(
	{
		title,
		lead,
		className,
		validate = false,
		onSubmit,
		onInput,
		onChange,
		children,
	},
	ref
) {
	return (
		<form
			ref={ref}
			className={clsx(styles.container, className)}
			onSubmit={onSubmit}
			onInput={onInput}
			onChange={onChange}
			noValidate={!validate}>
			{title ? <h3 className={styles.title}>{title}</h3> : null}
			{lead ? <p className={styles.lead}>{lead}</p> : null}
			{children}
		</form>
	);
});
