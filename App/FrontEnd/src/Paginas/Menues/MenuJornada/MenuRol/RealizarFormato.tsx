import { Stack, Typography } from "@mui/material";
import PreguntaDeEncuesta from "Componentes/PreguntaDeEncuesta/PreguntaDeEncuesta";
import styles from "./RealizarFormato.module.css";

interface props {
  id: number;
}

const RealizarFormato: React.FC<props> = (props) => {
  return (
    <>
      <Typography variant="h3">
        <div className={styles.titulo}>Realizar formato {props.id} </div>
      </Typography>
      <div className={styles.preguntas}>
        <Stack spacing={2} minWidth={"23rem"}>
          <PreguntaDeEncuesta
            id={1}
            pregunta={{
              nombre: "Pregunta 1",
              tipo: "seleccion simple",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
          <PreguntaDeEncuesta
            id={1}
            pregunta={{
              nombre: "Pregunta 1",
              tipo: "seleccion multiple",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
          <PreguntaDeEncuesta
            id={1}
            pregunta={{
              nombre: "Pregunta 1",
              tipo: "texto",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
          <PreguntaDeEncuesta
            id={1}
            pregunta={{
              nombre: "Pregunta 1",
              tipo: "texto",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
          <PreguntaDeEncuesta
            id={1}
            pregunta={{
              nombre: "Pregunta 1",
              tipo: "seleccion multiple",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
        </Stack>
      </div>
    </>
  );
};

export default RealizarFormato;
