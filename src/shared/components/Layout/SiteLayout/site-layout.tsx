import type { FC, ReactNode } from 'react';

import { SiteFooter } from '../SiteFooter/site-footer';
import { SiteHeader } from '../SiteHeader/site-header';

import styles from './site-layout.module.scss';

interface ISiteLayoutProps {
	children: ReactNode;
}

export const SiteLayout: FC<ISiteLayoutProps> = ({ children }) => (
	<div className={styles.layout} data-mpoem-site>
		<SiteHeader />
		<main className={styles.main}>{children}</main>
		<SiteFooter />
	</div>
);
