import { Box, Typography, AppBar, Toolbar, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface props {
	titulo: string;
}

export const Header: React.FC<props> = (props) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
						{props.titulo}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
