import { Header } from 'Componentes/Header/Header';
import { BarandiBottomNavigation } from 'Componentes/BottomNavigation/BarandiBottomNavigation';
import BotonLista from 'Componentes/BotonLista/BotonLista';
import BotonPaTra from 'Componentes/botonpatra/BotonPaTra';

const mockRoles = ['mastologia', 'ginecologia', 'pediatria', 'asistencia'];

const ListaRoles: React.FC = () => {
	const roles = mockRoles.map((rol) => {
		return (
			<div>
			<BotonLista
				onClick={() => (window.location.href = '/jornada-actual/1')}
				titulo={rol}
				subtitulo="encuesta-nombre"
			/>
			<BotonPaTra />
			</div>
		);
	});

	return (
		<>
			<Header titulo="roles" />

			<div
				style={{
					marginTop: '1rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px'
				}}
			>
				{roles}
			</div>

			<BarandiBottomNavigation
				tabs={['roles']}
				value="roles"
				onchange={() => null}
			/>
		</>
	);
};

export default ListaRoles;
