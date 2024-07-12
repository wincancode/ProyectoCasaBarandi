import {
  Autocomplete,
  Button,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import PreguntaDeEncuesta from "Componentes/PreguntaDeEncuesta/PreguntaDeEncuesta";
import styles from "./RealizarFormato.module.css";
import BotonSticky from "Componentes/BotonSticky/BotonSticky";
import { useEffect, useState } from "react";
import { supabaseClient } from "supabase";
import { useParams } from "react-router-dom";

interface props {
  id: number;
}

interface Pregunta {
  id: number;
  tipo: "texto" | "seleccionSimple" | "seleccionMultiple";
  nombre: string;
  opciones: Opcion[];
  esObligatoria: boolean;
  respuestaEscrita: string;
  respuestasSeleccionables: string[];
}

interface Opcion {
  id: number;
  opcion: string;
  pregunta_id: number;
}

interface Encuesta {
  preguntas: Pregunta[];
  titulo: string;
}

const RealizarFormato: React.FC<props> = (props) => {
  const idEncuesta = useParams().idRol;
  const [cedulaB, setCedula] = useState("");
  const [nombreB, setNombre] = useState("");
  const [edadB, setEdad] = useState("0");
  const [datosBeneficiado, setDatosBeneficiado] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [comunidadnew, setComunidadnew] = useState("");
  const [comunidad, setComunidad] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const [encuestasData, setEncuestasData] = useState([]);

  const handleDataEncuesta = async () => {
    const dataEncuesta = await supabaseClient
      .from("comunidad")
      .select("id,nombre");

    const data = dataEncuesta.data.map((encuesta) => ({
      label: encuesta.nombre,
      id: encuesta.id,
    }));

    setEncuestasData(data);
  };

  async function obtenerBeneficiado() {
    const Beneficiado = await supabaseClient
      .from("beneficiado")
      .select("cedula")
      .eq("cedula", cedulaB);

    if (Beneficiado.data[0] == null) {
      console.log("Beneficiado no encontrado");
      return;
    }

    console.log("Beneficiado encontrado");
    setDatosBeneficiado(Beneficiado.data[0]);
  }

  async function agregarBeneficiado() {
    if (!checked) {
      const comunidad = await supabaseClient
        .from("comunidad")
        .insert([{ nombre: comunidadnew }])
        .select("id");

      const data = await supabaseClient.from("beneficiado").insert([
        {
          cedula: cedulaB,
          nombre: nombreB,
          edad: parseInt(edadB),
          comunidad: parseInt(comunidad.data[0].id),
        },
      ]);

      console.log("Beneficiado agregado");
      return data;
    }

    const data = await supabaseClient.from("beneficiado").insert([
      {
        cedula: cedulaB,
        nombre: nombreB,
        edad: edadB,
        comunidad: comunidad.id,
      },
    ]);

    console.log("Beneficiado agregado2");
    return data;
  }

  const VerificarIdentidad = () => {
    if (datosBeneficiado == null) {
      return (
        <div>
          <Typography variant="h3">
            <div className={styles.titulo}>Beneficiado no encontrado</div>
          </Typography>
          <div className={styles.respuestas}>
            <TextField
              id="standard-bas"
              label="Cedula"
              variant="standard"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCedula(event.target.value);
              }}
              defaultValue={cedulaB}></TextField>
            <TextField
              id="standard-basi"
              label="nombre"
              variant="standard"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNombre(event.target.value);
              }}
              defaultValue={nombreB}></TextField>
            <TextField
              id="standard-basic"
              label="edad"
              variant="standard"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEdad(event.target.value);
              }}
              defaultValue={edadB}></TextField>

            <>
              <div className={styles.flex}>
                <Switch checked={checked} onChange={handleChange} />
                <Typography>Comunidad Agregada</Typography>
              </div>
              {checked ? (
                <Autocomplete
                  options={encuestasData}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  value={comunidad}
                  onChange={(event, newValue: string | null) => {
                    setComunidad(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Comunidad"
                      variant="outlined"
                    />
                  )}
                />
              ) : (
                <TextField
                  id="standard-basic"
                  label="Comunidad"
                  variant="standard"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setComunidadnew(event.target.value);
                  }}></TextField>
              )}
            </>
            <Button
              variant="contained"
              color="primary"
              onClick={() => agregarBeneficiado()}>
              Agregar
            </Button>
          </div>
        </div>
      );
    }
    return <div>Beneficiario Valido</div>;
  };

  const [tituloEncuesta, setTituloEncuesta] = useState("");

  const [encuestaObjeto, setEncuestaObjeto] = useState<Encuesta>({
    preguntas: [],
    titulo: "",
  });

  useEffect(() => {
    console.log(encuestaObjeto);
  }, [encuestaObjeto]);

  const [preguntasCargadas, setPreguntasCargadas] = useState(false);

  async function FetchPreguntas() {
    const Encuesta = await supabaseClient
      .from("encuestas")
      .select("titulo, preguntas(*, opciones(*))")
      .eq("id", idEncuesta);

    setTituloEncuesta(Encuesta.data[0].titulo);

    const bar: Pregunta[] = Encuesta.data[0].preguntas.map((pregunta) => ({
      id: pregunta.id,
      tipo: pregunta.tipo,
      nombre: pregunta.nombre,
      esObligatoria: pregunta.esObligatoria,
      opciones: pregunta.opciones.map((opcion) => ({
        id: opcion.id,
        opcion: opcion.opcion,
        pregunta_id: opcion.pregunta_id,
      })),
      respuestaEscrita: "",
      respuestasSeleccionables: [],
    }));

    setEncuestaObjeto({
      preguntas: bar,
      titulo: Encuesta.data[0].titulo,
    });

    setPreguntasCargadas(true);
    return;
  }

  if (!preguntasCargadas) {
    FetchPreguntas();
  }

  let PreguntasComponentes = [<div>Cargando</div>];

  function handleRespuestaEscrita(id: number, respuesta: string) {
    const preguntas = [...encuestaObjeto.preguntas]; // Create a shallow copy of the preguntas array
    const preguntaIndex = preguntas.findIndex((p) => p.id === id); // Find the index of the pregunta with the given id

    if (preguntaIndex !== -1) {
      // Check if the pregunta was found
      preguntas[preguntaIndex] = {
        ...preguntas[preguntaIndex],
        respuestaEscrita: respuesta,
      }; // Update the respuestaEscrita for the found pregunta
      setEncuestaObjeto({ ...encuestaObjeto, preguntas: preguntas }); // Update the state with the modified preguntas array
    } else {
      console.error("Pregunta not found with id:", id);
    }
  }

  function handleRespuestaSeleccionSimple(id: number, respuesta: string) {
    // Ensure encuestaObjeto and preguntas are initialized
    if (
      !encuestaObjeto ||
      !encuestaObjeto.preguntas ||
      !(encuestaObjeto.preguntas.length > 0)
    )
      return;

    const preguntas = encuestaObjeto.preguntas;
    // Find the question by id instead of using it as an index
    const preguntaIndex = preguntas.findIndex((pregunta) => pregunta.id === id);
    if (preguntaIndex === -1) return; // If no question matches the id, exit the function

    const pregunta = preguntas[preguntaIndex];
    if (pregunta.respuestasSeleccionables.length === 0) {
      pregunta.respuestasSeleccionables = [respuesta];
    } else {
      pregunta.respuestasSeleccionables =
        pregunta.respuestasSeleccionables.filter((res) => res !== respuesta);
      pregunta.respuestasSeleccionables = [respuesta];
    }

    // Update the question in the original array
    preguntas[preguntaIndex] = pregunta;

    // Update the encuestaObjeto with the new list of preguntas
    setEncuestaObjeto({ ...encuestaObjeto, preguntas: preguntas });
  }

  function handleRespuestaSeleccionMultiple(id: number, respuesta: string) {
    // Ensure encuestaObjeto and preguntas are initialized
    if (
      !encuestaObjeto ||
      !encuestaObjeto.preguntas ||
      !encuestaObjeto.preguntas[id]
    )
      return;

    const preguntas = encuestaObjeto.preguntas;
    if (preguntas[id].respuestasSeleccionables.includes(respuesta)) {
      preguntas[id].respuestasSeleccionables = preguntas[
        id
      ].respuestasSeleccionables.filter((res) => res !== respuesta);
    } else {
      preguntas[id].respuestasSeleccionables.push(respuesta);
    }
    setEncuestaObjeto({ ...encuestaObjeto, preguntas: preguntas });
  }

  if (encuestaObjeto.preguntas.length > 0) {
    PreguntasComponentes = encuestaObjeto.preguntas.map((pregunta) => (
      <PreguntaDeEncuesta
        key={pregunta.id}
        pregunta={{
          nombre: pregunta.nombre,
          tipo: pregunta.tipo,
          opciones: pregunta.opciones.map((opcion) => opcion.opcion),
          esObligatoria: pregunta.esObligatoria,
          respuestaEscrita: pregunta.respuestaEscrita,
          respuestasSeleccionables: pregunta.respuestasSeleccionables,
        }}
        id={pregunta.id}
        onChangeRespuestaEscrita={handleRespuestaEscrita}
        onChangeRespuestaSeleccionSimple={handleRespuestaSeleccionSimple}
        onChangeRespuestaSeleccionMultiple={handleRespuestaSeleccionMultiple}
      />
    ));
  }

  return (
    <>
      <Typography variant="h3">
        <div className={styles.titulo}>{tituloEncuesta}</div>
      </Typography>
      <Typography variant="h5">
        <div className={styles.subtitulo}>Informacion del Beneficiado</div>
      </Typography>
      <div>
        <TextField
          id="standard-basic"
          label="Cedula"
          variant="standard"
          value={cedulaB}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCedula(event.target.value);
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            obtenerBeneficiado();
            setOpenModal(true);
            handleDataEncuesta();
          }}>
          Verificar
        </Button>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.modal}>{VerificarIdentidad()}</div>
      </Modal>

      <div className={styles.preguntas}>
        <Stack spacing={2} minWidth={"23rem"}>
          {PreguntasComponentes}
        </Stack>
        <BotonSticky
          variant="extended"
          Logo={<div>enviar</div>}
          positionx="right"
          onClick={() => FetchPreguntas()}
          positiony="bottom"></BotonSticky>
      </div>
    </>
  );
};

export default RealizarFormato;
