import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { useDrawingArea } from '@mui/x-charts/hooks';
import style from './EstadisticaDona.module.css';

interface Props {
	data: {
		id: number;
		value: number;
		label: string;
	}[];
	Nombre: string;
}

function PieCenterLabel({ children }: { children: React.ReactNode }) {
	const { width, height, left, top } = useDrawingArea();
	return (
		<text x={left + width / 2.2} y={top + height / 1.9}>
			{children}
		</text>
	);
}

function sumDataValues(data: Props['data']): number {
	return data.reduce((sum, item) => sum + item.value, 0);
}

const EstadisticaDona: React.FC<Props> = ({ data, Nombre }) => {
	return (
		<div className={style.Donita}>
			<Typography variant="h6">{Nombre}</Typography>
			<br/>
			<PieChart
				series={[
					{
						data: data,
						innerRadius: 60
					}
				]}
				width={400}
				height={200}
			>
				<PieCenterLabel>{sumDataValues(data)}</PieCenterLabel>
			</PieChart>
		</div>
	);
};

export default EstadisticaDona;
