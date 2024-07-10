import { Button, Stack, Typography } from '@mui/material';

import styles from './BotonJornada.module.css';

interface props {
	titulo: string;
	fecha: string;
}

const BotonJornada: React.FC<props> = ({ titulo, fecha }) => {
	return (
		<div className={styles.container}>
			<div className={styles.stack}>
				<Stack>
					<Button variant="contained">
						<div className={styles.objeto}>
							<Typography variant="body1">{titulo}</Typography>
							<div className={styles.fecha}>
								<Typography variant="caption">{fecha}</Typography>
							</div>
						</div>
					</Button>
				</Stack>
			</div>
		</div>
	);
};

export default BotonJornada;
