import { Box, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';

interface props {
	titulo: string;
}

export const Header: React.FC<props> = (props) => {
	return (
		<Box
			position={'sticky'}
			top={'0'}
			bgcolor="primary.dark"
			justifyContent={'center'}
			height={'5rem'}
			width={'100%'}
			zIndex={999}
			alignContent={'center'}
		>
			<Typography
				variant="h5"
				color={'white'}
				textAlign={'center'}
				justifySelf={'center'}
			>
				{props.titulo}
			</Typography>
		</Box>
	);
};
