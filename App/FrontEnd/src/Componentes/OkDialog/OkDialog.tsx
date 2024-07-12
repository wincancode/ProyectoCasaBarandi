import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface props {
	mensaje: string;
	onOk: () => void;
	open: boolean;
}

export const OkDialog: React.FC<props> = (props) => {
	return (
		<div>
			<Dialog
				open={props.open}
				onClose={props.onOk}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Confirmation'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{props.mensaje}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.onOk} autoFocus>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
