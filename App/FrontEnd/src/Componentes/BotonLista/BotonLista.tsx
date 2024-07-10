import { Button, Typography } from '@mui/material';

import styles from './BotonJornada.module.css';

interface props {
	titulo: string;
	subtitulo: string;
	onClick?: () => void;
}

const BotonLista: React.FC<props> = ({ titulo, subtitulo, onClick }) => {
	return (
		<div className={styles.container}>
			<div className={styles.stack}>
				<Button onClick={onClick} color="primary" variant="contained" fullWidth>
					<div className={styles.objeto}>
						<Typography variant="body1">{titulo}</Typography>
						<div className={styles.subtitulo}>
							<Typography variant="caption">{subtitulo}</Typography>
						</div>
					</div>
				</Button>
			</div>
		</div>
	);
};

export default BotonLista;
