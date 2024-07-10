import React, { useState } from 'react';
import JornadasEstadisticas from './Jornadas/JornadasEstadisticas';
import { Header } from 'Componentes/Header/Header';
import styles from './JornadasEstadisticas.module.css';
import { BarandiBottomNavigation } from 'Componentes/BottomNavigation/BarandiBottomNavigation';
import EstadisticaDona from 'Componentes/EstadisticaDona/EstadisticaDona';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent
} from '@mui/material';
import EstadisticaBarra from 'Componentes/EstadisticaBarra/EstadisticaBarra';

const EstadisticasGenerales: React.FC = () => {
	const handleChange = (event: SelectChangeEvent) => {
		setComparativa(event.target.value);
	};

	const [comparativa, setComparativa] = React.useState('1');

	const [gruposEtarios] = useState([
		{ id: 0, value: 5, label: 'infante' },
		{ id: 1, value: 20, label: 'niño' },
		{ id: 2, value: 5, label: 'adolescente' },
		{ id: 3, value: 10, label: 'adulto' },
		{ id: 4, value: 0, label: 'adulto mayor' }
	]);

	const [genero] = useState([
		{
			id: 0,
			value: 20,
			label: 'Masculino'
		},
		{
			id: 1,
			value: 19,
			label: 'Femenino'
		},
		{
			id: 2,
			value: 1,
			label: 'Otro'
		}
	]);

	const [comunidades] = useState([
		{
			id: 0,
			value: 10,
			label: 'Comunidad 1'
		},
		{
			id: 1,
			value: 10,
			label: 'Comunidad 2'
		},
		{
			id: 2,
			value: 20,
			label: 'Comunidad 3'
		}
	]);
	return (
		<div className={styles.caja}>
			<EstadisticaDona
				Nombre="Asistencias"
				data={
					comparativa == '1'
						? comunidades
						: comparativa == '2'
						? genero
						: gruposEtarios
				}
			></EstadisticaDona>
			<div className={styles.caja2}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Comparativas</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={comparativa}
						label="Comparativas"
						onChange={handleChange}
					>
						<MenuItem value={1}>Segun comunidad</MenuItem>
						<MenuItem value={2}>Segun genero</MenuItem>
						<MenuItem value={3}>Segun grupo etario</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className={styles.caja2}>
				<EstadisticaBarra tittle="Diagnosticos"></EstadisticaBarra>
			</div>
		</div>
	);
};

const ListaJornadas: React.FC = () => {
	return <div></div>;
};

const Estadisticas: React.FC = () => {
	const [tab, setTab] = React.useState('Ultima jornada');

	return (
		<>
			<Header titulo="Jornadas anteriores" />
			{tab === 'Ultima jornada' ? (
				<JornadasEstadisticas />
			) : tab === 'estadisticas generales' ? (
				<EstadisticasGenerales />
			) : (
				<ListaJornadas />
			)}

			<BarandiBottomNavigation
				tabs={['Ultima jornada', 'estadisticas generales', 'lista de jornadas']}
				value={tab}
				onchange={setTab}
			/>
		</>
	);
};

export default Estadisticas;
