import { Stack, Typography } from "@mui/material";
import PreguntaDeEncuesta from "Componentes/PreguntaDeEncuesta/PreguntaDeEncuesta";
import styles from "./RealizarFormato.module.css";
import BotonSticky from "Componentes/BotonSticky/BotonSticky";

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
              tipo: "seleccionSimple",
              esObligatoria: true,
              opciones: [
                "Opcion 1",
                "Opcion 2",
                "Opcion 3",
                "Opcion 4",
                "Opcion 5",
              ],
            }}
          />
          <PreguntaDeEncuesta
            id={2}
            pregunta={{
              nombre: "Pregunta 2",
              tipo: "seleccionMultiple",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
          <PreguntaDeEncuesta
            id={3}
            pregunta={{
              nombre: "Pregunta 3",
              tipo: "texto",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
          <PreguntaDeEncuesta
            id={4}
            pregunta={{
              nombre: "Pregunta 4",
              tipo: "texto",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
          <PreguntaDeEncuesta
            id={5}
            pregunta={{
              nombre: "Pregunta 5",
              tipo: "seleccionMultiple",
              esObligatoria: true,
              opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
            }}
          />
        </Stack>
        <BotonSticky
          variant="extended"
          Logo={<div>enviar</div>}
          positionx="right"
          onClick={() => console.log("enviar")}
          positiony="bottom"></BotonSticky>
      </div>
    </>
  );
};

export default RealizarFormato;
