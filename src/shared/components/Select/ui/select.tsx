import type { ISelectProps } from '../types/types';

import type { MouseEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';

import styles from '../styles/select.module.scss';

export const Select = <T,>({
	options,
	currentOption,
	onChooseOption,
	valueKey = 'id' as keyof T,
	labelKey = 'name' as keyof T,
	width = 'full',
	placeholder = 'Выберите значение...',
	withClear = true,
	variant = 'default',
	excludeSelectedFromList = true,
	onOpenChange,
}: ISelectProps<T>) => {
	const [isOpenSelectOptions, setIsOpenSelectOptions] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const setOpen = (next: boolean) => {
		setIsOpenSelectOptions(next);
		onOpenChange?.(next);
	};

	const openSelectOptions = () => {
		setOpen(!isOpenSelectOptions);
	};

	const chooseOption = (option: T, event?: MouseEvent) => {
		event?.stopPropagation();
		onChooseOption(option);
		setOpen(false);
	};

	const handleClickOutside = () => {
		setOpen(false);
	};

	useOnClickOutside(selectRef, handleClickOutside);

	useEffect(() => {
		setOpen(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only close
	}, []);

	const getValue = (item: T) => String(item[valueKey]);
	const getLabel = (item: T) => String(item[labelKey]);

	const listOptions = excludeSelectedFromList
		? options.filter(
				(item) => getValue(item) !== getValue(currentOption ?? ({} as T))
		  )
		: options;

	return (
		<div
			ref={selectRef}
			className={`${styles.select} ${styles[`select_width_${width}`]} ${
				variant === 'mpoem' ? styles.select_mpoem : ''
			} ${isOpenSelectOptions ? styles.select_open : ''}`}
			onClick={openSelectOptions}>
			<div className={styles.main}>
				<p
					className={`${styles.title} ${
						!currentOption || getValue(currentOption) === '0'
							? styles.title_empty
							: ''
					}`}>
					{currentOption ? getLabel(currentOption) : placeholder}
				</p>

				<div className={styles.controls}>
					{currentOption && withClear && (
						<button
							type='button'
							className={styles.clear}
							onClick={(e) => {
								e.stopPropagation();
								onChooseOption(null);
							}}>
							✕
						</button>
					)}

					<div
						className={`${styles.arrow} ${
							isOpenSelectOptions ? styles.arrow_status_open : ''
						}`}
					/>
				</div>
			</div>
			<div
				className={`${styles.options} ${
					variant === 'mpoem' ? styles.options_mpoem : ''
				} ${isOpenSelectOptions ? styles.options_status_open : ''}`}
				onClick={(event) => event.stopPropagation()}>
				<ul className={styles.list}>
					{listOptions.length > 0 ? (
						listOptions.map((item) => {
							const isActive =
								currentOption && getValue(item) === getValue(currentOption);

							return (
								<li
									className={`${styles.item} ${
										isActive ? styles.item_active : ''
									}`}
									key={getValue(item)}
									onClick={(event) => chooseOption(item, event)}>
									<p className={styles.text}>{getLabel(item)}</p>
								</li>
							);
						})
					) : (
						<li className={styles.item}>
							<p className={`${styles.text} ${styles.text_empty}`}>
								Результаты не найдены.
							</p>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};
