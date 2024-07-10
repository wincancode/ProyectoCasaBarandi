import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import EstadisticaDona from "../../../Componentes/EstadisticaDona/EstadisticaDona";
import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import styles from "./JornadasEstadisticas.module.css";
import EstadisticaBarra from "../../../Componentes/EstadisticaBarra/EstadisticaBarra";

const JornadasEstadisticas: React.FC = () => {
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [age, setAge] = React.useState("");

  return (
    <div className={styles.caja}>
      <Container fixed>
        <Box sx={{ bgcolor: "#cfe8fc" }} textAlign={"center"}>
          <Typography variant="h4">Estadisticas de Jornadas</Typography>
        </Box>
        <div className={styles.fecha}>
          <Typography variant="h6"> xx/xx/xxxx </Typography>
        </div>
      </Container>
      <EstadisticaDona
        Nombre="Asistencias"
        data={[
          { id: 0, value: 10, label: "series A" },
          { id: 1, value: 15, label: "series B" },
          { id: 2, value: 20, label: "series C" },
          { id: 3, value: 25, label: "series D" },
          { id: 4, value: 25, label: "series D" },
          { id: 5, value: 25, label: "series D" },
        ]}></EstadisticaDona>
      <div className={styles.caja2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Comparativas</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Comparativas"
            onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.caja2}>
        <EstadisticaBarra tittle="Diagnosticos"></EstadisticaBarra>
      </div>
    </div>
  );
};

export default JornadasEstadisticas;
