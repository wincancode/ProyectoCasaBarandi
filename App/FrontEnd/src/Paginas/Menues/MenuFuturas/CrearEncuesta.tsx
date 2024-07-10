import { useState } from 'react';
import {
	Container,
	TextField,
	Button,
	Typography,
	Paper,
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CrearEncuesta = () => {
	const [encuesta, setEncuesta] = useState({
		titulo: '',
		preguntas: [{ titulo: '', tipo: 'texto', opciones: [''] }]
	});

	const agregarPregunta = () => {
		setEncuesta({
			...encuesta,
			preguntas: [
				...encuesta.preguntas,
				{ titulo: '', tipo: 'texto', opciones: [''] }
			]
		});
	};

	const agregarOpcion = (preguntaIndex: number) => {
		const newPreguntas = [...encuesta.preguntas];
		newPreguntas[preguntaIndex].opciones.push('');
		setEncuesta({ ...encuesta, preguntas: newPreguntas });
	};

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
				<Typography variant="h4" gutterBottom>
					Crear Encuesta
				</Typography>
				<form>
					<TextField
						fullWidth
						label="Título de la Encuesta"
						variant="outlined"
						value={encuesta.titulo}
						margin="normal"
					/>
					{encuesta.preguntas.map((pregunta, index) => (
						<Grid container spacing={2} key={index}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label={`Pregunta ${index + 1}`}
									variant="outlined"
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel>Tipo de Pregunta</InputLabel>
									<Select value={pregunta.tipo} label="Tipo de Pregunta">
										<MenuItem value="texto">Texto</MenuItem>
										<MenuItem value="seleccionSimple">
											Selección Simple
										</MenuItem>
										<MenuItem value="seleccionMultiple">
											Selección Múltiple
										</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							{pregunta.tipo !== 'texto' &&
								pregunta.opciones.map((opcion, opcionIndex) => (
									<Grid item xs={12} key={opcionIndex}>
										<TextField
											fullWidth
											label={`Opción ${opcionIndex + 1}`}
											variant="outlined"
											value={opcion}
											margin="normal"
										/>
									</Grid>
								))}
							{pregunta.tipo !== 'texto' && (
								<Grid item xs={12}>
									<Button
										onClick={() => agregarOpcion(index)}
										startIcon={<AddCircleOutlineIcon />}
									>
										Agregar Opción
									</Button>
								</Grid>
							)}
						</Grid>
					))}
					<Button
						onClick={agregarPregunta}
						startIcon={<AddCircleOutlineIcon />}
						style={{ marginRight: '10px' }}
					>
						Agregar Pregunta
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ marginTop: '1rem' }}
					>
						Enviar
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default CrearEncuesta;
