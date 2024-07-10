import { Button, FormControl, TextField } from "@mui/material";
import styles from "./InicioSesion.module.css";
import logo from "../../assets/LogoUcab.png";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ModalSiNo from "Componentes/ModalSiNo/ModalSiNo";

const InicioSesion: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  function handleSubmit() {
    console.log(user, password);
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>hola</Button>
      <div className={styles.center}>
        <ModalSiNo
          titulo="Titulo tan largo que la gente no podria soportarloo"
          mensaje="Mensaje super mega larrgo que nadie le podria interesar n"
          onYes={() => console.log("Yes")}
          onNo={() => console.log("No")}
          open={open}
        />
      </div>
    </div>
  );
};

export default InicioSesion;
