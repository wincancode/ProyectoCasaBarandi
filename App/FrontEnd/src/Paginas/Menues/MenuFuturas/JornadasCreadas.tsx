import { Stack } from '@mui/material';
import BotonLista from 'Componentes/BotonLista/BotonLista';
import styles from './CrearJornada.module.css';

const mockJornadasCreadas = [
	{
		id: 1,
		nombre: 'jornada de salud ambiental',
		fecha: '11-09-2024'
	},
	{
		id: 2,
		nombre: 'jornada de revision de mastologia',
		fecha: '11-12-2024'
	},
	{
		id: 3,
		nombre: 'jornada de revision de pediatria',
		fecha: '20-3-2025'
	}
];

interface propsJornadasCreadas {
	handleSelectJornada: (id: number) => void;
}

export const JornadasCreadas: React.FC<propsJornadasCreadas> = ({
	handleSelectJornada
}) => {
	const jornadas = mockJornadasCreadas.map((jornada) => (
		<BotonLista
			onClick={() => handleSelectJornada(jornada.id)}
			titulo={jornada.nombre}
			subtitulo={jornada.fecha}
		/>
	));

	return (
		<>
			<div className={styles.caja}>
				<Stack spacing={'8px'}>{jornadas}</Stack>
			</div>
		</>
	);
};
