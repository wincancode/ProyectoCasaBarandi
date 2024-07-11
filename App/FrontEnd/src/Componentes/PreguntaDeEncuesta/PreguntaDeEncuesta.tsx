import { Card, CardContent, Typography } from "@mui/material";
import styles from "./PreguntaDeEncuesta.module.css";

interface Props {
  id: number;
  pregunta: {
    nombre: string;
    tipo: string;
    opciones?: string[];
    esObligatoria: boolean;
    respuestaEscrita?: respuesta;
    respuestasSeleccionables?: respuesta[];
  };
}

interface respuesta {
  id: number;
}

const PreguntaDeEncuesta: React.FC<Props> = (props) => {
  return (
   
      <>
        <Card
          style={{
            backgroundColor: "#f5f7e3",
            borderLeft: "8px solid #1976d2",
          }}>
          <CardContent>
            <Typography variant="h6">
              {props.pregunta.nombre}
              {props.pregunta.esObligatoria ? "*" : null}
            </Typography>
            
          </CardContent>
        </Card>
      </>
   
  );
};

export default PreguntaDeEncuesta;
