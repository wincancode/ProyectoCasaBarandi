import { Stack } from '@mui/material';
import BotonLista from 'Componentes/BotonLista/BotonLista';
import styles from './CrearJornada.module.css';
import { supabaseClient } from 'supabase';
import { useState } from 'react';

interface propsJornadasCreadas {
	handleSelectJornada: (id: number) => void;
}

export const JornadasCreadas: React.FC<propsJornadasCreadas> = (
	propsJornadasCreadas
) => {
	const [informacion, setInformacion] = useState([<div>cargando. . . </div>]);

	async function obtainJornadas() {
		const jornadas = await supabaseClient
			.from('jornadas')
			.select('id, Titulo, fechaRealizacion');

		const informacion = jornadas.data.map((jornada) => (
			<BotonLista
				key={jornada.id}
				onClick={() => propsJornadasCreadas.handleSelectJornada(jornada.id)}
				titulo={jornada.Titulo}
				subtitulo={jornada.fechaRealizacion}
			/>
		));

		setInformacion(informacion);
	}

	obtainJornadas();
	return (
		<>
			<div className={styles.caja}>
				<Stack spacing={'8px'}>{informacion}</Stack>
			</div>
		</>
	);
};
