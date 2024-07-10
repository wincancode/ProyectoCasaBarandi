import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	SelectChangeEvent,
	Typography,
	Button
} from '@mui/material';
import styles from './CrearJornada.module.css';

import { BarandiBottomNavigation } from 'Componentes/BottomNavigation/BarandiBottomNavigation';
import { Header } from 'Componentes/Header/Header';
import React from 'react';
import { useState } from 'react';

const mockJornadasCreadas = [
	{
		nombre: 'jornada de salud ambiental',
		fecha: '11-09-2024'
	},
	{
		nombre: 'jornada de revision de mastologia',
		fecha: '11-12-2024'
	},
	{
		nombre: 'jornada de revision de pediatria',
		fecha: '20-3-2025'
	}
];

const JornadasCreadas: React.FC = () => {
	const jornadas = mockJornadasCreadas.map((jornada) => (
		<BotonLista titulo={jornada.nombre} subtitulo={jornada.fecha} />
	));

	return (
		<>
			<div className={styles.caja}>
				<Stack spacing={'8px'}>{jornadas}</Stack>
			</div>
		</>
	);
};

const SeleccionRol: React.FC = () => {
	const [rol, setrol] = React.useState('1');
	const [encuestas, setEncuestas] = React.useState('Si');

	return (
		<div className={styles.rows}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Rol</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={rol}
					label="dia"
					onChange={(event) => setrol(event.target.value as string)}
				>
					<MenuItem value={1}>1</MenuItem>
					<MenuItem value={2}>2</MenuItem>
				</Select>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Encuesta</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={encuestas}
					label="Encuesta"
					onChange={(event) => setEncuestas(event.target.value as string)}
				>
					<MenuItem value={1}>Dia</MenuItem>
					<MenuItem value={2}>Noche</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

const CrearJornada: React.FC = () => {
	const fecha = new Date();

	const [agregaciones, setAgregaciones] = useState<JSX.Element[]>([]);

	const [dia, setDia] = useState(fecha.getDate());
	const [mes, setMes] = useState(fecha.getMonth());
	const [año, setAño] = useState(fecha.getFullYear());

	const handleChange1 = (event: SelectChangeEvent) => {
		setDia(parseInt(event.target.value as string, 10));
	};

	const handleChange2 = (event: SelectChangeEvent) => {
		setMes(parseInt(event.target.value as string, 10));
	};

	const handleChange3 = (event: SelectChangeEvent) => {
		setAño(parseInt(event.target.value as string, 10));
	};

	const renderOptions = (start: number, end: number) => {
		const options = [];
		for (let i = start; i <= end; i++) {
			options.push(<MenuItem value={i}>{i}</MenuItem>);
		}
		return options;
	};

	const getDaysInMonth = (month: number, year: number) => {
		return new Date(year, month, 0).getDate();
	};

	const renderDaysOptions = () => {
		const daysInMonth = getDaysInMonth(Number(mes), Number(año));
		return renderOptions(1, daysInMonth);
	};

	const HandleAgregar = () => {
		setAgregaciones(agregaciones.concat(<SeleccionRol />));
	};

	return (
		<div>
			<div className={styles.container}>
				<TextField
					id="standard-basic"
					label="Nombre Jornada"
					variant="standard"
				/>
				<TextField id="standard-basic" label="Ubicacion" variant="standard" />
				<div className={styles.fechacontrol}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">dia</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={dia.toString()}
							label="dia"
							onChange={handleChange1}
						>
							{renderDaysOptions()}
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">mes</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={mes.toString()}
							label="mes"
							onChange={handleChange2}
						>
							{renderOptions(1, 12)}
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">año </InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={año.toString()}
							label="año"
							onChange={handleChange3}
						>
							{renderOptions(2024, 2030)}
						</Select>
					</FormControl>
				</div>
				<div className={styles.incremental}>
					<Typography variant="h6">Asiganaciones/Roles</Typography>
					{agregaciones}
					<Button variant="contained" color="secondary" onClick={HandleAgregar}>
						Agregar
					</Button>
				</div>
			</div>
		</div>
	);
};

const EncuestasCreadas: React.FC = () => {
	return (
		<div>
			<div className={styles.caja}>
				<Stack spacing={'0px'}>
					<BotonEncuesta titulo="Asistencia" NoPreguntas="20" />;
					<BotonEncuesta titulo="Formato caracas" NoPreguntas="20" />;
					<BotonEncuesta titulo="Nombre Encuesta" NoPreguntas="20" />;
				</Stack>
			</div>
		</div>
	);
};

import { Add, Delete, Event, Poll, Save } from '@mui/icons-material';
import BotonEncuesta from 'Componentes/botonEncuesta/BotonEncuesta';
import BotonSticky from 'Componentes/BotonSticky/BotonSticky';
import CrearEncuesta from './CrearEncuesta';
import BotonLista from 'Componentes/BotonLista/BotonLista';

const JornadasFuturas: React.FC = () => {
	const [creandoJornada, setCreandoJornada] = useState(false);
	const [creandoEncuesta, setCreandoEncuesta] = useState(false);
	const [tab, setTab] = useState('Jornadas');

	const stickyCrearJornada = (
		<BotonSticky
			onClick={() => setCreandoJornada(true)}
			Logo={<Add />}
			positionx="right"
			positiony="bottom"
		/>
	);
	const stickyGuardarJornada = (
		<BotonSticky Logo={<Save />} positionx="right" positiony="bottom" />
	);
	const stickyDesecharJornada = (
		<BotonSticky Logo={<Delete />} positionx="left" positiony="bottom" />
	);

	const stickyCrearEncuesta = (
		<BotonSticky
			onClick={() => setCreandoEncuesta(true)}
			Logo={<Add />}
			positionx="right"
			positiony="bottom"
		/>
	);
	const stickyGuardarEncuesta = (
		<BotonSticky Logo={<Save />} positionx="right" positiony="bottom" />
	);
	const stickyDesecharEncuesta = (
		<BotonSticky Logo={<Delete />} positionx="left" positiony="bottom" />
	);
	return (
		<div>
			<Header titulo="Jornadas futuras" />

			{tab === 'Jornadas' ? (
				creandoJornada ? (
					<>
						<CrearJornada />
						{stickyGuardarJornada}
						{stickyDesecharJornada}
					</>
				) : (
					<>
						{stickyCrearJornada}
						<JornadasCreadas />
					</>
				)
			) : creandoEncuesta ? (
				<>
					{stickyDesecharEncuesta}
					{stickyGuardarEncuesta}
					<CrearEncuesta />
				</>
			) : (
				<>
					<EncuestasCreadas />
					{stickyCrearEncuesta}
				</>
			)}
			<BarandiBottomNavigation
				tabs={['Jornadas', 'Encuestas']}
				icons={[<Event />, <Poll />]}
				value={tab}
				onchange={setTab}
			/>
		</div>
	);
};

export default JornadasFuturas;
