import type {
	FC,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
	DragEvent,
	ChangeEvent,
} from 'react';
import { useId, useRef, useState } from 'react';
import clsx from 'clsx';

import { Select } from '../../../Select/ui/select';
import styles from './form-control.module.scss';

type TSelectOption = { value: string; label: string };
type TSelectItem = { id: string; name: string };

interface IBaseProps {
	label: string;
	className?: string;
}

type TInputFieldProps = IBaseProps &
	Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder'> & {
		fieldType?: 'input';
		inputType?: InputHTMLAttributes<HTMLInputElement>['type'];
		placeholder?: string;
	};

type TSelectFieldProps = IBaseProps & {
	fieldType: 'select';
	name: string;
	options: TSelectOption[];
	placeholder?: string;
	required?: boolean;
	onValueChange?: () => void;
};

type TTextareaFieldProps = IBaseProps &
	Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> & {
		fieldType: 'textarea';
		placeholder?: string;
	};

export type TFormControlProps =
	| TInputFieldProps
	| TSelectFieldProps
	| TTextareaFieldProps
	| TUploadFieldProps;

const FormControlSelect: FC<TSelectFieldProps> = ({
	label,
	className,
	name,
	options,
	placeholder = 'Выберите значение',
	required,
	onValueChange,
}) => {
	const selectOptions: TSelectItem[] = options.map((option) => ({
		id: option.value,
		name: option.label,
	}));

	const [currentOption, setCurrentOption] = useState<TSelectItem | null>(null);
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	return (
		<div
			className={clsx(
				styles.field,
				isSelectOpen && styles.fieldElevated,
				className
			)}>
			<span className={styles.label}>{label}</span>
			<input
				type='hidden'
				name={name}
				value={currentOption?.id ?? ''}
				required={required}
			/>
			<Select<TSelectItem>
				options={selectOptions}
				currentOption={currentOption}
				onChooseOption={(option) => {
					setCurrentOption(option);
					onValueChange?.();
				}}
				valueKey='id'
				labelKey='name'
				width='full'
				placeholder={placeholder}
				withClear={false}
				variant='mpoem'
				excludeSelectedFromList={false}
				onOpenChange={setIsSelectOpen}
			/>
		</div>
	);
};

type TUploadFieldProps = IBaseProps &
	Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder'> & {
		fieldType: 'upload';
		uploadTitle?: string;
		uploadHint?: string;
	};

const FormControlUpload: FC<TUploadFieldProps> = ({
	label,
	className,
	uploadTitle = 'Перетащите фото сюда или выберите файл',
	uploadHint = 'JPG / PNG · до 5 файлов',
	name,
	accept = 'image/jpeg,image/png,image/webp',
	multiple = true,
	fieldType: _fieldType,
	...inputProps
}) => {
	const inputId = useId();
	const inputRef = useRef<HTMLInputElement>(null);
	const [fileSummary, setFileSummary] = useState<string | null>(null);

	const syncFiles = (fileList: FileList | null) => {
		if (!fileList?.length) {
			setFileSummary(null);
			return;
		}

		const names = Array.from(fileList).map((file) => file.name);
		setFileSummary(
			names.length === 1 ? names[0] : `Выбрано файлов: ${names.length}`
		);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		syncFiles(event.target.files);
		inputProps.onChange?.(event);
	};

	const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		const input = inputRef.current;
		if (!input || !event.dataTransfer.files.length) return;

		input.files = event.dataTransfer.files;
		syncFiles(event.dataTransfer.files);
	};

	return (
		<div className={clsx(styles.field, className)}>
			<span className={styles.label}>{label}</span>
			<label
				className={styles.uploadZone}
				htmlFor={inputId}
				onDragOver={(event) => event.preventDefault()}
				onDrop={handleDrop}>
				<UploadIcon />
				<span className={styles.uploadTitle}>
					{fileSummary ?? uploadTitle}
				</span>
				<span className={styles.uploadHint}>{uploadHint}</span>
				<input
					{...inputProps}
					ref={inputRef}
					id={inputId}
					className={styles.uploadInput}
					type='file'
					name={name}
					accept={accept}
					multiple={multiple}
					onChange={handleChange}
				/>
			</label>
		</div>
	);
};

const UploadIcon = () => (
	<svg
		className={styles.uploadIcon}
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		aria-hidden='true'>
		<path
			d='M12 16V4m0 0 7 7M12 4 5 11'
			stroke='currentColor'
			strokeWidth='1.3'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2'
			stroke='currentColor'
			strokeWidth='1.3'
			strokeLinecap='round'
		/>
	</svg>
);

export const FormControl: FC<TFormControlProps> = (props) => {
	const { label, className } = props;

	if (props.fieldType === 'select') {
		return <FormControlSelect {...props} />;
	}

	if (props.fieldType === 'textarea') {
		const {
			placeholder,
			fieldType: _fieldType,
			label: _label,
			className: _className,
			...textareaProps
		} = props;

		return (
			<div className={clsx(styles.field, className)}>
				<span className={styles.label}>{label}</span>
				<textarea
					className={clsx(styles.control, styles.controlTextarea)}
					rows={4}
					placeholder={placeholder}
					{...textareaProps}
				/>
			</div>
		);
	}

	if (props.fieldType === 'upload') {
		return <FormControlUpload {...props} />;
	}

	const {
		fieldType: _fieldType = 'input',
		inputType = 'text',
		placeholder,
		label: _label,
		className: _className,
		...inputProps
	} = props;

	return (
		<div className={clsx(styles.field, className)}>
			<span className={styles.label}>{label}</span>
			<input
				className={styles.control}
				type={inputType}
				placeholder={placeholder}
				{...inputProps}
			/>
		</div>
	);
};
