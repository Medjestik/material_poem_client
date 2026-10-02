import detail from '../../images/mpoem/detail.jpg';
import interior from '../../images/mpoem/interior.jpg';
import item41 from '../../images/mpoem/item-4-1.png';
import item51 from '../../images/mpoem/item-5-1.jpg';
import item71 from '../../images/mpoem/item-7-1.png';
import item81 from '../../images/mpoem/item-8-1.png';
import item91 from '../../images/mpoem/item-9-1.jpg';
import item101 from '../../images/mpoem/item-10-1.jpg';
import item121 from '../../images/mpoem/item-12-1.jpg';
import item131 from '../../images/mpoem/item-13-1.jpg';
import item141 from '../../images/mpoem/item-14-1.jpg';
import item161 from '../../images/mpoem/item-16-1.jpg';
import item162 from '../../images/mpoem/item-16-2.jpg';
import item181 from '../../images/mpoem/item-18-1.jpg';
import item191 from '../../images/mpoem/item-19-1.jpg';
import item201 from '../../images/mpoem/item-20-1.jpg';
import item221 from '../../images/mpoem/item-22-1.jpg';
import item231 from '../../images/mpoem/item-23-1.jpg';
import item241 from '../../images/mpoem/item-24-1.jpg';
import item251 from '../../images/mpoem/item-25-1.jpg';
import item291 from '../../images/mpoem/item-29-1.jpg';

const IMAGE_MAP: Record<string, string> = {
	detail,
	interior,
	'item-4-1': item41,
	'item-5-1': item51,
	'item-7-1': item71,
	'item-8-1': item81,
	'item-9-1': item91,
	'item-10-1': item101,
	'item-12-1': item121,
	'item-13-1': item131,
	'item-14-1': item141,
	'item-16-1': item161,
	'item-16-2': item162,
	'item-18-1': item181,
	'item-19-1': item191,
	'item-20-1': item201,
	'item-22-1': item221,
	'item-23-1': item231,
	'item-24-1': item241,
	'item-25-1': item251,
	'item-29-1': item291,
};

export const getMpoemImage = (key?: string): string | undefined =>
	key ? IMAGE_MAP[key] : undefined;

type TGalleryContext = {
	keys: () => string[];
	(id: string): string | { default?: string };
};

declare const require: {
	context: (path: string, deep: boolean, filter: RegExp) => TGalleryContext;
};

const galleryContext = require.context(
	'../../images/mpoem',
	true,
	/\/(studio|live)\/\d+\.(png|jpe?g|webp)$/i
);

const GALLERY_FILE =
	/^\.\/([^/]+)\/(studio|live)\/(\d+)\.(png|jpe?g|webp)$/i;

const resolveImageModule = (mod: string | { default?: string }): string =>
	typeof mod === 'string' ? mod : (mod.default ?? '');

const galleryByKey = new Map<
	string,
	{ studio: { order: number; src: string }[]; live: { order: number; src: string }[] }
>();

galleryContext.keys().forEach((filePath) => {
	const match = filePath.match(GALLERY_FILE);
	if (!match) return;

	const [, folder, kind, orderRaw] = match;
	const src = resolveImageModule(galleryContext(filePath));
	if (!src) return;

	const entry = galleryByKey.get(folder) ?? { studio: [], live: [] };
	const shot = { order: Number(orderRaw), src };

	if (kind === 'studio') {
		entry.studio.push(shot);
	} else {
		entry.live.push(shot);
	}

	galleryByKey.set(folder, entry);
});

const sortShots = (shots: { order: number; src: string }[]): string[] =>
	[...shots].sort((a, b) => a.order - b.order).map((shot) => shot.src);

const normalizeTitle = (value: string): string =>
	value
		.toLocaleLowerCase('ru')
		.replace(/ё/g, 'е')
		.replace(/[«»"!?.]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const FOLDER_TITLE: Record<string, string> = {
	'сумка art object': 'береги',
	'диптих диалог в молчании': 'диалог в молчании',
};

const portfolioContext = require.context(
	'../../images/mpoem/Портфолио',
	true,
	/\.(png|jpe?g|webp)$/i
);

type TPortfolioShot = {
	name: string;
	src: string;
};

const isSeriesFile = (name: string): boolean =>
	/^(изображение chatgpt|chatgpt image)/i.test(name) ||
	/^эт\s+\d+/i.test(name) ||
	/^\d+_/.test(name);

const sequenceNumber = (name: string): number | null => {
	const base = name.replace(/\.(png|jpe?g|webp)$/i, '');
	const leading = base.match(/^(\d+)_/);
	if (leading) return Number(leading[1]);
	const labeled = base.match(/^эт\s+(\d+)$/i);
	if (labeled) return Number(labeled[1]);
	const paren = base.match(/\((\d+)\)$/);
	if (paren) return Number(paren[1]);
	const dashed = base.match(/-(\d+)$/);
	if (dashed) return Number(dashed[1]);
	return null;
};

const byFilename = (left: TPortfolioShot, right: TPortfolioShot): number =>
	left.name.localeCompare(right.name, 'ru');

const sortCarousel = (shots: TPortfolioShot[]): TPortfolioShot[] =>
	[...shots].sort((left, right) => {
		const leftNumber = sequenceNumber(left.name);
		const rightNumber = sequenceNumber(right.name);

		if (leftNumber != null && rightNumber != null && leftNumber !== rightNumber) {
			return leftNumber - rightNumber;
		}

		if (leftNumber != null && rightNumber == null) return -1;
		if (leftNumber == null && rightNumber != null) return 1;

		return byFilename(left, right);
	});

const pickCover = (shots: TPortfolioShot[]): TPortfolioShot | undefined => {
	const descriptive = shots
		.filter((shot) => !isSeriesFile(shot.name))
		.sort(byFilename);

	if (descriptive.length) return descriptive[0];

	const unnumbered = shots.filter(
		(shot) => isSeriesFile(shot.name) && sequenceNumber(shot.name) == null
	);

	return (
		unnumbered.find((shot) => shot.name.includes('30 сент')) ??
		unnumbered[unnumbered.length - 1]
	);
};

const portfolioByTitle = new Map<
	string,
	{ cover?: string; slides: string[] }
>();

const shotsByFolder = new Map<string, TPortfolioShot[]>();

portfolioContext.keys().forEach((filePath) => {
	const match = filePath.match(/^\.\/([^/]+)\/([^/]+)$/);
	if (!match) return;

	const [, folder, filename] = match;
	const src = resolveImageModule(portfolioContext(filePath));
	if (!src) return;

	const shots = shotsByFolder.get(folder) ?? [];
	shots.push({ name: filename, src });
	shotsByFolder.set(folder, shots);
});

shotsByFolder.forEach((shots, folder) => {
	const title =
		FOLDER_TITLE[normalizeTitle(folder)] ?? normalizeTitle(folder);
	const cover = pickCover(shots);
	const slides = sortCarousel(shots.filter((shot) => shot !== cover)).map(
		(shot) => shot.src
	);

	portfolioByTitle.set(title, {
		cover: cover?.src,
		slides,
	});
});

export const getPortfolioImages = (
	displayTitle: string
): { cover?: string; slides: string[] } | undefined =>
	portfolioByTitle.get(normalizeTitle(displayTitle));

export const getProductGalleryImages = (imageKeys: string[]): string[] => {
	for (const key of imageKeys) {
		const gallery = galleryByKey.get(key);
		if (!gallery) continue;

		const slides = [...sortShots(gallery.studio), ...sortShots(gallery.live)];
		if (slides.length) return slides;
	}

	return imageKeys
		.map((key) => getMpoemImage(key))
		.filter((src): src is string => Boolean(src));
};

export const mpoemImages = {
	detail,
	interior,
};
