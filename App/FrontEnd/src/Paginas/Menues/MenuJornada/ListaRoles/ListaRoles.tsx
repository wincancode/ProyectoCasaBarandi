import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import {
	a11yProps,
	CustomTabPanel
} from '../../../../Componentes/CustomTabPanel/CustomTabPanel';
import styles from './ListaRoles.module.css';
import { ElementoListaRoles } from '../../../../Componentes/ElementoListaRoles/ElementoListaRoles';

const ListaRoles: React.FC = () => {
	const [tab, setTab] = useState(0);

	return (
		<>
			<Box minHeight={'48rem'}>
				<CustomTabPanel value={tab} index={0}>
					<Box width={'100%'} justifyContent="center">
						<Box
							position={'sticky'}
							top={'0'}
							zIndex={'20'}
							bgcolor={'white'}
							p="1rem"
						>
							<Typography
								textAlign={'center'}
								variant="h5"
								justifySelf={'center'}
							>
								Lista de roles asignados a la jornada
							</Typography>
						</Box>
						<div className={styles.list}>
							<ElementoListaRoles NombreRol="Rol 1" />
							<ElementoListaRoles NombreRol="Rol 2" />
							<ElementoListaRoles NombreRol="Rol 3" />
							<ElementoListaRoles NombreRol="Rol 4" />
							<ElementoListaRoles NombreRol="Rol 5" />
							<ElementoListaRoles NombreRol="Rol 5" />
							<ElementoListaRoles NombreRol="Rol 5" />
							<ElementoListaRoles NombreRol="Rol 5" />
							<ElementoListaRoles NombreRol="Rol 5" />
							<ElementoListaRoles NombreRol="Rol 5" />
							<ElementoListaRoles NombreRol="Rol 5" />
						</div>
					</Box>
				</CustomTabPanel>
			</Box>
			<div className={styles.barra}>
				<div className={styles.modules}>
					<Tabs value={tab} onChange={(_, value) => setTab(value)}>
						<Tab disabled {...a11yProps(0)} label="Encuestas realizadas" />
						<Tab disabled {...a11yProps(1)} label="Realizar encuesta" />
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default ListaRoles;
