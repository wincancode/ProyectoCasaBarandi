import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Theme } from '@mui/material';

import Estadisticas from './Paginas/Estadisticas/Estadisticas';
import {
	createBrowserRouter,
	RouterProvider,
	useLocation
} from 'react-router-dom';
import MenuInicio from './Paginas/MenuPrincipal/MenuInicio';
import CrearJornada from './Paginas/Menues/MenuFuturas/CrearJornada';
import { amber, cyan, yellow } from '@mui/material/colors';
import MenuRol from 'Paginas/Menues/MenuJornada/MenuRol/MenuRol';
import ListaRoles from 'Paginas/Menues/MenuJornada/ListaRoles/ListaRoles';
import JornadasFuturas from 'Paginas/Menues/MenuFuturas/JornadasFuturas';

const blueTheme = createTheme({
	palette: {
		mode: 'light',
		primary: cyan,
		secondary: yellow
	}
});

const greenTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#27632a',
			dark: '#124116',
			light: '#00a152'
		},
		secondary: cyan
	}
});

const yellowTheme = createTheme({
	palette: {
		mode: 'light',
		primary: amber,
		secondary: {
			main: '#27632a',
			dark: '#124116',
			light: '#00a152'
		}
	}
});

const BarandiTheme = ({ children }) => {
	const location = useLocation();
	let theme: Theme;

	switch (location.pathname) {
		case '/':
			theme = blueTheme;
			break;
		case '/menu':
			theme = blueTheme;
			break;
		case '/jornadas-futuras':
			theme = yellowTheme;
			break;
		case '/jornadas-anteriores':
			theme = blueTheme;
			break;
		case '/listaRoles':
			theme = greenTheme;
			break;
		default:
			theme = greenTheme;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>{children}</CssBaseline>
		</ThemeProvider>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<BarandiTheme>
				<MenuInicio />
			</BarandiTheme>
		)
	},
	{
		path: '/menu',
		element: (
			<BarandiTheme>
				<MenuInicio />
			</BarandiTheme>
		)
	},
	{
		path: 'jornadas-futuras',
		element: (
			<BarandiTheme>
				<JornadasFuturas />
			</BarandiTheme>
		)
	},
	{
		path: '/jornadas-anteriores',
		element: (
			<BarandiTheme>
				<Estadisticas />
			</BarandiTheme>
		)
	},
	{
		path: '/listaRoles',
		element: (
			<BarandiTheme>
				<ListaRoles />
			</BarandiTheme>
		)
	},
	{
		path: '/jornada-actual/:idRol',
		element: (
			<BarandiTheme>
				<MenuRol />
			</BarandiTheme>
		)
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
