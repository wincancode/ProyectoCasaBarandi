import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import styles from "./PreguntaDeEncuesta.module.css";

interface Props {
  id: number;
  pregunta: {
    nombre: string;
    tipo: "texto" | "seleccionSimple" | "seleccionMultiple";
    opciones?: string[];
    esObligatoria: boolean;
    respuestaEscrita?: respuesta;
    respuestasSeleccionables?: respuesta[];
  };
}

interface respuesta {
  id: number;
}

const PreguntaTexto = () => {
  return (
    <>
      <Typography variant="body1">Escribe tu respuesta</Typography>
      <TextField variant="standard" fullWidth label={"Respuesta"} />
    </>
  );
};

const PreguntaSeleccion = (props: Props) => {
  return (
    <FormControl>
      <Typography variant="body1">Selecciona una respuesta</Typography>

      {props.pregunta.tipo === "seleccionSimple" ? (
        <RadioGroup>
          {props.pregunta.opciones?.map((respuesta, index) => (
            <FormControlLabel
              key={index}
              value={respuesta}
              control={<Radio />}
              label={respuesta}
            />
          ))}
        </RadioGroup>
      ) : (
        props.pregunta.opciones?.map((opcion, index) => (
          <div className={styles.seleccion}>
            <Checkbox key={index} />
            <Typography key={index}>{opcion}</Typography>
          </div>
        ))
      )}
    </FormControl>
  );
};

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
          {props.pregunta.tipo === "texto" ? (
            <PreguntaTexto />
          ) : (
            <PreguntaSeleccion {...props} />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PreguntaDeEncuesta;
