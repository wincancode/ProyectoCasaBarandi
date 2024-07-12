import { Header } from "Componentes/Header/Header";
import { BarandiBottomNavigation } from "Componentes/BottomNavigation/BarandiBottomNavigation";
import BotonLista from "Componentes/BotonLista/BotonLista";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabaseClient } from "supabase";

const ListaRoles: React.FC = () => {
  const { idJornada } = useParams();
  //Usar la jornada 7 como ejemplo
  console.log(idJornada);

  const [rolesCargados, setRoles] = useState([<div>Cargando . . .</div>]);

  async function getRoles() {
    const roles = await supabaseClient.from("Roles").select("id, nombre");

    const bar = roles.data.map((rol, index) => (
      <BotonLista
        key={index}
        onClick={() => (window.location.href = "/jornada-actual/" + rol.id)}
        titulo={rol.nombre}
        
      />

    ));

    setRoles(bar);
  }

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <Header titulo="roles" />

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
        {rolesCargados}
      </div>

      <BarandiBottomNavigation
        tabs={["roles"]}
        value="roles"
        onchange={() => null}
      />
    </>
  );
};

export default ListaRoles;
