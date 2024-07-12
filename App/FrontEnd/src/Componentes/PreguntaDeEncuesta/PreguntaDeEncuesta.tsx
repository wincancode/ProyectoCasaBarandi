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
    respuestaEscrita?: string;
    respuestasSeleccionables?: string[];
  };
  onChangeRespuestaEscrita: (id: number, respuesta: string) => void;
  onChangeRespuestaSeleccionMultiple: (id: number, respuesta: string) => void;
  onChangeRespuestaSeleccionSimple: (id: number, respuesta: string) => void;
}

const PreguntaTexto: React.FC<Props> = (props) => {
  return (
    <>
      <Typography variant="body1">Escribe tu respuesta</Typography>
      <TextField
        onChange={(e) =>
          props.onChangeRespuestaEscrita(props.id, e.target.value)
        }
        value={props.pregunta.respuestaEscrita}
        variant="standard"
        fullWidth
        label={"Respuesta"}
      />
    </>
  );
};

const PreguntaSeleccion = (props: Props) => {
  return (
    <FormControl>
      <Typography variant="body1">Selecciona una respuesta</Typography>

      {props.pregunta.tipo === "seleccionSimple" ? (
        <RadioGroup
          onChange={(e) =>
            props.onChangeRespuestaSeleccionSimple(props.id, e.target.value)
          }
          value={
            props.pregunta.respuestasSeleccionables
              ? props.pregunta.respuestasSeleccionables[0]
              : ""
          }>
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
            <Checkbox
              onChange={(e) =>
                props.onChangeRespuestaSeleccionMultiple(
                  props.id,
                  e.target.value
                )
              }
              value={opcion}
              key={index}
            />
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
            <PreguntaTexto
              {...props}
              onChangeRespuestaEscrita={props.onChangeRespuestaEscrita}
            />
          ) : (
            <PreguntaSeleccion
              {...props}
              onChangeRespuestaSeleccionSimple={
                props.onChangeRespuestaSeleccionSimple
              }
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PreguntaDeEncuesta;
