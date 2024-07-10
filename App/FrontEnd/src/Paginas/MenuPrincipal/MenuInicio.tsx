import { Box, Typography } from '@mui/material';
import logo from '../../assets/LogoUcab.png';
import styles from './MenuInicio.module.css';
import { Link } from 'react-router-dom';

const MenuInicio: React.FC = () => {
	return (
		<div className={styles.Container}>
			<div className={styles.imagen}>
				<img src={logo} />
			</div>
			<div className={styles.botones}>
				<div onClick={() => (window.location.href = '/jornadas-futuras')}>
					<Box
						justifyContent={'center'}
						alignContent={'center'}
						textAlign={'center'}
						sx={{
							width: '100vw',
							height: '15vh',
							bgcolor: '#ffcf33'
						}}
					>
						<Typography variant={'h4'}>Jornadas futuras</Typography>
					</Box>
				</div>
				<div onClick={() => (window.location.href = '/jornadas-anteriores')}>
					<Box
						justifyContent={'center'}
						alignContent={'center'}
						textAlign={'center'}
						sx={{ width: '100vw', height: '15vh', bgcolor: '#00bcd4' }}
					>
						<Typography variant={'h4'}>Jornadas realizadas</Typography>
					</Box>
				</div>
				<div onClick={() => (window.location.href = '/listaRoles')}>
					<Box
						justifyContent={'center'}
						alignContent={'center'}
						textAlign={'center'}
						sx={{ width: '100vw', height: '15vh', bgcolor: '#357a38' }}
					>
						<Typography variant={'h4'}>Trabajar en jornada</Typography>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default MenuInicio;
