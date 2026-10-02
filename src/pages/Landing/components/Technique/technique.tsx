import type { FC } from 'react';

import { mpoemImages } from '../../../../shared/lib/mpoem/images';
import { ESECTIONS } from '../../../../shared/utils/routes';

import styles from './technique.module.scss';

export const Technique: FC = () => (
	<section className={styles.section} id={ESECTIONS.TECHNIQUE}>
		<div className={styles.inner}>
			<div className={styles.story}>
				<div className={styles.heading}>
					<p className={styles.eyebrow}>02 / ТЕХНИКА МАРКЕТРИ</p>
					<h2 className={styles.title}>
						Искусство
						<br />
						в каждой детали.
					</h2>
				</div>

				<div className={styles.about}>
					<p className={styles.lead}>
						Древняя техника инкрустации, переосмысленная в современном
						интерьере.
					</p>
					<p className={styles.text}>
						Точная лазерная резка сочетается с ручной сборкой элементов из
						натурального дерева, перламутра и камня. Фрагмент за фрагментом они
						соединяются в единую композицию, раскрывая природный рисунок и
						характер материала.
					</p>
					<p className={styles.text}>
						Цвет, фактура и направление волокон становятся частью изображения,
						придавая каждой работе индивидуальность.
					</p>

					<div className={styles.materialsBlock}>
						<p className={styles.label}>МАТЕРИАЛЫ</p>
						<p className={styles.materials}>
							Дерево&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;Перламутр
							&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;Камень
						</p>
						<p className={styles.text}>
							Более 50 видов ценных пород древесины: дуб, орех, клён, венге,
							кото, эвкалипт, ярра, падук и пр. Морской и речной перламутр,
							оникс, малахит, яшма, стразы сваровски и пр.
						</p>
						<p className={styles.text}>
							Защитные финишные покрытия сохраняют глубину цвета, естественную
							фактуру и красоту поверхности.
						</p>
					</div>

					<div className={styles.formatBlock}>
						<p className={styles.label}>ИСКУССТВО В ИНТЕРЬЕРЕ</p>
						<p className={styles.formatText}>
							Панно, зеркала, предметы мебели и интерьерные композиции,
							созданные как часть пространства.
						</p>
					</div>
				</div>
			</div>

			<div className={styles.visual}>
				<img
					className={styles.image}
					src={mpoemImages.detail}
					alt='Фрагмент панно «Свои правила»'
					width={624}
					height={750}
				/>
				<div className={styles.caption}>
					<span>ФРАГМЕНТ ПАННО «СВОИ ПРАВИЛА»</span>
					<span className={styles.captionIndex}>01</span>
				</div>
			</div>
		</div>
	</section>
);
