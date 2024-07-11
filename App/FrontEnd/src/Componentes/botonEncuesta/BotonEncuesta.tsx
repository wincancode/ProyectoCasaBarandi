import { Box, Button, Typography } from "@mui/material";
import styles from "./BotonEncuesta.module.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";

interface props {
  titulo: string;
  NoPreguntas: number;
  OnClick: () => void;
}

const BotonEncuesta: React.FC<props> = ({ titulo, NoPreguntas, OnClick }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.stack}>
        <Button fullWidth variant="contained" onClick={OnClick}>
          <Box className={styles.objeto}>
            <Typography variant="body1">{titulo}</Typography>
            <Typography variant="body2">{NoPreguntas}</Typography>
            <BorderColorIcon />
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default BotonEncuesta;
