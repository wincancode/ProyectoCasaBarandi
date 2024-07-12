import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import BotonSticky from 'Componentes/BotonSticky/BotonSticky';

interface props {
	Logo: React.ReactNode;
	variant?: 'extended';
	positionx: 'left' | 'right';
	positiony: 'top' | 'bottom';
	onClick?: () => void;

	success: boolean;
	isLoading: boolean;
	successLogo: React.ReactNode;
}

// .left {
// 	left: 1rem;
// }

// .right {
// 	right: 1rem;
// }

// .top {
// 	top: 5.8rem;
// }

// .bottom {
// 	bottom: 6rem;
// }

export const BotonStickyLoader: React.FC<props> = (props) => {
	const color = props.success ? green[500] : undefined;

	const topright = {
		top: '5.8rem',
		right: '1rem'
	};

	const bottomright = {
		bottom: '5.9rem',
		right: '0.8rem'
	};

	const topleft = {
		top: '5.8rem',
		left: '1rem'
	};

	const bottomleft = {
		bottom: '6rem',
		left: '1rem'
	};

	const positions =
		props.positionx === 'left'
			? props.positiony === 'top'
				? topleft
				: bottomleft
			: props.positiony === 'top'
			? topright
			: bottomright;

	return (
		<>
			{props.isLoading && (
				<CircularProgress
					size={60}
					sx={{
						color: green[500],
						position: 'fixed',
						...positions,
						zIndex: 99999
					}}
				/>
			)}
			<BotonSticky
				Logo={props.success ? props.successLogo : props.Logo}
				variant={props.variant}
				positionx={props.positionx}
				positiony={props.positiony}
				onClick={props.onClick}
				color={color}
			/>
		</>
	);
};
