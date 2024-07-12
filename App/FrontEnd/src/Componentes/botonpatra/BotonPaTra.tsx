import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BotonSticky from 'Componentes/BotonSticky/BotonSticky';

const BotonPaTra = () => {
  const navigate = useNavigate();

  return (
    <BotonSticky Logo={<ArrowBackIcon />} positionx="left" positiony="bottom" onClick={() => navigate(-1)}/>
  );
};

export default BotonPaTra;