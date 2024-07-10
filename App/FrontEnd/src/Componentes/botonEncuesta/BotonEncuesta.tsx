import {Box ,Button, Stack, Typography } from "@mui/material";
import styles from "./BotonEncuesta.module.css";
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface props {
  titulo: string;
  NoPreguntas: string;
}

const BotonEncuesta: React.FC<props> = ({ titulo, NoPreguntas }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.stack}>
        <Stack>
          <Button variant="contained">
            <Box className={styles.objeto}>
                <Typography variant="body1">{titulo}</Typography>
                <Typography variant="body2">{NoPreguntas}</Typography>
                <BorderColorIcon/>
            </Box>
          </Button>
        </Stack>
      </Box>

      
    </Box>
  );
};

export default BotonEncuesta;