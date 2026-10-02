import type { FC } from 'react';

import { CONTACT_INFO } from '../../../../shared/lib/mpoem/landing';
import { ESECTIONS } from '../../../../shared/utils/routes';

import { ContactForm } from './contact-form';

import styles from './contact.module.scss';

export const Contact: FC = () => (
	<section className={styles.section} id={ESECTIONS.CONTACT}>
		<div className={styles.inner}>
			<div className={styles.info}>
				<div className={styles.heading}>
					<p className={styles.eyebrow}>05 / НАЧНЁМ С РАЗГОВОРА</p>
					<h2 className={styles.title}>
						{'Найдём панно\nдля вашего\nинтерьера.'}
					</h2>
				</div>

				<div className={styles.contacts}>
					<span className={styles.contactLabel}>WHATSAPP / TELEGRAM</span>
					<a className={styles.phone} href={`tel:${CONTACT_INFO.phoneHref}`}>
						{CONTACT_INFO.phone}
					</a>

					<div className={styles.divider} aria-hidden='true' />

					<span className={styles.contactLabel}>INSTAGRAM</span>
					<a
						className={styles.link}
						href={CONTACT_INFO.instagramUrl}
						target='_blank'
						rel='noreferrer noopener'>
						{CONTACT_INFO.instagram}
					</a>

					<div className={styles.divider} aria-hidden='true' />

					<span className={styles.contactLabel}>ГЕОГРАФИЯ</span>
					<span className={styles.geo}>{CONTACT_INFO.geography}</span>
				</div>

				<p className={styles.note}>
					{'Панно, мебель и предметы интерьера\nиз природных материалов.'}
				</p>
			</div>

			<div className={styles.formColumn}>
				<ContactForm />
			</div>
		</div>
	</section>
);
