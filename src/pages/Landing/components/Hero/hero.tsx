import type { FC } from 'react';
import { scroller } from 'react-scroll';

import { Button } from '../../../../shared/components/Button/ui/button';
import { mpoemImages } from '../../../../shared/lib/mpoem/images';
import { ESECTIONS } from '../../../../shared/utils/routes';

import styles from './hero.module.scss';

const SCROLL_DURATION = 500;

const scrollToSection = (section: string) => {
	scroller.scrollTo(section, {
		smooth: true,
		duration: SCROLL_DURATION,
		offset: 0,
	});
};

export const Hero: FC = () => (
	<section className={styles.hero} id={ESECTIONS.ABOUT}>
		<div className={styles.inner}>
			<div className={styles.content}>
				<p className={styles.eyebrow}>ПАННО · МЕБЕЛЬ · ПРЕДМЕТЫ ИНТЕРЬЕРА</p>

				<h1 className={styles.title}>
					<span className={styles.titleMain}>{'Современное\nискусство'}</span>
					<span className={styles.titleAccent}>маркетри</span>
				</h1>

				<p className={styles.lead}>
					{'Собранная вручную поэзия дерева,\nперламутра и камня.'}
				</p>

				<div className={styles.actions}>
					<Button
						variant='primary'
						withArrow
						className={styles.btnPrimary}
						onClick={() => scrollToSection(ESECTIONS.PORTFOLIO)}>
						Смотреть портфолио
					</Button>
					<Button
						withArrow
						className={styles.btnOutline}
						onClick={() => scrollToSection(ESECTIONS.CONTACT)}>
						Обсудить проект
					</Button>
				</div>

				<p className={styles.note}>
					{'Индивидуальные проекты для частных\nи коммерческих интерьеров.'}
				</p>
			</div>

			<div className={styles.visual}>
				<img
					className={styles.image}
					src={mpoemImages.interior}
					alt='Работа «Свои правила» в интерьере'
					width={640}
					height={696}
				/>
				<div className={styles.caption}>
					<span className={styles.captionTitle}>
						«СВОИ ПРАВИЛА» / В ИНТЕРЬЕРЕ
					</span>
					<span className={styles.captionCode}>II-02</span>
				</div>
			</div>
		</div>
	</section>
);
