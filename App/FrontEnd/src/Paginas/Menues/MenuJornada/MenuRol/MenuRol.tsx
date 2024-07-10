import { Button, Fab, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PollIcon from '@mui/icons-material/Poll';
import styles from './MenuRol.module.css';
import { Header } from '../../../../Componentes/Header/Header';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { BarandiBottomNavigation } from 'Componentes/BottomNavigation/BarandiBottomNavigation';
import BotonLista from 'Componentes/BotonLista/BotonLista';
import BotonSticky from 'Componentes/BotonSticky/BotonSticky';
import EstadisticaDona from 'Componentes/EstadisticaDona/EstadisticaDona';
import { BarChart } from '@mui/x-charts';

const roles = ['mastologia', 'ginecologia', 'pediatria', 'asistencia'];
const mockData = [
	{ cedula: '12345678', nombre: 'Juan', apellido: 'Perez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '12345678', nombre: 'Juan', apellido: 'Perez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '12345678', nombre: 'Juan', apellido: 'Perez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '12345678', nombre: 'Juan', apellido: 'Perez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '34123456', nombre: 'Maria', apellido: 'Gomez' },
	{ cedula: '12345678', nombre: 'Juan', apellido: 'Perez' }
];

const EncuestasRealizadas: React.FC = () => {
	const encuestasRealizadas = mockData.map((encuesta) => {
		return (
			<BotonLista
				titulo={encuesta.nombre + ' ' + encuesta.apellido}
				subtitulo={encuesta.cedula}
			/>
		);
	});
	return <div className={styles.encuestasLista}>{encuestasRealizadas}</div>;
};

const RealizarEncuesta: React.FC = () => {
	return (
		<div className={styles.realizarEncuestaButton}>
			<Button variant="outlined" color="primary">
				Empezar encuesta
			</Button>
		</div>
	);
};

const Estadisticas: React.FC = () => {
	const [mockStats, _] = useState([
		{ id: 0, label: 'Hombres', value: 20 },
		{ id: 1, label: 'Mujeres', value: 86 },
		{ id: 2, label: 'Otro', value: 2 }
	]);

	const [dataset, a] = useState([
		{
			comunidad: '25 de marzo',
			label: 'aasasa',
			asistencias: 100
		},
		{
			comunidad: 'San Antonio',
			asistencias: 200
		},
		{
			comunidad: 'La Guaira',
			asistencias: 150
		},
		{
			comunidad: 'Caracas',
			asistencias: 300
		}
	]);

	return (
		<>
			<EstadisticaDona data={mockStats} Nombre="Total según Genero" />
			<div className={styles.barchartcontainer}>
				<BarChart
					dataset={dataset}
					yAxis={[{ scaleType: 'band', dataKey: 'comunidad' }]}
					series={[{ dataKey: 'asistencias', label: 'asistencias' }]}
					layout="horizontal"
					height={400}
					width={300}
				/>
			</div>
		</>
	);
};

const MenuRol: React.FC = () => {
	const { idRol } = useParams();
	const [tab, setTab] = useState('Encuestados');

	if (!idRol) return <Typography>Error</Typography>;

	return (
		<>
			<Header titulo={'Menu del rol: ' + roles[Number(idRol)]} />

			{tab === 'Encuestados' ? <EncuestasRealizadas /> : <Estadisticas />}

			<BotonSticky
				positionx="right"
				positiony="bottom"
				Logo={<EditNoteIcon />}
			/>
			<BarandiBottomNavigation
				icons={[<PollIcon />, <EditNoteIcon />]}
				tabs={['Encuestados', 'Estadisticas']}
				value={tab}
				onchange={setTab}
			/>
		</>
	);
};

export default MenuRol;
