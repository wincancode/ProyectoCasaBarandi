import { Stack, Typography } from "@mui/material";
import BotonLista from "Componentes/BotonLista/BotonLista";
import styles from "./ListaJornadasAnteriores.module.css";
import { useState } from "react";

interface props {
  jornadas: {
    id: number;
    nombre: string;
    fecha: string;
  }[];
  onClick?: (number) => void;
}

const lista: React.FC<props> = (props) => {
  return (
    <Stack gap={"8px"}>
      {props.jornadas.map((jornada) => (
        <BotonLista
          key={jornada.id}
          titulo={jornada.nombre}
          subtitulo={jornada.fecha}
          onClick={() =>
            props.onClick && props.onClick(jornada.id)
          }></BotonLista>
      ))}
    </Stack>
  );
};

interface propsEstadisticasJornadaEspesifica {
  id: number;
}

const EstadisticasJornadaEspesifica: React.FC<
  propsEstadisticasJornadaEspesifica
> = ({ id }) => {
  return (
    <div>
      <Typography variant="h4"> Encuestas {id} </Typography>
      <Typography variant="h6"> Estadistica de Dona </Typography>
      {/* EstadisticaDona */}
      <Typography variant="h6"> Estadistica de Barra </Typography>
      {/* EstadisticaBarra */}
    </div>
  );
};

const ListaJornadasAnteriores: React.FC = () => {
  const [jornadaSeleccionada, setJorandaSeleccionada] = useState(-1);

  return (
    <div className={styles.all}>
      {jornadaSeleccionada !== -1 ? (
        <EstadisticasJornadaEspesifica id={jornadaSeleccionada} />
      ) : (
        <>
          <div className={styles.title}>
            <Typography variant="h4">Lista de Jornadas</Typography>
          </div>
          {lista({
            jornadas: [
              { id: 1, nombre: "Jornada 1", fecha: "01/01/2021" },
              { id: 2, nombre: "Jornada 2", fecha: "01/01/2021" },
              { id: 3, nombre: "Jornada 3", fecha: "01/01/2021" },
            ],
            onClick: (id) => setJorandaSeleccionada(id),
          })}
        </>
      )}
    </div>
  );
};

export default ListaJornadasAnteriores;
