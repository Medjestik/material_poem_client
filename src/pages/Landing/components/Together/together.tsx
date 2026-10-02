import type { FC } from 'react';
import { scroller } from 'react-scroll';

import { Button } from '../../../../shared/components/Button/ui/button';
import { mpoemImages } from '../../../../shared/lib/mpoem/images';
import { ESECTIONS } from '../../../../shared/utils/routes';

import styles from './together.module.scss';

const SCROLL_DURATION = 500;

const scrollToContact = () => {
	scroller.scrollTo(ESECTIONS.CONTACT, {
		smooth: true,
		duration: SCROLL_DURATION,
		offset: 0,
	});
};

export const Together: FC = () => (
	<section className={styles.section}>
		<div className={styles.inner}>
			<div className={styles.visual}>
				<img
					className={styles.image}
					src={mpoemImages.interior}
					alt='Панно в жилом пространстве'
					width={604}
					height={695}
				/>
				<p className={styles.caption}>
					ЕДИНСТВЕННЫЙ ЭКЗЕМПЛЯР. ВАШЕ ПРОСТРАНСТВО.
				</p>
			</div>

			<div className={styles.content}>
				<div className={styles.heading}>
					<p className={styles.eyebrow}>04 / СОЗДАДИМ ВМЕСТЕ</p>
					<h2 className={styles.title}>{'Ваш интерьер.\nВаша история.'}</h2>
				</div>
				<p className={styles.text}>
					Каждый проект начинается с разговора о пространстве, настроении и
					идее. Мы создаём работы, которые становятся естественной частью
					интерьера и сохраняют при этом собственный характер.
				</p>
				<p className={styles.text}>
					Можно выбрать одну из работ M.POEM и адаптировать её для вашего
					пространства — или создать оригинальную по индивидуальному заказу.
					Размер, композиция, материалы и фактуры подбираются с учётом
					интерьера и вашей идеи.
				</p>
				<div className={styles.terms}>
					<h3 className={styles.termsTitle}>Стоимость и сроки</h3>
					<p className={styles.termsText}>
						Стоимость зависит от размера, сложности композиции и выбранных
						материалов. Концепцию, ориентировочные сроки и бюджет определяем до
						начала работы.
					</p>
				</div>
				<Button
					variant='primary'
					withArrow
					className={styles.cta}
					onClick={scrollToContact}>
					Обсудить проект
				</Button>
			</div>
		</div>
	</section>
);
