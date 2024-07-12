import { Box, Dialog, Typography } from '@mui/material';
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
import RealizarFormato from './RealizarFormato';

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
				onClick={() => setDialogOpen(true)}
				titulo={encuesta.nombre + ' ' + encuesta.apellido}
				subtitulo={encuesta.cedula}
			/>
		);
	});

	const [dialogopen, setDialogOpen] = useState(false);

	return (
		<>
			<Dialog open={dialogopen} onClose={() => setDialogOpen(false)}>
				<Box className={styles.dialogo}>
					{/*fetch from backend */}
					<Typography variant="h4">Juan Perez</Typography>
					<Typography variant="h5">C.I: 30437298</Typography>
					<br />
					<div className={styles.respuestasStack}>
						<Typography>Pregunta 1: respuesta 1</Typography>
						<Typography>Pregunta 2: respuesta 2</Typography>
						<Typography>Pregunta 3: respuesta 3</Typography>
						<Typography>Pregunta 4: respuesta 4</Typography>
						<Typography>Pregunta 5: respuesta 5</Typography>
						<Typography>Pregunta 6: respuesta 6</Typography>
						<Typography>Pregunta 4: respuesta 4</Typography>
						<Typography>Pregunta 5: respuesta 5</Typography>
						<Typography>Pregunta 6: respuesta 6</Typography>
						<Typography>Pregunta 4: respuesta 4</Typography>
						<Typography>Pregunta 5: respuesta 5</Typography>
						<Typography>Pregunta 6: respuesta 6</Typography>
						<Typography>Pregunta 4: respuesta 4</Typography>
						<Typography>Pregunta 5: respuesta 5</Typography>
						<Typography>Pregunta 6: respuesta 6</Typography>
						<Typography>Pregunta 4: respuesta 4</Typography>
						<Typography>Pregunta 5: respuesta 5</Typography>
						<Typography>Pregunta 6: respuesta 6</Typography>
					</div>
				</Box>
			</Dialog>
			;<div className={styles.encuestasLista}>{encuestasRealizadas}</div>
		</>
	);
};

const Estadisticas: React.FC = () => {
	const [mockStats] = useState([
		{ id: 0, label: 'Hombres', value: 20 },
		{ id: 1, label: 'Mujeres', value: 86 },
		{ id: 2, label: 'Otro', value: 2 }
	]);

	const [dataset] = useState([
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
	const [hacerEncuesta, setHacerEncuesta] = useState(false);
	if (!idRol) return <Typography>Error</Typography>;

	return (
		<>
			<Header titulo={'Menu del rol: ' + roles[Number(idRol)]} />

			{tab === 'Encuestados' ? (
				hacerEncuesta === true ? (
					<RealizarFormato id={0} />
				) : (
					<EncuestasRealizadas />
				)
			) : (
				<Estadisticas />
			)}

			{hacerEncuesta === true ? (
				<></>
			) : (
				<BotonSticky
					positionx="right"
					positiony="bottom"
					Logo={
						<>
							<EditNoteIcon />
							<Typography variant="body2">Realizar Encuesta</Typography>
						</>
					}
					variant="extended"
					onClick={() => setHacerEncuesta(true)}
				/>
			)}

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
