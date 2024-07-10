import { Modal, Typography, Button } from "@mui/material";
import style from "./ModalSiNo.module.css";

interface props {
  titulo: string;
  mensaje: string;
  onYes: () => void;
  onNo: () => void;
  open: boolean;
}

const ModalSiNo: React.FC<props> = ({ titulo, mensaje, onYes, onNo, open }) => {
  return (
    <div className={style.module}>
      <Modal open={open}>
        <div className={style.module}>
          <div className={style.mensaje}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {titulo}
            </Typography>
          </div>

          <div className={style.mensaje}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {mensaje}
            </Typography>
          </div>

          <div className={style.Botones}>
            <Button variant="contained" color="warning" onClick={() => onNo()}>
              No
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onYes()}>
              Si
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalSiNo;
