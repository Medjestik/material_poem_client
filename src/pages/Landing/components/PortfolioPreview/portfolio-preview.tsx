import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { scroller } from 'react-scroll';

import { ProductCard } from '../../../../shared/components/Mpoem/ProductCard/product-card';
import { Select } from '../../../../shared/components/Select/ui/select';
import {
	catalogue,
	filterProducts,
	getPageCount,
	LANDING_PORTFOLIO_PAGE_SIZE,
	paginateProducts,
	sortProducts,
	type TProductSortField,
} from '../../../../shared/lib/mpoem/catalogue';
import type { ProductCategory, ProductStatus } from '../../../../shared/lib/mpoem/types';
import { ESECTIONS } from '../../../../shared/utils/routes';

import styles from './portfolio-preview.module.scss';

const SCROLL_DURATION = 500;

const workWord = (count: number) => {
	const mod10 = count % 10;
	const mod100 = count % 100;

	if (mod10 === 1 && mod100 !== 11) return 'работа';
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'работы';

	return 'работ';
};

const scrollToContact = () => {
	scroller.scrollTo(ESECTIONS.CONTACT, {
		smooth: true,
		duration: SCROLL_DURATION,
		offset: 0,
	});
};

type TCollectionFilter = 'all' | string;
type TOption = { id: string; name: string };

const CATEGORY_OPTIONS: TOption[] = [
	{ id: 'all', name: 'Все категории' },
	{ id: 'ART', name: 'ART · панно' },
	{ id: 'DESIGN', name: 'DESIGN · предметы' },
];

const STATUS_OPTIONS: TOption[] = [
	{ id: 'all', name: 'Любое наличие' },
	{ id: 'available', name: 'В наличии' },
	{ id: 'commission', name: 'Под заказ' },
];

export const PortfolioPreview: FC = () => {
	const [searchParams] = useSearchParams();
	const [activeCollection, setActiveCollection] =
		useState<TCollectionFilter>('all');
	const [query, setQuery] = useState('');
	const [category, setCategory] = useState<TOption>(CATEGORY_OPTIONS[0]);
	const [status, setStatus] = useState<TOption>(STATUS_OPTIONS[0]);
	const [sortBy, setSortBy] = useState<TProductSortField>('number');
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const collectionId = searchParams.get('collection');

		if (!collectionId) return;

		const isValid = catalogue.collections.some(
			(collection) => collection.id === collectionId
		);

		if (isValid) {
			setActiveCollection(collectionId);
		}
	}, [searchParams]);

	const collectionNav = useMemo(
		() => [
			{
				id: 'all' as const,
				marker: '—',
				title: 'Все работы',
				count: catalogue.summary.published,
			},
			...catalogue.collections.map((collection) => ({
				id: collection.id,
				marker: collection.number ?? '—',
				title: collection.title,
				count: collection.publishedCount,
			})),
		],
		[]
	);

	const selectedCollection =
		activeCollection === 'all'
			? null
			: catalogue.collections.find(
					(collection) => collection.id === activeCollection
				) ?? null;

	const collectionOptions = useMemo<TOption[]>(
		() =>
			collectionNav.map((item) => ({
				id: item.id,
				name: item.id === 'all' ? 'Все коллекции' : item.title,
			})),
		[collectionNav]
	);

	const activeCollectionOption =
		collectionOptions.find((item) => item.id === activeCollection) ??
		collectionOptions[0];

	const filteredProducts = useMemo(() => {
		const filtered = filterProducts(catalogue.products, {
			query,
			category: category.id as ProductCategory | 'all',
			status: status.id as ProductStatus | 'all',
			collectionId: activeCollection,
			page: 1,
		});

		return sortProducts(filtered, sortBy);
	}, [activeCollection, category.id, query, sortBy, status.id]);

	const pageCount = getPageCount(
		filteredProducts.length,
		LANDING_PORTFOLIO_PAGE_SIZE
	);
	const safePage = Math.min(Math.max(currentPage, 1), pageCount);

	const pageProducts = useMemo(
		() =>
			paginateProducts(filteredProducts, safePage, LANDING_PORTFOLIO_PAGE_SIZE),
		[filteredProducts, safePage]
	);

	const rangeStart =
		filteredProducts.length === 0
			? 0
			: (safePage - 1) * LANDING_PORTFOLIO_PAGE_SIZE + 1;
	const rangeEnd = Math.min(
		safePage * LANDING_PORTFOLIO_PAGE_SIZE,
		filteredProducts.length
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [activeCollection, category.id, query, sortBy, status.id]);

	useEffect(() => {
		if (currentPage > pageCount) {
			setCurrentPage(pageCount);
		}
	}, [currentPage, pageCount]);

	const toggleSort = () => {
		setSortBy((prev) => (prev === 'number' ? 'title' : 'number'));
	};

	return (
		<section className={styles.section} id={ESECTIONS.PORTFOLIO}>
			<div className={styles.inner}>
				<div className={styles.header}>
					<div className={styles.headerMain}>
						<p className={styles.eyebrow}>01 / ПОРТФОЛИО</p>
						<h2 className={styles.title}>{'У каждой работы\nсвоя история.'}</h2>
					</div>
					<div className={styles.headerAside}>
						<p className={styles.lead}>
							{
								'Семь коллекций и отдельные истории.\nНайдите работу, которая откликается вам.'
							}
						</p>
						<p className={styles.stat}>
							{catalogue.summary.published} РАБОТ&nbsp;&nbsp;/&nbsp;&nbsp;ART
							&amp; DESIGN
						</p>
					</div>
				</div>

				<div className={styles.body}>
					<aside className={styles.sidebar}>
						<p className={styles.sidebarLabel}>КОЛЛЕКЦИИ</p>
						<nav className={styles.collectionList} aria-label='Коллекции'>
							{collectionNav.map((item) => {
								const isActive = activeCollection === item.id;

								return (
									<button
										key={item.id}
										type='button'
										className={`${styles.collectionItem} ${
											isActive ? styles.collectionItem_active : ''
										}`}
										aria-current={isActive ? 'true' : undefined}
										onClick={() => setActiveCollection(item.id)}>
										<span className={styles.collectionMarker}>
											{item.marker}
										</span>
										<span className={styles.collectionTitle}>{item.title}</span>
										<span className={styles.collectionCount}>{item.count}</span>
									</button>
								);
							})}
						</nav>
						<div className={styles.customProject}>
							<p className={styles.customHeading}>
								{'Ваша идея - наша реализация'}
							</p>
							<p className={styles.customText}>
								Создадим работу под размеры и характер вашего пространства.
							</p>
							<button
								type='button'
								className={styles.customLink}
								onClick={scrollToContact}>
								Обсудить проект →
							</button>
						</div>
					</aside>

					<div className={styles.catalog}>
						<div className={styles.filters}>
							<label className={styles.search}>
								<span className={styles.visuallyHidden}>Поиск</span>
								<input
									className={styles.searchInput}
									type='search'
									value={query}
									placeholder='Название, номер или материал'
									onChange={(event) => setQuery(event.target.value)}
								/>
							</label>

							<div className={styles.filterSelects}>
								<div className={styles.collectionSelect}>
									<Select<TOption>
										options={collectionOptions}
										currentOption={activeCollectionOption}
										onChooseOption={(option) => {
											if (option) setActiveCollection(option.id);
										}}
										valueKey='id'
										labelKey='name'
										withClear={false}
										variant='mpoem'
										excludeSelectedFromList={false}
									/>
								</div>
								<Select<TOption>
									options={CATEGORY_OPTIONS}
									currentOption={category}
									onChooseOption={(option) => {
										if (option) setCategory(option);
									}}
									valueKey='id'
									labelKey='name'
									withClear={false}
									variant='mpoem'
									excludeSelectedFromList={false}
								/>
								<Select<TOption>
									options={STATUS_OPTIONS}
									currentOption={status}
									onChooseOption={(option) => {
										if (option) setStatus(option);
									}}
									valueKey='id'
									labelKey='name'
									withClear={false}
									variant='mpoem'
									excludeSelectedFromList={false}
								/>
							</div>
						</div>

						{selectedCollection && (
							<div className={styles.collectionIntro}>
								<p className={styles.collectionIntroLabel}>
									{selectedCollection.number
										? `КОЛЛЕКЦИЯ ${selectedCollection.number}`
										: 'ВНЕ КОЛЛЕКЦИЙ'}
								</p>
								<h3 className={styles.collectionIntroTitle}>
									{selectedCollection.title}
								</h3>
								{selectedCollection.slogan && (
									<p className={styles.collectionIntroSlogan}>
										{selectedCollection.slogan}
									</p>
								)}
								{selectedCollection.description &&
									selectedCollection.description !==
										selectedCollection.slogan && (
										<p className={styles.collectionIntroText}>
											{selectedCollection.description}
										</p>
									)}
							</div>
						)}

						<div className={styles.resultsBar}>
							<p className={styles.resultsTitle}>
								{selectedCollection
									? `${filteredProducts.length} ${workWord(filteredProducts.length)}`
									: `Все работы · ${filteredProducts.length}`}
							</p>
							<button
								type='button'
								className={styles.sortButton}
								onClick={toggleSort}>
								{sortBy === 'number' ? 'По номеру ↓' : 'По названию ↓'}
							</button>
						</div>

						<div className={styles.grid}>
							{pageProducts.length > 0 ? (
								pageProducts.map((product) => (
									<ProductCard key={product.key} product={product} />
								))
							) : (
								<p className={styles.empty}>
									По этим условиям работ не нашлось.
								</p>
							)}
						</div>

						{filteredProducts.length > 0 && (
							<div className={styles.pagination}>
								<p className={styles.paginationSummary}>
									{rangeStart}–{rangeEnd} из {filteredProducts.length} работ
								</p>
								{pageCount > 1 && (
									<div className={styles.paginationPages}>
										{Array.from({ length: pageCount }, (_, index) => {
											const page = index + 1;

											return (
												<button
													key={page}
													type='button'
													className={`${styles.pageButton} ${
														page === safePage ? styles.pageButton_active : ''
													}`}
													aria-current={page === safePage ? 'page' : undefined}
													onClick={() => setCurrentPage(page)}>
													{page}
												</button>
											);
										})}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
