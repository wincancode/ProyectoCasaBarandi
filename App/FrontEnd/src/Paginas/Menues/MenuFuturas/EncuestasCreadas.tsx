import { Stack } from '@mui/material';
import BotonEncuesta from 'Componentes/botonEncuesta/BotonEncuesta';
import { supabaseClient } from 'supabase';
import styles from './CrearJornada.module.css';
import { useState } from 'react';

interface propsEncuestasCreadas {
	handleEncuestasCreada: (number) => void;
}

export const EncuestasCreadas: React.FC<propsEncuestasCreadas> = ({
	handleEncuestasCreada
}) => {
	const [encuestasComponente, setEncuestasComponente] = useState([
		<>cargando</>
	]);

	const [obtenidas, setObtenidas] = useState(false);

	async function obtainEncuestas() {
		const encuestas = await supabaseClient
			.from('encuestas')
			.select('id, titulo, preguntas(id)');

		const bar = encuestas.data.map((encuesta) => (
			<BotonEncuesta
				key={encuesta.id}
				OnClick={() => handleEncuestasCreada(encuesta.id)}
				titulo={encuesta.titulo}
				NoPreguntas={encuesta.preguntas.length}
			/>
		));

		setObtenidas(true);
		setEncuestasComponente(bar);
	}

	if (!obtenidas) {
		obtainEncuestas();
	}

	return (
		<>
			<div className={styles.caja}>
				<Stack spacing={'8px'}>{encuestasComponente}</Stack>
			</div>
		</>
	);
};
