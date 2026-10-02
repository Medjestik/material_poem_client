import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { CONTACT_INFO } from '../../../lib/mpoem/landing';
import { EPAGESROUTES } from '../../../utils/routes';

import styles from './site-footer.module.scss';

export const SiteFooter: FC = () => (
	<footer className={styles.footer}>
		<div className={styles.inner}>
			<div className={styles.row}>
				<Link className={styles.logo} to={EPAGESROUTES.LANDING}>
					<span className={styles.logoTitle}>М.ПОЭМ</span>
					<span className={styles.logoSubtitle}>MATERIAL POEM</span>
				</Link>

				<div className={styles.info}>
					<p className={styles.infoLine}>СОВРЕМЕННОЕ ИСКУССТВО МАРКЕТРИ</p>
					<p className={styles.infoSub}>Material Poem</p>
				</div>

				<a
					className={styles.social}
					href={CONTACT_INFO.instagramUrl}
					target='_blank'
					rel='noreferrer noopener'>
					{CONTACT_INFO.instagram}
				</a>
			</div>
		</div>
	</footer>
);
