import type { FC } from 'react';
import { useEffect, useRef } from 'react';

const enlargeShortImage = (image: HTMLImageElement) => {
	const frame = image.parentElement;

	if (!frame) return;

	const frameStyle = getComputedStyle(frame);
	const innerWidth =
		frame.clientWidth -
		parseFloat(frameStyle.paddingLeft) -
		parseFloat(frameStyle.paddingRight);
	const innerHeight =
		frame.clientHeight -
		parseFloat(frameStyle.paddingTop) -
		parseFloat(frameStyle.paddingBottom);
	const fittedHeight = image.clientHeight;

	if (fittedHeight < 8 || innerWidth < 8 || innerHeight < 8) return;

	const targetHeight = Math.min(innerWidth, innerHeight);
	const boost =
		fittedHeight < targetHeight * 0.92 ? targetHeight / fittedHeight : 1;
	const scale = boost.toFixed(3);

	image.style.setProperty('--image-scale', scale);

	const gallery = image.closest('.swiper');

	gallery?.querySelectorAll('img').forEach((node) => {
		if (!(node instanceof HTMLImageElement) || node.src !== image.src) return;

		node.style.setProperty('--image-scale', scale);
	});
};

interface IFittedImageProps {
	src: string;
	alt: string;
	className: string;
	draggable?: boolean;
	loading?: 'eager' | 'lazy';
}

export const FittedImage: FC<IFittedImageProps> = ({
	src,
	alt,
	className,
	draggable,
	loading,
}) => {
	const ref = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const image = ref.current;
		const frame = image?.parentElement;

		if (!image || !frame) return undefined;

		const update = () => enlargeShortImage(image);

		update();
		image.addEventListener('load', update);

		const observer = new ResizeObserver(update);
		observer.observe(frame);

		const gallery = image.closest('.swiper');
		const mutations = new MutationObserver(update);

		if (gallery) {
			mutations.observe(gallery, { childList: true, subtree: true });
		}

		return () => {
			image.removeEventListener('load', update);
			observer.disconnect();
			mutations.disconnect();
		};
	}, [src]);

	return (
		<img
			ref={ref}
			className={className}
			src={src}
			alt={alt}
			draggable={draggable}
			loading={loading}
		/>
	);
};
