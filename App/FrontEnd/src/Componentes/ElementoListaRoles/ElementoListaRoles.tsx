import { Card } from '@mui/material';

interface props {
	NombreRol: string;
	onclick?: () => void;
}

export const ElementoListaRoles: React.FC<props> = (props) => {
	return (
		<Card
			onClick={props.onclick}
			variant="outlined"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				padding: '1rem',
				width: '80vw'
			}}
		>
			{props.NombreRol}
		</Card>
	);
};
