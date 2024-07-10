import React from 'react';
import JornadasEstadisticas from './Jornadas/JornadasEstadisticas';
import { Box, Tab, Tabs } from '@mui/material';
import styles from './Estadisticas.module.css';
import {
	a11yProps,
	CustomTabPanel
} from '../../Componentes/CustomTabPanel/CustomTabPanel';

const Estadisticas: React.FC = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (_, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<Box minHeight={'48rem'}>
				<CustomTabPanel value={value} index={0}>
					Item One
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<JornadasEstadisticas />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
					Item Three
				</CustomTabPanel>
			</Box>
			<div className={styles.barra}>
				<div className={styles.modules}>
					<Tabs value={value} onChange={handleChange}>
						<Tab label="Item One" {...a11yProps(0)} />
						<Tab label="Item Two" {...a11yProps(1)} />
						<Tab label="Item Three" {...a11yProps(2)} />
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default Estadisticas;
