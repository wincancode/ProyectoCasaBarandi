import { BottomNavigation, Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { Header } from 'Componentes/Header/Header';
import { BarandiBottomNavigation } from 'Componentes/BottomNavigation/BarandiBottomNavigation';
import BotonLista from 'Componentes/BotonLista/BotonLista';

const mockRoles = ['mastologia', 'ginecologia', 'pediatria', 'asistencia'];

const ListaRoles: React.FC = () => {
	const roles = mockRoles.map((rol) => {
		return (
			<BotonLista
				onClick={() => (window.location.href = '/jornada-actual/1')}
				titulo={rol}
				subtitulo="encuesta-nombre"
			/>
		);
	});

	return (
		<>
			<Header titulo="roles" />

			<div
				style={{
					marginTop: '1rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px'
				}}
			>
				{roles}
			</div>

			<BarandiBottomNavigation
				tabs={['roles']}
				value="roles"
				onchange={() => null}
			/>
		</>
	);
};

export default ListaRoles;
