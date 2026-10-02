import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { SiteLayout } from '../../../shared/components/Layout/SiteLayout/site-layout';
import { EPAGESROUTES } from '../../../shared/utils/routes';

import styles from '../styles/not-found.module.scss';

export const NotFound: FC = () => (
	<SiteLayout>
		<main className={styles.container}>
			<div className={styles.content}>
				<span className={styles.code}>404</span>

				<div className={styles.info}>
					<h1 className={styles.title}>Страница не&nbsp;найдена</h1>

					<p className={styles.description}>
						Похоже, такой страницы не&nbsp;существует или&nbsp;она была
						перемещена.
					</p>

					<Link className={styles.link} to={EPAGESROUTES.LANDING}>
						<span>На главную</span>
						<span className={styles.icon}>↗</span>
					</Link>
				</div>
			</div>
		</main>
	</SiteLayout>
);
