import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Button } from '../../../shared/components/Button/ui/button';
import { FittedImage } from '../../../shared/components/Mpoem/FittedImage/fitted-image';
import {
	getCollectionById,
	getProductBySlug,
	getProductAvailabilityDetail,
	getProductCategoryLabel,
	getProductTechniqueLine,
} from '../../../shared/lib/mpoem/catalogue';
import {
	getPortfolioImages,
	getProductGalleryImages,
} from '../../../shared/lib/mpoem/images';
import {
	EPAGESROUTES,
	landingContactTo,
	landingPortfolioTo,
} from '../../../shared/utils/routes';

import styles from '../styles/product.module.scss';

const BackIcon: FC = () => (
	<svg
		width='18'
		height='18'
		viewBox='0 0 24 24'
		fill='none'
		aria-hidden='true'>
		<path
			d='M15 6l-6 6 6 6'
			stroke='currentColor'
			strokeWidth='1.3'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const Product: FC = () => {
	const { slug = '' } = useParams();
	const product = getProductBySlug(slug);
	const [slideIndex, setSlideIndex] = useState(0);

	useEffect(() => {
		setSlideIndex(0);
	}, [slug]);

	if (!product) {
		return <Navigate to={EPAGESROUTES.LANDING} replace />;
	}

	const collection = getCollectionById(product.collectionId);
	const portfolioTo = landingPortfolioTo();
	const portfolioCollectionTo = collection
		? landingPortfolioTo(collection.id)
		: portfolioTo;
	const contactTo = landingContactTo();

	const portfolio = getPortfolioImages(product.displayTitle);
	const images = portfolio
		? portfolio.slides.length
			? portfolio.slides
			: portfolio.cover
				? [portfolio.cover]
				: []
		: getProductGalleryImages(product.images);
	const hasCarousel = images.length > 1;
	const availability = getProductAvailabilityDetail(product);
	const breadcrumbTail = product.number || product.displayTitle;

	return (
		<div className={styles.shell}>
			<article className={styles.page}>
				<header className={styles.toolbar}>
					<Link className={styles.backLink} to={portfolioTo}>
						<BackIcon />К портфолио
					</Link>

					<Link className={styles.logo} to={EPAGESROUTES.LANDING}>
						<span className={styles.logoTitle}>М.ПОЭМ</span>
						<span className={styles.logoSubtitle}>MATERIAL POEM</span>
					</Link>

					<Button to={contactTo} withArrow>
						Обсудить проект
					</Button>
				</header>

				<p className={styles.breadcrumbs}>
					<Link to={portfolioTo}>Портфолио</Link>
					{collection ? (
						<>
							{' / '}
							<Link to={portfolioCollectionTo}>{collection.title}</Link>
						</>
					) : null}
					{' / '}
					<span>{breadcrumbTail}</span>
				</p>

				<div className={styles.hero}>
					<div className={styles.media}>
						<div className={styles.imageStage}>
							<div className={styles.frame}>
								{images.length === 0 ? (
									<div className={styles.placeholder} />
								) : hasCarousel ? (
									<Swiper
										key={slug}
										className={styles.gallery}
										modules={[Navigation, A11y]}
										navigation
										loop
										speed={450}
										spaceBetween={0}
										slidesPerView={1}
										grabCursor
										onSlideChange={(swiper) =>
											setSlideIndex(swiper.realIndex)
										}>
										{images.map((src, index) => (
											<SwiperSlide key={`${src}-${index}`}>
												<FittedImage
													className={styles.image}
													src={src}
													alt={`${product.displayTitle}, фото ${index + 1}`}
													draggable={false}
												/>
											</SwiperSlide>
										))}
									</Swiper>
								) : (
									<FittedImage
										className={styles.image}
										src={images[0]}
										alt={product.displayTitle}
									/>
								)}
							</div>
						</div>
						<div className={styles.mediaFooter}>
							<span>
								{product.number ? `№ ${product.number}` : product.typeLabel}
							</span>
							<span>
								{hasCarousel
									? `${slideIndex + 1} / ${images.length}`
									: '01'}
							</span>
						</div>
					</div>

					<div className={styles.passport}>
						{collection && (
							<Link
								className={styles.collectionLabel}
								to={portfolioCollectionTo}>
								{collection.number
									? `КОЛЛЕКЦИЯ ${collection.number} / ${collection.title}`
									: collection.title.toUpperCase()}
							</Link>
						)}

						<h1 className={styles.title}>{product.displayTitle}</h1>

						<p
							className={`${styles.status} ${
								styles[`status_${product.status}`]
							}`}>
							{availability}
						</p>

						<p className={styles.technique}>
							{getProductTechniqueLine(product)}
						</p>

						<div className={styles.specs}>
							<div className={styles.specPair}>
								<div className={styles.specRow}>
									<span className={styles.specLabel}>Номер изделия</span>
									<span className={styles.specValue}>
										{product.number ?? 'Не указан'}
									</span>
								</div>
								<div className={styles.specRow}>
									<span className={styles.specLabel}>Категория</span>
									<span className={styles.specValue}>
										{getProductCategoryLabel(product)}
									</span>
								</div>
							</div>

							<div className={styles.specRow}>
								<span className={styles.specLabel}>Размер</span>
								<span className={styles.specValue}>
									{product.dimensions ?? 'Уточняется'}
								</span>
							</div>

							<div className={styles.specRow}>
								<span className={styles.specLabel}>Материалы</span>
								<span className={styles.specValue}>
									{product.materials ?? 'Уточняются'}
								</span>
							</div>

							<div className={styles.specRow}>
								<span className={styles.specLabel}>Описание</span>
								<span className={styles.specValue}>
									{product.description ?? 'Описание будет добавлено.'}
								</span>
							</div>
						</div>

						<Button variant='primary' fullWidth withArrow to={contactTo}>
							{product.status === 'available'
								? 'Забронировать работу'
								: 'Обсудить изготовление'}
						</Button>

						<p className={styles.shippingNote}>
							{
								'Доставка после оплаты —\nтак мы сразу видим, какую работу вам привезти.'
							}
						</p>
					</div>
				</div>

				{collection && (
					<section className={styles.collection}>
						<div className={styles.collectionCopy}>
							<span className={styles.collectionEyebrow}>О коллекции</span>
							<h2 className={styles.collectionTitle}>{collection.title}</h2>
							<p className={styles.collectionText}>
								{collection.description || collection.slogan}
							</p>
						</div>
						<Button to={portfolioCollectionTo} withArrow>
							Все работы коллекции
						</Button>
					</section>
				)}
			</article>
		</div>
	);
};
