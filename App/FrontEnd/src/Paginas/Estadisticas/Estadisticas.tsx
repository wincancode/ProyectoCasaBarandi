import React from 'react';
import JornadasEstadisticas from './Jornadas/JornadasEstadisticas';
import { Header } from 'Componentes/Header/Header';
import { BarandiBottomNavigation } from 'Componentes/BottomNavigation/BarandiBottomNavigation';

const Estadisticas: React.FC = () => {
	const [tab, setTab] = React.useState('Ultima jornada');
	return (
		<>
			<Header titulo="Jornadas anteriores" />
			<JornadasEstadisticas />

			<BarandiBottomNavigation
				tabs={['Ultima jornada', 'estadisticas generales', 'lista de jornadas']}
				value={tab}
				onchange={setTab}
			/>
		</>
	);
};

export default Estadisticas;
