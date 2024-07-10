import React from "react";
import {  Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  id?: string;
  handleClose?: () => void;
  open: boolean;
}


const ModalEstadisticaDona: React.FC<Props> = ({ id , handleClose, open}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {id}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEstadisticaDona;
