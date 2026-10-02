import type { FC } from 'react';

interface IButtonArrowProps {
	stroke: string;
}

export const ButtonArrow: FC<IButtonArrowProps> = ({ stroke }) => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		aria-hidden='true'>
		<g
			stroke={stroke}
			strokeWidth='1.3'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M4 12h16M14 6l6 6-6 6' />
		</g>
	</svg>
);
