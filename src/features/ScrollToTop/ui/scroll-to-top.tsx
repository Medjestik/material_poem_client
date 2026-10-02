import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (!hash) {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			return;
		}

		const sectionId = hash.replace('#', '');
		const scrollToSection = () => {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				return;
			}

			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};

		requestAnimationFrame(scrollToSection);
	}, [pathname, hash]);

	return null;
};
