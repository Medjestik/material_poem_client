import type { FC } from 'react';
import { scroller } from 'react-scroll';

import { Button } from '../../../../shared/components/Button/ui/button';
import { PROCESS_STEPS } from '../../../../shared/lib/mpoem/landing';
import { ESECTIONS } from '../../../../shared/utils/routes';

import styles from './process.module.scss';

const SCROLL_DURATION = 500;

const scrollToContact = () => {
	scroller.scrollTo(ESECTIONS.CONTACT, {
		smooth: true,
		duration: SCROLL_DURATION,
		offset: 0,
	});
};

export const Process: FC = () => (
	<section className={styles.section} id={ESECTIONS.PROCESS}>
		<div className={styles.inner}>
			<div className={styles.intro}>
				<div className={styles.heading}>
					<p className={styles.eyebrow}>03 / ИНДИВИДУАЛЬНЫЙ ПРОЕКТ</p>
					<h2 className={styles.title}>
						{'От вашего замысла\nдо последней детали.'}
					</h2>
					<p className={styles.lead}>
						Каждая работа создается с учетом существующего пространства,
						поставленных задач и ваших предпочтений.
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

			<div className={styles.steps}>
				{PROCESS_STEPS.map((step) => (
					<article key={step.number} className={styles.step}>
						<span className={styles.number}>{step.number}</span>
						<div className={styles.stepBody}>
							<h3 className={styles.stepTitle}>{step.title}</h3>
							<p className={styles.stepText}>{step.description}</p>
						</div>
					</article>
				))}
			</div>
		</div>
	</section>
);
