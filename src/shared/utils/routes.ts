import type { To } from 'react-router-dom';

export enum EPAGESROUTES {
	LANDING = '/',
	WORK = '/work',
}

export enum ESECTIONS {
	ABOUT = 'about',
	PORTFOLIO = 'portfolio',
	TECHNIQUE = 'technique',
	PROCESS = 'process',
	CONTACT = 'contact',
}

export const landingSectionHref = (section: ESECTIONS): string =>
	`${EPAGESROUTES.LANDING}#${section}`;

export const landingContactTo = (): To => ({
	pathname: EPAGESROUTES.LANDING,
	hash: `#${ESECTIONS.CONTACT}`,
});

export const landingPortfolioTo = (collectionId?: string): To => ({
	pathname: EPAGESROUTES.LANDING,
	hash: `#${ESECTIONS.PORTFOLIO}`,
	...(collectionId ? { search: `?collection=${encodeURIComponent(collectionId)}` } : {}),
});

export const getWorkPath = (slug: string): string =>
	`${EPAGESROUTES.WORK}/${slug}`;
