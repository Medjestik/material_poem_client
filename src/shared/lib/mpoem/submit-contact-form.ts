const FORMSPREE_FORM_ID = process.env.FORMSPREE_FORM_ID ?? '';
const FORMSPREE_FILE_UPLOADS =
	process.env.FORMSPREE_FILE_UPLOADS === 'true';

export type TSubmitContactFormResult = {
	photosSkipped: boolean;
};

export const isContactFormConfigured = (): boolean =>
	Boolean(FORMSPREE_FORM_ID.trim());

const isFileUploadDenied = (payload: unknown): boolean => {
	const text = JSON.stringify(payload ?? '').toLowerCase();

	return (
		text.includes('file upload') ||
		text.includes('no_file_uploads') ||
		text.includes('file uploads not permitted')
	);
};

const getPhotoFileNames = (form: HTMLFormElement): string[] => {
	const input = form.elements.namedItem('photo');

	if (!(input instanceof HTMLInputElement) || input.type !== 'file') {
		return [];
	}

	return Array.from(input.files ?? []).map((file) => file.name);
};

const buildFormData = (
	form: HTMLFormElement,
	options: { includeFiles: boolean; photoNote?: string }
): FormData => {
	const formData = new FormData(form);

	if (!options.includeFiles) {
		formData.delete('photo');
	}

	const name = String(formData.get('name') ?? '').trim();
	formData.set('_subject', `М.ПОЭМ — заявка${name ? `: ${name}` : ''}`);

	const replyTo = String(formData.get('email') ?? '').trim();
	if (replyTo) {
		formData.set('_replyto', replyTo);
	}

	if (options.photoNote) {
		const message = String(formData.get('message') ?? '').trim();
		const block = options.photoNote;

		formData.set(
			'message',
			message ? `${message}\n\n${block}` : block
		);
	}

	return formData;
};

const postToFormspree = async (
	formId: string,
	formData: FormData
): Promise<Response> =>
	fetch(`https://formspree.io/f/${formId}`, {
		method: 'POST',
		body: formData,
		headers: {
			Accept: 'application/json',
		},
	});

const ensureOk = async (response: Response): Promise<void> => {
	if (response.ok) {
		return;
	}

	const payload = (await response.json().catch(() => null)) as {
		error?: string;
	} | null;

	throw new Error(
		payload?.error ?? 'Не удалось отправить заявку. Попробуйте позже.'
	);
};

export const submitContactForm = async (
	form: HTMLFormElement
): Promise<TSubmitContactFormResult> => {
	const formId = FORMSPREE_FORM_ID.trim();

	if (!formId) {
		throw new Error(
			'Форма не настроена: добавьте FORMSPREE_FORM_ID в файл .env и перезапустите dev-сервер.'
		);
	}

	const photoNames = getPhotoFileNames(form);
	const hasPhotos = photoNames.length > 0;

	const photoNote =
		hasPhotos && !FORMSPREE_FILE_UPLOADS
			? `Клиент выбрал фото (${photoNames.join(', ')}), но вложения в заявке недоступны на текущем тарифе Formspree — уточните у клиента по e-mail или мессенджеру.`
			: undefined;

	let includeFiles = FORMSPREE_FILE_UPLOADS && hasPhotos;
	let formData = buildFormData(form, { includeFiles, photoNote });

	let response = await postToFormspree(formId, formData);

	if (!response.ok && includeFiles) {
		const payload = await response.json().catch(() => null);

		if (isFileUploadDenied(payload)) {
			includeFiles = false;
			formData = buildFormData(form, {
				includeFiles: false,
				photoNote:
					photoNote ??
					`Клиент выбрал фото (${photoNames.join(', ')}), но Formspree не принял вложения — уточните у клиента отдельно.`,
			});
			response = await postToFormspree(formId, formData);
		} else {
			await ensureOk(response);
		}
	}

	await ensureOk(response);

	return {
		photosSkipped: hasPhotos && !includeFiles,
	};
};
