import { useState } from 'react';
import {
	Box,
	Container,
	TextField,
	Button,
	Typography,
	Card,
	CardContent
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CrearPregunta } from './CrearPregunta';
import { supabaseClient } from 'supabase';
import { BotonStickyLoader } from 'Componentes/BotonStickyLoader/BotonStickyLoader';
import { Check, Delete, Save } from '@mui/icons-material';
import BotonSticky from 'Componentes/BotonSticky/BotonSticky';
import { OkDialog } from 'Componentes/OkDialog/OkDialog';



interface props {
	onClose: () => void;
}

const CrearEncuesta: React.FC<props> = (props) => {
	const [encuesta, setEncuesta] = useState({
		titulo: '',
		preguntas: [
			{ nombre: '', tipo: 'texto', opciones: [''], esObligatoria: false }
		]
	});

	const [doneCreating, setDoneCreating] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function crearEncuesta() {
		setIsLoading(true);
		//insertar encuesta
		const encuestaInsertada = await supabaseClient
			.from('encuestas')
			.insert([{ titulo: encuesta.titulo }])
			.select();

		//insertar preguntas con sus opciones e insertar en su encuesta
		for (let i = 0; i < encuesta.preguntas.length; i++) {
			const pregunta = encuesta.preguntas[i];
			const preguntaInsertada = await supabaseClient
				.from('preguntas')
				.insert({
					nombre: pregunta.nombre,
					tipo: pregunta.tipo,
					esObligatoria: pregunta.esObligatoria
				})
				.select();
			if (pregunta.tipo != 'texto') {
				const opciones = pregunta.opciones.map((opcion) => {
					return {
						pregunta_id: preguntaInsertada.data[0].id,
						opcion: opcion
					};
				});
				await supabaseClient.from('opciones').insert(opciones);
			}

			await supabaseClient.from('encuestas_preguntas').insert({
				encuesta_id: encuestaInsertada.data[0].id,
				pregunta_id: preguntaInsertada.data[0].id
			});
		}

		setDoneCreating(true);
		setIsLoading(false);
	}

	// const crearEncuesta_Preguntas_Opciones = useMutation(() => {{}

	const [preguntaActual, setPreguntaActual] = useState(0);

	const handleTituloChange = (e) => {
		setEncuesta({ ...encuesta, titulo: e.target.value });
	};

	const handlePreguntaChange = (index, campo, valor) => {
		const newPreguntas = [...encuesta.preguntas];
		newPreguntas[index][campo] = valor;
		setEncuesta({ ...encuesta, preguntas: newPreguntas });
	};

	const agregarPregunta = () => {
		setEncuesta({
			...encuesta,
			preguntas: [
				...encuesta.preguntas,
				{ nombre: '', tipo: 'texto', opciones: [''], esObligatoria: false }
			]
		});
	};

	const agregarOpcion = (preguntaIndex) => {
		const newPreguntas = [...encuesta.preguntas];
		newPreguntas[preguntaIndex].opciones.push('');
		setEncuesta({ ...encuesta, preguntas: newPreguntas });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(encuesta);
	};

	const handleOpcionChange = (preguntaIndex, opcionIndex, e) => {
		const newPreguntas = [...encuesta.preguntas];
		newPreguntas[preguntaIndex].opciones[opcionIndex] = e.target.value;
		setEncuesta({ ...encuesta, preguntas: newPreguntas });
	};

	const handleCardClick = (index) => {
		setPreguntaActual(index);
	};

	const preguntaComponents = encuesta.preguntas.map((pregunta, index) => (
		<CrearPregunta
			key={index}
			esActual={index === preguntaActual}
			pregunta={pregunta}
			index={index}
			handlePreguntaChange={handlePreguntaChange}
			handleOpcionChange={handleOpcionChange}
			agregarOpcion={agregarOpcion}
			handleCardClick={handleCardClick}
		/>
	));

	return (
		<>
			<OkDialog
				mensaje="Encuesta creada con éxito"
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
				onClick={crearEncuesta}
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

			<Container maxWidth="sm">
				<Box sx={{ padding: '1rem 1rem 8rem 1rem' }}>
					<Card
						style={{
							backgroundColor: '#f5f7e3',
							borderTop: '8px solid #357a38'
						}}
					>
						<CardContent>
							<Typography variant="h4" gutterBottom>
								Crear Encuesta
							</Typography>
							<TextField
								fullWidth
								label="Título de la Encuesta"
								variant="standard"
								value={encuesta.titulo}
								onChange={handleTituloChange}
								margin="normal"
							/>
						</CardContent>
					</Card>
					<form onSubmit={handleSubmit}>
						{preguntaComponents}
						<Button
							onClick={agregarPregunta}
							startIcon={<AddCircleOutlineIcon />}
							style={{ marginRight: '10px' }}
						>
							Agregar Pregunta
						</Button>
					</form>
				</Box>
			</Container>
		</>
	);
};

export default CrearEncuesta;
