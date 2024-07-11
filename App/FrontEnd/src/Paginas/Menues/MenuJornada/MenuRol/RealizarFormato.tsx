import { Stack, Typography } from "@mui/material";
import PreguntaDeEncuesta from "Componentes/PreguntaDeEncuesta/PreguntaDeEncuesta";
import styles from "./RealizarFormato.module.css";

const RealizarFormato: React.FC = () => {
  return (
    <>
      <Typography variant="h3">
        <div className={styles.titulo}>Realizar formato</div>
      </Typography>
      <div className={styles.preguntas}>
        <Stack spacing={2} minWidth={"23rem"}>
          <PreguntaDeEncuesta
            id={1}
            pregunta={{
              nombre: "Pregunta 1",
              tipo: "texto",
              esObligatoria: true,
            }}
          />
        </Stack>
      </div>
    </>
  );
};

export default RealizarFormato;
