import { Fab } from '@mui/material';

import styles from './BotonSticky.module.css';
import React from 'react';
import classNames from 'classnames';

interface props {
	Logo: React.ReactNode;
	variant?: 'extended';
	positionx: 'left' | 'right';
	positiony: 'top' | 'bottom';
	onClick?: () => void;
	color?: string;
}

const BotonSticky: React.FC<props> = (props) => {
	const classes = classNames({
		[styles.botonSticky]: true,
		[styles.left]: props.positionx === 'left',
		[styles.right]: props.positionx === 'right',
		[styles.top]: props.positiony === 'top',
		[styles.bottom]: props.positiony === 'bottom'
	});

	const sx = props.color ? { bgcolor: props.color } : {};

	return (
		<div className={classes}>
			<Fab
				sx={sx}
				variant={props.variant}
				onClick={props.onClick}
				color={'secondary'}
			>
				{props.Logo}
			</Fab>
		</div>
	);
};

export default BotonSticky;
