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

interface SeleccionRolProps {
	value: {
		id: number;
		nombreRol: string;
		idEncuesta: string;
	};

	onChange: (newValue: {
		id: number;
		nombreRol: string;
		idEncuesta: string;
	}) => void;
}

const SeleccionRol: React.FC<SeleccionRolProps> = (props) => {
	// Initialize encuesta state with a valid default if props.value.idEncuesta is not a valid option
	const validEncuestaValues = ['1', '2']; // Assuming these are the only valid values
	const defaultEncuesta = validEncuestaValues.includes(props.value.idEncuesta)
		? props.value.idEncuesta
		: validEncuestaValues[0];
	const [, setEncuesta] = React.useState(defaultEncuesta);

	// Handle changes in the TextField
	const handleNombreRolChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		props.onChange({ ...props.value, nombreRol: event.target.value });
	};

	// Handle changes in the Select
	const handleEncuestaChange = (
		event: SelectChangeEvent<{ value: unknown }>
	) => {
		const newEncuesta = event.target.value as string;
		// Ensure the newEncuesta is a valid value, otherwise revert to a default
		if (!validEncuestaValues.includes(newEncuesta)) {
			setEncuesta(defaultEncuesta);
			props.onChange({ ...props.value, idEncuesta: defaultEncuesta });
		} else {
			setEncuesta(newEncuesta);
			props.onChange({ ...props.value, idEncuesta: newEncuesta });
		}
	};

	return (
		<div className={styles.rows}>
			<FormControl fullWidth>
				<TextField
					id="standard-basic"
					label="Nombre Rol"
					value={props.value.nombreRol}
					onChange={handleNombreRolChange}
				/>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Encuesta</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Encuesta"
					onChange={handleEncuestaChange}
				>
					<MenuItem value="1">Dia</MenuItem>
					<MenuItem value="2">Noche</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

const CrearJornada: React.FC = () => {
	const fecha = new Date();

	// Step 1: Define state for SeleccionRol values
	const [seleccionRoles, setSeleccionRoles] = useState<
		Array<{ id: number; nombreRol: string; idEncuesta: string }>
	>([]);

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

	// Step 2: Update HandleAgregar function
	const HandleAgregar = () => {
		const newSeleccionRol = { id: Date.now(), nombreRol: '', idEncuesta: '1' }; // Default values
		setSeleccionRoles([...seleccionRoles, newSeleccionRol]);
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
					{/* Step 3: Pass props to SeleccionRol components */}
					{seleccionRoles.map((rol, index) => (
						<SeleccionRol
							key={index}
							value={rol}
							onChange={(newValue) => {
								const updatedRoles = [...seleccionRoles];
								updatedRoles[index] = newValue;
								setSeleccionRoles(updatedRoles);
							}}
						/>
					))}
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
