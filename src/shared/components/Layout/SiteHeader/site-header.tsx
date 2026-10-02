import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';

import { Button } from '../../Button/ui/button';
import { ESECTIONS } from '../../../utils/routes';

import styles from './site-header.module.scss';

const NAV_ITEMS = [
	{ label: 'О проекте', section: ESECTIONS.ABOUT },
	{ label: 'Портфолио', section: ESECTIONS.PORTFOLIO },
	{ label: 'Техника', section: ESECTIONS.TECHNIQUE },
	{ label: 'Как заказать', section: ESECTIONS.PROCESS },
];

const SCROLL_DURATION = 500;

const scrollToSection = (section: string) => {
	scroller.scrollTo(section, {
		smooth: true,
		duration: SCROLL_DURATION,
		offset: 0,
	});
};

export const SiteHeader: FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	const closeMenu = () => setMenuOpen(false);

	const scrollToContact = () => {
		scrollToSection(ESECTIONS.CONTACT);
		closeMenu();
	};

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<ScrollLink
					className={styles.logo}
					to={ESECTIONS.ABOUT}
					smooth
					duration={SCROLL_DURATION}
					offset={0}
					aria-label='К началу страницы'>
					<span className={styles.logoTitle}>М.ПОЭМ</span>
					<span className={styles.logoSubtitle}>MATERIAL POEM</span>
				</ScrollLink>

				<nav className={styles.nav} aria-label='Основная навигация'>
					{NAV_ITEMS.map((item) => (
						<ScrollLink
							key={item.section}
							className={styles.navLink}
							to={item.section}
							smooth
							duration={SCROLL_DURATION}
							offset={0}
							spy={false}>
							{item.label}
						</ScrollLink>
					))}
				</nav>

				<div className={styles.actions}>
					<Button withArrow onClick={scrollToContact}>
						Обсудить проект
					</Button>
				</div>

				<button
					type='button'
					className={`${styles.menuButton} ${
						menuOpen ? styles.menuButton_open : ''
					}`}
					onClick={() => setMenuOpen((prev) => !prev)}
					aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
					aria-expanded={menuOpen}>
					<span />
					<span />
				</button>
			</div>

			{menuOpen && (
				<div className={styles.mobileMenu}>
					<nav className={styles.mobileNav}>
						{NAV_ITEMS.map((item) => (
							<ScrollLink
								key={item.section}
								className={styles.mobileLink}
								to={item.section}
								smooth
								duration={SCROLL_DURATION}
								offset={0}
								onClick={closeMenu}>
								{item.label}
							</ScrollLink>
						))}
						<Button variant='primary' fullWidth onClick={scrollToContact}>
							Обсудить проект
						</Button>
					</nav>
				</div>
			)}
		</header>
	);
};
