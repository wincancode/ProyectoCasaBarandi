import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { indigo } from '@mui/material/colors';

interface props {
	tabs: string[];
	icons?: React.ReactNode[];
	value: string;
	onchange: (newValue: string) => void;
}

export const BarandiBottomNavigation: React.FC<props> = (props) => {
	const NavigationActions = props.tabs.map((tab) => {
		return (
			<BottomNavigationAction
				label={tab}
				icon={props.icons ? props.icons[props.tabs.indexOf(tab)] : undefined}
				value={tab}
				key={tab}
				color="secondary"
			/>
		);
	});

	return (
		<Paper
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				color: indigo[500]
			}}
			elevation={3}
		>
			<BottomNavigation
				onChange={(_, newValue) => props.onchange(newValue)}
				value={props.value}
				showLabels
			>
				{NavigationActions}
			</BottomNavigation>
		</Paper>
	);
};
