import { startOfDay, isSameDay, isAfter } from "date-fns";
import { Box, Typography } from "@mui/material";
import logo from "../../assets/LogoUcab.png";
import styles from "./MenuInicio.module.css";
import { useState } from "react";
import { supabaseClient } from "supabase";
import { OkDialog } from "Componentes/OkDialog/OkDialog";

const MenuInicio: React.FC = () => {
  const [obtenidasJornadas, setObtenidasJornadas] = useState(false);
  const [informacionJornadas, setInformacionJornadas] = useState([
    {
      id: 0,
      Titulo: "",
      fechaRealizacion: "",
      ubicacion: "",
    },
  ]);

  async function obtenerJornadas() {
    const jornadas = await supabaseClient
      .from("jornadas")
      .select("id, Titulo, fechaRealizacion, ubicacion");

    setObtenidasJornadas(true);
    setInformacionJornadas(jornadas.data);
  }

  if (!obtenidasJornadas) {
    obtenerJornadas();
  }

  const [JornadaMasCercana, setJornadaMasCercana] = useState({
    id: 0,
    Titulo: "",
    fechaRealizacion: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleTrabajarEnJornada = () => {
    const today = startOfDay(new Date());

    const jornadaActual = informacionJornadas.find((jornada) => {
      const fecha = new Date(jornada.fechaRealizacion);
      fecha.setDate(fecha.getDate() + 1);

      if (isSameDay(fecha, today)) console.log("a");
      return isSameDay(fecha, today);
    });

    const JornadaMasCercanaAFuturo = informacionJornadas.find((jornada) => {
      const fecha = new Date(jornada.fechaRealizacion);
      fecha.setDate(fecha.getDate() + 1);

      return isAfter(fecha, today);
    });
    if (JornadaMasCercanaAFuturo)
      setJornadaMasCercana(JornadaMasCercanaAFuturo);

    console.log(jornadaActual);
    if (!jornadaActual) {
      setOpenDialog(true);
      return;
    }

    window.location.href = "/listaRoles/" + jornadaActual.id;
  };

  return (
    <div className={styles.Container}>
      <OkDialog
        open={openDialog}
        mensaje={
          "No hay una jornada hoy. La siguiente jornada es la de " +
          JornadaMasCercana.Titulo +
          " el " +
          JornadaMasCercana.fechaRealizacion
        }
        onOk={() => setOpenDialog(false)}
      />
      <div className={styles.imagen}>
        <img src={logo} />
      </div>
      <center>
        <Typography variant={"h6"}>Extención Social</Typography>
      </center>
      <div className={styles.botones}>
        <div onClick={() => (window.location.href = "/jornadas-futuras")}>
          <Box
            justifyContent={"center"}
            alignContent={"center"}
            textAlign={"center"}
            sx={{
              width: "100vw",
              height: "15vh",
              bgcolor: "#ffcf33",
            }}>
            <Typography variant={"h4"}>Jornadas futuras</Typography>
          </Box>
        </div>
        <div onClick={() => (window.location.href = "/jornadas-anteriores")}>
          <Box
            justifyContent={"center"}
            alignContent={"center"}
            textAlign={"center"}
            sx={{ width: "100vw", height: "15vh", bgcolor: "#00bcd4" }}>
            <Typography variant={"h4"}>Jornadas realizadas</Typography>
          </Box>
        </div>
        <div onClick={handleTrabajarEnJornada}>
          <Box
            justifyContent={"center"}
            alignContent={"center"}
            textAlign={"center"}
            sx={{ width: "100vw", height: "15vh", bgcolor: "#357a38" }}>
            <Typography variant={"h4"}>Trabajar en jornada</Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default MenuInicio;
