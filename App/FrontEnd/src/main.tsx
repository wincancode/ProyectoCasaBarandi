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
import InicioSesion from './Paginas/InicioDeSesion/InicioSesion';
import MenuInicio from './Paginas/MenuPrincipal/MenuInicio';
import CrearJornada from './Paginas/Menues/MenuFuturas/CrearJornada';
import {  cyan, green, yellow } from '@mui/material/colors';
import MenuRol from 'Paginas/Menues/MenuJornada/MenuRol/MenuRol';

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
		primary: green,
		secondary: cyan
	}
});

const yellowTheme = createTheme({
	palette: {
		mode: 'light',
		primary: yellow,
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
		case 'jornadas-anteriores':
			theme = blueTheme;
			break;
		case 'jornada-actual':
			theme = greenTheme;
			break;
		default:
			theme = blueTheme;
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
				<CrearJornada />
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
