import catalogueData from '../../data/catalogue.json';

import type {
	ICatalogFilters,
	ICatalogue,
	ICollection,
	IProduct,
} from './types';

export const catalogue = catalogueData as ICatalogue;

export const PRODUCTS_PER_PAGE = 9;

/** На лендинге в блоке портфолио — 6 карточек на страницу (как в макете v2). */
export const LANDING_PORTFOLIO_PAGE_SIZE = 6;

export type TProductSortField = 'number' | 'title';

export const getCollectionById = (id: string): ICollection | undefined =>
	catalogue.collections.find((c) => c.id === id);

export const getProductSlug = (product: IProduct): string => {
	if (product.number) {
		return product.number.toLowerCase();
	}

	return product.displayTitle
		.toLowerCase()
		.replace(/[^a-zа-яё0-9]+/gi, '-')
		.replace(/^-|-$/g, '');
};

export const getProductBySlug = (slug: string): IProduct | undefined =>
	catalogue.products.find((p) => getProductSlug(p) === slug.toLowerCase());

export const getProductImageKey = (product: IProduct): string | undefined =>
	product.images[0];

export const getStatusLabel = (status: IProduct['status']): string => {
	if (status === 'available') return 'В наличии';
	if (status === 'commission') return 'Под заказ';
	return 'Уточняйте';
};

export const getProductAvailabilityDetail = (product: IProduct): string => {
	if (product.status === 'available') {
		if (product.quantity === 1) return 'В наличии · 1 экземпляр';
		if (product.quantity != null && product.quantity > 0) {
			return `В наличии · ${product.quantity} шт.`;
		}
		return 'В наличии';
	}

	if (product.status === 'commission') return 'Под заказ';
	return 'Уточняйте наличие';
};

export const getProductCategoryLabel = (product: IProduct): string =>
	`${product.category} · ${product.typeLabel}`;

export const getProductTechniqueLine = (product: IProduct): string =>
	product.typeLabel === 'Панно'
		? 'Панно в технике маркетри'
		: `${product.typeLabel} в технике маркетри`;

export const filterProducts = (
	products: IProduct[],
	filters: ICatalogFilters
): IProduct[] => {
	const query = filters.query.trim().toLowerCase();

	return products.filter((product) => {
		if (filters.category !== 'all' && product.category !== filters.category) {
			return false;
		}

		if (filters.status !== 'all' && product.status !== filters.status) {
			return false;
		}

		if (
			filters.collectionId !== 'all' &&
			product.collectionId !== filters.collectionId
		) {
			return false;
		}

		if (!query) return true;

		const haystack = [
			product.displayTitle,
			product.title,
			product.number,
			product.typeLabel,
			product.materials,
			product.description,
			getCollectionById(product.collectionId)?.title,
		]
			.filter(Boolean)
			.join(' ')
			.toLowerCase();

		return haystack.includes(query);
	});
};

const compareProducts = (
	a: IProduct,
	b: IProduct,
	sortBy: TProductSortField
): number => {
	if (sortBy === 'number') {
		const left = a.number ?? '';
		const right = b.number ?? '';

		return left.localeCompare(right, 'ru', {
			numeric: true,
			sensitivity: 'base',
		});
	}

	return a.displayTitle.localeCompare(b.displayTitle, 'ru', {
		sensitivity: 'base',
	});
};

/** Работы без номера всегда в конце списка. */
export const sortProducts = (
	products: IProduct[],
	sortBy: TProductSortField
): IProduct[] => {
	const withNumber = products.filter((product) => product.number);
	const withoutNumber = products.filter((product) => !product.number);

	withNumber.sort((a, b) => compareProducts(a, b, sortBy));
	withoutNumber.sort((a, b) => compareProducts(a, b, sortBy));

	return [...withNumber, ...withoutNumber];
};

export const paginateProducts = (
	products: IProduct[],
	page: number,
	perPage = PRODUCTS_PER_PAGE
): IProduct[] => {
	const start = (page - 1) * perPage;
	return products.slice(start, start + perPage);
};

export const getPageCount = (
	total: number,
	perPage = PRODUCTS_PER_PAGE
): number => Math.max(1, Math.ceil(total / perPage));
