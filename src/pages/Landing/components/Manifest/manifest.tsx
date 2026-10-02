import type { FC } from 'react';

import styles from './manifest.module.scss';

export const Manifest: FC = () => (
	<section className={styles.manifest}>
		<div className={styles.inner}>
			<h2 className={styles.label}>ПРИРОДА — СОАВТОР</h2>
			<p className={styles.text}>Искусство начинается с материала</p>
			<span className={styles.icon} aria-hidden='true'>
				<svg
					width='28'
					height='28'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g
						stroke='#6F6257'
						strokeWidth='1.3'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<path d='M12 4v16m-6-6 6 6 6-6' />
					</g>
				</svg>
			</span>
		</div>
	</section>
);
