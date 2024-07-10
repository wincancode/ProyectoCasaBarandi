import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	Paper,
	Box
} from '@mui/material';
import logo from '../../assets/LogoUcab.png';
import styles from './MenuInicio.module.css';
import { yellow } from '@mui/material/colors';

const MenuInicio: React.FC = () => {
	return (
		<div className={styles.Container}>
			<div className={styles.imagen}>
				<img src={logo} />
			</div>
			<div className={styles.botones}>
				<Box sx={{ width: '100%', height: '15vh', bgcolor: '#ffcf33' }}></Box>
				<Box sx={{ width: '100%', height: '15vh', bgcolor: '#00bcd4' }}></Box>
				<Box sx={{ width: '100%', height: '15vh', bgcolor: '#357a38' }}></Box>
			</div>
		</div>
	);
};

export default MenuInicio;
