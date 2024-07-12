import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  FormGroup,
  Card,
  CardContent
} from '@mui/material';

const ResponderEncuesta = () => {
  const preguntasAleatorias = [
    { id: 1, titulo: '¿Cuál es tu color favorito?', tipo: 'texto' },
    { id: 2, titulo: '¿Cuál es tu animal favorito?', tipo: 'OpcionMultiple', opciones: ['Perro', 'Gato', 'Pájaro', 'Otro'] },
    { id: 3, titulo: 'Selecciona tus hobbies', tipo: 'seleccionMultiple', opciones: ['Leer', 'Escribir', 'Dibujar', 'Programar'] }
  ];
  
  const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState(preguntasAleatorias.map(() => ''));
    

  const handleChange = (index, valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = valor;
    setRespuestas(nuevasRespuestas);
  };

  const handleCheckboxChange = (index, opcion) => {
    const seleccionadas = respuestas[index] ? respuestas[index].split(', ') : [];
    if (seleccionadas.includes(opcion)) {
      const nuevasSeleccionadas = seleccionadas.filter(item => item !== opcion);
      respuestas[index] = nuevasSeleccionadas.join(', ');
    } else {
      seleccionadas.push(opcion);
      respuestas[index] = seleccionadas.join(', ');
    }
    setRespuestas([...respuestas]);
  };

  const renderPregunta = (pregunta, index) => {
    switch (pregunta.tipo) {
      case 'texto':
        return (
          <TextField
            fullWidth
            label={pregunta.titulo}
            variant="outlined"
            value={respuestas[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            margin="normal"
          />
        );
case 'OpcionMultiple':
  return (
    <>
      <Typography variant="subtitle1">{pregunta.titulo}</Typography>
      <RadioGroup
        value={respuestas[index]}
        onChange={(e) => handleChange(index, e.target.value)}
      >
        {pregunta.opciones.map((opcion, i) => (
          <FormControlLabel key={i} value={opcion} control={<Radio />} label={opcion} />
        ))}
      </RadioGroup>
    </>
  );
case 'seleccionMultiple':
  return (
    <>
      <Typography variant="subtitle1">{pregunta.titulo}</Typography>
      <FormGroup>
        {pregunta.opciones.map((opcion, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={respuestas[index].split(', ').includes(opcion)}
                onChange={() => handleCheckboxChange(index, opcion)}
              />
            }
            label={opcion}
          />
        ))}
      </FormGroup>
    </>
  );
default:
  return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Título de la Encuesta
          </Typography>
        </CardContent>
      </Card>
      {preguntasAleatorias.map((pregunta, index) => (
        <Card key={pregunta.id} sx={{ marginBottom: '20px' }}>
          <CardContent>
            {renderPregunta(pregunta, index)}
          </CardContent>
        </Card>
      ))}
      <Button variant="contained">Enviar Respuestas</Button>
    </Container>
  );
};

export default ResponderEncuesta;