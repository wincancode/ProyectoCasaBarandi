import { AddCircleOutline } from '@mui/icons-material';
import {
	Button,
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Radio,
	Select,
	TextField
} from '@mui/material';

interface propsCrearPregunta {
	esActual: boolean;
	pregunta: {
		nombre: string;
		tipo: string;
		esObligatoria: boolean;
		opciones: string[];
	};
	index: number;
	handlePreguntaChange: (index, campo, valor) => void;
	handleOpcionChange: (preguntaIndex, opcionIndex, e) => void;
	agregarOpcion: (preguntaIndex) => void;
	handleCardClick: (index) => void;
}

export const CrearPregunta: React.FC<propsCrearPregunta> = (props) => {
	return (
		<Card
			style={{
				marginBottom: '20px',
				marginTop: '20px',
				backgroundColor: '#f5f7e3',
				borderLeft: props.esActual ? '8px solid #357a38' : 'none'
			}}
			onClick={() => props.handleCardClick(props.index)}
		>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label={`Pregunta ${props.index + 1}`}
							variant="outlined"
							value={props.pregunta.nombre}
							onChange={(e) =>
								props.handlePreguntaChange(
									props.index,
									'nombre',
									e.target.value
								)
							}
							margin="normal"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel>Tipo de Pregunta</InputLabel>
							<Select
								value={props.pregunta.tipo}
								label="Tipo de Pregunta"
								onChange={(e) =>
									props.handlePreguntaChange(
										props.index,
										'tipo',
										e.target.value
									)
								}
							>
								<MenuItem value="texto">Texto</MenuItem>
								<MenuItem value="seleccionSimple">Selección Simple</MenuItem>
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
									checked={props.pregunta.esObligatoria}
									onChange={(e) =>
										props.handlePreguntaChange(
											props.index,
											'esObligatoria',
											e.target.checked
										)
									}
								/>
							}
							label="Es obligatoria"
						/>
					</Grid>
					{props.pregunta.tipo !== 'texto' &&
						props.pregunta.opciones.map((opcion, opcionIndex) => (
							<Grid item xs={12} key={opcionIndex}>
								<TextField
									fullWidth
									label={`Opción ${opcionIndex + 1}`}
									variant="outlined"
									value={opcion}
									onChange={(e) =>
										props.handleOpcionChange(props.index, opcionIndex, e)
									}
									margin="normal"
									InputProps={{
										endAdornment:
											props.pregunta.tipo === 'OpcionMultiple' ? (
												<Radio disabled />
											) : props.pregunta.tipo === 'seleccionMultiple' ? (
												<Checkbox disabled />
											) : null
									}}
								/>
							</Grid>
						))}
					{props.pregunta.tipo === 'texto' && (
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
					{props.pregunta.tipo !== 'texto' && (
						<Grid item xs={12}>
							<Button
								onClick={() => props.agregarOpcion(props.index)}
								startIcon={<AddCircleOutline />}
							>
								Agregar Opción
							</Button>
						</Grid>
					)}
				</Grid>
			</CardContent>
		</Card>
	);
};
