import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import { Landing } from '../pages/Landing';
import { Product } from '../pages/Product/ui/product';
import { NotFound } from '../pages/NotFound/ui/not-found';

import {
	EPAGESROUTES,
	getWorkPath,
	landingPortfolioTo,
} from '../shared/utils/routes';
import { ToastProvider } from '../shared/components/ToastProvider/ui/ToastProvider';
import { ScrollToTop } from '../features/ScrollToTop/ui/scroll-to-top';

import styles from './app.module.scss';

const LegacyPortfolioProductRedirect = () => {
	const { slug = '' } = useParams();
	return <Navigate to={getWorkPath(slug)} replace />;
};

export const App = () => (
	<ToastProvider>
		<ScrollToTop />
		<div className={styles.page}>
			<Routes>
				<Route path={EPAGESROUTES.LANDING} element={<Landing />} />
				<Route path={`${EPAGESROUTES.WORK}/:slug`} element={<Product />} />
				<Route
					path='/portfolio'
					element={<Navigate to={landingPortfolioTo()} replace />}
				/>
				<Route
					path={'/portfolio/:slug'}
					element={<LegacyPortfolioProductRedirect />}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
			<div id='toast-root'></div>
		</div>
	</ToastProvider>
);
