import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	SelectChangeEvent,
	Typography,
	Button
} from '@mui/material';
import styles from './CrearJornada.module.css';
import React from 'react';
import { useState } from 'react';
import { supabaseClient } from 'supabase';
import { Save, Check, Delete } from '@mui/icons-material';
import BotonSticky from 'Componentes/BotonSticky/BotonSticky';
import { BotonStickyLoader } from 'Componentes/BotonStickyLoader/BotonStickyLoader';
import { OkDialog } from 'Componentes/OkDialog/OkDialog';

interface seleccionRolprops {
	id: number;
	rol: string;
	encuesta: number;
	opcionesEncuesta: JSX.Element[];
	onChange: (id: number, rol: string, encuesta: number) => void;
}

const SeleccionRol: React.FC<seleccionRolprops> = (props) => {
	return (
		<div className={styles.rows}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Encuesta</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={props.encuesta}
					label="Encuesta"
					onChange={(event) =>
						props.onChange(
							props.id,
							props.rol,
							parseInt(event.target.value as string, 10)
						)
					}
				>
					{props.opcionesEncuesta}
				</Select>
			</FormControl>
			<TextField
				label={'Nombre del Rol'}
				onChange={(e) =>
					props.onChange(props.id, e.target.value, props.encuesta)
				}
				value={props.rol}
			/>
		</div>
	);
};

interface props {
	id: number | null;
	onClose: () => void;
}

export const CrearJornada: React.FC<props> = (props) => {
	if (props.id !== null) {
		console.log('aqui va para traerse la informacion');
	}

	const [doneCreating, setDoneCreating] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fecha = new Date();
	const [titulo, setTitulo] = useState('');
	const [ubicacion, setUbicacion] = useState('');
	const [roles, setRoles] = useState([
		{
			id: 0,
			rol: '',
			encuesta: -1
		}
	]);

	const [dia, setDia] = useState(fecha.getDate());
	const [mes, setMes] = useState(fecha.getMonth());
	const [año, setAño] = useState(fecha.getFullYear());

	async function handleSubmit() {
		setIsLoading(true);
		const jornadaInsertada = await supabaseClient
			.from('jornadas')
			.insert({
				Titulo: titulo,
				fechaRealizacion: `${año}-${mes}-${dia}`,
				ubicacion: ubicacion
			})
			.select();

		const rolesAinsertar = roles.map((rol) => ({
			nombre: rol.rol,
			encuesta_id: rol.encuesta,
			jornada_id: jornadaInsertada.data[0].id
		}));

		await supabaseClient
			.from('Roles')
			.insert(rolesAinsertar)
			.then((r) => console.log(r.error));

		setIsLoading(false);
		setDoneCreating(true);
	}

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

	const [encuestasData, setEncuestasData] = React.useState<JSX.Element[]>([
		<MenuItem>cargando</MenuItem>
	]);
	const [encuestasCargadas, setEncuestasCargadas] = React.useState(false);

	const handleDataEncuesta = async () => {
		const dataEncuesta = await supabaseClient
			.from('encuestas')
			.select('titulo,id');

		const data = dataEncuesta.data.map((encuesta) => (
			<MenuItem value={encuesta.id}>{encuesta.titulo}</MenuItem>
		));

		setEncuestasData(data);

		setAgregaciones(
			roles.map((rol) => (
				<SeleccionRol
					opcionesEncuesta={data}
					id={rol.id}
					rol={rol.rol}
					encuesta={rol.encuesta}
					onChange={handleRolChange}
				/>
			))
		);

		setEncuestasCargadas(true);
	};

	if (!encuestasCargadas) handleDataEncuesta();

	const handleRolChange = (id: number, rol: string, encuesta: number) => {
		const newRoles = roles;
		newRoles[id] = { id, rol, encuesta };
		setRoles(newRoles);

		setAgregaciones(
			roles.map((rol) => (
				<SeleccionRol
					opcionesEncuesta={encuestasData}
					id={rol.id}
					rol={rol.rol}
					encuesta={rol.encuesta}
					onChange={handleRolChange}
				/>
			))
		);
	};

	const [agregaciones, setAgregaciones] = useState([
		<SeleccionRol
			opcionesEncuesta={encuestasData}
			id={0}
			rol=""
			encuesta={1}
			onChange={handleRolChange}
		/>
	]);

	const HandleAgregar = () => {
		setAgregaciones(
			agregaciones.concat(
				<SeleccionRol
					opcionesEncuesta={encuestasData}
					id={agregaciones.length}
					rol=""
					encuesta={1}
					onChange={handleRolChange}
				/>
			)
		);
	};

	return (
		<div>
			<OkDialog
				mensaje="Jornada creada con éxito"
				onOk={() => {
					props.onClose();
					setDoneCreating(false);
				}}
				open={doneCreating}
			/>

			<BotonStickyLoader
				positionx="right"
				positiony="bottom"
				Logo={<Save />}
				onClick={handleSubmit}
				success={doneCreating}
				isLoading={isLoading}
				successLogo={<Check />}
			/>
			<BotonSticky
				Logo={<Delete />}
				positionx="left"
				positiony="bottom"
				onClick={() => null}
			/>

			<div className={styles.container}>
				<TextField
					id="standard-basic"
					label="Nombre Jornada"
					variant="standard"
					onChange={(e) => setTitulo(e.target.value)}
					value={titulo}
				/>
				<TextField
					id="standard-basic"
					label="Ubicacion"
					variant="standard"
					onChange={(e) => setUbicacion(e.target.value)}
					value={ubicacion}
				/>
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
					<Typography variant="h6">Asignar Roles de Participantes</Typography>
					{agregaciones}
					<Button variant="contained" color="secondary" onClick={HandleAgregar}>
						Agregar
					</Button>
				</div>
			</div>
		</div>
	);
};
