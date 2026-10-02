export type ProductStatus = 'available' | 'commission' | 'unknown';
export type ProductCategory = 'ART' | 'DESIGN';

export interface ICollection {
	id: string;
	number: string | null;
	title: string;
	slogan: string;
	description: string;
	totalCount: number;
	publishedCount: number;
}

export interface IProduct {
	key: string;
	collectionId: string;
	number: string | null;
	title: string | null;
	displayTitle: string;
	category: ProductCategory;
	typeLabel: string;
	dimensions: string | null;
	materials: string | null;
	description: string | null;
	status: ProductStatus;
	quantity: number | null;
	images: string[];
	draft?: boolean;
	sharedDescription?: boolean;
}

export interface ICatalogue {
	collections: ICollection[];
	products: IProduct[];
	summary: {
		total: number;
		published: number;
	};
}

export interface ICatalogFilters {
	query: string;
	category: ProductCategory | 'all';
	status: ProductStatus | 'all';
	collectionId: string | 'all';
	page: number;
}
