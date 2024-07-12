import { Event, Poll, Add } from '@mui/icons-material';
import BotonSticky from 'Componentes/BotonSticky/BotonSticky';
import { BarandiBottomNavigation } from 'Componentes/BottomNavigation/BarandiBottomNavigation';
import { Header } from 'Componentes/Header/Header';
import { useState } from 'react';
import CrearEncuesta from './CrearEncuesta';
import { EncuestasCreadas } from './EncuestasCreadas';
import { JornadasCreadas } from './JornadasCreadas';
import { CrearJornada } from './CrearJornada';

const JornadasFuturas: React.FC = () => {
	const [creandoJornada, setCreandoJornada] = useState(false);
	const [creandoEncuesta, setCreandoEncuesta] = useState(false);
	const [tab, setTab] = useState('Jornadas');

	const [selectedJornadaId, setSelectedJornadaId] = useState(null);
	const [, /*selectedEncuestaId*/ setSelectedEncuestaId] = useState(null);

	const handleSelectJornada = (id: number) => {
		setSelectedJornadaId(id);
		if (id !== null) setCreandoJornada(true);
		console.log(id);
	};

	const handleSelectEncuesta = (id: number) => {
		setSelectedEncuestaId(id);
		if (id !== null) setCreandoEncuesta(true);
		console.log(id);
	};

	const stickyCrearJornada = (
		<BotonSticky
			onClick={() => setCreandoJornada(true)}
			Logo={<Add />}
			positionx="right"
			positiony="bottom"
		/>
	);

	const stickyCrearEncuesta = (
		<BotonSticky
			onClick={() => setCreandoEncuesta(true)}
			Logo={<Add />}
			positionx="right"
			positiony="bottom"
		/>
	);
	return (
		<div>
			<Header titulo="Jornadas futuras" />

			{tab === 'Jornadas' ? (
				creandoJornada ? (
					<>
						<CrearJornada
							onClose={() => setCreandoJornada(false)}
							id={selectedJornadaId}
						/>
					</>
				) : (
					<>
						{stickyCrearJornada}
						<JornadasCreadas
							handleSelectJornada={(selectedJornadaId) =>
								handleSelectJornada(selectedJornadaId)
							}
						/>
					</>
				)
			) : creandoEncuesta ? (
				<>
					<CrearEncuesta onClose={() => setCreandoEncuesta(false)} />
				</>
			) : (
				<>
					<EncuestasCreadas
						handleEncuestasCreada={(selectedEncuestaId) =>
							handleSelectEncuesta(selectedEncuestaId)
						}
					/>
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
