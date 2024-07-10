import { useState } from 'react';
import {
	Box,
	Container,
	TextField,
	Button,
	Typography,
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Card,
	CardContent,
	Checkbox,
	FormControlLabel,
	Radio
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CrearEncuesta = () => {
	const [encuesta, setEncuesta] = useState({
		titulo: '',
		preguntas: [
			{ titulo: '', tipo: 'texto', opciones: [''], esObligatoria: false }
		]
	});

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
				{ titulo: '', tipo: 'texto', opciones: [''], esObligatoria: false }
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
		<Card
			key={index}
			style={{
				marginBottom: '20px',
				marginTop: '20px',
				backgroundColor: '#f5f7e3',
				borderLeft: preguntaActual === index ? '8px solid #1976d2' : 'none'
			}}
			onClick={() => handleCardClick(index)}
		>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label={`Pregunta ${index + 1}`}
							variant="outlined"
							value={pregunta.titulo}
							onChange={(e) =>
								handlePreguntaChange(index, 'titulo', e.target.value)
							}
							margin="normal"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel>Tipo de Pregunta</InputLabel>
							<Select
								value={pregunta.tipo}
								label="Tipo de Pregunta"
								onChange={(e) =>
									handlePreguntaChange(index, 'tipo', e.target.value)
								}
							>
								<MenuItem value="texto">Texto</MenuItem>
								<MenuItem value="OpcionMultiple">Selección Simple</MenuItem>
								<MenuItem value="seleccionMultiple">
									Selección Múltiple
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									checked={pregunta.esObligatoria}
									onChange={(e) =>
										handlePreguntaChange(
											index,
											'esObligatoria',
											e.target.checked
										)
									}
								/>
							}
							label="Es obligatoria"
						/>
					</Grid>
					{pregunta.tipo !== 'texto' &&
						pregunta.opciones.map((opcion, opcionIndex) => (
							<Grid item xs={12} key={opcionIndex}>
								<TextField
									fullWidth
									label={`Opción ${opcionIndex + 1}`}
									variant="outlined"
									value={opcion}
									onChange={(e) => handleOpcionChange(index, opcionIndex, e)}
									margin="normal"
									InputProps={{
										endAdornment:
											pregunta.tipo === 'OpcionMultiple' ? (
												<Radio disabled />
											) : pregunta.tipo === 'seleccionMultiple' ? (
												<Checkbox disabled />
											) : null
									}}
								/>
							</Grid>
						))}
					{pregunta.tipo === 'texto' && (
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Respuesta"
								variant="standard"
								disabled
								margin="normal"
							/>
						</Grid>
					)}
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
			</CardContent>
		</Card>
	));

	return (
		<Container maxWidth="sm">
			<Box style={{ padding: '20px', marginTop: '20px' }}>
				<Card
					style={{ backgroundColor: '#f5f7e3', borderTop: '8px solid #1976d2' }}
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
					<Button type="submit" variant="contained" color="primary">
						Enviar
					</Button>
				</form>
			</Box>
		</Container>
	);
};

export default CrearEncuesta;
