import type { FC } from 'react';

import { SiteLayout } from '../../shared/components/Layout/SiteLayout/site-layout';
import { Hero } from './components/Hero/hero';
import { Manifest } from './components/Manifest/manifest';
import { PortfolioPreview } from './components/PortfolioPreview/portfolio-preview';
import { Technique } from './components/Technique/technique';
import { Process } from './components/Process/process';
import { Together } from './components/Together/together';
import { Contact } from './components/Contact/contact';

export const Landing: FC = () => (
	<SiteLayout>
		<Hero />
		<Manifest />
		<PortfolioPreview />
		<Technique />
		<Process />
		<Together />
		<Contact />
	</SiteLayout>
);
