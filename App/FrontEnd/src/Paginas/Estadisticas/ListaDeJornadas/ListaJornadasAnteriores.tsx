import { Stack, Typography } from "@mui/material";
import BotonLista from "Componentes/BotonLista/BotonLista";
import styles from "./ListaJornadasAnteriores.module.css";

interface props {
  jornadas: {
    id: number;
    nombre: string;
    fecha: string;
  }[];
}

const lista: React.FC<props> = (props) => {
  return (
    <Stack gap={"8px"}>
      {props.jornadas.map((jornada) => (
        <BotonLista
          key={jornada.id}
          titulo={jornada.nombre}
          subtitulo={jornada.fecha}
          onClick={() => console.log(jornada.id)}></BotonLista>
      ))}
    </Stack>
  );
};

const ListaJornadasAnteriores: React.FC = () => {
  return (
    <div className={styles.all}>
      <div className={styles.title}>
        <Typography variant="h4">Lista de Jornadas</Typography>
      </div>
      {lista({
        jornadas: [{ id: 1, nombre: "Jornada 1", fecha: "01/01/2021" }],
      })}
    </div>
  );
};

export default ListaJornadasAnteriores;
