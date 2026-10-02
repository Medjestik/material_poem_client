import type { FC } from 'react';
import { Link } from 'react-router-dom';

import type { IProduct } from '../../../lib/mpoem/types';
import {
	getCollectionById,
	getProductImageKey,
	getProductSlug,
	getStatusLabel,
} from '../../../lib/mpoem/catalogue';
import { getMpoemImage, getPortfolioImages } from '../../../lib/mpoem/images';
import { getWorkPath } from '../../../utils/routes';
import { FittedImage } from '../FittedImage/fitted-image';

import styles from './product-card.module.scss';

interface IProductCardProps {
	product: IProduct;
}

const ExternalLinkIcon: FC = () => (
	<svg
		width='18'
		height='18'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		aria-hidden='true'
		className={styles.externalIcon}>
		<path
			d='M6 18 18 6M6 6h12v12'
			stroke='currentColor'
			strokeWidth='1.3'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const getAvailabilityText = (product: IProduct): string => {
	const status = getStatusLabel(product.status);

	if (
		product.status === 'available' &&
		product.quantity != null &&
		product.quantity > 0
	) {
		return `${status} · ${product.quantity} шт.`;
	}

	return status;
};

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
	const portfolio = getPortfolioImages(product.displayTitle);
	const imageKey = getProductImageKey(product);
	const imageSrc =
		portfolio?.cover ?? portfolio?.slides[0] ?? getMpoemImage(imageKey);
	const collection = getCollectionById(product.collectionId);
	const slug = getProductSlug(product);
	const availability = getAvailabilityText(product);

	return (
		<Link className={styles.card} to={getWorkPath(slug)}>
			<div className={styles.imageWrap}>
				{imageSrc ? (
					<FittedImage
						className={styles.image}
						src={imageSrc}
						alt={product.displayTitle}
						loading='lazy'
					/>
				) : (
					<div className={styles.placeholder} />
				)}
			</div>

			<div className={styles.passport}>
				<div className={styles.topRow}>
					{product.number ? (
						<span className={styles.number}>№ {product.number}</span>
					) : (
						product.typeLabel && (
							<span className={styles.number}>{product.typeLabel}</span>
						)
					)}
					<span className={styles.category}>{product.category}</span>
				</div>

				<div className={styles.titleRow}>
					<h3 className={styles.title}>{product.displayTitle}</h3>
					<ExternalLinkIcon />
				</div>

				{collection && <p className={styles.collection}>{collection.title}</p>}

				<div className={styles.detailsRow}>
					<span className={styles.dimensions}>
						{product.dimensions ?? 'Размер уточняется'}
					</span>
					<span
						className={`${styles.availability} ${
							styles[`availability_${product.status}`]
						}`}>
						{availability}
					</span>
				</div>

				<div className={styles.divider} aria-hidden='true' />
			</div>
		</Link>
	);
};
