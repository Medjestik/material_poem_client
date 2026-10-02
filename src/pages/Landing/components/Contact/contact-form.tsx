import type { FC, FormEvent } from 'react';
import { useCallback, useRef, useState } from 'react';

import { Button } from '../../../../shared/components/Button/ui/button';
import { Form } from '../../../../shared/components/Form/ui/form';
import { FormControl } from '../../../../shared/components/Form/components/FormControl/form-control';
import {
	isContactFormConfigured,
	submitContactForm,
} from '../../../../shared/lib/mpoem/submit-contact-form';
import { useToast } from '../../../../shared/components/ToastProvider/ui/ToastProvider';

import styles from './contact-form.module.scss';

const FORMAT_OPTIONS = [
	{ value: 'Панно', label: 'ART · панно' },
	{ value: 'Мебель', label: 'ART · мебель' },
	{ value: 'Предмет интерьера', label: 'ART · предмет интерьера' },
	{ value: 'Индивидуальный проект', label: 'ART · индивидуальный проект' },
];

export const ContactForm: FC = () => {
	const { showToast } = useToast();
	const formRef = useRef<HTMLFormElement>(null);
	const [submitting, setSubmitting] = useState(false);
	const [formKey, setFormKey] = useState(0);
	const [isValid, setIsValid] = useState(false);
	const formConfigured = isContactFormConfigured();

	const syncValidity = useCallback(() => {
		const form = formRef.current;
		setIsValid(Boolean(form?.checkValidity()));
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;

		if (!form.checkValidity()) {
			event.preventDefault();
			form.reportValidity();
			return;
		}

		event.preventDefault();
		setSubmitting(true);

		try {
			const { photosSkipped } = await submitContactForm(form);
			showToast({
				type: 'success',
				title: 'Заявка отправлена',
				text: photosSkipped
					? 'Текст заявки отправлен. Фото через форму сейчас не передаются — пришлите снимки ответом на наше письмо или в мессенджер.'
					: 'Мы свяжемся с вами в ближайшее время.',
			});
			form.reset();
			setFormKey((key) => key + 1);
			setIsValid(false);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Не удалось отправить заявку.';

			showToast({
				type: 'error',
				title: 'Ошибка',
				text: message,
			});
		} finally {
			setSubmitting(false);
		}
	};

	const canSubmit = formConfigured && isValid && !submitting;

	return (
		<Form
			key={formKey}
			ref={formRef}
			validate
			title='Расскажите о вашем проекте'
			lead='Начните с идеи, размеров или фотографии пространства.'
			onSubmit={handleSubmit}
			onInput={syncValidity}
			onChange={syncValidity}>
			{!formConfigured && process.env.NODE_ENV === 'development' && (
				<p className={styles.formHint}>
					Отправка на почту: укажите <code>FORMSPREE_FORM_ID</code> в{' '}
					<code>.env</code> (см. <code>.env.example</code>).
				</p>
			)}

			<div className={styles.fields}>
				<div className={styles.row}>
					<FormControl
						label='Ваше имя'
						name='name'
						placeholder='Как к вам обращаться'
						required
					/>
					<FormControl
						label='Телефон'
						name='phone'
						inputType='tel'
						placeholder='+7 (___) ___-__-__'
						required
					/>
				</div>

				<FormControl
					label='E-mail'
					name='email'
					inputType='email'
					placeholder='Ваша электронная почта'
					required
				/>

				<FormControl
					label='Интересующий формат'
					name='format'
					fieldType='select'
					options={FORMAT_OPTIONS}
					placeholder='ART · панно'
					required
					onValueChange={syncValidity}
				/>

				<FormControl
					label='Фото интерьера'
					name='photo'
					fieldType='upload'
					accept='image/jpeg,image/png,image/webp'
					uploadHint='JPG / PNG · необязательно (файлы можно дослать после ответа на заявку)'
				/>

				<FormControl
					label='Сообщение'
					name='message'
					fieldType='textarea'
					placeholder='Опишите пространство, пожелания по материалам и размерам'
				/>
			</div>

			<Button
				type='submit'
				variant='primary'
				fullWidth
				withArrow
				disabled={!canSubmit}>
				{submitting ? 'Отправка...' : 'Отправить заявку'}
			</Button>
		</Form>
	);
};
